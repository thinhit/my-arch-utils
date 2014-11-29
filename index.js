var notifier = require('mail-notifier'),
	libnotify = require('./lib/libnotify'),
	_ = require('underscore');

var notify = function (msg){
	libnotify.notify(msg.content, {
		title: msg.title,
		time: 8000,
		image:__dirname + '/images/mail_inbox.png'
	});
}


var imap = {
  user: process.env.MY_UTILS_GMAIL_USERNAME,
  password: process.env.MY_UTILS_GMAIL_PWD,
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};

notifier(imap).on('mail',function(mail){

	if(!_.isArray(mail)){
		var notifyMsg = {
			title: '[New email]' + mail.subject ,
			content: 'From : ' + mail.headers.from
		};
		notify(notifyMsg);
	}else {
		for(var i = 0 , j = mail.length; i < j; i++ ){
			var notifyMsg = {
				title: '[New email]' + mail[i].subject ,
				content: 'From : ' + mail[i].headers.from
			};
			notify(notifyMsg);
		}
	}

}).start();
