//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "OH, This is a Dear Diary moment...";
const contactContent = "404 Error ";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));//we tell express that our static files are held inside the public folder.

var ComposeContainer =[];//global array

app.get("/", function(req,res){
  //console.log(ComposeContainer);

  res.render('home', {
    EJS_HOME_P: homeStartingContent,
    posts: ComposeContainer
  });  
});

app.get("/contact", function(req,res){
  res.render("contact", {EJS_CONTACT_P: contactContent})
});

app.get('/compose', function(req,res){
  res.render('compose')
});

//when the web page is making a post requests to the compose route.
app.post("/compose", function(req,res){
  
  const composeOBJ = {
    title: req.body.POST_TITLE,
    post: req.body.POST_BODY
  };
  //console.log(composeOBJ);
  ComposeContainer.push(composeOBJ);

  res.redirect("/");
});


/*Route parameters-:
   Route parameters are named URL segments that are used to capture the values specified at their position in the URL.*/
   app.get("/posts/:postName", function(req,res){
     console.log(req.params.postName);
     const requestTitle = _.lowerCase(req.params.postName); //lodash library

     ComposeContainer.forEach(function(ele){
       const storeTitle = _.lowerCase(ele.title); //lodash library
       if(storeTitle === requestTitle){
         console.log("store title and request title are matched!");

         //we get access to this brand new page for every content
         res.render("post", {
           Title: ele.title,
           Content: ele.post
         })
       }else{console.log("store title and request title are not matched");}
     })
   });
 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
