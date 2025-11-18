# ========================
# STAGE 1 - BUILD
# ========================
FROM frolvlad/alpine-glibc:alpine-3.18 AS build

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build


# ========================
# STAGE 2 - RUN
# ========================
FROM frolvlad/alpine-glibc:alpine-3.18

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]

