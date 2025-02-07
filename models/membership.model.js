const pool = require("../config/db.config");

class MembershipModel {
  static async createMembership(email, first_name, last_name, password) {
    const query = `INSERT INTO users (email, first_name, last_name, password) 
                   VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [email, first_name, last_name, password];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findMembershipByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findMembershipById(userId) {
    const query = `SELECT email, first_name, last_name, profile_image FROM users WHERE id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async updateProfile(first_name, last_name, userId) {
    const query = `
    UPDATE users 
    SET first_name = COALESCE($1, first_name), 
        last_name = COALESCE($2, last_name), 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING email, first_name, last_name, profile_image;
  `;
    const values = [first_name, last_name, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updateProfileImage(profile_image, userId) {
    const query = `UPDATE users SET profile_image = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING email, first_name, last_name, profile_image;`;
    const values = [profile_image, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = MembershipModel;
