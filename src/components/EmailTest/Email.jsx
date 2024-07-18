// EMAIL POST REQUEST CODE PREP

// SETUP IF USING AS A TEMPLATE
// NOTE: SENDING AS A TEMPLATE REQUIRES PLUGGING THE LINK TO THE SPECIFIC BOX IN AS DYNAMIC CONTENT
// ####I AM GUESSING THAT I CAN PUT MORE HTML IN AS DYNAMIC CONTENT BUT I HAVE NOT TESTED THIS THEORY####
// 1. Create .env file
// 2. Acquire MailChimp transactional API key
// 3. Add API key to .env file as "TRANSACTIONAL_KEY"
// 4. Create template for email in MailChimp account using template provided in this folder
//     i. Log into Mandrill using MailChimp account information (can access Mandrill from the MailChimp dashboard by navigating to "Automations" > "Transactional email" in the sidebar)
//     ii. Navigate to email templates from the dashboard: "Outbound" > "Templates" > "+ Create a Template"
//     iii. Name the template "Memento Box Gift Notif"
//            A. You can use another name, but you will then need to take note of the provided "Template Slug" and insert it into the API call, where it is referred to as the "template_name"
//     iv. Select "Start Coding"
//     v. Copy/paste the provided emailTemplate.html into the HTML field.
//     vi. Set template defaults as preferred.  Some suggestions:
//            A. From Address: your business email, possibly a designated account for administrative emails
//            B. From Name: "Memento Box"
//            C. Subject: "You've received a Memento Box!"
//     vii. You can preview the content by selecting "Preview and Test".  Testing will allow you to input your email address and you will receive a test version of your email to your inbox, assuming that you have authenticated your domain properly. 
//          You can also either save the template as a draft ("Save Draft"), in which case the API call will not work, or publish it ("Publish") when it's final.
// 5. Once your email is saved as a template, the API should correctly prompt the template to send with the appropriate dynamic content pulled from the application database and plugged in.
// NOTE: The free version of MailChimp Transactional/Mandrill will ONLY send to email addresses at the domain that you have registered.  This means you cannot effectively use the free version for more than testing.  
// NOTE: Emails MUST come from the same domain that's associated with the account/API key.  The API request requires a "from email" and, because of this requirement, I have written this part of the 
// request as "from_email": `${process.env.FROM_EMAIL}` because I had to use my personal domain for this part of the project.  You can insert the from email in your .env file as "FROM_EMAIL=youremail@yourdomain.com" and use this same setup or you can replace 
// `${process.env.FROM_EMAIL}` with "youremail@yourdomain.com" (include the quotation marks if you're plugging your email into the API call).

// --------------------------------------------

// POST request 
// Body parameters dictated by MailChimp: https://mailchimp.com/developer/transactional/api/messages/send-using-message-template/
// Also used this stackoverflow post to figure things out: https://stackoverflow.com/questions/66425375/mailchimp-mandrill-transactional-emails-how-to-add-custom-data-to-email-templ
    
// TODO:
// 1. How do I map through the collaborators to get them all in the email as dynamic content?  This currently appears in the call as "sender_name".
// 2. How are we pulling from the database?  What will trigger the send on the front end?
// 3. We need images that are already hosted in order for them to appear in the email.
//    These need to be plugged into the email HTML and into the API call, which attempts to insert an image and currently does not have a link to that image.
//    SOLVED: hosting the images on my domain for the purposes of this demo; they will be removed before handoff.
// 4. We also need a link to the particular box for the recipient to be redirected to the application and their particular box.
//    This then needs to be plugged into the HTML as dynamic content
//    SOLVED: redirecting to http://localhost:5173/#/recipientbox for the purposes of the demo.  The next presenter will pull the ID, and we'll note on the router that we're using the simple ID for the sake of time but that a unique ID will need to be used for safety purposes in the future.
// 5. We need a bit of code that takes the occasion recorded in the database and translates each into an appropriate greeting.  E.g. "birthday" becomes "Happy Birthday", etc.  
//    No punctuation needed, I've already hard-coded that for the greeting and just need to plug in the dynamic content.
// 6. We need a "from_email" and a decision on whether we want the "from_name" to be "Memento Box" or the sender.
//    SOLVED: I'm plugging an email on my domain into the .env file and using that to pull it through without uploading personal stuff to the shared repo

// STRETCH GOALS:
// 1. Timed delivery, which would require input of a UTC timestamp in YYYY-MM-DD HH:MM:SS format.
//    https://mailchimp.com/developer/transactional/docs/outbound-email/#scheduling-messages
// 2. 



let occasionGreeting = "";
let senderName = "";
let recipientName = "";
let boxUrl = "";
let recipientEmail = "";
let scheduledTime = "";

    const data = {
        "key": `${process.env.TRANSACTIONAL_KEY}`,
        "template_name": "memento-box-gift-notif",
        "template_content": [
            {
                "name": "occasion_greeting",
                "content": occasionGreeting
            },
            {
                "name": "sender_name",
                "content": senderName
            },
            {
                "name": "recipient_name",
                "content": recipientName
            },
            {
                "name": "box_url",
                "content": `<a href="${boxUrl}" target="_blank"> <img src="####LINK TO BOX IMAGE OR PLUG IN ANOTHER VARIABLE THAT PULLS THE BOX IMAGE####" alt="A white gift box with a bright red ribbon" style="width:50%"> </a>`
            }
        ],
        "message": {
            "text": `Your friends have sent you a Memento Box!  Follow this link to view the box: ${boxUrl}.`,
            "subject": `${recipientName}, you've received a Memento Box!`,
            "from_email": `${process.env.FROM_EMAIL}`,
            "from_name": "Memento Box",
            "to": [
                {
                    "email": recipientEmail,
                    "name": recipientName,
                    "type": "to"
                }
            ]
        },
        "send_at": scheduledTime
    }

    const postData = JSON.stringify(data);

    console.log(postData);

    const options = {
        url: `https://mandrillapp.com/api/1.0/messages/send-template.json`,
        method: 'POST',
        body: postData
    }


