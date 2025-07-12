FROM postgres:14

# 必要なパッケージのインストールとロケールの生成
RUN apt-get update \
  && apt-get install -y locales \
  && sed -i '/ja_JP.UTF-8/s/^# //g' /etc/locale.gen \
  && locale-gen
  
# Time ZoneAc
ENV TZ Asia/Tokyo

# Language
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8

ENV POSTGRES_USER user
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB technical_articles