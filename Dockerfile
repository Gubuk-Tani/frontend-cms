# Dockerfile
FROM node:18.16-alpine

# create destination directory
RUN mkdir -p /usr/src/gubuk-tani-frontend
WORKDIR /usr/src/gubuk-tani-frontend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/gubuk-tani-frontend/
RUN npm install
RUN npm run build
# RUN npm run generate

ENV API_1="https://app.gubuktani.com/api/"

# ENV API_1="http://127.0.0.1:8000/api/"
ENV API_2="https://app.gubuktani.com/api/"
# ENV IMG_URL="http://127.0.0.1:8000/storage/"

ENV IMG_URL="https://app.gubuktani.com/storage/"

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD [ "npm", "run", "start" ]