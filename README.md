# https://ilearnsmarter.com
The current code base of my showcase project

# How to start the project locally?

- There is no great use of this project without connected *mongoose* database. There is a route to backup the database to JSON so eventually it is possible.

- The expected name for the database is "ils"

- The production code is in folder "hapi". The name is leftover from when I was considering switching Express.js for Hapi. That didn't happen, but the name remained.

- Step1 - "git clone" and "npm install --production"

- Step2 - "node hapi/start" should start Express.js server on port 3000

# Watching files

- To watch files, you need proper npm install, which includes all Babel plugins

- Running "node watch" will start a process, that compiles files depending on their locations, their extensions and their names 
