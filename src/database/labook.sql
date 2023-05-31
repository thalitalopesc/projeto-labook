-- Active: 1682800124409@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    role TEXT,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

SELECT * FROM users;
DROP TABLE users;

INSERT INTO users (id, name, email, password, role)
VALUES ("01", "Thalita Costa", "thalitacosta@email.com", "1234ABC", "Admin"),
("02", "Maria", "maria@email.com", "1234DEF", "Normal"),
("03", "João", "joao@email.com", "1234GHI", "Normal");

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    updated_at TEXT,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

SELECT * FROM posts;
DROP TABLE posts;

INSERT INTO posts (id, creator_id, content, likes, dislikes, updated_at)
VALUES ("p1", "01", "Alerta de tendência", 0, 0, null),
("p2", "02", "Qual a ordem certa dos produtos de skincare?", 0, 0, null),
("p3", "03", "Como escolher os looks para uma viagem longa", 0, 0, null);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
SELECT * FROM likes_dislikes;
DROP TABLE likes_dislikes;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES ("01", "p2", 0),
("02", "p1", 0),
("02", "p3", 0);