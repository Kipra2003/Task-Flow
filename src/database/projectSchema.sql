CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(255) NOT NULL REFERENCES Users(email),
    Unique(name, owner)
);