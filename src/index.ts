import * as  express from 'express';
import * as mongoose from 'mongoose';




let app: express.Application = express();



app.listen(5000, () => {
    console.log("Server is running at port 5000");

});

//connecting with mongodb

let url = "mongodb+srv://demo:demo@cluster0.cjcjs.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{

    console.log("mongodb is connect")
}).catch((err)=>{
    console.log(err);
    
})





//middleware 

app.use((req, res, next) => {
    console.log("Pre middleware called");
    next();
})



app.get('/login', (req: any, res, next) => {

    const data = [{ name: "testUserName" }];
    console.log("Actual request url path")
    req.user = data;
    next();

}, (req:any, res, next) => {
      console.log("post middleware called");
      res.send(req.user)
})

