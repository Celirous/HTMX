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

app.post('/calculate', (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);
  const bmi = weight / (height * height);
  
  if (bmi <= 18.5) {
    res.send(`
      <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:gray;"><b>${bmi.toFixed(2)}</b></span></p>
      <p><b> (Underweight)</span></p>
    `);
  } else if (bmi < 25) {
    res.send(`
      <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:green;"><b>${bmi.toFixed(2)}</b></span></p>
      <p><b> (Normal weight)</span></p>
    `);
  } else if (bmi < 30) {
    res.send(`
      <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:orange;"><b>${bmi.toFixed(2)}</b></span></p>
      <p><b> (Overweight)</span></p>
    `);
  } else {
    res.send(`
      <p>Height of ${height} & Weight of ${weight} gives you BMI of <span style="color:red;"><b>${bmi.toFixed(2)}</b></span></p>
      <p><b> (OBESE)</b></span></p>
    `);
  }
});

// Start the server
app.listen(3000, () => {
  // When we do this, this is to access the site, so it would be http://localhost:3000/ if you change the number here it would route there
  console.log("Server listening on port 3000");
});
