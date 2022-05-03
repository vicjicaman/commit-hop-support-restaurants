

# Create a stack
```
aws cloudformation create-stack --stack-name ua-wck-distribution-www --template-body file://distribution-stack.json \
  --parameters ParameterKey=ScopeName,ParameterValue=www \
  ParameterKey=ScopeVersion,ParameterValue=0.0.0 \
  ParameterKey=ApexDomainName,ParameterValue=ua-wck.com \
  ParameterKey=HostedZoneId,ParameterValue=Z0815901WK0WTIBWT0BT \
  ParameterKey=AcmCertificate,ParameterValue=arn:aws:acm:us-east-1:919446158824:certificate/2bc00fc2-4d4f-4cc9-b855-254f9fc702be \
  --capabilities CAPABILITY_IAM
```




```
aws cloudformation update-stack --stack-name ua-wck-distribution-www --template-body file://distribution-stack.json \
  --parameters ParameterKey=ScopeName,ParameterValue=www \
  ParameterKey=ScopeVersion,ParameterValue=0.0.0 \
  ParameterKey=ApexDomainName,ParameterValue=ua-wck.com \
  ParameterKey=HostedZoneId,ParameterValue=Z0815901WK0WTIBWT0BT \
  ParameterKey=AcmCertificate,ParameterValue=arn:aws:acm:us-east-1:919446158824:certificate/2bc00fc2-4d4f-4cc9-b855-254f9fc702be \
  --capabilities CAPABILITY_IAM
```


aws cloudformation update-stack --stack-name ua-wck-distribution-www --template-body file://gateway-stack.json \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND CAPABILITY_NAMED_IAM



# Destroy a stack
```

aws cloudformation delete-stack --stack-name ua-wck-distribution-www
```


# Inspect image
docker run --rm -it --entrypoint /bin/sh ua-wck-backend-static 
docker-compose <<FILES>> exec backend sh


# Create a stack
```
aws cloudformation create-stack --stack-name ua-wck-backend-www --template-body file://backend-stack.json \
  --parameters ParameterKey=ScopeName,ParameterValue=www \
  ParameterKey=ScopeVersion,ParameterValue=0.0.0 \
  ParameterKey=ApexDomainName,ParameterValue=ua-wck.com \
  ParameterKey=HostedZoneId,ParameterValue=Z0815901WK0WTIBWT0BT \
  ParameterKey=AcmCertificate,ParameterValue=arn:aws:acm:us-east-1:919446158824:certificate/2bc00fc2-4d4f-4cc9-b855-254f9fc702be \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM


  aws cloudformation update-stack --stack-name ua-wck-backend-www --template-body file://backend-stack.json \
  --parameters ParameterKey=ScopeName,ParameterValue=www \
  ParameterKey=ScopeVersion,ParameterValue=0.0.0 \
  ParameterKey=ApexDomainName,ParameterValue=ua-wck.com \
  ParameterKey=HostedZoneId,ParameterValue=Z0815901WK0WTIBWT0BT \
  ParameterKey=AcmCertificate,ParameterValue=arn:aws:acm:us-east-1:919446158824:certificate/2bc00fc2-4d4f-4cc9-b855-254f9fc702be \
  --capabilities CAPABILITY_IAM

  aws cloudformation delete-stack --stack-name ua-wck-backend-www
```




```

aws cloudformation update-stack --stack-name ua-wck-distribution-www --template-body file://distribution-stack.json \
  --parameters ParameterKey=ScopeName,ParameterValue=www \
  ParameterKey=ScopeVersion,ParameterValue=0.0.5 \
  ParameterKey=ApexDomainName,ParameterValue=ua-wck.com \
  ParameterKey=HostedZoneId,ParameterValue=Z0815901WK0WTIBWT0BT \
  ParameterKey=AcmCertificate,ParameterValue=arn:aws:acm:us-east-1:919446158824:certificate/2bc00fc2-4d4f-4cc9-b855-254f9fc702be \
  --capabilities CAPABILITY_IAM

```