var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {mentorModel} = require('../schemas/studentSchema');
const {dbURL} = require('../common/dbConfig');
mongoose.connect(dbURL);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let mentor = await mentorModel.find();
  res.send(mentor);
});

router.post('/signup',async function(req,res){
  try{
    let mentor = await mentorModel.findOne({email:req.body.email})
    if(!mentor){
      let mentor = await mentorModel.create(req.body);
      res.status(201).send({
        message:"mentor signedIn successfully"
      })
    }else{
      res.status(400).send({
        message:'mentor already exists!'
      })
    }
  }catch(err){
    res.status(500).send({
      message : 'Internal server error',
      err
    })
  }
})

module.exports = router;
