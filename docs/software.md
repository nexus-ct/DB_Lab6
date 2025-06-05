# RestFull сервіс для управління відкритими даними
## Цей RestFull сервіс призначений для управління відкритими даними в базі даних PostgreSQL. Сервіс розроблено з використанням фреймворку Flask на мові Python. Він надає можливість реєстрації, авторизації користувачів, зміни їх прав доступу та видалення користувачів.

### 1. Підключення до бази даних
Для підключення до бази даних використовується бібліотека `psycopg2`. Нижче наведено приклад коду для підключення до бази даних PostgreSQL:

```
import psycopg2

# Підключення до бази даних PostgreSQL
conn = psycopg2.connect(
    database="mydatabase",
    user="postgres",
    password="1234",
    host="localhost",
    port="5001"
)
```

### 2. Модуль для отримання Даних з бази даних
Цей модуль відповідає за отримання даних з таблиці Users. Функція retrieve_users виконує SQL-запит для вибірки всіх даних з таблиці та повертає їх у вигляді словника.

```
def retrieve_users(cursor):
    """
    Отримання даних всіх користувачів з таблиці "Users".

    Args:
        cursor: Курсор бази даних.

    Returns:
        dict: Словник з даними користувачів.
    """
    cursor.execute('''SELECT * FROM "Users"''')
    users_data = cursor.fetchall()
    cursor.close()
    return {'data': users_data}

```

### 3. Модуль для реєстрації та авторизації користувачів
Цей модуль містить функції для реєстрації нових користувачів, авторизації існуючих користувачів, зміни їх прав доступу та видалення користувачів.

1. Функція register_user відповідає за реєстрацію нового користувача. Вона перевіряє, чи не існує вже користувач з вказаною електронною поштою, і, якщо ні, додає нового користувача до таблиці Users.
2. Функція authenticate_user відповідає за авторизацію користувача. Вона перевіряє, чи збігаються введені електронна пошта та пароль з даними в базі даних.
3. Функція update_user_role відповідає за зміну прав доступу користувача. Вона перевіряє, чи має адміністратор достатні права для зміни прав доступу іншого користувача.
4. Функція delete_user відповідає за видалення користувача з бази даних за електронною поштою.

```
from psycopg2 import errors
import db_connection

def register_user(cursor, login, first_name, last_name, password, email, role_id):
    """
    Реєстрація нового користувача в базі даних.

    Args:
        cursor: Курсор бази даних.
        login (str): Логін користувача.
        first_name (str): Ім'я користувача.
        last_name (str): Прізвище користувача.
        password (str): Пароль користувача.
        email (str): Електронна пошта користувача.
        role_id (int): Ідентифікатор ролі користувача.

    Returns:
        str: Повідомлення про успішну реєстрацію або помилку.
    """
    try:
        cursor.execute('SELECT email FROM "Users"')
        get_data = cursor.fetchall()
        for user in get_data:
            if email == user[0]:
                return {'data': "You already have an account"}

        cursor.execute('SELECT MAX(id) FROM "Users"')
        next_id = cursor.fetchone()[0]

        if next_id is None:
            next_id = 1
        else:
            next_id += 1

        insert_query = '''INSERT INTO "Users"(
            id, login, first_name, last_name, password, email, role_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)'''
        data = (next_id, login, first_name, last_name, password, email, role_id)
        cursor.execute(insert_query, data)
        cursor.connection.commit()
        return "User registration successful!"
    except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,
            errors.StringDataRightTruncation) as e:
        raise e
    finally:
        cursor.close()

def authenticate_user(cursor, password, email):
    """
        Авторизація користувача.

        Args:
            cursor: Курсор бази даних.
            password (str): Пароль користувача.
            email (str): Електронна пошта користувача.

        Returns:
            str: Повідомлення про успішну авторизацію або помилку.
        """
    try:
        cursor.execute('SELECT password, email FROM "Users" WHERE email = %s', (email,))
        user_data = cursor.fetchone()

        if user_data is None:
            return "User not found!"

        if user_data[0] == password:
            return "User login successful!"
        else:
            return "Password is wrong!"
    except Exception as e:
        raise e
    finally:
        cursor.close()

def update_user_role(cursor, email, email_admin, password_admin, role_id):
    """
    Зміна ролі користувача.

    Args:
        cursor: Курсор бази даних.
        email (str): Електронна пошта користувача.
        email_admin (str): Електронна пошта адміністратора.
        password_admin (str): Пароль адміністратора.
        role_id (int): Новий ідентифікатор ролі користувача.

    Returns:
        str: Повідомлення про успішну зміну ролі або помилку.
    """
    try:
        with db_connection.conn.cursor() as admin_cursor:
            auth_result = authenticate_user(admin_cursor, password_admin, email_admin)
        if auth_result != "User login successful!":
            return auth_result

        cursor.execute('SELECT role_id FROM "Users" WHERE email = %s', (email_admin,))
        admin_data = cursor.fetchone()

        if admin_data is None:
            return "Admin not found!"

        if admin_data[0] != 2:
            return "You have no permission for that"

        cursor.execute('SELECT role_id FROM "Users" WHERE email = %s', (email,))
        user_data = cursor.fetchone()

        if user_data is None:
            return "User not found!"

        if user_data[0] == role_id:
            return "User already has this role!"

        cursor.execute('UPDATE "Users" SET role_id = %s WHERE email = %s', (role_id, email))
        cursor.connection.commit()
        return f"You successfully updated role to {role_id}"

    except Exception as e:
        raise e
    finally:
        cursor.close()

def delete_user(cursor, email):
    """
    Видалення користувача з бази даних за електронною поштою.

    Args:
        cursor: Курсор бази даних.
        email (str): Електронна пошта користувача, якого потрібно видалити.

    Returns:
        str: Повідомлення про успішне видалення або помилку.
    """
    try:
        cursor.execute('SELECT email FROM "Users" WHERE email = %s', (email,))
        user_data = cursor.fetchone()

        if user_data is None:
            return "User not found!"

        cursor.execute('DELETE FROM "Users" WHERE email = %s', (email,))
        cursor.connection.commit()
        return "User deleted successfully"
    except Exception as e:
        raise e
    finally:
        cursor.close()
```

### 4. REST API з усіма Endpoint
Цей модуль містить всі необхідні endpoint для взаємодії з сервісом. Він використовує Flask для створення RestFull API.

```
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
```