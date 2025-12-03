import express from "express";
import {
  createSupportTicket,
  getAllSupportTickets,
  getSupportTicketById,
  updateSupportTicket,
  deleteSupportTicket,
} from "../controllers/supportController.js";

const router = express.Router();

router.post("/support", createSupportTicket);
router.get("/allSupports", getAllSupportTickets);
router.get("/supports/:id", getSupportTicketById);
router.put("/supports/:id", updateSupportTicket);
router.delete("/supports/:id", deleteSupportTicket);

export default router;
