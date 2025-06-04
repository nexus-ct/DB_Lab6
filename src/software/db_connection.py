import psycopg2

# Підключення до бази даних PostgreSQL
conn = psycopg2.connect(
    database="mydatabase",
    user="postgres",
    password="1234",
    host="localhost",
    port="5001"
)