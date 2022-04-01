FROM node:16.13.0-alpine

RUN mkdir -p /app/dist
RUN chown -R node /app

USER node

ARG CACHEBUST=1
RUN echo "CACHE $CACHEBUST"

COPY --chown=node:node ./node_modules /app/node_modules
COPY --chown=node:node ./package.json /app/package.json

WORKDIR /app

ENTRYPOINT ["node"]

#BLOCK|dev
ENV NODE_ENV development
CMD ["/app/node_modules/nodemon/bin/nodemon.js", "-L", "/app/dist/index.js", "--watch", "/app/dist"]
#dev

#BLOCK|prod
#ENV NODE_ENV production
#CMD ["/app/dist/index.js"]
#prod

EXPOSE 4000
