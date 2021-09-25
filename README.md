# test-site-api
CRUD microservice API utilizing node.js, mongoose, and express; this was a prototype back-end for one of the volunteer vaccine sites to help people find vaccines in early days when vaccine availability was low. 

  npm install express mongoose body-parser cors express-async-handler --save

Using MongoDb Compass for viewing db and Atlas via AWS to store test database

API Calls via Chrome

Get http://localhost:8080/api/sites/

Post http://localhost:8080/api/sites/
body: 
```
      {
      "city": "Townsend",
      "name": "CVS (Townsend)",
      "hasAvailability": false,
      "availability": {
      	"slots": 0},
      "signUpLink": "https://www.cvs.com/immunizations/covid-19-vaccine?icid=cvs-home-hero1-banner-1-link2-coronavirus-vaccine",
      "latitude": 41.7878682,
      "longitude": -69.9923008
    }
```
    
Put http://localhost:8080/api/sites/CVS%20Townsend)
body: 
```   {
      "city": "Townsend",
      "name": "CVS (Townsend)",
      "hasAvailability": true,
      "availability": {
      	"slots": 20},
      "signUpLink": "https://www.cvs.com/immunizations/covid-19-vaccine?icid=cvs-home-hero1-banner-1-link2-coronavirus-vaccine",
      "latitude": 41.7878682,
      "longitude": -69.9923008
    } 
```
    
Delete http://localhost:8080/api/sites/6050ff98f38c862343eea561

