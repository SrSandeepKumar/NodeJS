Command to generate SSL/TLS certificare for HTTPS
1. openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
