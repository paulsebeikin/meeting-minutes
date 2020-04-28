## About
A simple work-in-progress app for taking minutes in meetings.  Focus was on the back-end with a minimalistic front end using Bootstrap and some jQuery.  Back-end consists of a Nodejs Web API which calls a service layer that interacts with a Postgres database.  A few basic tests were added using Jest.  

A Dockerfile and Docker-Compose file is available for local deployment.  See more below.

## Deployment Instructions

#### Using Docker-Compose
From the root folder where the file `docker-compose.yml` exists execute the following commands (assumes Docker and Docker-Compose are already installed):

```
docker-compose build
docker-compose up
```

Application will be accessible at http://localhost:3000 thereafter.

#### Viewing on Heroku
The app has also been hosted on Heroku and can be viewed here: https://meeting-minutes-2020.herokuapp.com/

The free plan on Heroku forces cloud apps to sleep after 30 minutes of inactivity therefore the first attempt to access this web page after a period of inactivity will result in a delay of a few seconds while the dyno restarts.  Thereafter requests are processed at normal speeds.