FROM ubuntu:22.04

RUN apt-get update -y && \
    apt-get install -y nginx && \
    apt-get install -y sudo && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:ondrej/php && \
    apt-get update -y && \
    apt-get install -y php8.2 php8.2-fpm && \
    apt-get install -y php8.2-common php8.2-mysql php8.2-xml php8.2-xmlrpc php8.2-curl \
    php8.2-gd php8.2-imagick php8.2-cli php8.2-dev php8.2-imap php8.2-mbstring php8.2-opcache \
    php8.2-soap

COPY default /etc/nginx/sites-available/default

RUN mkdir -p /var/www/html/vehiclelisting
WORKDIR /var/www/html/
COPY . /var/www/html/vehiclelisting/

RUN chmod -R 777 /var/www/html/vehiclelisting/storage && \
    chmod -R 777 /var/www/html/vehiclelisting/bootstrap && \
    chmod -R 777 /var/www/html/vehiclelisting/public
WORKDIR /var/www/html/vehiclelisting

RUN apt-get install -y php-mongodb
RUN apt-get update -y
RUN apt-get install vim -y
RUN apt-get install mysql-client -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer --version=2.3.10
RUN apt install -y zip unzip php8.2-zip
RUN composer update
RUN composer require raditzfarhan/laravel-api-response

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8
ENV TZ="Asia/Kolkata"

RUN date
RUN apt-get update -y

## Add Datadog Variables for APM

RUN echo "clear_env = no" >> /etc/php/8.2/fpm/pool.d/www.conf
RUN echo "env[DD_AGENT_HOST] = $DD_AGENT_HOST" >> /etc/php/8.2/fpm/pool.d/www.conf
RUN echo "env[DD_ENV] = production" >> /etc/php/8.2/fpm/pool.d/www.conf 
RUN echo "env[DD_SERVICE] = test" >> /etc/php/8.2/fpm/pool.d/www.conf 
RUN echo "env[DD_VERSION] = php8.2" >> /etc/php/8.2/fpm/pool.d/www.conf

# installation of datadog tracer and activate

RUN curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
RUN php datadog-setup.php --php-bin=all --enable-profiling


# CMD service cron start && /etc/init.d/php8.2-fpm start -F && nginx -g "daemon off;"
CMD /etc/init.d/php8.2-fpm start && \
    sleep 5 && \
    # Start Nginx after a brief delay to allow PHP-FPM and Redis to start up
    nginx -g "daemon off;"

EXPOSE 80
