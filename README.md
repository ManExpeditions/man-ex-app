<p align="center">
  <img src="https://app.greenrope.com/users/myteam46998/Media241.png?202106240524" width="250" height="150">
</p>

<br>

# Welcome to ManEx

Finding the perfect group of travel buddies to go on an adventure with has never been easier. 
ManEx is a platform where you can join travel groups or create your own to go on adventures with 
like-minded men you identify with the most. 


## API documentation

Currently the documentation can only be viewed locally. To view the documentation
```
cd backend/docs/
```

View the contents of the `docs` directory
```
ls
```

You should see the `index.html` file. Open this file with your favorite browser.

Once on the html page, switch to version `1.0.0`


## Getting Started

### Prerequisites 

Make sure you have installed:

1. [Node.js](https://nodejs.org/en/)
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community)
3. (Optional) [MongoDB Compass](https://www.mongodb.com/products/compass)

### 1. First start the express server

Change to backend directory
```
cd backend
```

Create a `.env` file for supplying secrets
```
touch .env
```

Edit the `.env` file to have the following secrets:
```
MONGO_URI=mongodb://localhost:27017/manex
SENDGRID_API_KEY=<enter api key here>
TWILIO_AUTH_TOKEN=<enter auth token here>
TWILIO_ACCOUNT_SID=<enter account SID here>
TWILIO_VERIFY_SERVICE_SID=<enter service SID here>
```

For help obtaining the secrets please see [Twilio verify documentation](https://www.twilio.com/docs/verify/api#).
You will need to create a Twilio account and create a verification service.


Install all dependencies
```
npm install
```


Now we can start the server
```
npm run dev
```

To make sure everything is alright, run the tests.
```
npm run test
```

### 2. Start the frontend react application

Change to `user-frontend` director
```
cd ../user-frontend
```

Install all dependencies
```
npm install
```

Start the react application
```
npm run start
```










