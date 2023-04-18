var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {studentModel} = require('../schemas/studentSchema');
const {dbURL} = require('../common/dbConfig');
mongoose.connect(dbURL);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let student = await studentModel.find();
  res.send(student);
});

router.post('/signup',async function(req,res){
  try{
    let student = await studentModel.findOne({email:req.body.email})
    if(!student){
      let student = await studentModel.create(req.body);
      res.status(201).send({
        message:"student signedIn successfully"
      })
    }else{
      res.status(400).send({
        message:'student already exists!'
      })
    }
  }catch(err){
    res.status(500).send({
      message : 'Internal server error',
      err
    })
  }
})

router.get('/withnomentor',async(req,res)=>{
  try{
    let studentMentor = await studentModel.find({mentor:null})
    if(studentMentor.length!=0){
      res.send(studentMentor)
    }else{
      res.send({
        message:'all students are assigned with a mentor'
      })
    }
  }catch(err){
    res.send({
      message:'internal server error',
      err
    })
  }
})

router.get('/:mentor',async(req,res)=>{
  try{
    let studentMentor = await studentModel.find({mentor:req.params.mentor})
    if(studentMentor.length!=0){
      res.send(studentMentor)
    }else{
      res.send({
        message:'mentor does not exists!'
      })
    }
  }catch(err){
    res.send({
      message:'internal server error',
      err
    })
  }
})

router.put('/:id',async(req,res)=>{
  try{
    let student = await studentModel.findOne({_id:req.params.id});
    if(student){
      let student = await studentModel.updateOne({_id:req.params.id},{mentor:req.body.mentor});
      res.send({
        message:'student mentor updated successfully'
      })
    }else{
      res.send({
        message:'student does not exists!'
      })
    }
  }catch(err){
    res.send({
      message:'internal server error',
      err
    })
  }
})

module.exports = router;
