For the live web visit:
https://www.ua-wck.com/

All this project was working with the stack bellow at some point, but I will be moving all this to use a static site with www.oatpage.com or www.tablews.com to save cost and resources.

# Donate
Please donate to WCK in this fundraising camping: <a href="https://donate.wck.org/give/f3789323/#!/donation/checkout" target="_blank" > donate </a>

#Stack

- **PostGIS and openstreetmaps**: Since I am planning to use Postgres as the database I will be using its spartial extension PostGIS, I will be trying OSM to render the maps (I am familiar with google maps, but you need to enable the billing even for the free tier now :( )
- **Postgres in Node**: I have been working mostly with NoSQL databases recently, it is very nice to SELECT FROM again in node.
- **Typescript**: I am using React and Node for the frontend and backend, but I used to use just vanilla script, this was a great opportunity to use Typescript for the projects from the beginning.
- **NextJS**: I always was hesitant to use React on the server, this was a great opportunity to take the bull by the horns
- **Clean Architecture**: This concept was new to me, my coworker Igor share me a great repository as reference: <a href="https://github.com/igor-toporet/clean-arch-in-node" target="_blank" > repository </a> 
- **Opensearch**: I wanted to use ElasticSearch to help me with the limited query capabilities of DynamoDB, this was a perfect opportunity to add this functionality.
- **React Intl**: I use i18n on the past, but it was a homemade solution, I saw that it was very easy to use this library (but I don't like that you need to build in the messages)
- **Formik**: This is another functionality that I used to resolve with a homemade solution.

# Stack and Architecture
- CloudFront:A CDN will be used to cache all the pages rendered dynamically by the NextJS backend.
- API GatewayWe are going to use the API gateway to route the request to the lambdas, right now the endpoints are public, but we are going to work on the configuration to only allow access by the CDN origin
- Lambda for NextJSA lambda to render the content using NextJS, we will be using the NextJS capabilities to query content and render a page from the server side, this will let us deliver and cache only one page.
- Lambda for GraphQLThis is a GraphQL server to query all the data needed from the rendered pages, the datasource is just a simple json file.I am still using this because if I want to use another data source like dynamodb, this adaptation would be very easy.
As you can see this is a very simple app architecture that will allow us to easily maintain, expand and scale at almost 0 cost.
# Getting started *LIVE*
The next steps will let you replicate the complete stack in local environment with automatic reloading, hot reloading, a valid certificate

Clone this repository

Add 
```
127.0.0.1 dev.ua-wck.com 
127.0.0.1 dev-api.ua-wck.com 
```
to you local /etc/hosts file

```
cd ./formation 
sam local start-api -p 4700 --host 0.0.0.0 --template gateway-stack.json
```

```
cd ./compose/app
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
``` 

```
cd ./backend
yarn build:watch
```

```
cd ./backend-static
yarn dev
```

Visit dev.ua-wck.com on your local browser

# Deployment resources *LIVE*

The project will be deployed to a stack that allow us to create static content, cache it on a CDN and be able to use dinamic content if needed on the future
The apex domain ua-wck.com as a temporary domain to have a fresh apex domain and continue with the development.Please let me know any feedback about the approach.

The goal of the scoped {{www}} deployment scripts will be to generate the functionality on the next urls
 - {{www}}.ua-wck.com -> CDN cached CRA 
 - {{www}}.ua-wck.com -> CDN cached NextJS 
 - {{www}}-api.ua-wck.com -> For NextJS origin 
 - {{www}}-api.ua-wck.com/backend/graphql -> For graphQL requests

The expected resources to be created in CloudFormation, the scope will be based on the {{www}} label. 
- Route {{www}}.ua-wck.com to CloudFront distribution 
- Route {{www}}-api.ua-wck.com to API Gateway instance 
- API Gateway instance 
- CloudFront distribution {{www}}.ua-wck.com 
- Lambda for NextJS origin 
- Lambda for GraphQL endpoint 


# CI/CD
All the changes that are pushed to the branch *codepipeline-test* will be automatically build and deployed.

# Utility resources

 - Certificate - *.ua-wck.com, create and destroy certificated limits are very narrow, I hope that this will cover all certificate needs.
 - Hosted Zone - This is going to be created by hand and referred by the CloudFront templates to create the RecordSets
 - Utils bucket - A private S3 bucket (ua-wck-utils) will be manually created as a helper

# Development flow

Two branches will be created for any desired scope {{www}}/prod and {{www}}/dev
Only the scopes {{www}} will be have an automated CD/CI pipeline as {{www}} will be the only env always online, {{stage}} and other scopes should be $tart and $hutdown manually.

You should be able to checkout any dev branch and easily start the local docker-compose.
Please let me know any feedback about the approach.


