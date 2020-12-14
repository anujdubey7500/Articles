const express= require("express");
const bodyParser = require("body-parser");
const ejs=require("ejs");
const mongoose = require("mongoose");

const app=express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Admin-anuj:Anuj7500@cluster0.r2k6y.mongodb.net/Article?retryWrites=true&w=majority");

//mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true});
const artileSchema={
    title:String,
    content:String
};
const Article=mongoose.model("Article",artileSchema);


//////////////////////////////////////////////FOR ALL ITEMS IN THE COLLECTION/////////////////////////////////////
//////////////////////IT IS ROUTE CHAINING
app.route("/articles")
.post(function(req,res){
    //console.log(req.body.title);
    //console.log(req.body.content);
    const newItem=new Article({
        title:"Hosting",
        content: "Web API"

    })
    newItem.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.send("Successfully added to the server");
        }
    });

 });



/////////////////////////////////////////////////GET REQUEST FOR A SPECIFIC ITEM//////////////////////////////

app.route("/findarticles")
    .get(function(req,res){
        Article.find({},function(err,founddoc){
            if(founddoc){
                res.send(founddoc);
            }else{
                res.send("error");
            }
        });
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started on port 3000");
});