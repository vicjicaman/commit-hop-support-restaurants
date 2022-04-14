sudo rsync -L -a ./output/live/ua-wck.com/ /tmp/ua-wck-cert
sudo chmod -R 755 /tmp/ua-wck-cert
aws s3 sync /tmp/ua-wck-cert/ s3://ua-wck-utils/certificates/ua-wck.com
sudo rm -r /tmp/ua-wck-cert



aws s3 sync s3://ua-wck-utils/certificates/ua-wck.com ./certificates/ua-wck.com