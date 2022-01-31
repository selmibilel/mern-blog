const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        
        // Get username for update the username for his posts
        try {
            const usernameForPosts = await User.findById(req.params.id);
            // update username in posts 
            if(req.body.username !== usernameForPosts.username){
                const filterQuery = {username:usernameForPosts.username}
                const chnageToValue = {$set:{"username":req.body.username}}
                await Post.updateMany(filterQuery,chnageToValue,{new:true})
            }
        } catch (err) {
            res.status(500).json(err)    
        }
        
        

        // Update user now
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(401).json("You can update only your account")
    }
    
});


// DELETE
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id){
        const user = await User.findById(req.params.id);
        if(user){
            try {
                await Post.deleteMany({username: user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (err) {
                res.status(500).json(err)
            }
        }
        else {
            res.status(404).json("User not found!")
        }
    }
    else{
        res.status(401).json("You can delete only your account!")
    }
    
});


// GET
router.get("/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;