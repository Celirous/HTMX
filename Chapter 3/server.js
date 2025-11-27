import express from "express";

const app = express(); // This express() will initialize the app, we are storing that initialization in a variable

// MIDDLEWARE - as soon as a request is sent to the server this will go through all these functions
// Set static folder
app.use(express.static("public")); //the "use" is talking about the express of something static on the website. Pics, fonts, special colours
// We are searching for static assets, like pics and stuff, it is saved in a folder called 'public'

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true })); //Once you hit submit on your form, the special stuff gets put into a format that the server can read, think "è".
// so it changes how that looks and then makes it so that the server can read this

// Parse JSON bodies (as sent by API clients)
app.use(express.json()); // same as with python, by making it a json file, we make it into a string that can be used.

let currentPrice = 60;

app.get("/get-price", (req, res) => {
  currentPrice = currentPrice + (Math.random() * 2) - 1; //get a random number from 0-2 not including 2 
  res.send("R" + currentPrice.toFixed(2));
});

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});

/*
CODE SUMMARY:
Express server that simulates a live Bitcoin price tracker.

Setup:
- Serves static files from 'public' folder
- Parses form data and JSON

Price Route (/get-price):
- Starts at R60
- Randomly fluctuates price up or down by R1 each request
- Returns formatted price with "R" currency symbol and 2 decimals
- Called automatically every 2 seconds by HTMX from the HTML page

Server runs on port 3000 (http://localhost:3000)
*/