

    const express = require("express");
    const bodyparser = require("body-parser");

    //console.log(date());
    //creating a new mongoose and mongodb required
    const mongoose = require("mongoose");
    // lodash require for our projects
    const _ = require("lodash");

    const app = express();

    app.use(bodyparser.urlencoded({extended: true}));

    app.use(express.static("public"));

    app.set('view engine','ejs');

  //old code using array to store data
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

  //created a schema for the listschema ,so that we can create custom list
  const listSchema  =  new mongoose.Schema({
    name:{
      type:String,
      required:[true,"please enter the list name"]
    },
    items:[itemSchema]


  });

  const List = mongoose.model("List",listSchema);










    app.get("/",function(req, res){



      //adding model.findMethod to find the everthing from data-bose
      Item.find({} ,function(err,founditmes){


        //this line of method will check if founditmes is empty or not ,of empty they will add defaultItems
        if(founditmes.length===0){

          //inserting many items (defailt-items) in our Item model with help of mongose insertMany command

          Item.insertMany(defaultItems,function(err){
           if(err){
              console.log(err);

            }else{
              console.log("Sucessfully saved in default items to DB.");
           }
          });

          res.redirect("/");




        }else{

          //we will put the res.render code here and remmber to change the parameters for newlistitems to founditmes
          res.render("list", {ListTitle: "Today", newlistitems:founditmes});
        }
      });




      });


      //creating a cusytom lists using express route

        app.get("/:customlistName",function(req,res){
          //this line of code will create a custom new list
          const customlistName = _.capitalize(req.params.customlistName);


          List.findOne({name:customlistName},function(err,foundList){
            if(!err){
              if(!foundList){
                //create a new list
                const list = new List({
                  name:customlistName,
                  items: defaultItems
                });
                list.save();
                res.redirect("/" + customlistName);


              }else{
              //show an existingList
              res.render("list",{ListTitle:foundList.name ,newlistitems:foundList.items});

              }
            }
          })

        });





      app.post("/",function(req,res){
        // this line of code hold the data which is passed on form from htm
        const itemName = req.body.nextitem;
        const listName = req.body.list;

        //making a mongose  model for itemName so that it can added to database

        const item = new Item({
          name:itemName,
        });

        //this line of code will help to save the inserted item in the Items model of ToDoList
        if(listName==="Today"){
          item.save();
          res.redirect("/");
        }else{
          List.findOne({name:listName},function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
          })
        }


        console.log(item);


      });

      /// creating a new post route for the delete <form >

      app.post("/delete",function(req,res){
        //this line of code will trigger when the checkbox is presssed,so that why we use the body parser

        const checkitemId = req.body.checkbox;
        const listName  = req.body.listName;
        if(listName === "Today"){

          Item.findByIdAndRemove(checkitemId,function(err){
            if(!err){
              console.log("Sucessfully deleted checked item.");
              res.redirect("/")
            }
          });
        }else{
          //this line code will help to find the list from which it is deleted and then update it aftward
        List.findOneAndUpdate({name:listName},{$pull :{items:{_id:checkitemId}}},function(err,foundList){
          if(!err){
            res.redirect("/"+listName);
          }
        });

        }







      });



      app.get("/about", function(req ,res){
        res.render("about");
      })





    app.listen(3000,function(){
      console.log("Server is running on port 3000");

    });
