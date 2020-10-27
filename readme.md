
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
         





