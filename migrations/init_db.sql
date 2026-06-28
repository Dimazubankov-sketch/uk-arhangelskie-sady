-- Инициализационный скрипт базы данных для УК
CREATE DATABASE IF NOT EXISTS arkhangelsk_sady_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE arkhangelsk_sady_db;

-- Таблица обращений жителей
CREATE TABLE IF NOT EXISTS user_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    plot_num VARCHAR(20) DEFAULT NULL,
    service_type VARCHAR(50) DEFAULT 'general',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;