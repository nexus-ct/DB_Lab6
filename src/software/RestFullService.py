from flask import Flask, jsonify, request
from psycopg2 import errors

import db_connection
import db_reader
import db_writer

# Ініціалізація Flask-додатку
app = Flask(__name__)

@app.route('/fetch_users', methods=['GET'])
def fetch_users():
    """
    Отримання даних всіх користувачів з бази даних.
    """
    with db_connection.conn.cursor() as cursor:
        # Виклик функції для отримання даних користувачів
        data = db_reader.retrieve_users(cursor)
    return jsonify(data)

@app.route('/registration', methods=['POST'])
def register_new_user():
    """
    Реєстрація нового користувача.
    Отримує дані користувача з запиту та додає їх до бази даних.
    """
    request_data = request.get_json()
    login = request_data.get('login')
    first_name = request_data.get('first_name')
    last_name = request_data.get('last_name')
    password = request_data.get('password')
    email = request_data.get('email')
    role_id = request_data.get('role_id')

    # Перевірка наявності всіх необхідних параметрів
    if login and first_name and last_name and password and email and role_id:
        try:
            with db_connection.conn.cursor() as cursor:
                # Виклик функції для реєстрації нового користувача
                data = db_writer.register_user(cursor, login, first_name, last_name, password, email, role_id)
            return jsonify(data)
        except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,
                errors.StringDataRightTruncation) as e:
            # Обробка помилок при реєстрації
            return jsonify({'error': str(e)}), 400
        finally:
            db_connection.conn.rollback()
    else:
        return jsonify({'error': 'Missing parameters'}), 400

@app.route('/login', methods=['POST'])
def login_user():
    """
    Авторизація користувача.
    Перевіряє введені користувачем дані для авторизації.
    """
    request_data = request.get_json()
    password = request_data.get('password')
    email = request_data.get('email')

    # Перевірка наявності всіх необхідних параметрів
    if password and email:
        try:
            with db_connection.conn.cursor() as cursor:
                # Виклик функції для авторизації користувача
                data = db_writer.authenticate_user(cursor, password, email)
            return jsonify(data)
        except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,
                errors.StringDataRightTruncation) as e:
            # Обробка помилок при авторизації
            return jsonify({'error': str(e)}), 400
        except TypeError:
            return jsonify({"error": "This user doesn't exist!"})
        finally:
            db_connection.conn.rollback()
    else:
        return jsonify({'error': 'Missing parameters'}), 400

@app.route('/change_permissions', methods=['POST'])
def change_permissions():
    """
    Зміна прав доступу користувача.
    """
    request_data = request.get_json()
    role_id = request_data.get('role_id')
    email = request_data.get('email')
    email_admin = request_data.get('email_admin')
    password_admin = request_data.get('password_admin')

    # Перевірка наявності всіх необхідних параметрів
    if role_id and email and email_admin and password_admin:
        try:
            with db_connection.conn.cursor() as cursor:
                # Виклик функції для зміни прав доступу користувача
                data = db_writer.update_user_role(cursor, email, email_admin, password_admin, role_id)
            return jsonify(data)
        except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,
                errors.StringDataRightTruncation) as e:
            # Обробка помилок при зміні прав доступу
            return jsonify({'error': str(e)}), 400
        except TypeError:
            return jsonify({'error': "This user doesn't exist! Change your email, or users"})
        finally:
            db_connection.conn.rollback()
    else:
        return jsonify({'error': 'Missing parameters'}), 400

@app.route('/delete', methods=['POST'])
def delete_user():
    """
    Видалення користувача з бази даних за електронною поштою.
    """
    request_data = request.get_json()
    email = request_data.get('email')

    if email:
        try:
            with db_connection.conn.cursor() as cursor:
                # Виклик функції для видалення користувача
                data = db_writer.delete_user(cursor, email)
            return jsonify({'message': data})
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'error': 'Missing email parameter'}), 400

if __name__ == '__main__':
    # Запуск додатку на порту 5002
    app.run(port=5002)