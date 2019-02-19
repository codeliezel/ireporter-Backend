# iReporter

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/50122e27e00948b38339148c9e34b8af)](https://app.codacy.com/app/funmi5/ireporter?utm_source=github.com&utm_medium=referral&utm_content=funmi5/ireporter&utm_campaign=Badge_Grade_Dashboard)[![Coverage Status](https://coveralls.io/repos/github/funmi5/ireporter/badge.svg?branch=develop)](https://coveralls.io/github/funmi5/ireporter?branch=develop)[![Build Status](https://travis-ci.org/funmi5/ireporter.svg?branch=develop)](https://travis-ci.org/funmi5/ireporter)[![Maintainability](https://api.codeclimate.com/v1/badges/6b7413f480f9c9ad5b04/maintainability)](https://codeclimate.com/github/funmi5/ireporter/maintainability)


### Required Features:
* Users can create an account and log in.
* Users can create a red-flag record (An incident linked to corruption). 
* Users can create intervention record(a call for a government agency to intervene e.g  repair bad road sections, collapsed bridges         flooding e.t.c).  
* Users can edit their red-flag or intervention records.  
* Users can delete their red-flag or intervention records. 
* Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention  records. 
* Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or  intervention records. 
* Admin can change the status of a record to either under investigation, rejected (in the  event of a false claim)or resolved (in the       event that the claim has been investigated and  resolved). 


### Optional Features:
* Users can add images to their red-flag or intervention records, to support their claims.  
* Users can add videos to their red-flag or intervention records, to support their claims.  
* The user gets real-time email notification when Admin changes the status of their record. 
* The user gets real-time sms notification when Admin changes the status of their record.  


#### The tools used in the creation of this project:
* Node.js & Express.
* Eslint(AirBnB style guide).
* Mocha, Chai, Istanbul & Nyc for testing.
* Babel(To ranspile down from ES6 to ES5
* Travis CI, Coveralls, Code climate and Codacy.

#### Getting started:
- Have Git, Node.js installed on your computer. 
Then use this link: ```https://github.com/funmi5/ireporter.git``` 
to clone the project to your computer.
-  cd into the project and run **npm start**
-  For testing, run **npm test**

----------------------------------
#### Template UI
https://funmi5.github.io/ireporter/UI

#### Relevant Pivotal Tracker stories:
https://www.pivotaltracker.com/n/projects/2226969

##### Author:
Funmilayo E. Olaiya

