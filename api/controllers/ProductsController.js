/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    data:function(req,res){
        Products.find().sort('name').exec(function(err,data){
            res.json({message:"Success",data:data})
        })
    },

    list:function(req,res){
    
        Products.find().exec((err,products)=>{
            res.view({products:products}); 
        })
    },

    add:function(req,res){
        Products.create({category:req.body.category,name:req.body.name,price:req.body.price}).fetch().exec((err,data)=>{
            res.json({message:"Success"});
          
        })
    },

    

    delete:function(req,res){
        
        Products.destroy(req.body.id).exec((err,data)=>{
            Products.find().exec((err,data)=>{
            res.json({message:"Success",data:data})
            })
        })
    },

    edit:function(req,res){
        Products.findOne(req.param('id'),(err,product)=>{
        res.view({product:product});
        })
    },
    
    update: function(req, res){
        Products.update({id:req.param('id')}).set({category:req.body.category,name:req.body.name,price:req.body.price}).fetch().exec((err,data)=>{
        res.redirect("/products/list")
        })
    }
};

