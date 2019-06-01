# iReporter

iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the  general public.
Users can also report on things that needs government intervention.

[![Build Status](https://travis-ci.org/funmi5/ireporter.svg?branch=develop)](https://travis-ci.org/funmi5/ireporter)
[![Coverage Status](https://coveralls.io/repos/github/funmi5/ireporter/badge.svg?branch=servertests)](https://coveralls.io/github/funmi5/ireporter?branch=servertests)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b7413f480f9c9ad5b04/test_coverage)](https://codeclimate.com/github/funmi5/ireporter/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b7413f480f9c9ad5b04/maintainability)](https://codeclimate.com/github/funmi5/ireporter/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/50122e27e00948b38339148c9e34b8af)](https://app.codacy.com/app/funmi5/ireporter?utm_source=github.com&utm_medium=referral&utm_content=funmi5/ireporter&utm_campaign=Badge_Grade_Dashboard)
[![GitHub](https://img.shields.io/github/license/funmi5/ireporter.svg?style=popout)](https://github.com/funmi5/ireporter/blob/develop/LICENSE)


## Features

- Users can create an account and log in.
- Users can create a red-flag record (An incident linked to corruption).
- Users can create intervention record(a call for a government agency to intervene e.g  repair bad road sections,       collapsed bridges flooding e.t.c).
- Users can edit their red-flag or intervention records.  
- Users can delete their red-flag or intervention records.
- Users can add geo-location(Lat Long Coordinates) to their records.
- Users can change the geo-location (Lat Long Coordinates) attached to their red-flag or intervention records.
- Admin can change the status of a record to either under investigation, rejected (in the  event of a false claim)or resolved (in the event that the claim has been investigated and  resolved).

## Other Features

- Users can add images to their red-flag or intervention records, to support their claims.
- Users can add videos to their red-flag or intervention records, to support their claims.
- The user gets real-time email notification when Admin changes the status of their record.
- The user gets real-time sms notification when Admin changes the status of their record. 

## The tools used in the creation of this project

- Node.js & Express.
- Eslint(AirBnB style guide).
- Mocha, Chai, Istanbul & Nyc for testing.
- Mocha, Chai, Istanbul & Nyc for testing.
- Babel(To transpire down from ES6 to ES5
- Travis CI, Coveralls, Code climate and Codacy.

## Getting started

- Have Git, Node.js installed on your computer.
- Then use this link: ```https://github.com/funmi5/ireporter.git```  to clone the project to your computer.

```bash
-  cd into the project and run **npm start**
-  For testing, run **npm test**
```

## Core details

## HTTP Request Methods

These are the HTTP request methods used in this project.

| Method   | Action                                                      |
|---       | ---                                                         |
| `GET`    | This method is used to *get* a resource                     |
| `POST`   | This method is used to *create* a resource or *send* data   |
| `PUT`    | This method is used to *create/overwrite* a resource        |
| `PATCH`  | This method is used to *update* a resource                  |
| `DELETE` | This method is used to *delete* a resource                  |

## HTTP Response Status Codes

These are the HTTP response codes used in this project.

| Status Codes | Indication|
|   ---        | ---
|  `200`       | This `OK` status code indicates that a request has succeeded|
|  `201`       | This `created` status code indicates that a resource has been created|
|  `204`       | This `No content` status code indicates a request has succeeded and the current page need not be left|
|  `400`       | This `bad request error` status code indicates that the request sent to the server is incorrect|
|  `404`       | This `not found` status code indicates that the request/resource asked for can not be found|
|  `409`       | This `conflict` status code indicates that the request--response asked for is conflicted|
|  `500`       | This `internal server error` status code indicates that something has gone wrong on the web server|

## The API Routes

This features all the routes created in this project.

| API routes(url)       | Method   | Description                                         |
| ---                   | ---      | ---                                                 |
| /api/v1/users         | `POST`   |  For a user to create an account                    |
| /api/v1/users/login   | `POST`   | For a user to log in to an account                  |
| /api/v1/users/:id'    | `DELETE` | For a user to delete an account                     |
| /api/v1/reset/:id     | `PUT`    | For a user to reset the password to an account      |
| /api/v1/incidents     | `POST`   | For a user to create an incident                    |
| /api/v1/incidents/:id | `PUT`    | For a user to get an incident                       |
| /api/v1/incidents     | `GET`    | For a user to get all incidents                     |
| /api/v1/incidents/:id | `PATCH`  | For a user to update an incident                    |
| /api/v1/incidents/:id | `DELETE` | For a user to delete an incident                    |
| /api/v1/admin/login   | `POST`   | For an admin to log in to an account                |
| /api/v1/users         | `GET`    | For an admin to get all users                       |
| /api/v1/status/:id    | `PUT`    | For an admin to overwrite the status of an incident |
| /api/v1/mail          | `POST`   | For an admin to send a mail                         |
| /api/v1/sms           | `POST`   | For an admin to send a sms message                  |

## Template UI

<https://funmi5.github.io/ireporter/UI>

## Relevant Pivotal Tracker stories

<https://www.pivotaltracker.com/n/projects/2226969>

## Author

Funmilayo E. Olaiya
