# Forum by Tim Potts

See the current version at: http://timpotts.xyz

I wanted to create this forum as a way to display competance across a broad range of technologies. I have seperated the front and back end of the code, the front end being in the directory **client** and the backend being **server**

## Client

I created this directory using npx create react app. This gave me a good jumping off point. From there I created a components directory for the different pages, forms, navbar, etc.

I also created a services directory, which is where I keep files that define classes containing built-in API calls to my backend.

The context directory contains files that initialize the UseContext hook that comes built into React. It also contains an module that exectutes when any page on my forum loads to check that there is a user logged in.

## Server

I created this by starting with a simple server.js file using Express. The backend runs primarially as an API between my front-end and my SQL database. I am doing this by using sequelize. I have created a model for each of the tables that my SQL database requires. I am creating API routes for specific queries/calls that will be required for my forum to function.
