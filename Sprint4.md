# Sprint 4:

## Tasks for Sprint 4:

### Backend Tasks:
* Create Route to retieve all listings made by a user
* Create Route to update user information, including name, email, and password
* Add unit testing for the new routes

### Frontend Tasks:
* Implemented profile page to allow users to update their personal information.
* Implemented "My Listings" page to allow users to view the listings they've created.
* Created Edit Lease option in "My Listings" for users to update details for a listing they created.
* Created Delete option in "My Listings" for users to delete a listing they created.
* Added additional testing for newly created components.

## Documentation:
* Wiki page was added for [API documentation](https://github.com/wurew34/Gator-SubleasingSESPR22/wiki/Backend-Documentation) with all the backend routes and their descriptions.
  * Link: https://github.com/wurew34/Gator-SubleasingSESPR22/wiki/Backend-Documentation


## Backend:
### Backend Unit Testing Setup:

- Run `go test -v -run TestMain` in server folder
  
https://user-images.githubusercontent.com/59619342/164338917-7c8e6cb6-ed77-48aa-b65a-6f85c5076240.mp4



## Front-End

### User Stories for Front-end in Sprint 4:
* As a user, I wish to have the option to delete a listing I have posted if there's a conflict with the post.
* As a user, I want to edit the listings I post if there's an issue or update to the sublease property.
* As a user, I wish to be able to edit my profile details in case I need to update my user account.

### Profile Settings
![dnHvGUNfWk](https://user-images.githubusercontent.com/45046355/164340626-66b36176-c608-4c57-8c78-78b0ee75edab.gif)

### My Listings
![ci7mSxGV8P](https://user-images.githubusercontent.com/45046355/164340868-053251be-b2d5-42fa-a950-da61088e19e8.gif)

### Editing Listings
![iFaA37VWQX](https://user-images.githubusercontent.com/45046355/164341044-3424e91c-c96a-4807-87d3-045af0e7cea5.gif)

### Delete Listing
![uqKTyn1anR](https://user-images.githubusercontent.com/45046355/164341099-121396d7-d278-40e0-ae7e-a352d6ca0e43.gif)

### Testing using Cypress:
The following test case was implemented to test profile, my listings, and viewing of sublease listing:
![chrome_dMQs9pAorS](https://user-images.githubusercontent.com/45046355/164341663-d76d9225-cf32-4b32-aad3-7e5a0206fd41.png)


## Setup and running test scripts:
In the client folder:
- Jest unit testing: `npm test`

- Cypress e2e testing: `npm run e2e`

## To run the project:
1. Clone the repository.
2. Change directory into the backend `cd server`
3. Run the server using the command `go run main.go` in the command line.
4. Change directory into the frontend `cd ..` into `cd client`
5. Run `npm install` to get all of the necessary dependencies.
6. Run `npm start` to run the development server.