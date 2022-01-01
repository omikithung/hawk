/****************getting HOME page********************/

exports.index = function (req, res) {
  res.render("home");
};

/****************getting CONTRIBUTOR page********************/

exports.contributors = function (req, res) {
  res.render("contributors");
};

/************************SIGN UP*****************************/

let name, pass, email, host;
let randomId, isvalidEmail, mailOptions, link;
exports.signup = function (req, res) {
  var nodemailer = require("nodemailer");
  message = "";
  /* getting name, password, email */
  if (req.method == "POST") {
    let post = req.body;
    name = post.name; //same as name in form
    pass = post.password;
    email = post.email;
    /* verifying email */
    /*
         Here we are configuring our SMTP Server details.
         STMP is mail server which is responsible for sending and recieving email.
      */
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "omikithung@gmail.com",
        pass: "Sai,tstbitsP",
      },
    });
    host = req.get("host");
    randomId = Math.floor(Math.random() * 100 + 54);
    link = `http://${req.get("host")}/verifyE?id=${randomId}`;
    mailOptions = {
      to: email,
      subject: "confirm email",
      html: `<p>Hi,</p>Please verify by clicking the link:<br> <a href="${link}">verify now</a>`,
    };
    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        res.render("signup", { message: "Please use a valid Email!" });
      } else {
        console.log("Message sent: " + response.message);
        res.render("notifyEV.ejs", { message: email });
      }
    });
  } else {
    res.render("signup");
  }
};

exports.verifyE = (req, res) => {
  console.log(`${req.protocol}://${req.get("host")}`);
  if (`${req.protocol}://${req.get("host")}` == `http://${host}`) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == randomId) {
      console.log("email is verified");
      var sql = `INSERT INTO users(user_name,password,email) VALUES("${name}", "${pass}", "${email}")`;
      var query = db.query(sql, function (err, result) {
        if (err) throw err;
        res.render("notifyEC.ejs", {
          email: mailOptions.to,
          name: name,
          password: pass,
        });
      });
    } else {
      console.log("email is not verified");
      res.end(
        `<h3>the email ${mailOptions.to} does not exist. Please use a valid email.</h3>`
      );
    }
  } else {
    console.log("verifiction request came from unknown source");
  }
};
/***************************SIGN IN*********************************/

exports.signin = function (req, res) {
  var message = "";
  if (req.method == "POST") {
    let post = req.body,
      name = post.name,
      pass = post.password;

    var sql =
      "SELECT id, user_name, password FROM `users` WHERE `user_name`='" +
      name +
      "' and password = '" +
      pass +
      "'";
    db.query(sql, function (err, results) {
      if (results.length) {
        //setting session
        req.session.userId = results[0].id;
        req.session.userName = results[0].user_name;
        req.session.loggedIn = true;
        console.log("user Session Id: " + req.sessionID);
        res.redirect("/u");
      } else {
        message = "Wrong Credentials.";
        res.render("signin.ejs", { message: message });
      }
    });
  } else {
    res.render("signin.ejs", { message: message });
  }
};

/****************************SIGN OUT************************/

exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
};
