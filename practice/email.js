var nodeMailer=require('nodemailer');
var transport=nodeMailer.createTransport({
    host:'smpt.gmail.com',
    port:578,
    secure:false,
    requireTLS:true,
    auth:{

        user:'harshthukral098@gmail.com',
        pass:"pwaymytrjzddftoz",


    }
});
var MailOptions = {
    from: 'harshthukral098@gmial.com',
    to: 'harshthukral098@gmail.com',
    subject:'node',
    text: 'hn bhyii kesa h ',
}
transport.sendMail(MailOptions,function(error,info)
{
    if(error)
    {
        console.warn(error);
    }
    else{
        console.warn('email has been send',info.response);
    }
})