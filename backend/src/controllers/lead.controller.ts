import { Request, Response } from "express";
import Lead from "../models/Lead";
import { AuthRequest } from "../middleware/auth.middleware";

interface LeadQuery {
  status?: string;
  source?: string;
  search?: string;
  sort?: string;
  page?: string;
}

export const createLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    if (!name || !email || !source) {
      res.status(400).json({
        success: false,
        message: "Name, email and source are required"
      });
      return;
    }

    const lead = await Lead.create({
      name,
      email,
      status: status || "New",
      source,
      createdBy: req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create lead",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getLeads = async (
  req: Request<{}, {}, {}, LeadQuery>,
  res: Response
): Promise<void> => {
  try {
    const { status, source, search, sort, page = "1" } = req.query;

    const limit = 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;

    const query: Record<string, unknown> = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const totalLeads = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email role");

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
      pagination: {
        totalLeads,
        currentPage,
        totalPages: Math.ceil(totalLeads / limit),
        limit,
        hasNextPage: currentPage < Math.ceil(totalLeads / limit),
        hasPrevPage: currentPage > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getSingleLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, status, source },
      {
        new: true,
        runValidators: true
      }
    );

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update lead",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};