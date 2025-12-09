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
