var express= require('express');
var app=express();
var mongoose= require('mongoose');
var bodyParser=require('body-parser');
var admin=require('./models/admin');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var passportLocalMongoose=require('passport-local-mongoose');
var newsletter=require('./models/newsletter');
var gd=require('./models/gd');

mongoose.connect("mongodb://localhost/ppc_data");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//secret used to encode and decode session information
app.use(require('express-session')({
	secret: "just random",
	resave: false,
	saveUninitialized: false
}));

//Set passport up
app.use(passport.initialize());
app.use(passport.session());

//encoding and decoding admin
passport.use(new LocalStrategy(admin.authenticate()));
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());

admin.register(new admin({email: admin@ppcbitspilani.org}), default_admin_password);

//home
app.get("/", (req,res)=>{
	newsletter.find({}, (err,found)=>{
		if(err) {
			console.log("Something went wrong in newsletter section.");
		} else {
			gd.find({}, (error, success)=>{
				if(error) {
					console.log("Something went wrong in gd section.");
				} else {
					res.render("home", {newsletter:found, gd:success});
				}
			});
		}
	});
});

//newsletter page
app.get("/newsletter", (req,res)=>{
	newsletter.find({}, (err,found)=>{
		if(err) {
			res.redirect("/");
		} else {
			res.render("newsletter", {newsletter:found});
		}
	});
});

//each newsletter page
app.get("/newsletter/:id", (req,res)=>{
	newsletter.findById(req.params.id, (err,found)=>{
		if(err) {
			res.redirect("/");
		} else {
			res.render("eachnewsletterpage", {newsletter:found});
		}
	});
});

// GD page
app.get("/gd", (req,res)=>{
	gd.find({}, (err,success)=>{
		if(err) {
			res.redirect("/");
		} else {
			res.render("gd", {gd:success});
		}
	});
});

// Specific GD page
app.get("/gd/:id", (req,res)=>{
	gd.findById(req.params.id, (err,found)=>{
		if(err) {
			res.redirect("/gd");
		} else {
			res.render("eachgdpage", {gd:found});
		}
	});
});

//login
app.get("/login", (req,res)=>{
	res.render("login");
});

app.get("/admin", isLoggedIn, (req,res)=>{
	res.render("admin");
});


app.post("/login",passport.authenticate("local", {
	successRedirect: "/admin",
	failureRedirect: "/login"
}), (req,res)=>{

});

app.get("/logout", (req,res)=>{
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(8080, ()=>{
	console.log("SERVER STARTED");
});