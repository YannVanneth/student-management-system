FROM php:8.2-apache

RUN a2enmod rewrite

WORKDIR /var/www/html

COPY . /var/www/html/

RUN apt-get update && apt-get install -y libpq-dev \
 && docker-php-ext-install pdo pdo_pgsql

ENV PORT=10000
EXPOSE 10000

RUN sed -i 's/80/${PORT}/g' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf
