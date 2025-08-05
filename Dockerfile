   # Используйте базовый образ с Node.js
   FROM node:22.12.0 AS builder

   # Установите рабочую директорию
   WORKDIR /app

   # Скопируйте package.json и yarn.lock
   COPY package.json yarn.lock ./

   # Установите зависимости
   RUN yarn install

   # Скопируйте все файлы проекта
   COPY . .

   # Соберите проект
   RUN yarn build

   CMD ["yarn", "run", "dev"]
   