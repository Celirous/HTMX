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

// Handle GET request to fetch users
app.get("/users", async(req, res) => {
  const limit = +req.query.limit || 10;

  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);

  const users = await response.json();
  
//   const users = [
//     { id: 1, name: "AJ Bellringer" },
//     { id: 2, name: "Jamie Bellringer" },
//     { id: 3, name: "James Bellringer" },
//     { id: 4, name: "KJ Duvenhage" },
//     { id: 5, name: "Lilly Aubrin" },
    
//   ];


  res.send(`
    <br>
    <h2>Users</h2>
    <ul class="list-group">
      ${users.map((user) => `<li class="list-group-item">${user.name}: ${user.email}</li>`).join("")} 
    </ul>
  `);
});
// the .map above, it outputs everything, because we are mapping all the data here. A new array each time. It works as a loop
// "take each element in this list and output them one by one"

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});



// CODE SUMMARY FOR TEACHER:
// This Express server handles user data fetching with HTMX integration
// - Middleware configured for: static files (public folder), form data parsing, JSON parsing
// - GET /users endpoint: accepts 'limit' query parameter (default 10), fetches from JSONPlaceholder API
// - Returns formatted HTML list with user names and emails using template literals and .map()
// - Server runs on localhost:3000
// Key learning: async/await for API calls, dynamic HTML generation on backend