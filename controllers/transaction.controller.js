const {
  Balance,
  Transaction,
  Service,
} = require("../models/transaction.model");

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const balance = await Balance.getBalance(userId);

    if (!balance) {
      return res.status(400).json({
        status: 102,
        message: "Balance kosong atau tidak ditemukan",
        data: null,
      });
    }

    res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: balance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.topUpBalance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { top_up_amount } = req.body;

    if (!top_up_amount) {
      return res.status(400).json({
        status: 102,
        message: "Jumlah top-up tidak boleh kosong",
        data: null,
      });
    }

    if (isNaN(top_up_amount) || top_up_amount <= 0) {
      return res.status(400).json({
        status: 102,
        message:
          "Paramter amount hanya boleh angka atau tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    const updatedBalance = await Balance.updateBalance(userId, top_up_amount);
    const transaction = await Transaction.createTransaction(
      userId,
      null,
      "TOPUP",
      top_up_amount
    );
    await Transaction.createTransactionHistory(
      userId,
      transaction.invoice_number,
      "TOPUP",
      "Top Up balance",
      top_up_amount
    );

    res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: updatedBalance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { service_code } = req.body;

    if (!service_code) {
      return res.status(400).json({
        status: 102,
        message: "Service code tidak boleh kosong",
        data: null,
      });
    }

    const service = await Service.getService(service_code);

    if (!service) {
      return res.status(400).json({
        status: 102,
        message: "Service atau Layanan tidak ditemukan",
        data: null,
      });
    }

    const serviceTariff = service.service_tariff;
    const serviceName = service.service_name;
    const currentBalance = await Balance.getBalance(userId);

    if (!currentBalance || currentBalance.balance < serviceTariff) {
      return res.status(400).json({
        status: 102,
        message: "Pastikan Balance/Saldo Mencukupi",
        data: null,
      });
    }

    await Balance.deductBalance(userId, serviceTariff);

    const transaction = await Transaction.createTransaction(
      userId,
      service_code,
      "PAYMENT",
      serviceTariff
    );

    await Transaction.createTransactionHistory(
      userId,
      transaction.invoice_number,
      "PAYMENT",
      serviceName,
      serviceTariff
    );

    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: transaction.invoice_number,
        service_code: transaction.service_code,
        service_name: serviceName,
        transaction_type: transaction.transaction_type,
        total_amount: transaction.total_amount,
        created_on: transaction.created_on,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    let { offset, limit } = req.query;

    offset = offset ? parseInt(offset) : 0;
    limit = limit ? parseInt(limit) : null;

    const history = await Transaction.getTransactionHistory(
      userId,
      offset,
      limit
    );
    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: {
        offset: offset,
        limit: limit,
        record: history,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
