var express = require('express');
const { all } = require('express/lib/application');
var router = express.Router();
var joinMeetingModule = require('../services/join_meeting');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Meeting' });

});

router.post('/join', async function(req, res, next) {
  var meetingLink = req.body.meetingLink;
  try {
    let msg = await joinMeetingModule.joinGoogleMeet(meetingLink);
    console.log(msg);

  } catch(error){
    console.log("error",error);
  }

  

});




module.exports = router;
