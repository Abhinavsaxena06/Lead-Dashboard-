import express from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead
} from "../controllers/lead.controller";
import { authorizeRoles, protect } from "../middleware/auth.middleware";
import { validateLead } from "../middleware/validateLead.middleware";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(authorizeRoles("admin", "sales"), validateLead, createLead)
  .get(authorizeRoles("admin", "sales"), getLeads);

router
  .route("/:id")
  .get(authorizeRoles("admin", "sales"), getSingleLead)
  .put(authorizeRoles("admin", "sales"), validateLead, updateLead)
  .delete(authorizeRoles("admin"), deleteLead);

export default router;