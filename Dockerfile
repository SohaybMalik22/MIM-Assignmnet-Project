FROM ubuntu
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "apache2ctl", "-D", "FOREGROUND" ]
