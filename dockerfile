ARG ALPINE_VERSION=3.18

FROM node:20-alpine${ALPINE_VERSION} as base

ARG DIR=/project

WORKDIR ${DIR}

COPY package*.json .

RUN npm ci --omit=dev


FROM base as build

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR ${DIR}

COPY . .

RUN pnpm run build 


FROM alpine:${ALPINE_VERSION} as release 

WORKDIR ${DIR}

# Add required binaries
RUN apk add --no-cache libstdc++ dumb-init \
    && addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node \
    && chown node:node ./

COPY --from=base /usr/local/bin/node /usr/local/bin/node

USER node
ENV DB_URI=

COPY --from=build /project/node_modules ./node_modules
COPY --from=build /project/build ./build

CMD [ "dumb-init", "node", "build/index.js" ]


