import{_ as n,c as a,o as p,ae as e}from"./chunks/framework.BitmDC1G.js";const _=JSON.parse('{"title":"RestFull сервіс для управління відкритими даними","description":"","frontmatter":{},"headers":[],"relativePath":"software.md","filePath":"software.md"}'),l={name:"software.md"};function i(t,s,r,c,o,u){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="restfull-сервіс-для-управління-відкритими-даними" tabindex="-1">RestFull сервіс для управління відкритими даними <a class="header-anchor" href="#restfull-сервіс-для-управління-відкритими-даними" aria-label="Permalink to &quot;RestFull сервіс для управління відкритими даними&quot;">​</a></h1><h2 id="цеи-restfull-сервіс-призначении-для-управління-відкритими-даними-в-базі-даних-postgresql-сервіс-розроблено-з-використанням-фреимворку-flask-на-мові-python-він-надає-можливість-реєстраціі-авторизаціі-користувачів-зміни-іх-прав-доступу-та-видалення-користувачів" tabindex="-1">Цей RestFull сервіс призначений для управління відкритими даними в базі даних PostgreSQL. Сервіс розроблено з використанням фреймворку Flask на мові Python. Він надає можливість реєстрації, авторизації користувачів, зміни їх прав доступу та видалення користувачів. <a class="header-anchor" href="#цеи-restfull-сервіс-призначении-для-управління-відкритими-даними-в-базі-даних-postgresql-сервіс-розроблено-з-використанням-фреимворку-flask-на-мові-python-він-надає-можливість-реєстраціі-авторизаціі-користувачів-зміни-іх-прав-доступу-та-видалення-користувачів" aria-label="Permalink to &quot;Цей RestFull сервіс призначений для управління відкритими даними в базі даних PostgreSQL. Сервіс розроблено з використанням фреймворку Flask на мові Python. Він надає можливість реєстрації, авторизації користувачів, зміни їх прав доступу та видалення користувачів.&quot;">​</a></h2><h3 id="_1-підключення-до-бази-даних" tabindex="-1">1. Підключення до бази даних <a class="header-anchor" href="#_1-підключення-до-бази-даних" aria-label="Permalink to &quot;1. Підключення до бази даних&quot;">​</a></h3><p>Для підключення до бази даних використовується бібліотека <code>psycopg2</code>. Нижче наведено приклад коду для підключення до бази даних PostgreSQL:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import psycopg2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Підключення до бази даних PostgreSQL</span></span>
<span class="line"><span>conn = psycopg2.connect(</span></span>
<span class="line"><span>    database=&quot;mydatabase&quot;,</span></span>
<span class="line"><span>    user=&quot;postgres&quot;,</span></span>
<span class="line"><span>    password=&quot;1234&quot;,</span></span>
<span class="line"><span>    host=&quot;localhost&quot;,</span></span>
<span class="line"><span>    port=&quot;5001&quot;</span></span>
<span class="line"><span>)</span></span></code></pre></div><h3 id="_2-модуль-для-отримання-даних-з-бази-даних" tabindex="-1">2. Модуль для отримання Даних з бази даних <a class="header-anchor" href="#_2-модуль-для-отримання-даних-з-бази-даних" aria-label="Permalink to &quot;2. Модуль для отримання Даних з бази даних&quot;">​</a></h3><p>Цей модуль відповідає за отримання даних з таблиці Users. Функція retrieve_users виконує SQL-запит для вибірки всіх даних з таблиці та повертає їх у вигляді словника.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def retrieve_users(cursor):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Отримання даних всіх користувачів з таблиці &quot;Users&quot;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Args:</span></span>
<span class="line"><span>        cursor: Курсор бази даних.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Returns:</span></span>
<span class="line"><span>        dict: Словник з даними користувачів.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    cursor.execute(&#39;&#39;&#39;SELECT * FROM &quot;Users&quot;&#39;&#39;&#39;)</span></span>
<span class="line"><span>    users_data = cursor.fetchall()</span></span>
<span class="line"><span>    cursor.close()</span></span>
<span class="line"><span>    return {&#39;data&#39;: users_data}</span></span></code></pre></div><h3 id="_3-модуль-для-реєстраціі-та-авторизаціі-користувачів" tabindex="-1">3. Модуль для реєстрації та авторизації користувачів <a class="header-anchor" href="#_3-модуль-для-реєстраціі-та-авторизаціі-користувачів" aria-label="Permalink to &quot;3. Модуль для реєстрації та авторизації користувачів&quot;">​</a></h3><p>Цей модуль містить функції для реєстрації нових користувачів, авторизації існуючих користувачів, зміни їх прав доступу та видалення користувачів.</p><ol><li>Функція register_user відповідає за реєстрацію нового користувача. Вона перевіряє, чи не існує вже користувач з вказаною електронною поштою, і, якщо ні, додає нового користувача до таблиці Users.</li><li>Функція authenticate_user відповідає за авторизацію користувача. Вона перевіряє, чи збігаються введені електронна пошта та пароль з даними в базі даних.</li><li>Функція update_user_role відповідає за зміну прав доступу користувача. Вона перевіряє, чи має адміністратор достатні права для зміни прав доступу іншого користувача.</li><li>Функція delete_user відповідає за видалення користувача з бази даних за електронною поштою.</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from psycopg2 import errors</span></span>
<span class="line"><span>import db_connection</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def register_user(cursor, login, first_name, last_name, password, email, role_id):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Реєстрація нового користувача в базі даних.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Args:</span></span>
<span class="line"><span>        cursor: Курсор бази даних.</span></span>
<span class="line"><span>        login (str): Логін користувача.</span></span>
<span class="line"><span>        first_name (str): Ім&#39;я користувача.</span></span>
<span class="line"><span>        last_name (str): Прізвище користувача.</span></span>
<span class="line"><span>        password (str): Пароль користувача.</span></span>
<span class="line"><span>        email (str): Електронна пошта користувача.</span></span>
<span class="line"><span>        role_id (int): Ідентифікатор ролі користувача.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Returns:</span></span>
<span class="line"><span>        str: Повідомлення про успішну реєстрацію або помилку.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        cursor.execute(&#39;SELECT email FROM &quot;Users&quot;&#39;)</span></span>
<span class="line"><span>        get_data = cursor.fetchall()</span></span>
<span class="line"><span>        for user in get_data:</span></span>
<span class="line"><span>            if email == user[0]:</span></span>
<span class="line"><span>                return {&#39;data&#39;: &quot;You already have an account&quot;}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cursor.execute(&#39;SELECT MAX(id) FROM &quot;Users&quot;&#39;)</span></span>
<span class="line"><span>        next_id = cursor.fetchone()[0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if next_id is None:</span></span>
<span class="line"><span>            next_id = 1</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            next_id += 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        insert_query = &#39;&#39;&#39;INSERT INTO &quot;Users&quot;(</span></span>
<span class="line"><span>            id, login, first_name, last_name, password, email, role_id)</span></span>
<span class="line"><span>            VALUES (%s, %s, %s, %s, %s, %s, %s)&#39;&#39;&#39;</span></span>
<span class="line"><span>        data = (next_id, login, first_name, last_name, password, email, role_id)</span></span>
<span class="line"><span>        cursor.execute(insert_query, data)</span></span>
<span class="line"><span>        cursor.connection.commit()</span></span>
<span class="line"><span>        return &quot;User registration successful!&quot;</span></span>
<span class="line"><span>    except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,</span></span>
<span class="line"><span>            errors.StringDataRightTruncation) as e:</span></span>
<span class="line"><span>        raise e</span></span>
<span class="line"><span>    finally:</span></span>
<span class="line"><span>        cursor.close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def authenticate_user(cursor, password, email):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>        Авторизація користувача.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Args:</span></span>
<span class="line"><span>            cursor: Курсор бази даних.</span></span>
<span class="line"><span>            password (str): Пароль користувача.</span></span>
<span class="line"><span>            email (str): Електронна пошта користувача.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Returns:</span></span>
<span class="line"><span>            str: Повідомлення про успішну авторизацію або помилку.</span></span>
<span class="line"><span>        &quot;&quot;&quot;</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        cursor.execute(&#39;SELECT password, email FROM &quot;Users&quot; WHERE email = %s&#39;, (email,))</span></span>
<span class="line"><span>        user_data = cursor.fetchone()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if user_data is None:</span></span>
<span class="line"><span>            return &quot;User not found!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if user_data[0] == password:</span></span>
<span class="line"><span>            return &quot;User login successful!&quot;</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return &quot;Password is wrong!&quot;</span></span>
<span class="line"><span>    except Exception as e:</span></span>
<span class="line"><span>        raise e</span></span>
<span class="line"><span>    finally:</span></span>
<span class="line"><span>        cursor.close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def update_user_role(cursor, email, email_admin, password_admin, role_id):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Зміна ролі користувача.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Args:</span></span>
<span class="line"><span>        cursor: Курсор бази даних.</span></span>
<span class="line"><span>        email (str): Електронна пошта користувача.</span></span>
<span class="line"><span>        email_admin (str): Електронна пошта адміністратора.</span></span>
<span class="line"><span>        password_admin (str): Пароль адміністратора.</span></span>
<span class="line"><span>        role_id (int): Новий ідентифікатор ролі користувача.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Returns:</span></span>
<span class="line"><span>        str: Повідомлення про успішну зміну ролі або помилку.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        with db_connection.conn.cursor() as admin_cursor:</span></span>
<span class="line"><span>            auth_result = authenticate_user(admin_cursor, password_admin, email_admin)</span></span>
<span class="line"><span>        if auth_result != &quot;User login successful!&quot;:</span></span>
<span class="line"><span>            return auth_result</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cursor.execute(&#39;SELECT role_id FROM &quot;Users&quot; WHERE email = %s&#39;, (email_admin,))</span></span>
<span class="line"><span>        admin_data = cursor.fetchone()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if admin_data is None:</span></span>
<span class="line"><span>            return &quot;Admin not found!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if admin_data[0] != 2:</span></span>
<span class="line"><span>            return &quot;You have no permission for that&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cursor.execute(&#39;SELECT role_id FROM &quot;Users&quot; WHERE email = %s&#39;, (email,))</span></span>
<span class="line"><span>        user_data = cursor.fetchone()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if user_data is None:</span></span>
<span class="line"><span>            return &quot;User not found!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if user_data[0] == role_id:</span></span>
<span class="line"><span>            return &quot;User already has this role!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cursor.execute(&#39;UPDATE &quot;Users&quot; SET role_id = %s WHERE email = %s&#39;, (role_id, email))</span></span>
<span class="line"><span>        cursor.connection.commit()</span></span>
<span class="line"><span>        return f&quot;You successfully updated role to {role_id}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    except Exception as e:</span></span>
<span class="line"><span>        raise e</span></span>
<span class="line"><span>    finally:</span></span>
<span class="line"><span>        cursor.close()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def delete_user(cursor, email):</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Видалення користувача з бази даних за електронною поштою.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Args:</span></span>
<span class="line"><span>        cursor: Курсор бази даних.</span></span>
<span class="line"><span>        email (str): Електронна пошта користувача, якого потрібно видалити.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Returns:</span></span>
<span class="line"><span>        str: Повідомлення про успішне видалення або помилку.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        cursor.execute(&#39;SELECT email FROM &quot;Users&quot; WHERE email = %s&#39;, (email,))</span></span>
<span class="line"><span>        user_data = cursor.fetchone()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if user_data is None:</span></span>
<span class="line"><span>            return &quot;User not found!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cursor.execute(&#39;DELETE FROM &quot;Users&quot; WHERE email = %s&#39;, (email,))</span></span>
<span class="line"><span>        cursor.connection.commit()</span></span>
<span class="line"><span>        return &quot;User deleted successfully&quot;</span></span>
<span class="line"><span>    except Exception as e:</span></span>
<span class="line"><span>        raise e</span></span>
<span class="line"><span>    finally:</span></span>
<span class="line"><span>        cursor.close()</span></span></code></pre></div><h3 id="_4-rest-api-з-усіма-endpoint" tabindex="-1">4. REST API з усіма Endpoint <a class="header-anchor" href="#_4-rest-api-з-усіма-endpoint" aria-label="Permalink to &quot;4. REST API з усіма Endpoint&quot;">​</a></h3><p>Цей модуль містить всі необхідні endpoint для взаємодії з сервісом. Він використовує Flask для створення RestFull API.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from flask import Flask, jsonify, request</span></span>
<span class="line"><span>from psycopg2 import errors</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import db_connection</span></span>
<span class="line"><span>import db_reader</span></span>
<span class="line"><span>import db_writer</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Ініціалізація Flask-додатку</span></span>
<span class="line"><span>app = Flask(__name__)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@app.route(&#39;/fetch_users&#39;, methods=[&#39;GET&#39;])</span></span>
<span class="line"><span>def fetch_users():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Отримання даних всіх користувачів з бази даних.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    with db_connection.conn.cursor() as cursor:</span></span>
<span class="line"><span>        # Виклик функції для отримання даних користувачів</span></span>
<span class="line"><span>        data = db_reader.retrieve_users(cursor)</span></span>
<span class="line"><span>    return jsonify(data)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@app.route(&#39;/registration&#39;, methods=[&#39;POST&#39;])</span></span>
<span class="line"><span>def register_new_user():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Реєстрація нового користувача.</span></span>
<span class="line"><span>    Отримує дані користувача з запиту та додає їх до бази даних.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    request_data = request.get_json()</span></span>
<span class="line"><span>    login = request_data.get(&#39;login&#39;)</span></span>
<span class="line"><span>    first_name = request_data.get(&#39;first_name&#39;)</span></span>
<span class="line"><span>    last_name = request_data.get(&#39;last_name&#39;)</span></span>
<span class="line"><span>    password = request_data.get(&#39;password&#39;)</span></span>
<span class="line"><span>    email = request_data.get(&#39;email&#39;)</span></span>
<span class="line"><span>    role_id = request_data.get(&#39;role_id&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Перевірка наявності всіх необхідних параметрів</span></span>
<span class="line"><span>    if login and first_name and last_name and password and email and role_id:</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            with db_connection.conn.cursor() as cursor:</span></span>
<span class="line"><span>                # Виклик функції для реєстрації нового користувача</span></span>
<span class="line"><span>                data = db_writer.register_user(cursor, login, first_name, last_name, password, email, role_id)</span></span>
<span class="line"><span>            return jsonify(data)</span></span>
<span class="line"><span>        except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,</span></span>
<span class="line"><span>                errors.StringDataRightTruncation) as e:</span></span>
<span class="line"><span>            # Обробка помилок при реєстрації</span></span>
<span class="line"><span>            return jsonify({&#39;error&#39;: str(e)}), 400</span></span>
<span class="line"><span>        finally:</span></span>
<span class="line"><span>            db_connection.conn.rollback()</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return jsonify({&#39;error&#39;: &#39;Missing parameters&#39;}), 400</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@app.route(&#39;/login&#39;, methods=[&#39;POST&#39;])</span></span>
<span class="line"><span>def login_user():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Авторизація користувача.</span></span>
<span class="line"><span>    Перевіряє введені користувачем дані для авторизації.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    request_data = request.get_json()</span></span>
<span class="line"><span>    password = request_data.get(&#39;password&#39;)</span></span>
<span class="line"><span>    email = request_data.get(&#39;email&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Перевірка наявності всіх необхідних параметрів</span></span>
<span class="line"><span>    if password and email:</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            with db_connection.conn.cursor() as cursor:</span></span>
<span class="line"><span>                # Виклик функції для авторизації користувача</span></span>
<span class="line"><span>                data = db_writer.authenticate_user(cursor, password, email)</span></span>
<span class="line"><span>            return jsonify(data)</span></span>
<span class="line"><span>        except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,</span></span>
<span class="line"><span>                errors.StringDataRightTruncation) as e:</span></span>
<span class="line"><span>            # Обробка помилок при авторизації</span></span>
<span class="line"><span>            return jsonify({&#39;error&#39;: str(e)}), 400</span></span>
<span class="line"><span>        except TypeError:</span></span>
<span class="line"><span>            return jsonify({&quot;error&quot;: &quot;This user doesn&#39;t exist!&quot;})</span></span>
<span class="line"><span>        finally:</span></span>
<span class="line"><span>            db_connection.conn.rollback()</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return jsonify({&#39;error&#39;: &#39;Missing parameters&#39;}), 400</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@app.route(&#39;/change_permissions&#39;, methods=[&#39;POST&#39;])</span></span>
<span class="line"><span>def change_permissions():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Зміна прав доступу користувача.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    request_data = request.get_json()</span></span>
<span class="line"><span>    role_id = request_data.get(&#39;role_id&#39;)</span></span>
<span class="line"><span>    email = request_data.get(&#39;email&#39;)</span></span>
<span class="line"><span>    email_admin = request_data.get(&#39;email_admin&#39;)</span></span>
<span class="line"><span>    password_admin = request_data.get(&#39;password_admin&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Перевірка наявності всіх необхідних параметрів</span></span>
<span class="line"><span>    if role_id and email and email_admin and password_admin:</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            with db_connection.conn.cursor() as cursor:</span></span>
<span class="line"><span>                # Виклик функції для зміни прав доступу користувача</span></span>
<span class="line"><span>                data = db_writer.update_user_role(cursor, email, email_admin, password_admin, role_id)</span></span>
<span class="line"><span>            return jsonify(data)</span></span>
<span class="line"><span>        except (errors.InvalidTextRepresentation, ValueError, errors.InFailedSqlTransaction,</span></span>
<span class="line"><span>                errors.StringDataRightTruncation) as e:</span></span>
<span class="line"><span>            # Обробка помилок при зміні прав доступу</span></span>
<span class="line"><span>            return jsonify({&#39;error&#39;: str(e)}), 400</span></span>
<span class="line"><span>        except TypeError:</span></span>
<span class="line"><span>            return jsonify({&#39;error&#39;: &quot;This user doesn&#39;t exist! Change your email, or users&quot;})</span></span>
<span class="line"><span>        finally:</span></span>
<span class="line"><span>            db_connection.conn.rollback()</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return jsonify({&#39;error&#39;: &#39;Missing parameters&#39;}), 400</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@app.route(&#39;/delete&#39;, methods=[&#39;POST&#39;])</span></span>
<span class="line"><span>def delete_user():</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    Видалення користувача з бази даних за електронною поштою.</span></span>
<span class="line"><span>    &quot;&quot;&quot;</span></span>
<span class="line"><span>    request_data = request.get_json()</span></span>
<span class="line"><span>    email = request_data.get(&#39;email&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if email:</span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            with db_connection.conn.cursor() as cursor:</span></span>
<span class="line"><span>                # Виклик функції для видалення користувача</span></span>
<span class="line"><span>                data = db_writer.delete_user(cursor, email)</span></span>
<span class="line"><span>            return jsonify({&#39;message&#39;: data})</span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            return jsonify({&#39;error&#39;: str(e)}), 400</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return jsonify({&#39;error&#39;: &#39;Missing email parameter&#39;}), 400</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span>    # Запуск додатку на порту 5002</span></span>
<span class="line"><span>    app.run(port=5002)</span></span></code></pre></div>`,15)]))}const q=n(l,[["render",i]]);export{_ as __pageData,q as default};
