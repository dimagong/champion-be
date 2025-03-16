FROM node

WORKDIR /docker-champion-be

COPY package.json /docker-champion-be

RUN npm install

COPY . .

ENV PORT 5050

EXPOSE $PORT

VOLUME [ "/docker-champion-be" ]

CMD [ "npm", "start" ]

