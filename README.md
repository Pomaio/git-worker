# react-startkit

webpack+react+typescript

Было бы полезно замутить утилиту для массового изменения / создания файлов в гит-репозиториях.

- Стартануть проект, взять вебпак / галп и компонениный фреймворк по желанию. Заценить material-ui.
- С т.з. интерфейса это должно быть простой утилитой -- одной страницей. На ней надо иметь возможность добавить набор git-адресов, одно общее средство аутентификации к ним, применяемое действие, сообщение коммита. Это как минимум, мб надо добавить штуки вроде имени и почты, подобное можно сохранять в локал сторэдже.
- Последнее из описанного выше корфигурируется, точно нужна возможность выбрать добавление файла, замену контента файла по регулярке. Можно добавить изменение файла жс кодом (npm/safer-eval).
- Для работы с гитом использовать isomorphic-git. Каждый проект (при наличии / отключении cors) выкачивается, через browserFS его меняет фронт, проект коммитится и пушится
