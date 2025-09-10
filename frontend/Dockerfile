FROM nginx:alpine

# Nginx configuration to proxy /api to backend service
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static frontend files
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
