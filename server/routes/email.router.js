const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST for MailChimp transactional email to gift recipient
router.post('/gift', (req, res) => {
    console.log('in email.router.js gift POST', req.body);
    const data = {
        "key": `${process.env.TRANSACTIONAL_KEY}`,
        "template_name": "memento-box-gift-notif",
        "template_content": [
            {
                "name": "occasion_greeting",
                "content": req.body.occasionGreeting
            },
            {
                "name": "sender_name",
                "content": req.body.senderName
            },
            {
                "name": "recipient_name",
                "content": req.body.recipientName
            },
            {
                "name": "box_url",
                "content": `<a href="${req.body.boxUrl}" target="_blank"> <img src="####LINK TO BOX IMAGE OR PLUG IN ANOTHER VARIABLE THAT PULLS THE BOX IMAGE####" alt="A white gift box with a bright red ribbon" style="width:50%"> </a>`
            }
        ],
        "message": {
            "text": `Your friends have sent you a Memento Box!  Follow this link to view the box: ${req.body.boxUrl}.`,
            "subject": `${req.body.recipientName}, you've received a Memento Box!`,
            "from_email": `${process.env.FROM_EMAIL}`,
            "from_name": "Memento Box",
            "to": [
                {
                    "email": req.body.recipientEmail,
                    "name": req.body.recipientName,
                    "type": "to"
                }
            ]
        },
        "send_at": req.body.scheduledTime
    }
    const postData = JSON.stringify(data);
    console.log(postData);
    axios({
        url: `https://mandrillapp.com/api/1.0/messages/send-template.json`,
        method: 'POST',
        body: postData
    }).then(result => {
        console.log('email response data:', result.data);
        res.send(result.data)
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;