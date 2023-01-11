CREATE DATABASE IF NOT EXISTS blog_server;
CREATE TABLE IF NOT EXISTS users(
    userId VARCHAR(60) PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS blogs(
    blogId VARCHAR(60) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP,
    media VARCHAR(200)
);

UPDATE blogs SET 