// ====================================
// DRAFTED API CALL IF TEMPLATE IS NOT THE WAY TO GO:
// NOTE: I HAVE NOT TESTED THIS

const call = {
    "key": `${process.env.TRANSACTIONAL_KEY}`,
    "message": {
        "html": `
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <!-- TYPOGRAPHY: POPPINS -->
                    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
                    <title>Memento Box</title>
                    <style media="all" type="text/css">
                    /* -------------------------------------
                    GLOBAL RESETS
                ------------------------------------- */
                    
                    body {
                    font-family: Poppins, sans-serif;
                    /* In test email, Poppins did not appear */
                    -webkit-font-smoothing: antialiased;
                    font-size: 16px;
                    line-height: 1.3;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    }

                    /* -------------------------------------
                    BODY
                ------------------------------------- */
                    
                    body {
                    background-color: #F8A820;
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    }

                    /* -------------------------------------
                    MAIN AND COMPONENTS
                ------------------------------------- */
                    
                    .main {
                    background: #ffffff;
                    border: 1px solid #eaebed;
                    width: 75%;
                    margin: auto;
                    text-align: center;
                    }

                    .greeting {
                        /* ###### NEED ACTUAL EXTERNAL URL FOR CONFETTI IMAGE ##### */
                    background-image: url(file:///Users/lons/Documents/prime/tier-3/group-project/memento-box/public/confetti/confetti-exploded.png);
                    background-size: 100% 100%;
                    height: 25vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 20px;
                    }

                    .from-list {
                    background: #ffffff;
                    width: 75%;
                    margin: auto;
                    text-align: left;
                    }

                    .footer,
                    .footer a {
                    clear: both;
                    padding-top: 24px;
                    padding-bottom: 24px;
                    width: 100%;
                    color: #B4B4B4;
                    font-size: 12px;
                    text-align: center;
                    }

                    /* This seems to be the best way to center the box; 
                    shadow is perhaps part of the image and preventing true centering */
                    .giftbox {
                    margin-left: 8.5%;
                    }

                    /* Preheader is what will appear first in the preview on the email client; 
                    it's hidden in the email itself */
                    .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    /* mso-hide: all; */
                    visibility: hidden;
                    width: 0;
                    }
                    /* -------------------------------------
                    TYPOGRAPHY
                ------------------------------------- */
                    
                    p {
                    font-size: 16px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 16px;
                    }
                    
                    a {
                    font-family: Poppins, sans-serif;
                    color: #0057FF;
                    text-decoration: underline;
                    }
                    </style>
                </head>
                <body>
                    <span class="preheader">You've received a Memento Box!</span>
                    <div class="main">
                    <div class="greeting">
                        <h1>${occasionGreeting}, ${recipientName}!</h1>
                    </div>
                    <div class="from-list">
                        <b>You've just received a Memento Box from:</b>
                        <!-- TODO: HOW TO LOOP THROUGH ALL SENDERS AND MAP THEM WITHOUT HAVING EXTRAS OR DEFAULT CONTENT? -->
                        <br> ${senderName}
                        <br> ${senderName}
                        <br> ${senderName}
                        <br> ${senderName}
                        <br> ${senderName}
                        <br> ${senderName}
                    </div>
                    <div>
                        <h2>Click on your box to open!</h2>
                    </div>
                    <div class="giftbox">
                        <a href="${boxUrl}" target="_blank"> -->
                        <!-- TODO: NEED EXTERNAL LINK FOR BOX IMAGE IN ORDER FOR IT TO APPEAR IN THE EMAIL -->
                        <img 
                            src="file:///Users/lons/Documents/prime/tier-3/group-project/memento-box/public/boxes/white-red-ribbon.png" 
                            alt="A white gift box with a bright red ribbon"
                            style="width:50%">
                            <!-- Alt shows as off-center if the image doesn't appear in the email 
                            because of the custom margin to offset the shadow -->
                        </a>
                    </div>
                    <div class="footer">
                        Powered by <a href="http://htmlemail.io">HTMLemail.io</a>
                    </div>
                    </div>
                </body>
            </html>
        `,
        "text": `${recipientName}, your friends have sent you a Memento Box!  Follow this link to view the box: ${boxUrl}.`,
        "subject": "You've received a Memento Box!",
        "from_email": `${process.env.FROM_EMAIL}`,
        "from_name": "Memento Box",
        "to": [
            {
                "email": recipientEmail,
                "name": recipientName,
                "type": "to"
            }
        ]
    },
    "send_at": scheduledTime
}

const postCall = JSON.stringify(call);

console.log(postCall);

const headers = {
    url: `https://mandrillapp.com/api/1.0/messages/send.json`,
    method: 'POST',
    body: postCall
}