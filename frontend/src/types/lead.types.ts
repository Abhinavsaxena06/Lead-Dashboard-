export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Lost";

export type LeadSource =
  | "Website"
  | "Instagram"
  | "Referral";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
}

export interface LeadsResponse {
  success: boolean;
  message: string;
  data: Lead[];
  pagination: {
    totalLeads: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}