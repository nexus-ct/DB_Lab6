# RestFull сервіс для управління даними
## RESTfull_servise для управління даними таблиці Datafiles створеної в PostgreSQL було створено за допомогою фреймворку flask на мові Python.

### Підєднання до бази даних

```
<!-- @include: ./software/db_connection.py -->
```

### Модуль відповідальний за отримання даних з бази даних


```
<!-- @include: ./software/db_reader.py -->
```

### Модуль відповідальний за регістрацію та авторизацію користувачів

```
<!-- @include: ./software/db_writer.py -->
```

### Rest API з всіма Endpoint

```
<!-- @include: ./software/RestFullService.py -->
```