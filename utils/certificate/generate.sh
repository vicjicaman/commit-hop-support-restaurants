ENVFILE=$1

docker pull certbot/dns-route53
docker run -it --rm --env-file ${ENVFILE} -v ${PWD}/output:/etc/letsencrypt certbot/dns-route53 certonly -n --agree-tos --dns-route53 --email vic.jicama@gmail.com -d *.ua-wck.com

