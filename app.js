const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment")


const app = express();
let items = ["Buy Food","Cook Food","Eat Food"]
let workItems = ["Work"];

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
  var today = new Date();
  var currentDay = today.getDay();
  var daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  var currentDayString = daysOfWeek[currentDay]
  var day = "";
  let date = moment().format('LLLL');
  res.render("list",{listTitle:date, newListItems:items});
});


app.post("/",(req,res)=>{

  let item = req.body.newItem;
  if(req.body.list==="Work"){
    if (item != ""){
      workItems.push(item)
    }else{
      console.log("New list item can not be empty");
    }
    res.redirect("/work")
  } else{
    if (item != ""){
      items.push(item)
    }else{
      console.log("New list item can not be empty");
    }
    res.redirect("/");
  }
})


app.get("/work", (req,res)=>{
  res.render("list",{listTitle:"Work List",newListItems:workItems});
})


app.get("/about",(req,res)=>{
  res.render("about");
})



app.listen(3000,()=>{
  console.log("Server started on port 3000")
})
