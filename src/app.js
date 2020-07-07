const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



const app = express();

//Defind paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Matt Hosking",
  });
});







app.get("/help", (req, res) => {
  res.render("help", {
    name: "Matt Hosking",
    title: "Help Page",
    message:
      "Hello and welcome to the help page.  This page will help you use the weather app.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App - About ME",
    name: "Matt Hosking",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You Must provide an Address",
    });
  } else {
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return console.log(err);
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return console.log(error);
        }
        res.send({
            location: location,
            forecast: forecastdata,
            address: req.query.address
        })
       
      });
    });
  }
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: "You must provide a search term",
//     });
//   }
//   console.log(req.query);
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Matt Hosking",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Matt Hosking",
    message: "Page note found",
  });
});

app.listen(3000, () => {
  console.log("Connected on Port 3000");
});
