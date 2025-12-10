import bdd from "../config/bdd.js";

export async function findActivePromoByCode(code) {
  const sql = `
    SELECT *
    FROM promo_code
    WHERE code = ?
      AND is_active = 1
      AND (valid_from IS NULL OR valid_from <= NOW())
      AND (valid_to IS NULL OR valid_to >= NOW())
    LIMIT 1
  `;
  const [rows] = await bdd.query(sql, [code]);
  return rows[0] || null;
}
