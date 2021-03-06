# OrlaRssFeed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Instructions

- Clone this repos `git clone git@github.com:inuwa/orla-rss-feed.git`
- Install npm packages `cd <path-to-repo>/orla-rss-feed && npm install`
- Run the application `ng serve` or `npm run start`
- 

# What has been done
- Created the UI for the RSS Feeds
- Dynamically listed all articles from a set of feeds. 
- Allows the user to add, remove and search feeds.
- App can be built for production and run on a server using `npm run build:prod`
- go to the dist/orla-rss-feed and run test server like `python -m SimpleHTTPServer 8080` then open the application on `localhost:8080` to test the service worker.
- Application is responsive on small screens with sidenav over on mobile screens too.
- Picture URLs are error handled for 404s.
