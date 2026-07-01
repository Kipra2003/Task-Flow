CREATE TABLE Members (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES Projects(id),
    user_email VARCHAR(255) NOT NULL REFERENCES Users(email),
);