# Prime Solo Project - Starting Repo

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account. Make the project `PUBLIC`!

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

## Create Database and Table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`.

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Run `npm run server` to start the server.
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password.
   2. `POST /api/user/login` will login a user, see body to change username/password.
   3. `GET /api/user` will get user information, by default it's not very much.

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm start`.
- Navigate to `localhost:5173`.

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application.
- `public/` contains static assets for the client-side.
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site.
- `server/` contains the Express App.

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2.

----

# MailChimp email

MailChimp has a [breakdown of when you should use which of their APIs](https://mailchimp.com/developer/transactional/guides/send-first-email/#transactional-vs-marketing-email). 

The following is a step-by-step guide for how MailChimp is integrated with this application and how you can implement it in your own instance.

## Marketing email (newsletter) setup using MailChimp

* If you have not already created a `.env` file at the root of the project, create one.
* Create a MailChimp account.  You should be able to use a [free account](https://login.mailchimp.com/signup/?plan=free_monthly_plan_v0&locale=en&subscribers=500) for the basic functionality of this application.
* [Create an API key in your account](https://mailchimp.com/help/about-api-keys/#Generate_an_API_key). 
* Insert your API key into your `.env` file with the name `MARKETING_KEY`.  For example:

```plaintext
MARKETING_KEY=FooVX5hooooSAMPLEAPIKEYooood4mXV7RUt2N6v
```

* Find your MailChimp data center.  It's at the start of the URL you visit when you're on your dashboard.  [Here's more information](https://mailchimp.com/developer/marketing/docs/fundamentals/#connecting-to-the-api).
* Insert your data center into your `.env` file with the name `MARKETING_DC`.  For example:

```plaintext
MARKETING_DC=us12
```

* Find your MailChimp Audience ID by following the following path or using their [help center instructions](https://mailchimp.com/help/find-audience-id/):
   * "Audience" > "Audience dashboard" > "Manage Audience" > "Settings"
* Insert your data center into your `.env` file with the name `MARKETING_AUD_ID`.  For example:

```plaintext
MARKETING_AUD_ID=304g5398t4
```

## Transactional email (gift emails, etc.) setup using MailChimp

1. If you have not already created a `.env` file at the root of the project, create one.
1. Create a MailChimp account.  You should be able to use a [free account](https://login.mailchimp.com/signup/?plan=free_monthly_plan_v0&locale=en&subscribers=500) for the basic functionality of this application. <br>
__NOTE:__ The free version of MailChimp Transactional/Mandrill will ONLY send to email addresses at the domain that you have registered.  This means you cannot effectively use the free version for more than testing/demos.

1. Navigate to Transactional email from the dashboard sidebar: "Automations" > "Transactional email"
1. Select "Try for free" if you are using a free account.
1. Select "Launch App" to sign into Mandrill using MailChimp.
1. Set up your sending domain
1. [Authenticate your sending domain](https://mailchimp.com/developer/transactional/docs/authentication-delivery/#configure-your-dns)
1. Navigate to Settings from the Mandrill dashboard sidebar
1. Create a new API key by selecting "+ New API Key"
1. Insert your API key into your `.env` file with the name `TRANSACTIONAL_KEY`.  For example:

```plaintext
TRANSACTIONAL_KEY=X5hooooSAMPLEAPIKEYoooodN6v
```

### To use the email template: 

1. Create template for email in MailChimp account using template provided in this folder
    1. Log into Mandrill using MailChimp account information (can access Mandrill from the MailChimp dashboard by navigating to "Automations" > "Transactional email" in the sidebar)
    1. Navigate to email templates from the dashboard: "Outbound" > "Templates" > "+ Create a Template"
    1. Name the template "Memento Box Gift Notif"
       1. You can use another name, but you will then need to take note of the provided "Template Slug" and insert it into the API call, where it is referred to as the "template_name"
    1. Select "Start Coding"
    1. Copy/paste the provided emailTemplate.html into the HTML field.
    1. Set template defaults as preferred.  Some suggestions:
       1. From Address: your business email, possibly a designated account for administrative emails.  This email __must__ use the same domain as the domain you have registered with MailChimp/Mandrill for your transactional emails.
       1. From Name: "Memento Box"
       1. Subject: "You've received a Memento Box!"
    1. You can preview the content by selecting "Preview and Test".  Testing will allow you to input your email address and you will receive a test version of your email to your inbox, assuming that you have authenticated your domain properly. You can also either save the template as a draft ("Save Draft"), in which case the API call will not work, or publish it ("Publish") when it's final.
 1. Once your email is saved as a template, the API should correctly prompt the template to send with the appropriate dynamic content pulled from the application database and plugged in.
    1. __NOTE:__ Emails MUST come from the same domain that's associated with the account/API key.  The API request requires a from email.  Because the project does not currently have a domain, this parameter is specified as  `` "from_email": `${process.env.FROM_EMAIL}` `` in order that the tester can use their own domain.  To use your domain, insert the from email in your `.env` file as `FROM_EMAIL=youremail@yourdomain.com` and use the current setup.  Alternately, you can replace `${process.env.FROM_EMAIL}` with `"youremail@yourdomain.com"` within the API request.
