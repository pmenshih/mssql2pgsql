# Миграция MSSQL->PG с преобразованием кодировки
Реализация заточена на перенос таблицы со статьями библиотеки Psycho.ru.

В процессе переноса выяснилось, что некоторые статьи имеют не UTF8, поэтому в код были добавлены функции определения и преобразования кодировок в нужную.
