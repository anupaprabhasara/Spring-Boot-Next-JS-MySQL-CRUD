CREATE DATABASE crud_app;

USE crud_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (name, email) VALUES 
('Alice Johnson', 'alice.johnson@example.com'),
('Bob Smith', 'bob.smith@example.com'),
('Charlie Davis', 'charlie.davis@example.com'),
('Diana Prince', 'diana.prince@example.com'),
('Ethan Clark', 'ethan.clark@example.com');