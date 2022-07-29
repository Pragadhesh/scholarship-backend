FROM node:16.13.1 AS build-env
WORKDIR /usr/scholarship/
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
COPY nodemon.json ./
RUN npm install
RUN npm install -g npm@8.15.1 && npm run build ; exit 0
EXPOSE 3000
#CMD ["node","dist/index.js"]


FROM gcr.io/distroless/nodejs
COPY --from=build-env /usr/scholarship/ /app
WORKDIR /app
CMD ["dist/index.js"]