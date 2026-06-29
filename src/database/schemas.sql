CREATE TABLE Users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);
INSERT INTO Users (email, password) VALUES ('p@gmail.com', '1234');
