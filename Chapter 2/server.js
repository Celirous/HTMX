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

app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height); // here we convert it into a floating point number. That means the data can be used as a number not a just a string
  const weight = parseFloat(req.body.weight);
  // const means we are making a var that cannot be changed once it is set
  
  const bmi = weight / (height * height);

  res.send(`
    <p>Height of ${height} & Weight of ${weight} gives you BMI of ${bmi.toFixed(2)}</p> 
  `); // this sends the captured data in the .post section and now outputs it. 
}); // "bmi.toFixed(2)" selects only 2 decimal points 

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});
