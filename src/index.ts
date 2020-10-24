import * as  express from 'express';


let app: express.Application = express();



app.listen(5000, () => {
    console.log("Server is running at port 5000");

});


// app.get('/login',(req,res)=>{
//     console.log("req::",res);

//     res.send({res:"hey"})
    
// })

