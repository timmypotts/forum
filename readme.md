# Forum by Tim Potts

I wanted to create this forum as a way to display competance across a broad range of technologies. I have seperated the front and back end of the code, the front end being in the directory **client** and the backend being **server**

## Client

To run the front end locally, simply cd into the client directory and run > npm start

I created this directory using npx create react app. This gave me a good jumping off point. From there I created a components directory for the different pages, forms, navbar, etc.

I also created a services directory, which is where I keep files that define classes containing built-in API calls to my backend.

The context directory contains files that initializes the UseContext hook that is built into React. It also contains an operation that I exectute when any page on my forum loads to check that there is a user logged in.

## Server

To run the backend locally, cd into the server directory and run > node server.js

In order for the backend to work locally, you need to create a directory server/**client**. Within the client folder, create a client.json folder with the structure:
```
{
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "port": "",
    "dialect": "mysql"
  }
}
```

I created this by starting with a simple server.js file using Express. The backend runs primarially as an API for my front end to communicate with my back end. I am doing this by using sequelize. I have created a model for each of the tables that my SQL database requires. I am creating API routes for specific queries/calls that will be required for my forum to function.

**NOTE** I am also aware that most readmes do not use the first-person, and I intend to change that as my forum becomes more operational. However, right now it is purely a personal project and I figured I'd use the readme as a chance to explain my thought process while creating this.
