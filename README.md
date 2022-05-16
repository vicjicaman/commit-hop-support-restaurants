# Introduction
This is a Hackathon Onboarding Project (HOP) for <a href="https://www.commit.dev" target="_blank" > Commit.dev </a>, Commit is a great company that is helping engineers get their next job at a startup. They also provide access to a very supportive and collaborative community of like-minded engineers.If you want to know more about this, please feel free to reach out.

The core idea for this HOP is to have a list of restaurants bording Ukraine that are preparing free meals for refugees. This idea came from a news report that I saw about the restaurants that are preparing free meals for the refugees and it stuck with me (I have previous experience in gastronomy as well). I found that the HOP was a great opportunity to contribute positively and learn more about this situation.

At first the idea was to list the restaurant's information, how many meals they are preparing, the number of employees they are supporting, and a way to contact them or donate to them directly. But after further research I saw that all the efforts of the involved restaurants are coordinated by World Central Kitchen and that the meals are distributed to locations around the borders.



# Donate
Please donate to WCK in this fundraising camping: <a href="https://donate.wck.org/give/f3789323/#!/donation/checkout" target="_blank" > donate </a>



# Trying new things
The HOP for commit is focused on learning new things while working on a project, this was a great opportunity to try a lot of new libraries and concepts 
- **PostGIS and openstreetmaps**: Since I am planning to use Postgres as the database I will be using its spartial extension PostGIS, I will be trying OSM to render the maps (I am familiar with google maps, but you need to enable the billing even for the free tier now :( )
- **Postgres in Node**: I have been working mostly with NoSQL databases recently, it is very nice to SELECT FROM again in node.
- **Typescript**: I am using React and Node for the frontend and backend, but I used to use just vanilla script, this was a great opportunity to use Typescript for the projects from the beginning.
- **NextJS**: I always was hesitant to use React on the server, this was a great opportunity to take the bull by the horns
- **Clean Architecture**: This concept was new to me, my coworker Igor share me a great repository as reference: <a href="https://github.com/igor-toporet/clean-arch-in-node" target="_blank" > repository </a> 
- **Opensearch**: I wanted to use ElasticSearch to help me with the limited query capabilities of DynamoDB, this was a perfect opportunity to add this functionality.
- **React Intl**: I use i18n on the past, but it was a homemade solution, I saw that it was very easy to use this library (but I don't like that you need to build in the messages)
- **Formik**: This is another functionality that I used to resolve with a homemade solution.

An honorable mention is the fontawesome package, I have used fontawesome, but not in its package form :)


# Original HOP Demo version vs Live version
There are some big and fundamental changes to the architecture that we need to do from the HOP demo to a live version.
- Container for the GraphQL server is now a Lambda function, we are going to continue using the Clan Architecture patterns.
- The Nginx container is replaced by an API Gateway to expose the backend functionality. (But we will keep just a part for our local env)
- The EC2 node needed for the containers will be removed, we are going to use just lambdas
- The CRA React portion of the frontend will be removed, everything will be rendered by NextJS, this removal is going to include the lambda on the edge functionality.
- To reduce cost and maintain efforts Postgres and Elastic search removed, now all the data will be stored on a simple json file (we will use DynamoDB on the future if needed)
All those changes are focused now on cost reduction, expansion simplicity and easy maintainability for long term support.

You can find the original functionality and CloudFormation in this branch:
https://github.com/vicjicaman/commit-hop-support-restaurants/tree/original-hop-backend

For the live web visit:
https://www.ua-wck.com/

# Stack and Architecture *LIVE*
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


# Stack and Architecture *DEMO/LEGACY*
This project is just for the local development, one of the goals with this setup is to be able to integrate all the services.When a real domain is used we will be able to easily generate a letsencrypt certs and have a good env to test without issues of the cookies or domain auths on the browser
- **docker-compose**: This is to have everything running on a single script, with the network and volumes support, it will be very easy to move this to another container envs like Kubernetes. 
- **nginx**: This is to proxy the internal and localhost services into the different base paths for the backend, cra and static nextjs frontend.
- **CRA App**: This is a regular CRA but with Typescript! :), the app will contain all the admin and search functionality
- **NextJS**:  This is to generate static single pages for the content, instead of downloading 1Mb of app you only get a couple Kb for the Restaurant list and its details.
- **GraphQL & Node**: This is a fairly simple Node backend, the highlight would be that this is using a Clean Architecture approach.
- **Postgres**: One of the main features was to search for the nearest restaurants, this is accomplished with the PostGIS extension. 
- **Opensearch**: We are using opensearch for the full text search functionality.

# Getting started *DEMO/LEGACY*

Clone this repository

Create the next folders and modify the ownership:
```
  mkdir data;sudo chown -R 1001:1001 data/ 
  mkdir search-data; sudo chown -R 1000:1000 search-data/
```
Add www.commit-hop.test to your /etc/hosts file (You can change this, but you need to change this as well on the nginx commit.conf file)

Run  
```
  yarn install 
```
inside the frontend, backend and backend-static folders

Copy the common folder into the frontend and backend-static folder (I am working on a friendly workaround for this)

Run
```
  docker compose up
```

# Deployment resources *DEMO/LEGACY*

The project will be deployed to a very simple stack to be able to focus on explore CloudFormation and CodePipeline, overall we will use a EC2 node (with docker compose inside) and a CloudFront distribution helper.

The apex domain ua-wck.com as a temporal domain to have a fresh apex domain and continue with the development, please suggest a better and long term domain name for the project.
Please let me know any feedback about the approach.

The goal of the scoped {{www}} deployment scripts will be to generate the functionality on the next urls

 - {{www}}.ua-wck.com -> CDN cached CRA
 - {{www}}.ua-wck.com/listing -> CDN cached NextJS
 - {{www}}-api.ua-wck.com/listing -> For NextJS origin
 - {{www}}-api.ua-wck.com/backend/graphql -> For external graphQL requests (search/admin)

The expected resources to be created in CloudFormation, the scope will be based on the {{www}} label.
 - Bucket s3://{{www}}.ua-wck.com
 - Route {{www}}.ua-wck.com to CloudFront distribution
 - Route {{www}}-api.ua-wck.com to EC2 instance
 - CloudFront distribution {{www}}.ua-wck.com
   - Lambda version for distribution behavoir for origin control
 - EC2 instance
   - Volume to attach


# Video of the demo

Watch the HOP walkthrough/presentation here:
https://www.youtube.com/watch?v=5m2pxz0URqY

This is the video of the HOP presentation that I did during my first weeks at commit. The features and state of the current project are different as the project evolves.


# Utility resources

 - Certificate - *.ua-wck.com, create and destroy certificated limits are very narrow, I hope that this will cover all certificate needs.
 - Hosted Zone - This is going to be created by hand and referred by the CloudFront templates to create the RecordSets
 - Utils bucket - A private S3 bucket (ua-wck-utils) will be manually created as a helper


# Development flow

Two branches will be created for any desired scope {{www}}/prod and {{www}}/dev
Only the scopes {{www}} will be have an automated CD/CI pipeline as {{www}} will be the only env always online, {{stage}} and other scopes should be $tart and $hutdown manually.

You should be able to checkout any dev branch and easily start the local docker-compose.
Please let me know any feedback about the approach.


# For the future

I am planning to modify this project to show the border distribution points and find a long term way to make this project live.

I was thinking of adding a static tweeter wall for tweets that support the Ukraine refugees and WCK.

I am also planning to separate the boilerplate structure for future quick MVP projects.

