FROM node:14.3.0 as base

FROM base as dev

WORKDIR /app

COPY . .

ENV NODE_ENV development

RUN yarn install

EXPOSE 3000

CMD yarn dev