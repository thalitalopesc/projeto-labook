-- Active: 1682800124409@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('NORMAL', 'ADMIN')) NOT NULL DEFAULT 'NORMAL',
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
);

SELECT * FROM users;
DROP TABLE users;

INSERT INTO users (id, name, email, password)
VALUES ("01", "Thalita Costa", "thalitacosta@email.com", "1234ABC"),
("02", "Maria", "maria@email.com", "1234DEF"),
("03", "João", "joao@email.com", "1234GHI");

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM posts;
DROP TABLE posts;

INSERT INTO posts (id, creator_id, content)
VALUES ("p1", "01", "Alerta de tendência"),
("p2", "02", "Qual a ordem certa dos produtos de skincare?"),
("p3", "03", "Como escolher os looks para uma viagem longa");

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
);
SELECT * FROM likes_dislikes;
DROP TABLE likes_dislikes;

SELECT * FROM users
INNER JOIN posts ON users.id = posts.creator_id
INNER JOIN likes_dislikes ON users.id = likes_dislikes.user_id