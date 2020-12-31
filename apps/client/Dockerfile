FROM node:15.5.0 as base

FROM base as builder

WORKDIR /app

ADD . /app

RUN yarn install \
  && yarn build

FROM base

WORKDIR /app

ENV NODE_ENV "production"
ENV PORT 3000

COPY --from=builder /app/.next /app/.next

ADD package.json /app
ADD yarn.lock /app

RUN yarn install

EXPOSE 3000

CMD yarn start