/**
 * CartitemsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  
    add:async function(req,res){
        var cartItems = req.body || [];
        if (cartItems.length == 0) {
          return res.badRequest();
         }
         Cartitems.findOrCreate({userid:req.body.userid,productId:req.body.productId},{Name:req.body.Name,Quantity:req.body.Quantity,productId:req.body.productId,userid:req.body.userid}).exec((err,user,wasCreated)=>{
            if (err) { return res.serverError(err); }
                if(wasCreated) {
                    
              res.json({message:"Success"})
                }
                else {
                    Cartitems.update({Name:user.Name}).set({Name:user.Name,Quantity:user.Quantity+1}).fetch().exec((err,data)=>{
                        res.json({message:"Success"})
                })
              }
         })
    },
    
    increment: function(req,res){
        var toincrementItem = req.body || [];
        if (toincrementItem.length == 0) {
          return res.badRequest();
         }
         Cartitems.findOne({userid:req.body.userid,productId:req.body.productId},(err,items)=>{
             Cartitems.update({userid:req.body.userid,productId:req.body.productId}).set({Name:req.body.Name,Quantity:items.Quantity+1}).fetch().exec(async(err,data)=>{
                var uniqueUserData=await Cartitems.find({userid:req.body.userid});  
                res.json(uniqueUserData)
         
            })
        })
    },

    decrement: function(req,res){
        var toincrementItem = req.body || [];
        if (toincrementItem.length == 0) {
          return res.badRequest();
         }
         Cartitems.findOne({userid:req.body.userid,productId:req.body.productId},(err,items)=>{
            Cartitems.update({userid:req.body.userid,productId:req.body.productId}).set({Name:req.body.Name,Quantity:items.Quantity-1}).fetch().exec(async(err,data)=>{
                var uniqueUserData=await Cartitems.find({userid:req.body.userid});
                res.json(uniqueUserData)
            })
        })
    },

    remove: function(req,res){
        var toremove = req.body || [];
        if (toremove.length == 0) {
          return res.badRequest();
         }
         Cartitems.destroy({userid:req.body.userid,productId:req.body.productId}).exec(async(err,data)=>{
           var uniqueUserData=await Cartitems.find({userid:req.body.userid});
                res.json(uniqueUserData)
        })
    },

    totalAmount: async function(req,res){
      var cartData=await Cartitems.find({userid:req.body.userid});
      var productsData=await Products.find();
      var sum=0;
      if(cartData){
      for(var i=0;i<cartData.length;i++){
          for(var j=0;j<productsData.length;j++){
              if(cartData[i].productId===productsData[j].id){
                    sum=sum+(productsData[j].price*cartData[i].Quantity)
              }
          }
      }}
      res.json(sum);  
    }
};