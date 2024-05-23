CREATE DATABASE bookstore;

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    price INTEGER
);

INSERT INTO
    books (title, author, price)
VALUES
    (
        'Sapiens: A Brief History of Humankind',
        'Yuval Noah Harari',
        150000
    ),
    (
        'The 7 Habits of Highly Effective People',
        'Stephen Covey',
        100000
    ),
    ('The 48 Laws of Power', 'Robert Greene', 125000),
    ('The Alchemist', 'Paulo Coelho', 75000),
    ('Outliers', 'Malcolm Gladwell', 50000),
    ('The Power of Habit', 'Charles Duhigg', 80000),
    (
        'The Subtle Art of Not Giving a F*ck',
        'Mark Manson',
        175000
    );

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    book_id INTEGER,
    quantity INTEGER,
    transaction_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

SELECT
    SUM(price) AS total_price
FROM
    books;