

    const express = require("express");
    const bodyparser = require("body-parser");
    const date = require(__dirname + "/date.js");
    console.log(date());


    const app = express();

    var items = ["Code " ,"Eat "," sleep"];
    var workitems = [];
    var udemycourses=[];

    app.use(bodyparser.urlencoded({extended: true}));

    app.use(express.static("public"));

    app.set('view engine','ejs');



    app.get("/",function(req, res){
        let day = date();

      res.render("list", {ListTitle: day, newlistitems:items});


      });


      app.post("/",function(req,res){
        var item = req.body.nextitem;

        if(req.body.list === "work"){
          workitems.push(item);
          res.redirect("/work");


        }else if(req.body.list === "udemy"){
          udemycourse.push(item);
          res.redirect("/udemy");


        }else{
          items.push(item);
          res.redirect("/");

        }



        console.log(item);


      });


      app.get("/work", function(req,res){
        res.render("list",{ListTitle:"work list" ,newlistitems:workitems});


      })

      app.post("/work" ,function(req,res){
        let item = req.body.newitem;
        workitems.push(item);
        res.redirect("/work");

      })

      app.get("/udemy", function(req ,res){
        res.render("list",{ListTitle:"Udemy Course", newlistitems:udemycourses});
      })

      app.post("/udemy" ,function(req,res){
        let item1 = req.body.newitem;
        udemycourses.push(item1);
        res.redirect("/udemy");
      })




      app.get("/about", function(req ,res){
        res.render("about");
      })





    app.listen(3000,function(){
      console.log("Server is running on port 3000");

    });
