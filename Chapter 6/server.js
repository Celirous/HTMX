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

// Handle GET request for profile edit
app.get("/user/:id/edit", (req, res) => {
  //the ":id" here is called a dymanic range. So if you have a car with an id, you can target it easier. In this case, we only have one id because it is one person. But it would know the index posistion and fill it into the :id section
  // send an HTML form for editing
  res.send(`
    <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input 
        type="text" 
        class="form-control" 
        id="name" 
        name="name" 
        value="Greg Lim">
      </div>

      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea 
        type="text" 
        class="form-control" 
        id="bio" 
        name="bio"></textarea>
      </div>

      <button 
      type="submit" 
      class="btn btn-primary">Save Changes</button>

      <button 
      type="submit" 
      hx-get="/index.html"
      class="btn btn-danger">Cancel
      </button>
    </form>
  `);
});

app.put("/user/:id", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  // Send the updated profile back
  res.send(`
    <div class="card" style="width: 18rem;"
    hx-target="this"
    hx-swap="outerHTML">

      <div class="card-body">

      <h1 class="card-title">${name}</h1>
      <p class="card-text">${bio}</p>

      <button  
      class="btn btn-primary"
      hx-get="/user/1/edit"> Click To Edit</button>

      <button  
      class="btn btn-danger"
      hx-delete="/user/1"
      hx-target="closest .card">Delete</button>

      </div>
    </div>
  `);
});

app.delete("/user/:id", (req, res) => {
  res.send(`<h1> Data has been deleted</h1>`);
});

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});

// This Node/Express server provides backend routes that support an HTMX-powered user profile editor. It serves static files, parses form and JSON data, and defines three main routes:

// GET /user/:id/edit – Returns an HTML form for editing a user’s name and bio. The form uses HTMX (hx-put) to submit updates and replace itself with the server’s response.

// PUT /user/:id – Receives the updated user data, then responds with an updated Bootstrap-styled profile card that HTMX swaps into the page.

// DELETE /user/:id – Logs the deletion and returns an empty response, allowing HTMX to remove the card on the client side.

// Finally, the server listens on port 3000.