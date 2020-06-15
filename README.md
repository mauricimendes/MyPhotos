# MyPhotos

# Backend

**Necessário ter o knex instalado de forma global na sua máquina**
http://knexjs.org/


**Necessário ter o expo instalado de forma global na sua máquina**
https://expo.io/learn

Primeiro, faça os seguintes comandos para o funcionamento do backend
--------

> cd backend

> npm install

**O seu aplicativo mobile vai conectar na API Rest que é o backend, para isso, precisamos fazer algumas modificações no código. Primeiro, vá no arquivo que está em bakcend/src/controllers/PhotoController.js e nas linhas 62, 69, 95 e 102, onde estiver a palavra "seu_ip_local", troque para o seu ip local, o IPV4. Faça o mesmo procedimento no arquivo que está em backend/src/controllers/UserController.js nas linhas 51 e 81.**

> knex migrate:latest

> npm start


# Frontend

Primeiro, faça os seguintes comandos para o funcionamento do app mobile
-----------

> cd mobile

> npm install

**Para conectar seu app no backend, vá no arquivo, mobile/src/services/api.js e na linha 4, onde estiver seu_ip_local, troque para o seu ip local, IPV4.**

> expo start 




