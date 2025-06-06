# Запити зацікавлених осіб

## Вступ

Цей документ призначений для всіх, хто бере участь у створенні або використанні продукту. У ньому міститься стислий опис рішення, перелік ключових вимог, цільова аудиторія та основні терміни, що стосуються проєкту. Документ є важливим орієнтиром для усіх учасників бізнес-процесу, сприяючи вдосконаленню продукту як для користувачів, так і для розробників.

## Мета

Метою цього документа є представлення концепції проєкту та його значення для створення й реалізації системи управління відкритими даними. Така система має забезпечити зручний доступ до публічної інформації, підвищити прозорість і сприяти інноваціям, розвитку відкритого суспільства та поліпшенню якості життя громадян. Досягнення цих цілей передбачає формулювання чітких задач для створення функціональної та корисної системи як для кінцевих користувачів, так і для її розробників.

## Контекст

Проведено аналіз можливих сценаріїв взаємодії між ключовими категоріями користувачів: відвідувачами, зареєстрованими користувачами, адміністраторами та самою системою. Визначено їхні ролі, вплив на систему та один на одного. Також наведено перелік технічних вимог, потреб і очікувань до програмного забезпечення.

## Основні визначення та скорочення

- **Зацікавлена сторона** — особа або організація, що має прямий або опосередкований вплив на рішення, діяльність чи результат роботи системи.
- **Система** — сукупність взаємопов’язаних елементів, що функціонують як єдине ціле за певними правилами.
- **Відвідувач** — особа, яка користується системою без створеного облікового запису.
- **Користувач** — особа, що має обліковий запис у системі.
- **Адміністратор** — особа, відповідальна за зберігання, налаштування, безпеку та підтримку бази даних і програмного забезпечення системи.

### FURPS

**FURPS** — акронім, що позначає п’ять ключових категорій якості програмного забезпечення:

- **Functionality (Функціональність):** обсяг можливостей, сумісність, безпека.
- **Usability (Зручність використання):** інтерфейс, юзабіліті, документація, реакція системи.
- **Reliability (Надійність):** стійкість до збоїв, відновлення після помилок, точність.
- **Performance (Продуктивність):** швидкість роботи, ефективність використання ресурсів, масштабованість.
- **Supportability (Експлуатаційна придатність):** тестування, гнучкість налаштувань, локалізація.

 # Короткий зміст
 ## Запити зацікавлених осіб
 ## Вступ
   ### Мета
   ### Контекст
   ### Основні визначення та скорочення
  ## Короткий зміст
  ## Характеристика ділових процесів
  ### ВІДВІДУВАЧ
  ### КОРИСТУВАЧ
  ### АДМІНСТРАТОР
 ## Короткий огляд продукту
 ## Функціональність
 ## Практичність
 ## Надійність
 ## Продуктивність
 ## Експлуатаційна придатність

## Характеристика ділових процесів — ВІДВІДУВАЧ

### GuestSearch

Діаграма
![GuestSearch](/GuestSearch.jpg)
<br>

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | GuestSearch                                                          |
| **Назва**           | Отримання інформації через пошуковий бар                             |
| **Учасники**        | Відвідувач, Система                                                  |
| **Передумови**      | Відвідувач не авторизований                                          |
| **Результат**       | Знаходження відповідної інформації у системі                         |
| **Виключні ситуації** | Відсутність даних - `DataNotFinded`                                |
| **Основний сценарій** | 1. Вибір «Пошук даних» на головній сторінці. <br>2. Введення запиту. <br>3. Перевірка відповідності у базі. <br>4. Переадресація на сторінку з результатами. |

### GuestDownload

Діаграма
![GuestDownload](/GuestDownload.jpg)


| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | GuestDownload                                                        |
| **Назва**           | Завантаження інформації                                              |
| **Учасники**        | Відвідувач, Система                                                  |
| **Передумови**      | Відвідувач не авторизований                                          |
| **Результат**       | Успішне завантаження даних                                           |
| **Виключні ситуації** | Файл не знайдено - `DataFormatNotFinded`                           |
| **Основний сценарій** | 1. Вибір «Завантажити». <br>2. Пошук відповідного файлу. <br>3. Передача файлу. <br>4. Повідомлення про успіх. |

### GuestRegistration

Діаграма
![GuestRegistration](/GuestRegistration.jpg)


| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | GuestRegistration                                                    |
| **Назва**           | Реєстрація акаунту                                                   |
| **Учасники**        | Гість, Система                                                       |
| **Передумови**      | Гість не має облікового запису                                       |
| **Результат**       | Успішне створення облікового запису                                  |
| **Виключні ситуації** | Пусті для обов'язкового заповнення рядки для реєстрації у системі - `UnfilledRegistrationRows` <br> Введене ім'я гостя не відповідає умовам реєстрації - `IncorrectUserName`,<br>ведена електронна пошта гостя невідповідає умовам реєстрації - `IncorrectUserEmail`, <br> Введений пароль гостя не відповідає умовам реєстрації -  `IncorrectPassword` |
| **Основний сценарій** | 1. Перехід до «Реєстрації». <br>2. Заповнення форми. <br>3. Перевірка унікальності. <br>4. Додавання в БД. <br>5. Повідомлення. <br>6. Перенаправлення в акаунт. |

## Характеристика ділових процесів — КОРИСТУВАЧ

### UserLogin

Діаграма
![UserLogin](/UserLogin.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | UserLogin                                                            |
| **Назва**           | Вхід до облікового запису                                            |
| **Учасники**        | Користувач, Система                                                  |
| **Передумови**      | Користувач має обліковий запис                                       |
| **Результат**       | Успішна авторизація                                                  |
| **Виключні ситуації** | `UnfilledLoginRows`– Не всі обов’язкові поля для входу заповнені<br> `NotFoundUserName` – Користувача з таким іменем не знайдено у базі данних <br>  `NotFoundUserEmail`  – Користувача з такою електронною адресою не знайдено<br>  `IncorrectPassword` - Невірний апроль |
| **Основний сценарій** | 1. Обрати «Увійти». <br>2. Ввести логін/email і пароль. <br>3. Перевірка в БД. <br>4. Якщо збігається — вхід у кабінет. <br>5. У разі помилки — сповіщення з можливістю повтору. |

### UserExit

Діаграма
![UserExit](/UserExit.jpg)

| Поле                | Опис                                                   |
|---------------------|--------------------------------------------------------|
| **ID**              | UserExit                                               |
| **Назва**           | Вихід з акаунту користувача                            |
| **Учасники**        | Користувач, Система                                    |
| **Передумови**      | Користувач авторизований                               |
| **Результат**       | Успішний вихід                                         |
| **Виключні ситуації** | Відсутні                                              |
| **Основний сценарій** | 1. Користувач обирає «Вийти». <br>2. Система перенаправляє на головну сторінку. |

### UserEditSuggestions

Діаграма
![UserEditSuggestions](/UserEditSuggestions.jpg)

| Поле                | Опис                                                   |
|---------------------|--------------------------------------------------------|
| **ID**              | UserEditSuggestions                                   |
| **Назва**           | Пропозиція оновлення даних                            |
| **Учасники**        | Користувач, Адміністратор, Система                     |
| **Передумови**      | Дозволено редагування даних користувачами             |
| **Результат**       | Пропозиція надійшла до системи                         |
| **Виключні ситуації** | `NoChangedDate`- Відсутність змін у даних <br> `EmptyDate` - Надсилання пустих даних |
| **Основний сценарій** | 1. Користувач відкриває форму оновлення. <br>2. Вносить зміни. <br>3. Система перевіряє формат. <br>4. Підтвердження користувачем. <br>5. Надсилання адміну. <br>6. Повідомлення про очікування перевірки. |

### UserUploadSuggestion
Діаграма
![UserUploadSuggestion](/UserUploadSuggestion.jpg)

| Поле                | Опис                                                   |
|---------------------|--------------------------------------------------------|
| **ID**              | UserUploadSuggestion                                  |
| **Назва**           | Завантаження нових даних                              |
| **Учасники**        | Користувач, Адміністратор, Система                     |
| **Передумови**      | Користувач має право додавати нові дані               |
| **Результат**       | Дані успішно завантажені і передані на перевірку       |
| **Виключні ситуації** | `IncorrectFileFormat` - Неправильний формат файлу <br> `MissingData` - Відсутні дані |
| **Основний сценарій** | 1. Перехід до форми завантаження. <br>2. Вибір файлу. <br>3. Перевірка формату. <br>4. Підтвердження. <br>5. Збереження в базі. <br>6. Повідомлення про успішну відправку. |

### VizualizeData

Діаграма
![VizualizateData](/VizualizateData.jpg)

| Поле                | Опис                                                   |
|---------------------|--------------------------------------------------------|
| **ID**              | VisualizeData                                         |
| **Назва**           | Візуалізація даних                                    |
| **Учасники**        | Користувач, Система                                    |
| **Передумови**      | Зареєстрований користувач має доступ до даних         |
| **Результат**       | Відображення даних у вибраній формі                    |
| **Виключні ситуації** | `InsufficientDataForVisualization` - Недостатньо даних для візуалізації <br> `InvalidVisualizationType` - Вибране представлення даних недоступне <br> `DataProcessingError` - Помилка при обробці даних |
| **Основний сценарій** | 1. Обрання стилю візуалізації. <br>2. Система перевіряє дані. <br>3. Відображення у вибраному вигляді. <br>4. Користувач переглядає результат. |

### RateData

Діаграма
![RateData](/RateData.jpg)

| Поле                | Опис                                                   |
|---------------------|--------------------------------------------------------|
| **ID**              | RateData                                              |
| **Назва**           | Оцінювання публікації                                 |
| **Учасники**        | Користувач, Система                                    |
| **Передумови**      | Зареєстрований користувач з доступом до даних         |
| **Результат**       | Система зберігає оцінку та оновлює середній бал        |
| **Виключні ситуації** | Відсутні                                              |
| **Основний сценарій** | 1. Вибір оцінки. <br>2. Введення значення. <br>3. Система обчислює середню оцінку. |


## Характеристика ділових процесів — АДМІНІСТРАТОР

### AdminLogin

Діаграма
![AdminLogin](/AdminLogin.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminLogin                                                           |
| **Назва**           | Вхід адміністратора                                                  |
| **Учасники**        | Адміністратор, Система                                               |
| **Передумови**      | Наявний акаунт адміністратора                                        |
| **Результат**       | Успішна авторизація                                                  |
| **Виключні ситуації** | `UnfilledLoginRows` - Пусті для обов'язкового заповнення рядки для входу у систему  <br> `NotFoundAdminName` - Введене ім'я адміністратор не знайдено у базі даних <br> `NotFoundAdminEmail` - Введена електронна пошта адміністратора не знайдена у базі даних - <br> `IncorrectPassword` - Введений пароль адміністратором невірний |
| **Основний сценарій** | 1. Вибір «Увійти». <br>2. Введення логіну/email і паролю. <br>3. Перевірка в БД. <br>4. Вхід у кабінет або повідомлення про помилку. |

### AdminExit

Діаграма
![AdminExit](/AdminExit.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminExit                                                            |
| **Назва**           | Вихід адміністратора                                                 |
| **Учасники**        | Адміністратор, Система                                               |
| **Передумови**      | Адміністратор авторизований                                          |
| **Результат**       | Вихід із системи                                                     |
| **Виключні ситуації** | Відсутні                                                            |
| **Основний сценарій** | 1. Вибір «Вийти». <br>2. Перенаправлення на головну сторінку.     |

### AdminDelete

Діаграма
![AdminDelete](/AdminDelete.jpg)


| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminDelete                                                          |
| **Назва**           | Видалення даних                                                      |
| **Учасники**        | Адміністратор, Система                                               |
| **Передумови**      | Адміністратор увійшов у систему                                      |
| **Результат**       | Видалення запису                                                     |
| **Виключні ситуації** | `DataNotFound` - Відповідних даних не існує в системі |
| **Основний сценарій** | 1. Вибір опції видалення. <br>2. Підтвердження. <br>3. Видалення з бази. |

### AdminConfirmChange

Діаграма
![AdminConfigChange](/AdminConfigChange.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminConfirmChange                                                   |
| **Назва**           | Підтвердження змін даних                                             |
| **Учасники**        | Адміністратор, Користувач, Система                                   |
| **Передумови**      | Адміністратор авторизований                                          |
| **Результат**       | Дані оновлено                                                        |
| **Виключні ситуації** | `DataNotFinded` - Відповідних даних не існує в системі           |
| **Основний сценарій** | 1. Перегляд запропонованих змін. <br>2. Підтвердження. <br>3. Оновлення бази. |

### AdminConfirmUpload

Діаграма
![AdminConfigUpload](/AdminConfigUpload.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminConfirmUpload                                                   |
| **Назва**           | Підтвердження завантаження                                           |
| **Учасники**        | Адміністратор, Користувач, Система                                   |
| **Передумови**      | Адміністратор увійшов у систему                                      |
| **Результат**       | Нові дані додано до системи                                          |
| **Виключні ситуації** | `DataNotFinded` - Відповідних даних не існує в системі           |
| **Основний сценарій** | 1. Перегляд нових даних. <br>2. Підтвердження. <br>3. Додавання у базу. |

### AdminUpload

Діаграма
![AdminUpload](/AdminUpload.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminUpload                                                          |
| **Назва**           | Завантаження нових даних                                             |
| **Учасники**        | Адміністратор, Система                                               |
| **Передумови**      | Доступ до розділу завантаження даних                                 |
| **Результат**       | Нові дані успішно збережено                                          |
| **Виключні ситуації** | `IncorrectFileFormat` - Неправильний формат файлу<br> `MissingData` - Відсутні дані |
| **Основний сценарій** | 1. Вибір файлу. <br>2. Перевірка формату. <br>3. Підтвердження. <br>4. Збереження у базі. |

### AdminEdit

Діаграма
![AdminEdit](/AdminEdit.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminEdit                                                            |
| **Назва**           | Редагування даних                                                    |
| **Учасники**        | Адміністратор, Система                                               |
| **Передумови**      | Авторизація адміністратора                                           |
| **Результат**       | Дані оновлено                                                        |
| **Виключні ситуації** | `NoChangedDate` - Відсутність змін у даних <br> `EmptyDate` - Надсилання пустих даних   |
| **Основний сценарій** | 1. Внесення змін. <br>2. Перевірка. <br>3. Підтвердження. <br>4. Оновлення бази. |

### AdminBan

Діаграма
![AdminBan](/AdminBan.jpg)

| Поле                | Опис                                                                 |
|---------------------|----------------------------------------------------------------------|
| **ID**              | AdminBan                                                             |
| **Назва**           | Блокування користувача                                               |
| **Учасники**        | Адміністратор, Система, Користувач                                   |
| **Передумови**      | Адміністратор увійшов у систему                                      |
| **Результат**       | Користувача заблоковано                                              |
| **Виключні ситуації** | `UserNotFound` - Користувача не існує   |
| **Основний сценарій** | 1. Вибір користувача. <br>2. Підтвердження блокування. <br>3. Застосування обмеження. |


## Функціональність

### Відвідувач

- Може зареєструвати обліковий запис для доступу до розширених можливостей.
- Має доступ до загальної інформації та публічних даних без авторизації.
- Здійснює пошук даних за ключовими словами, категоріями або датами.
- Має змогу завантажувати доступні дані зі системи.

### Користувач

- Виконує вхід та вихід зі свого облікового запису.
- Завантажує власні набори даних до системи.
- Пропонує зміни до існуючих даних.
- Використовує функції візуалізації для представлення даних у зручному форматі.

### Адміністратор

- Має повноваження блокувати користувачів у разі порушень.
- Завантажує нові дані до системи.
- Оновлює існуючу інформацію.
- Підтверджує зміни, запропоновані користувачами.
- Підтверджує завантаження нових даних користувачами.
- Виконує вхід та вихід з адміністраторського акаунту.

## Практичність

- Швидкий та зручний пошук з фільтрами й інтуїтивним інтерфейсом.
- Інструменти аналізу та візуалізації для виявлення ключових трендів і даних.
- Підтримка інтеграції з іншими системами для обміну даними.
- Навчальні матеріали та технічна підтримка для підвищення ефективності користування.

## Надійність

- Резервні сервери й хмарні технології забезпечують доступність навіть у разі збоїв.
- Система фіксує всі зміни в журналах, що дозволяє відновити інформацію та відслідкувати її зміни.
- Персональні дані передаються й зберігаються з використанням шифрування.
- Платформа працює без зупинок, включаючи автоматичне відновлення після збоїв.
- Регулярне створення резервних копій гарантує збереження інформації.

## Продуктивність

- Оптимізована база даних і запити для швидкої обробки запитів.
- Підтримка масштабованих та нереляційних СУБД для високих навантажень.
- Постійне тестування продуктивності й стабільності системи.
- Ефективна візуалізація даних із мінімальним навантаженням на ресурси.

## Експлуатаційна придатність

- Вичерпна документація допомагає швидко освоїти платформу.
- Автоматичний моніторинг і ведення журналів для своєчасного виявлення проблем.
- Відкритий код на GitHub забезпечує прозорість і колективну розробку.
- Підтримка автоматизованого тестування — включно з модульними, навантажувальними та безпековими тестами.
