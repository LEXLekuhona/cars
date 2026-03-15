#!/bin/sh
set -e
# Подстановка BACKEND_HOST в конфиг nginx (по умолчанию — хост бэкенда при отдельном деплое)
# Хост:порт бэкенда (задайте BACKEND_HOST при запуске или оставьте по умолчанию)
export BACKEND_HOST="${BACKEND_HOST:-185.239.50.252:8080}"
envsubst '${BACKEND_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
