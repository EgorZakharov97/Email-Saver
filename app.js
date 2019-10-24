let express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    serveStatic = require("serve-static"),
    methodOverride = require("method-override"),
    cookieParser = require("cookie-parser");

// CONFIGURATION AND MONGOOSE
const uri = "mongodb+srv://EmailSaver:Hopajopa9300909@emailsaver-xwdou.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});
app.use(serveStatic('./views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieParser());

// ROUTES
let mainRoute = require("./routes/main");
app.use(mainRoute);

// LISTENER
const PORT = process.env.port || 8080
app.listen(PORT, function(){
    console.log("EmailSaver has started");
});