import bdd from "../config/bdd.js";

export async function getAllActivePolicies() {
  const sql = `
    SELECT escape_id, hours_before_min, hours_before_max, refund_percent
    FROM cancellation_policy
    WHERE is_active = 1
    ORDER BY escape_id IS NULL DESC, hours_before_min ASC
  `;
  const [rows] = await bdd.query(sql);
  return rows;
}

export async function getPolicyForEscapeAndDelay(escapeId, hoursBefore) {
  const sql = `
    SELECT *
    FROM cancellation_policy
    WHERE (escape_id = ? OR escape_id IS NULL)
      AND hours_before_min <= ?
      AND hours_before_max >= ?
      AND is_active = 1
    ORDER BY escape_id IS NOT NULL DESC, hours_before_min DESC
    LIMIT 1
  `;
  const [rows] = await bdd.query(sql, [escapeId, hoursBefore, hoursBefore]);
  return rows[0] || null;
}
