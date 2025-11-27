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

// Handle POST request for contacts search
app.post("/search", async (req, res) => {
  const searchTerm = req.body.search.toLowerCase(); //this 'search' is the name inside of the input box. We store that info into the const

  if (!searchTerm) {
    return res.send("<tr></tr>"); // this says, if there is nothing in the search box, show the whole table
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await response.json();

  const searchResults = users.filter((user) => { //comes in as a json string
    const name = user.name.toLowerCase(); // we do lowecase because it is read that way so caps are not an issue
    const email = user.email.toLowerCase();
    return name.includes(searchTerm) || email.includes(searchTerm); // the includes means that we are checking if the name or the email is included in the search 
  });
  const searchResultHtml = searchResults.map((user) => // the .map collects all the data so that we can do something with it
    `<tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
    </tr>`
    )
    .join(""); //joins the data together without a space or a gap or something 
  res.send(searchResultHtml);
});

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});

// Summary

// This JavaScript file sets up an Express server that serves static files and parses form and JSON data. It defines a POST /search endpoint 
// that receives a search term from the client, fetches a list of users from the external API jsonplaceholder.typicode.com, filters the users 
// by matching the search term against their names or emails, and returns an HTML string of table rows representing the matched users. 
// The server listens on port 3000