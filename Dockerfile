FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN yarn global add vite
EXPOSE 9900
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "9900"]
