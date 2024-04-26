## Правила разработки
Техническая документация, или правила разработки

1. **Работа с ветками:**
    - Запрещено писать код в ветках STABLE и PRESTABLE. Нужно отводить новую ветку от PRESTABLE и начинать в ней разработку:

    ```
    git checkout PRESTABLE
    git pull
    git checkout -b new_feature
    ```

    - После того, как работа окончена - заходите на github и делайте Pull Request

2. **Работа с большими данными (файлами):**
    Нехорошо закидывать огромные файлы csv на git. Git - это больше про код, а не про данные. И там есть ограничение (вроде 300 мб). А если мы туда будем кидать csv по 50+ мб, то скоро это память закончится. Надо искать какое-то решение, как с такими файлами обходиться. Предлагается:

    - Эти файлики добавить в .gitignore, чтобы при пуше они не закидывались на гит
    - В папке создавать файл data_name.url, а в нем указывать ссылку на любое хранилище, откуда надо этот файл data_name.csv можно скачать и закинуть вместо этого data_name.url. Файл data_name.url с ссылкой внутри уже можно (нужно) лить на гит
