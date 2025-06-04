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
