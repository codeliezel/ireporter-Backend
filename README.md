# iReporter

[![Build Status](https://travis-ci.org/funmi5/ireporter.svg?branch=develop)](https://travis-ci.org/funmi5/ireporter)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b7413f480f9c9ad5b04/test_coverage)](https://codeclimate.com/github/funmi5/ireporter/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b7413f480f9c9ad5b04/maintainability)](https://codeclimate.com/github/funmi5/ireporter/maintainability)

<hr>

Key note: This is a back-end project, i'm opened to further collaborations regarding the front-end part of it. :heart:

Features:

- Users can create an account and log in.
- Users can create a red-flag record (An incident linked to corruption).
- Users can deactivate and reactivate their accounts
- Users can create intervention record(a government agency call) to intervene.
- Users can edit their red-flag or intervention records.  
- Users can delete their red-flag or intervention records.
- Users can get one/all of their red-flag or intervention records.

<hr>

Trying to get started?

- Make sure to have node, git installed on your computer
- Clone this project using this link - <https://github.com/funmi5/ireporter.git>
- Create a .env file and add all the variables as shown in the sample
- Run `npm install` to install the modules
- Run `npm run start:dev` to start the server
- Run `npm test` to run the test suite

<hr>

These are the HTTP request methods used in this project:

| Method   | Action                                                      |
|---       | ---                                                         |
| `GET`    | This method is used to *get* a resource                     |
| `POST`   | This method is used to *create* a resource or *send* data   |
| `PATCH`  | This method is used to *update* a resource                  |
| `DELETE` | This method is used to *delete* a resource                  |

<hr>

These are the HTTP response codes used in this project:

| Status Codes | Indication                                                                                            |
|   ---        | ---                                                                                                   |
|  `200`       | This `OK` status code indicates that a request has succeeded                                          |
|  `201`       | This `created` status code indicates that a resource has been created                                 |
|  `204`       | This `No content` status code indicates a request has succeeded and the current page need not be left |
|  `400`       | This `bad request error` status code indicates that the request sent to the server is incorrect       |
|  `401`       | This `unauthorised error` status code indicates that the page can't be accessed without valid credentials        |
|  `404`       | This `not found` status code indicates that the request/resource asked for can not be found           |
|  `409`       | This `conflict` status code indicates that the request--response asked for is conflicted              |
|  `422`       | This `unprocessable error` status code indicates that the request can not be processed - access denied              |
|  `500`       | This `internal server error` status code indicates that something has gone wrong on the web server    |

<hr>

The routes featured in this project:

| API routes(url)       | Method   | Description                                         |
| ---                   | ---      | ---                                                 |
| /api/v1/users         | `POST`   |  For a user to create an account                    |
| /api/v1/users/login   | `POST`   | For a user to log in to an account                  |
| /api/v1/user/deactivate/:id    | `PATCH` | For a user to deactivate his/her account                   |
| /api/v1/user/reactivate/:id    | `PATCH` | For a user to reactivate his/her account                   |
| /api/v1/incident      | `POST`   | For a user to create an incident                    |
| /api/v1/anincident/:id | `GET`    | For a user to get an incident                       |
| /api/v1/incidents     | `GET`    | For a user to get all incidents                     |
| /api/v1/updateincident/:id | `PATCH`  | For a user to update an incident                    |
| /api/v1/deleteincident/:id | `DELETE` | For a user to delete an incident                    |

<hr>

Sample test format:

- For a user to sign up: `https://ireporter7.herokuapp.com/api/v1/user`
  
```

{
    "firstName": "Tolu",
    "lastName": "Somori",
    "otherNames": "sheryl",
    "email": "tolutheSaint@gmail.com",
    "phoneNumber": "08055355321",
    "userName": "tolugyal",
    "password": "toluSoms1"
}

```

- For a user to sign in: `https://ireporter7.herokuapp.com/api/v1/user/login`
  
```

{
    "email": "tolutheSaint@gmail.com",
    "password": "toluSoms1"
}

```

UI Templates - <a href= "https://funmi5.github.io/ireporter/UI">click on me</a>

Pivotal Tracker stories - <a href= "https://www.pivotaltracker.com/n/projects/2226969">click on me</a>

Hosted API Endpoints - <a href= "https://ireporter7.herokuapp.com">click on me</a>

Author - Funmilayo E. Olaiya
