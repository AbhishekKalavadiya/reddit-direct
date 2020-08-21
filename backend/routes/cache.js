const router = require('express').Router();
const auth = require('../middleware/auth')
const redis = require("redis");
require('dotenv-safe').config();

client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_IP)

client.on("error", function (err) {
  console.log("Error " + err);
});

router.post('/updownstate', auth , async (req, res) => {

    console.log(req.body);
    client.hget(req.user.id, req.body.commentid , function (err ,resp) {
        return   res.json({'publisher': req.user.id })
    })

  })

router.put('/updownstate', auth ,async (req, res) => {
  console.log(req.body);
  client.hset(req.user.id, req.body.commentid , function (err ,resp) {
      console.log(resp);
          
      })

})

module.exports = router