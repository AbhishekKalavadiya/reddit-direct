const router = require('express').Router();
const Comment = require('../model/Comment');
const auth = require('../middleware/auth')

router.get('/' , (req,res) => {
    Comment.find()
        .populate('user')
        .sort({'createdAt':-1})
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error' + err));
});

router.post('/add', auth, async (req,res) => {

    console.log(req.user);
    const comment = new Comment({

        email : req.email.id,
        content : req.body.content

    });
    try {
        const savedComment = await comment.save();
        const savedCommentWithUserData = await Comment.findById(savedComment.id).populate('user');
        res.send(savedCommentWithUserData); 
    }catch(err){
        res.status(400).send(err);
    }
})

router.put('/update/', auth, async (req,res) => {
    
    console.log(req.user);
    try {
        await Comment.findByIdAndUpdate(req.body.id);
        res.send({ "success": true });
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;