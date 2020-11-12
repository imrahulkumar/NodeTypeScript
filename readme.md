
## To install inside project

sudo npm install typescript ts-node express node @types/express @types/node nodemon @types/node


## For Global Level install

npm install -g typescript ts-node

## Install Mongoose

npm install mongoose @types/mongoose


## Install body parser to read x-www-form-urlencoder

npm i body-parser @types/body-parser


## For validation of req. use the 3rd party package

npm install --save express-validator


## For validation of req. use the 3rd part package

npm install joi
npm install --save @types/joi

## HTTP Status Codes
    
     200-226 :  mean action requested by the client was recieved understood and accepted.
     200: success

     300-308 : status code indicate the client must take addition action to complete the request.
     307 Temporary Redirect 
     308 Permanent Redirect

     400-451 : this class of status code is intended for situations in which the error seems to have been 
               caused by the client.
     
     404 Not Found
     400 Bad Request
     401 Unauthorised
     402 Payment Required
     403 Forbidden

     500-511 : indicate case in which the server is aware that it has encountered an error or is otherwise
               incapable of performing the request.
               
     500 Internal Server Error
     502 Bad Gateway
     503 Service Unavailable


## To send the email we have to use smpt server eg. Sendgrid


## To make the connection with smpt server in node we will use Nodemailer
      
   npm i nodemailer
   npm i @types/nodemailer

  
## To connect the Nodemailer and Sendgrid we will use nodemailer-sendgrid-transporter

   npm i nodemailer-sendgrid-transport   


## To Encrypt the password install node.bcrypt.js

   npm i bcrypt

## To install the jsonwebtoken
   
    npm i jsonwebtoken
    npm i @types/jsonwebtoken

## To install the emailjs
  
   npm install emailjs

   -> And Use the api provided in the documentation.

## To install multer to read the file.

    npm i multer
    npm i @types/multer
    -> Internally it used the busboy to store the data.


## For the CROWN JOB

   npm i node-schedule
   npm i @types/node-schedule

## Type of Indexes

   Ex.:  Take a scenario such as => name, age, Addr:[{zip:'201004'}] 
         1 and -1 denotes ascending or descending order.

   1) Single Field  : apply on single field
                      Example: db.user.createIndex({name:1})


   2) Compound  : apply in multilple field where we form query with multiple conditions
                  Example: db.user.createIndex({name:1, age:1})

   3) Multi-Key : apply on field where exist multiple data for eg. there are    
                  multiple address of the single user.
                  Example: db.user.createIndex({address.zip:1})

   4) Text : Used in the case such as searching operations.
             Example: db.user.createIndex({name:'text'})


   5) Geo Spatial : For eg. find the result which is near you geo-coordinates.
                    Applied on Geographical Co-ordinates

## About Indexing

- Just added in Scheme => index: { background: true, unique: true } 

## About Deployment in heroku
   
   As in development environment the typescript is converted into js by the compiler
   but for the production environment we have to convert it into javascript.

   To Convert to js write in package.json
   - "create-bundle" : "tsc && node dist/index.js"
   - "start" : "node dist/index.js"
  







