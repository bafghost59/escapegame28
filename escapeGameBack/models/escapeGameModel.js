import bdd from '../config/bdd.js';


export const getAllEscapes = async () => {
  const InfoEscapes = `
  SELECT id_escape,
         title,
         \`describe\`,
         duration,
         difficult,
         price_escape,
         location,
         photo_escape,
         video
  FROM escapeGame;
`;

  const [response] = await bdd.query(InfoEscapes);
  return response;
};


export const getEscapesWithRatings = async () => {
  const sql = `
    SELECT
      e.id_escape,
      e.title,
      e.\`describe\`,
      e.duration,
      e.difficult,
      e.price_escape,
      e.location,
      e.photo_escape,
      e.video,
      COALESCE(AVG(f.rated), 0) AS avg_rating,
      COUNT(f.id_feedback)      AS total_reviews
    FROM escapeGame e
    LEFT JOIN feedback f
      ON f.escape_id = e.id_escape
    GROUP BY
      e.id_escape,
      e.title,
      e.\`describe\`,
      e.duration,
      e.difficult,
      e.price_escape,
      e.location,
      e.photo_escape,
      e.video
  `;
  const [rows] = await bdd.query(sql);
  return rows;
};



export const getEscapeById = async (id_escape) => {
  const EscapeById = 'SELECT * FROM escapeGame WHERE id_escape = ?';
  const [response] = await bdd.query(EscapeById, [id_escape]);
  return response[0] || null;
};


export const createEscape = async ({
  title,
  describe,
  duration,
  difficult,
  price_escape,
  location,
  photo_escape,
  video,
}) => {
  const addEscape = `
    INSERT INTO escapeGame
      (title, \`describe\`, duration, difficult, price_escape, location, photo_escape, video)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    title,
    describe,
    duration,
    difficult,
    price_escape,
    location,
    photo_escape,
    video,
  ];

  const [response] = await bdd.query(addEscape, params);
  return response;
};


export const updateEscape = async (id_escape, {
  title,
  describe,
  duration,
  difficult,
  price_escape,
  location,
  photo_escape,
  video,
}) => {
  const EscapeUpdated = `
    UPDATE escapeGame
    SET title = ?, \`describe\` = ?, duration = ?, difficult = ?, price_escape = ?, location = ?, photo_escape = ?, video = ?
    WHERE id_escape = ?
  `;
  const params = [
    title,
    describe,
    duration,
    difficult,
    price_escape,
    location,
    photo_escape,
    video,
    id_escape,
  ];

  const [response] = await bdd.query(EscapeUpdated, params);
  return response;
};


export const deleteEscape = async (id_escape) => {
  const EscapeDeleted = 'DELETE FROM escapeGame WHERE id_escape = ?';
  const [response] = await bdd.query(EscapeDeleted, [id_escape]);
  return response;
};

export default getAllEscapes;

export const getEscapesLight = async () => {
  const EscapeList = `
    SELECT
      id_escape,
      title,
      difficult,
      price_escape,
      location
    FROM escapeGame;
  `;
  const [response] = await bdd.query(EscapeList);
  return response;
};
