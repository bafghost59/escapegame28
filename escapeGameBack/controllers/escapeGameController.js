// controllers/escapeGameController.js
import {
  getAllEscapes,
  getEscapesLight,
  getEscapeById,
  createEscape,
  updateEscape,
  deleteEscape,
  getEscapesWithRatings,
} from '../models/escapeGameModel.js';


export const getAllEscapesController = async (req, res) => {
  try {
    const escapes = await getAllEscapes();
    res.json(escapes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getEscapesLightController = async (req, res) => {
  try {
    const escapes = await getEscapesLight();
    res.json(escapes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getEscapesWithRatingsController = async (req, res) => {
  try {
    const escapes = await getEscapesWithRatings();
    res.json(escapes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getEscapeByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const escape = await getEscapeById(id);

    if (!escape) {
      return res.status(404).json({ message: 'Escape game non trouvé' });
    }

    res.json(escape);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const createEscapeController = async (req, res) => {
  try {
    const {
      title,
      describe,
      duration,
      difficult,
      price_escape,
      location,
      photo_escape,
      video,
    } = req.body;

    if (
      !title ||
      !describe ||
      !duration ||
      !difficult ||
      !price_escape ||
      !location ||
      !photo_escape ||
      !video
    ) {
      return res
        .status(400)
        .json({ message: 'Tous les champs de l’escape game sont requis' });
    }

    const result = await createEscape({
      title,
      describe,
      duration,
      difficult,
      price_escape,
      location,
      photo_escape,
      video,
    });

    res.status(201).json({
      message: 'Escape game créé',
      id_escape: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const updateEscapeController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      describe,
      duration,
      difficult,
      price_escape,
      location,
      photo_escape,
      video,
    } = req.body;

    const result = await updateEscape(id, {
      title,
      describe,
      duration,
      difficult,
      price_escape,
      location,
      photo_escape,
      video,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Escape game non trouvé' });
    }

    res.json({ message: 'Escape game mis à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteEscapeController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteEscape(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Escape game non trouvé' });
    }

    res.json({ message: 'Escape game supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
