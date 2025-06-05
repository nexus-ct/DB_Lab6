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