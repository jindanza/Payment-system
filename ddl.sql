CREATE DATABASE payment_system;

\c payment_system;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_image VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banners (
  id SERIAL PRIMARY KEY,
  banner_name VARCHAR(255) NOT NULL,
  banner_image VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  service_code VARCHAR(255) UNIQUE NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_icon VARCHAR(255) NOT NULL,
  service_tariff INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE balances (
  user_id INT PRIMARY KEY,
  balance INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  service_code VARCHAR(255) REFERENCES services(service_code),
  invoice_number VARCHAR(255) UNIQUE NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  total_amount INT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transaction_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  invoice_number VARCHAR(255) UNIQUE NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  description TEXT,
  total_amount INT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);