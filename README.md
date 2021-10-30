<p align="center">
  <img src="https://app.greenrope.com/users/myteam46998/Media241.png?202106240524" width="250" height="150">
</p>

<br>

# Welcome to ManEx

Finding the perfect group of travel buddies to go on an adventure with has never been easier. 
ManEx is a platform where you can join travel groups or create your own to go on adventures with 
like-minded men you identify with the most. 

<br>

# Microservices Architecture

The [microservices](https://docs.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices) architecture is being 
used due to the several benefits microservices come with. See the architecture diagram below for a high level understanding of the current
microservices being used and how they interact with each other.

<p align="center">
  <img src="https://app.greenrope.com/users/myteam46998/Media915.png?202110300959">
</p>

All microservices are containerized using docker to benefit from high portability and easy horizontal scaling. Every microservice
other than the react client has it's own MongoDB database. In microservices every service has it's own database to ensure
that the microservices are loosely coupled and independent from each other.

All endpoints go through the proxy. The proxy then manages the routing and traffic to the specific service. 

## Microservices

### User Client

This is the frontend application that users will have access to. It is developed using React and Redux. 
Redux is used for state management and it is selected to separate views logic from state logic.

## Admin Client

This is the frontend for the administrators. It is also developed using React and Redux. 

### Authentication Service

This service provides a REST API to authenticate users and create new users.

### Experiences Service

This service provides a REST API to allow users to explore experiences and register for them. The Experiences will
communicate with the Authentication service to ensure only valid users can perform certain tasks e.g. registering 
for an experience.

### Admin Service

The admin service is to enable administrators manage the content on the platform. This service communicates with
the experiences and authentication service. 

## Services Endpoints

- React Client: [/api/v1]()
- Authentication Service: [/api/auth/v1]()
- Experiences Service: [/api/experiences/v1]()
- Admin Service: [/api/admin/v1]()






