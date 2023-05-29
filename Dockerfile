FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine AS deploy

WORKDIR /app
COPY --from=build /app/.env ./.env
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules/ ./node_modules
COPY --from=build /app/build ./build
EXPOSE 3000
ENTRYPOINT [ "node", "-r", "dotenv/config", "build"]