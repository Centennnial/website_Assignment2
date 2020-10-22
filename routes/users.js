const express = require('express')
const router = express.Router()
const passport = require('passport');
var bcrypt = require('bcryptjs');

var User = require('../models/users');

function compare( a, b ) {
  if ( a.contactName < b.contactName ){
    return -1;
  }
  if ( a.contactName > b.contactName ){
    return 1;
  }
  return 0;
}

router.get("/contact_list",(req, res, next)=>{
  User.findOne({email:"gargisoni2@gmail.com"})
  .then(result=>{
    result.contacts.sort( compare );
    res.render("contact_list",{
      data:result.contacts
    }) 
  })
})

router.post("/update_contact",(req,res,next)=>{
    const {email,name,phone,id} = req.body;
     res.render("update_contact",{
          email,name,phone,id
     })
})


/* Post for User Login*/
router.post('/login', (req, res, next) => {
    const {email,password} = req.body;
    User.findOne({email:email})
    .then(result=>{
      if (result && result.password == password)
        res.redirect("/contact_list")
      else
        res.render("login",{msg:"Wrong Email or Password"})  
    })
  });
 
// post route saving user  
router.post("/save_user",(req,res,next)=>{
    const {username,email,password} = req.body;
    const newUser = new User({
        username,
        email,
        password
    })
    newUser.save()
    .then(result=>res.status(201).json(result))
    .catch(err=>console.log(err))
})  


// Login Page
router.get('/login', function(req, res, next) {
    res.render('login');
  });


// home page
router.get('/',(req, res) => {
    res.render('index', { text: 'Hey',title:'Home' })
})


router.get('/home', (req, res) => {
    res.render('index', { title:'Home' })
})

// about page
router.get('/about', (req, res) => {
    res.render('about', { title:'About' })
})
//service page
router.get('/service', (req, res) => {
    res.render('service', { title:'Service' })
})

// portfolio page
router.get('/portfolio.ejs', (req, res) => {
    res.render('portfolio', { title:'portfolio' })
})   

// contact page
router.get('/contact', (req, res) => {
    res.render('contact', { title:'contact' })
})


// get contacts list 
router.get('/contacts_list',(req,res)=>{
      User.findOne({email:"gargisoni2@gmail.com"})
      .then(result=>{ 
        res.status(201).json(result.contacts)
      })
      .catch(err=>console.log(err))
})


// post a contact 
router.post('/contacts_list',(req,res)=>{
      const {cname,cphone,cmail} = req.body;
      User.findOne({email:"gargisoni2@gmail.com"})
      .then(result=>{
          result.contacts.push({
              contactName : cname,
              contactNumber: cphone,
              contactEmail: cmail
          })
          result.save().then(out=>res.status(201).json({"msg":"saved"}))
      })
      .catch(err=>console.log(err))
})

// update a contact 
router.post('/contact_update',(req,res)=>{
  const {name,phone,email,id} = req.body;
  User.findOne({email:"gargisoni2@gmail.com"})
  .then(result=>{
        for (var i = 0; i < result.contacts.length; i+=1){
            if (result.contacts[i]._id == id){
                result.contacts[i].contactName = name;
                result.contacts[i].contactNumber = phone;
                result.contacts[i].contactEmail  = email;
                break
            }
        }
        result.save()
        .then(ans=>res.redirect("/contact_list"))
        .catch(err=>console.log(err))
      })
    .catch(err=>console.log(err))
})


// delete a contact
router.post('/delete_contact',(req,res)=>{
  const email = req.body.email;
  User.findOne({email:"gargisoni2@gmail.com"})
  .then(result=>{
        var f = 0;
        var index = -1;
        for (var i = 0; i < result.contacts.length; i+=1){
            if (result.contacts[i].contactEmail == email){
                f = 1
                index = i
                break
            }
        }
        if (f == 1){
            result.contacts.splice(index,1)
            result.save()
            .then(ans=>res.redirect("/contact_list"))
            .catch(err=>console.log(err))
        }  
        else 
            res.status(200).json("Not Deleted")    
      })
})

module.exports = router;