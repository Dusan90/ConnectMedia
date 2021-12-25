# builder stage
FROM node:16.13 as builder
WORKDIR /src
COPY . .
RUN npm install -loglevel=error




# base image, can be upgraded in future
FROM nginx:1.18.0-alpine

# copying base nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# making base directory app will be copied
RUN mkdir -p /app
# make simple healthcheck file, used by container orchestrator
RUN echo healthcheck > /app/providus.html

# copying angular app from builder image to it's own directory
COPY --from=builder /src/dist /app

# actually configured on Jenkins Deploy job
ENV APP_URL ${APP_URL}
