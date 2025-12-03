import {
  createSupport,
  getAllSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
} from "../models/supportModel.js";

export const createSupportTicket = async (req, res) => {
  try {
    const { user_id, booking_id, subject, message, status } = req.body;

    if (!user_id || !subject || !message) {
      return res.status(400).json({ message: "user_id, subject et message sont obligatoires" });
    }

    const result = await createSupport({
      user_id,
      booking_id: booking_id || null,
      subject,
      message,
      status: status || "open",
    });

    return res.status(201).json({
      message: "Ticket de support créé",
      id_support: result.insertId,
    });
  } catch (error) {
    console.error("Erreur createSupportTicket:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getAllSupportTickets = async (req, res) => {
  try {
    const tickets = await getAllSupport();
    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Erreur getAllSupportTickets:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getSupportTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await getSupportById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket non trouvé" });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error("Erreur getSupportTicketById:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, message, status } = req.body;

    const existing = await getSupportById(id);
    if (!existing) {
      return res.status(404).json({ message: "Ticket non trouvé" });
    }

    await updateSupport(id, {
      subject: subject ?? existing.subject,
      message: message ?? existing.message,
      status: status ?? existing.status,
    });

    return res.status(200).json({ message: "Ticket mis à jour" });
  } catch (error) {
    console.error("Erreur updateSupportTicket:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getSupportById(id);
    if (!existing) {
      return res.status(404).json({ message: "Ticket non trouvé" });
    }

    await deleteSupport(id);
    return res.status(200).json({ message: "Ticket supprimé" });
  } catch (error) {
    console.error("Erreur deleteSupportTicket:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
