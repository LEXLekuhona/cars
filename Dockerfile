# Используйте базовый образ с Node.js
FROM node:20-alpine AS builder

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и yarn.lock
COPY package.json yarn.lock ./

# Установите зависимости с очисткой кеша
RUN yarn install --frozen-lockfile --network-timeout 100000 && \
    yarn cache clean

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
FROM node:20-alpine AS development

WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости с очисткой кеша
RUN yarn install --frozen-lockfile --network-timeout 100000 && \
    yarn cache clean

# Копируем исходный код
COPY . .

# Открываем порт
EXPOSE 5173

# Запускаем в режиме разработки
CMD ["yarn", "dev", "--host", "0.0.0.0"]
   