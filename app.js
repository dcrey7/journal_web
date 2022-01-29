//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const _ = require("lodash");


const aboutContent = "regular lad learning to build websites";
const contactContent = "Email: abhishek01789@gmail.com,  Ph: +91-7202849884";


const app = express();
const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  const day = date.getdate();
  res.render("home", {
    date1: day,
    post1: posts
  });
})


app.get("/about", function(req, res) {
  res.render("about", {
    aboutcon1: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    contact1: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  let postdata = {
    title: req.body.posttitle,
    post: req.body.post
  }
  posts.push(postdata);
  res.redirect("/");
})


app.get("/posts/:postName", function(req, res) {
  const day = date.getdate();
  const reqtitle = _.lowerCase(req.params.postName);

  posts.forEach(function(titfind) {
    const ntitle = _.lowerCase(titfind.title);
    if (reqtitle === ntitle) {
      res.render("post",{
        date1: day,
        ptit:titfind.title,
        ppo:titfind.post
      });
    }
  });
});



app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
