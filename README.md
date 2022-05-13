<p align="center">
  <img src="https://app.greenrope.com/users/myteam46998/Media241.png?202106240524" width="250" height="150">
</p>

<br>

# Welcome to ManEx

Finding the perfect group of travel buddies to go on an adventure with has never been easier.
ManEx is a platform where you can join travel groups or create your own to go on adventures with
like-minded men you identify with the most.

For 7 years, Man Expeditions has been building a vision that, through the support of our travel community, 
allows us to run group trips and experiences that all help fund important wildlife and environmental 
conservation efforts. 

## API documentation

The API documentation is available [here](https://manexpeditions.github.io/man-ex-app/). Make sure to change the version to 1.0.0

## Deployment

This application is currently hosted on Heroku. It can be viewed [here](https://manex.herokuapp.com/).

## Getting Started Locally

### Prerequisites

Make sure you have installed:

1. [Node.js](https://nodejs.org/en/)
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community)
3. (Optional) [MongoDB Compass](https://www.mongodb.com/products/compass)

### 1. Setup secrets/config

Create a `.env` file in the root directory for supplying secrets.

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
CLOUDINARY_CLOUDNAME=<enter cloudname>
CLOUDINARY_API_KEY=<enter api key here>
CLOUDINARY_SECRET=<enter secret here>
GOOGLE_PLACES_API_KEY=<enter api key>
JWT_SECRET=<enter secret here>
```

For help obtaining the secrets for Twilio please see [Twilio verify documentation](https://www.twilio.com/docs/verify/api#).
You will need to create a Twilio account and create a verification service.

This project also uses cloudinary for asset management. You can learn more about it [here](https://cloudinary.com/).

Install all dependencies

```
npm install
```

Now we can start the server

```
npm run dev
```

(optional) To ensure everything is working as expected, run the tests.

```
npm run test
```

### 2. Start the frontend react application

Change to `user-frontend` director

```
cd ./user-frontend
```

Install all dependencies

```
npm install
```

Start the react application

```
npm run start
```

Now you are ready to start coding and making changes!

