CREATE DATABASE IF NOT EXISTS sysfolio;
USE sysfolio;
CREATE TABLE IF NOT EXISTS investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(100),
  symbol VARCHAR(20),
  current_price DECIMAL(10, 2),
  sector VARCHAR(50),
  quantity INT,
  amount_invested DECIMAL(10, 2),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);