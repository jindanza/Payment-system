const MembershipModel = require("../models/membership.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.registration = async (req, res) => {
  try {
    const { email, first_name, last_name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: 102,
        message: "Format email tidak sesuai format",
        data: null,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: "Password minimal harus 8 karakter",
        data: null,
      });
    }

    await MembershipModel.createMembership(
      email,
      first_name,
      last_name,
      hashedPassword
    );

    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const membership = await MembershipModel.findMembershipByEmail(email);

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: 102,
        message: "Format email tidak sesuai format",
        data: null,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 102,
        message: "Password minimal harus 8 karakter",
        data: null,
      });
    }

    if (!membership || !(await bcrypt.compare(password, membership.password))) {
      return res.status(401).json({
        status: 103,
        message: "Username atau password salah",
        data: null,
      });
    }

    const token = jwt.sign(
      { id: membership.id, email: membership.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    res
      .status(200)
      .json({ status: 0, message: "Login Sukses", data: { token: token } });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const membership = await MembershipModel.findMembershipById(userId);
    res.status(200).json({ status: 0, message: "Sukses", data: membership });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name } = req.body;

    const membership = await MembershipModel.updateProfile(
      first_name,
      last_name,
      userId
    );

    res
      .status(200)
      .json({ status: 0, message: "Update Pofile berhasil", data: membership });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile_image = req.file ? req.file.path : null;

    if (!profile_image) {
      return res.status(400).json({
        status: 102,
        message: "Tidak ada gambar yang diupload",
        data: null,
      });
    }

    const membership = await MembershipModel.updateProfileImage(
      profile_image,
      userId
    );

    res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
