FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /build /usr/share/nginx/html/syk/reisetilskudd


# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html/syk/reisetilskudd
COPY ./env.sh .
COPY ./process-index-html.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh
RUN chmod +x process-index-html.sh

EXPOSE 8080


CMD ["/bin/bash", "-c", "/usr/share/nginx/html/syk/reisetilskudd/env.sh && /usr/share/nginx/html/syk/reisetilskudd/process-index-html.sh && nginx -g \"daemon off;\""]
