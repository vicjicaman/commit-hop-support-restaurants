SCOPE=$1
VERSION=$2

aws s3 sync s3://ua-wck-utils/$SCOPE/$VERSION/compose-data /home/ec2-user/app/compose/data
aws s3 sync s3://ua-wck-utils/$SCOPE/$VERSION/compose-app /home/ec2-user/app/compose/app
aws s3 sync s3://ua-wck-utils/certificates/ua-wck.com /home/ec2-user/app/compose/app/certificates/ua-wck.com

cd /home/ec2-user/app/compose/data
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

cd /home/ec2-user/app/compose/app
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
