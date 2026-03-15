# Используйте базовый образ с Node.js
FROM node:18-alpine AS builder

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и yarn.lock
COPY package.json yarn.lock ./

# Установите зависимости с очисткой кеша
RUN yarn install --frozen-lockfile --network-timeout 100000 && \
    yarn cache clean

# Скопируйте все файлы проекта
COPY . .

# Базовый URL API при сборке (для продакшена с nginx-прокси задайте /api)
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Соберите проект
RUN yarn build

# Продакшн образ
FROM nginx:alpine AS production

# envsubst для подстановки BACKEND_HOST при старте
RUN apk add --no-cache gettext

# Конфиг nginx — шаблон (BACKEND_HOST подставится в entrypoint)
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Копируем собранные файлы фронтенда
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

# Dev образ
FROM node:18-alpine AS development

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
   