FROM node:20-alpine3.19 as build

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/usr/local/bin



WORKDIR /usr/src/app

COPY package*.json  ./

COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build


#Construir la etapa más liviana  #stage build
FROM node:20-alpine3.19 as release

WORKDIR /usr/src/app

#ENV DB_URI=

COPY --from=build /usr/src/app/build ./build

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY  --from=build /usr/src/app/package*.json ./

COPY  --from=build /usr/src/app/pnpm-lock.yaml ./


EXPOSE 3000

CMD ["npm", "start" ]



