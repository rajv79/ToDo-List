

    const express = require("express");
    const bodyparser = require("body-parser");

    //console.log(date());
    //creating a new mongoose and mongodb required
    const mongoose = require("mongoose");

    const app = express();

    app.use(bodyparser.urlencoded({extended: true}));

    app.use(express.static("public"));

    app.set('view engine','ejs');

  //  var items = ["Code " ,"Eat "," sleep"];
  //  var workitems = [];
  //  var udemycourses=[];

  //inseat of ussing array we will now use mongoose and mongodb to store data for our ToDoList

  //setting a mongoose db server for todolist database
  mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true, useUnifiedTopology: true});

  // creating a schema for items so that we can store in ToDoList

  const itemSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Please enter the item name"]
    }
  });

  //now creating a mongose model for the item

  const Item = mongoose.model("Item",itemSchema);

  //creating 3 default items in todomist

  const item1 = new Item({
    name:"welcome to Your Todolist!"


  });

  const item2 = new Item({
    name : " Hit the + button to add new item "
  });

  const item3 = new Item({
    name:"<---- Hit this to delete an item"
  });

  //created a defaultItems array to store the  the default items
  const defaultItems = [item1,item2,item3];

  //inserting many items (defailt-items) in our Item model with help of mongose insertMany command

  Item.insertMany(defaultItems,function(err){
    if(err){
      console.log(err);

    }else{
      console.log("Sucessfully saved in default items to DB.");
    }
  });




    app.get("/",function(req, res){


      res.render("list", {ListTitle: "Today", newlistitems:items});


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





      app.get("/about", function(req ,res){
        res.render("about");
      })





    app.listen(3000,function(){
      console.log("Server is running on port 3000");

    });
