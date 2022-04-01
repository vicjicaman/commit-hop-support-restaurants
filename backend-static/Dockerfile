FROM node:16.13.0-alpine
RUN apk add --no-cache libc6-compat

RUN mkdir -p /app
RUN chown -R node /app

USER node

ARG CACHEBUST=1
RUN echo "CACHE $CACHEBUST"

WORKDIR /app

#BLOCK|dev
ENV NODE_ENV development
ENTRYPOINT ["yarn"]
CMD ["dev"]
#dev

#BLOCK|prod

#COPY --chown=node:node ./node_modules /app/node_modules
#COPY --chown=node:node ./next.config.js /app/next.config.js
#COPY --chown=node:node ./package.json /app/package.json
#COPY --chown=node:node ./.next/standalone /app/
#COPY --chown=node:node ./.next/static /app/.next/static
#COPY --chown=node:node ./public /app/public

#ENV PORT 4400
#ENV NODE_ENV production
#ENV NEXT_TELEMETRY_DISABLED 1
#ENTRYPOINT ["node"]
#CMD ["/app/index.js"]
#prod


EXPOSE 4400
