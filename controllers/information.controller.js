const InformationModel = require("../models/information.model");

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await InformationModel.getAllBanners();
    res.status(200).json({ status: 0, message: "Sukses", data: banners });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await InformationModel.getAllServices();
    res.status(200).json({ status: 0, message: "Sukses", data: services });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
