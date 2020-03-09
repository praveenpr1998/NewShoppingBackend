/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt')
var id;
var token;
var XLSX = require('xlsx');
module.exports = {
  
    create:async function(req,res){
        Users.findOne({email:req.body.email},(err,data)=>{
            if(data){
                res.json({message:"Exists"})}
            else{
                id=Number(""+Math.floor(Date.now() / 1000)+Math.floor(Math.random() * 101));  
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if (err) return res.send('An error occured', 500);
        
                Users.create({role:"customer",userid:id,name:req.body.name,email:req.body.email,password:hash}).fetch().exec((err,data)=>{      
                token = jwt.sign({user: data.userid}, sails.config.secret.key)
                res.json({message:"Success",userid:data.userid,token:token})
                })})
            }
        }) 
    },

    login:async function(req,res){   
        

        Users.findOne({email:req.body.email},function (err,user){
        if(user){ 
            bcrypt.compare(req.body.password, user.password, function(err, valid) {
                if(err || !valid){
                    return res.json('Invalid username and password combination!', 500)}
            token = jwt.sign({user: user.userid}, sails.config.secret.key);
            
            res.json({message:"Success",userid:user.userid,token:token});})
        }
        else{
            res.json({message:"Username Invalid"})
        }
    })
    },
    
    adminLogin:async function(req,res){
        
        Users.findOne({email:req.body.email,password:req.body.password},function (err,user){
            if(user&&user.role==="admin"){ 
                token = jwt.sign({user: user.userid}, sails.config.secret.key);
                
                res.json({message:"Success",userid:user.userid,token:token});
            }
            else{
                res.json({message:"Username Invalid"})
            }
        })
    },

    check:function(res,req){
        res.json({message:"valid"})
    },
    finduser:function(req,res){
        if(req.body){
            Users.findOne({userid:req.body.userid},function(err,data){
                res.json(data.name);
            })
        }
    }
};
