/*
* This file has controllers to deal with teacher login
*/

//imports 
const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//setting constants
const accessTokenSecret=process.env.TOKEN;
//const saltRounds=10;

//logic for teacher login
const studentLogin=async(req,res)=>{
    console.log('Student login in progress');
    const {emailID,password}=req.body;
      //validating the username and password
      const emailExists = await Student.findOne({emailID: emailID});
      if(emailExists)
      {
          const passwordCheck = await bcrypt.compare(password, emailExists.password);
          if(passwordCheck)
          {
           //generating and returning the token
           const token = jwt.sign({ email: emailExists.emailID,  id:emailExists._id , tutGp:emailExists.tutGrp}, accessTokenSecret);   
           res.status(200).header('token', token).send({
               message: "True",
               token: token
           });   
          }
          else
          {
              return res.status(404).send(
                  {message: "False",
              token: []
          });
          }
         
      }
      else
      {
          return res.status(404).send({message: "False",
              token: []
          });
      }
      
  

};

//exporting the functions
module.exports={
    studentLogin,
};