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

// Handle POST request for email validation
app.post("/email", (req, res) => {
  const submittedEmail = req.body.email;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(submittedEmail)) {
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
        <label class="form-label">Email address</label>
        <input
        type="email"
        class="form-control"
        name="email"
        hx-post="/email"
        value="${submittedEmail}">

        <div class="alert alert-success" role="alert">
          That email is valid
        </div>
      </div>`);
  } else {
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
        <label class="form-label">Email address</label>
        <input
        type="email"
        class="form-control"
        name="email"
        hx-post="/email"
        value="${submittedEmail}">

        <div class="alert alert-danger" role="alert">
          Please enter a valid email address
        </div>
      </div>`);
  }
});

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});
