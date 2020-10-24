import * as  express from 'express';


let app: express.Application = express();



app.listen(5000, () => {
    console.log("Server is running at port 5000");

});

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

