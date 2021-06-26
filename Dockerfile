# command: docker run --name react-app -d -p 65001:80 react-app
# 65001 is the port exposed on the host, 80 is the port exposed internally within the container

FROM nginx
COPY build /usr/share/nginx/html