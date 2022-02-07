# S-LINES.

## Игра Просто шарики

### Описание
Прототипом игры «S-LINES» (Simple-Lines) является игра «LINES»

Основой «S-LINES» является игровое поле (стол), состоящее из ячеек, предназначенных для размещения шариков.
Форм-фактор поля - квадрат. Размер стола 9 на 9 ячеек.

На игровом поле в случайных позициях (ячейках) в начале игры размешаются несколько шариков одинакового цвета.
Игрок может выбрать шарик и переместить его на другую позицию.
Новые шарики появляются на поле после каждого хода, не вызвавшего исчезновение ни одной линии. Число выпадающих новых шаров зависит от уровня сложности игры.

### Цель игры
Не допустить заполнения игрового поля шарами, уничтожая их при помощи группировки в горизонтальные и вертикальные линии.

### Правила
- Шарики выставляются игроком
- Игрок может создавать цепочки шариков в горизонтальном или вертикальном направлениях.
- Если при этом получаются цепочки шариков из 4-х и более штук - цепочка удаляется.
- За один ход можно переставить только один шар из одной ячейки в другую.
- Если ход игрока не приводит к удалению цепочек шариков, на поле в случайном порядке выбрасываются новые шарики.
- Новые шарики появившиеся на поле и образующие цепочки со старыми шариками не удаляются.  

## Цель проекта
Целю проекта является использование на практике теоретических знаний о разработке React-Redux приложения  

## Скрипты запуска
Доступные скрипты проекта

### `npm run start`

Запуск приложения
Open [http://localhost:8081](http://localhost:8081) в браузере.

Горячая перезагрузка страницы.\
Вывод ошибок в консоль.

### `npm run test`

Запуск тестов.

### `npm run lint`

Запуск линтера

### `npm run lint:fix`

Авто исправление линтером ошибок

### `npm run storybook`

Запуск storybook

### `npm run build-storybook`

Сборка storybook

### `npm run build`

Сборка приложения в каталог 'public'.

### `npm run chromatic`

Запуск chromatic.

