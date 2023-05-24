FROM node:16 AS ui-build

WORKDIR /front

RUN pwd

COPY . .

RUN ls

RUN npm install

EXPOSE 3000

CMD ["npm","start"]