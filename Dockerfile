#Container base
FROM node:argon

# Crea la carpeta donde va a estar la app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# instala las dependencias del proyecto definidas en el package.json
COPY package.json /usr/src/app/
RUN npm install

# copia los archivos
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]