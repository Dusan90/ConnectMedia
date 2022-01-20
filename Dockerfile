# builder stage
FROM node:16.13 as builder
WORKDIR /src
COPY . .

RUN npm ci --silent && npm run --silent build


# base image, can be upgraded in future
FROM nginx:1.18-alpine

# copying base nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# making base directory app will be copied
RUN mkdir -p /app
# make simple healthcheck file, used by container orchestrator
RUN echo healthcheck > /app/providus.html
RUN date > /app/build.txt

# copying angular app from builder image to it's own directory
COPY --from=builder /src/build /app

# actually configured on Jenkins Deploy job
ENV APP_URL ${APP_URL}
