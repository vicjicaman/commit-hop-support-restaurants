# Introduction
This is a Hackathon Onboarding Project (HOP) for www.commit.dev, Commit is a great company that is helping engineers to get their next job within a startup and a very supportive community, If you want to know more about this, please feel free to reach out.

The core idea for this HOP is to have a list of Restaurants that are preparing free meals for refugees on the borders with Ukraine.
This idea comes from a new report that I saw about the restaurants that are preparing free meals for the refugees, this news report stuck with me (I have a small gastronomic background) . I found that the HOP was a great opportunity to contribute and know more about this situation.

At first the idea was to list the restaurants information, how many meals they are preparing and the number of employees that they are supporting and a way to contact them or donate to them directly.But after some research I found the news reporting again and I saw that all the efforts of the involved restaurants are coordinated by World Central Kitchen and that the meals are distributed to locations around the borders.

I am planning to modify this project to show the border distribution points and find the cheapest, stable and long term way to set this project live.

# Donate
Please donate to WCK in this fundraising camping:
https://donate.wck.org/give/f3789323/#!/donation/checkout

# Trying new things
The HOP for commit is focused on learning new things while solving a problem, this was a great opportunity to try a lot of new libraries and concepts 
- **PostGIS and openstreetmaps**: 
- **Postgres in Node**:
- **Typescript**: I am using React and Node for the frontend and backend, but I used to use just vanilla script, this was a great opportunity to use Typescript for the projects from the beginning.
- **NextJS**: I always was hesitant to use React on the server, this was a great opportunity to take the bull by the horns
- **Clean Architecture**: This concept was new to me, my coworker Igor share me a great repository as reference:  https://github.com/igor-toporet/clean-arch-in-node
- **Opensearch**: 
- **React Intl**: I use i18n on the past, but it was a homemade solution, I saw that it was very easy to use this library (but I don't like that you need to build in the messages)
- **Formik**: This is another functionality that I used to resolve with a homemade solution.
An honorable mention is the fontawesome package, I have used fontawesome, but not in its package form :)

# Stack and Architecture
This project is just for the local development, one of the goals with this setup is to be able to integrate all the services.When a real domain is used we will be able to easily generate a letsencrypt certs and have a good env to test without issues of the cookies or domain auths on the browser
- **docker-compose**: This is to have everything running on a single script, with the network and volumes support, it will be very easy to move this to another container envs like Kubernetes. 
- **nginx**: This is to proxy the internal and localhost services into the different base paths for the backend, cra and static nextjs frontend.
- **CRA App**: This is a regular CRA but with Typescript! :), the app will contain all the admin and search functionality
- **NextJS**:  This is to generate static single pages for the content, instead of downloading 1Mb of app you only get a couple Kb for the Restaurants and its details.
- **GraphQL & Node**: This is a fairly simple Node backend, the highlight would be that this is using a Clean Architecture approach.
- **Postgres**: One of the main features was to search for the nearest restaurants, this is accomplished with the PostGIS extension. 
- **Opensearch**: We are using opensearch for the full text search functionality.

# Getting started

Clone this repository

Create the next folders and modify the ownership:

mkdir data;sudo chown -R 1001:1001 data/ mkdir search-data; sudo chown -R 1000:1000 search-data/

Add www.commit-hop.test to your /etc/hosts file (You can change this, but you need to change this as well on the nginx commit.conf file)

Run  yarn install inside the frontend, backend and backend-static folders

Copy the common folder into the frontend and backend-static folder (I am working on a friendly workaround for this)

Run docker compose up

# For the future
As mentioned before, I am planning to modify this project to show the border distribution points and find the cheapest, stable and long term way to set this project live.

I am also planning to separate the boilerplate structure for future quick MVP projects.

