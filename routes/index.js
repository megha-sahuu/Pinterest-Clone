var express = require('express');
var router = express.Router();
const userModel =require("./users");
const postModel =require("./post");
const localstrategy=require("passport-local");
const upload=require("./multer");

const passport = require('passport');
passport.use(new localstrategy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/feed', function(req, res, next) {
  res.render('feed');
});

router.post('/upload',isLoggedIn,upload.single("file"),async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("no files were given");
  }
  const user=await userModel.findOne({username: req.session.passport.user});
  const post=await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    userid:user._id
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

router.get('/login', function(req, res, next) {
  const error = req.flash('error');
  console.log('Flash Error:', error); 
  res.render('login', { error });
});

router.get('/profile',isLoggedIn ,async function(req, res, next) {
  const user=await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts")
  console.log(user);
  res.render("profile",{user});
});

router.post("/register",function(req,res){
  const { username, email, fullname} = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData,req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})

router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), function(req,res){
});

router.get("/logout", function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
