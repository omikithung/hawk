exports.test = (req,res)=> {
   var message = '';
   res.render('test.ejs');
} 
exports.profileSetUp= (req,res)=> {
   message = '';
   res.render('profile.ejs');
}
exports.profile= (req,res)=> {
   message = '';
   if(req.method === 'POST') {
      console.log(req.body.name);
      console.log(req.file);
      console.log(req.file.mimetype);
      if(req.file.mimetype === ('image/png' || 'image/jpeg' || 'image/jpg' || 'image/gif')) {
         console.log("works");
         let sql = `insert into details(details_id, images) values (1, '${req.file.filename}') `;
         db.query(sql, (err, result)=>{
            if(err) throw err;
            console.log('success inserting image');
            res.redirect('/profileTest/'+1);
         })
      }
      else {
         res.end('please use correct format');
      }
   }
   else {
      res.render('profile.ejs');
   }
}

exports.profileTest = function(req, res){
	var message = '';
   id = req.params.id;
   var sql="SELECT * FROM `details` WHERE `details_id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profileTest.ejs',{data:result, message: message});
   });
};

// valid authenticated files
exports.vhome = function(req, res, next){
   const userId = req.session.userId
   ,  userName =  req.session.userName;
	if(req.session.loggedIn && userId) {
      //session may exist. however, user might not exist in users Table anymore. so, check table on every page.
      const sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";  
      db.query(sql, function(err, results){   
         if(err) throw err;
		   res.render('vhome.ejs', {userName: userName});	  //we can sent object like {king: 'joi', lurk: 'all'}
	   });
   }
   else {
      res.redirect('/signin');
   }
};

exports.devices = function(req, res, next){
	const userName =  req.session.userName
   ,  userId = req.session.userId;
   if(req.session.loggedIn && userId) {
		const sql = `SELECT * FROM users WHERE id=${userId}`; 
      db.query(sql, (err,results)=> {
         if(err) throw err;
         res.render('devices.ejs', {userName:userName});	
      })
   }
   else {
      res.redirect('/signin');
   } 
};

exports.validRoomInfo = function(req, res, next){
	var user =  req.session.user,
	userId = req.session.userId;
	console.log(user);
   if(req.session && userId) {
      var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
      db.query(sql, function(err, results){ 
         if(err) throw err;  
		   res.render('validRoomInfo.ejs', {user:user});  
	   });
   }
   else {
      res.redirect('/signin');
   }
};
