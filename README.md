# TMUPrep
TMUPrep is a handy app that helps both incoming and current TMU students make the most of their semesters.

## DEPENDENCIES

### Tool Stack
Install golang
https://go.dev/doc/install

Install node and node package manager (NPM)
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Environment Variables
Create a .env file containing

## Local Development
Both the backend and frontend need to be running locally for the webapp to work.

```bash
# In TMUPrep/server
go run .
```

```bash
# In TMUPrep/client
npm i
npm run dev
```

## Scraping
(Please don't run scraping tools because it will mess with the data base)

server/scraper/addEnrollment.py
automatically enrolls into courses

sevrer/scraper/courseScraper.py
creates mongoDB entries for each course (course name, course description, antirequisites, prerequisites)