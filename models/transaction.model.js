const pool = require("../config/db.config");

class Balance {
  static async getBalance(userId) {
    const query = `SELECT balance FROM balances WHERE user_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  }

  static async updateBalance(userId, amount) {
    const updateBalanceQuery = `
      INSERT INTO balances (user_id, balance)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET balance = balances.balance + EXCLUDED.balance, updated_at = CURRENT_TIMESTAMP
      RETURNING balance;
    `;
    const { rows } = await pool.query(updateBalanceQuery, [userId, amount]);
    return rows[0];
  }

  static async deductBalance(userId, amount) {
    const updateBalanceQuery = `
      UPDATE balances SET balance = balance - $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING balance;
    `;
    const updatedBalance = await pool.query(updateBalanceQuery, [
      amount,
      userId,
    ]);
    return updatedBalance.rows[0];
  }
}

class Transaction {
  static async createTransaction(
    userId,
    service_code,
    transaction_type,
    total_amount
  ) {
    const invoiceNumber = `INV-${Date.now()}`;
    const transactionQuery = `
      INSERT INTO transactions (user_id, service_code, invoice_number, transaction_type, total_amount)
      VALUES ($1, $2, $3, $4, $5) RETURNING invoice_number, service_code, transaction_type, total_amount, created_on;
    `;
    const { rows } = await pool.query(transactionQuery, [
      userId,
      service_code,
      invoiceNumber,
      transaction_type,
      total_amount,
    ]);
    return rows[0];
  }

  static async createTransactionHistory(
    userId,
    invoiceNumber,
    transaction_type,
    description,
    total_amount
  ) {
    const historyQuery = `
      INSERT INTO transaction_history (user_id, invoice_number, transaction_type, description, total_amount)
      VALUES ($1, $2, $3, $4, $5) RETURNING invoice_number;
    `;
    await pool.query(historyQuery, [
      userId,
      invoiceNumber,
      transaction_type,
      description,
      total_amount,
    ]);
  }

  static async getTransactionHistory(userId, offset = 0, limit = null) {
    let query = `
      SELECT invoice_number, transaction_type, description, total_amount, created_on
      FROM transaction_history WHERE user_id = $1 ORDER BY created_on DESC
    `;

    const values = [userId];

    if (limit) {
      query += ` LIMIT $2 OFFSET $3`;
      values.push(limit, offset);
    }

    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      throw new Error("Error fetching transaction history: " + error.message);
    }
  }
}

class Service {
  static async getService(service_code) {
    const serviceQuery = `SELECT service_name, service_tariff FROM services WHERE service_code = $1`;
    const serviceResult = await pool.query(serviceQuery, [service_code]);
    return serviceResult.rows[0];
  }
}

module.exports = { Balance, Transaction, Service };
