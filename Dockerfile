# Используйте базовый образ с Node.js
FROM node:18-alpine AS builder

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и yarn.lock
COPY package.json yarn.lock ./

# Установите зависимости
RUN yarn install --frozen-lockfile

# Скопируйте все файлы проекта
COPY . .

# Соберите проект
RUN yarn build

# Продакшн образ
FROM nginx:alpine AS production

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

# Dev образ
FROM node:18-alpine AS development

WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Открываем порт
EXPOSE 5173

# Запускаем в режиме разработки
CMD ["yarn", "dev", "--host", "0.0.0.0"]
   