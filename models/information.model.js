const pool = require("../config/db.config");

class InformationModel {
  static async getAllBanners() {
    const query = `SELECT banner_name, banner_image, description FROM banners ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getAllServices() {
    const query = `SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = InformationModel;
