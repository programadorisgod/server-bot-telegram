FROM node:20-alpine3.19 as base

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/usr/local/bin

WORKDIR /usr/src/app

COPY package*.json  ./

COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile



#Stage build

FROM base as build

WORKDIR /usr/src/app

COPY . .

RUN npm run build



#Stage release 
FROM node:20-alpine3.19 as release

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

WORKDIR /usr/src/app

ENV DB_URI=

COPY  --from=base /usr/src/app/package*.json ./

COPY  --from=base /usr/src/app/pnpm-lock.yaml ./

RUN  pnpm i --only=production

COPY --from=build /usr/src/app/build ./build

EXPOSE 3000

CMD ["pnpm","run", "start" ]



