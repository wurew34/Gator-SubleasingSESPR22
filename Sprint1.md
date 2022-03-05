# Sprint 1: Project Design and User Implementation

## Tasks that were completed in this sprint:
1. [Create a landing page:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/17)
- The project was routed correctly to each destination using react-router-dom. The landing page component was designed so that it was appealing to users to view, and that it also discloses the purpose of the web application.
- It includes a navigation bar with a logo that redirects the user back to the home page, and a button to login.

2. [Create the login page](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/1) and [implement back-end connection to retrieve user information:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/16)
- Once the user clicks on the login button, it will redirect them to the login page we designed utilizing React Material UI.
- It includes textfields for the e-mail and password, with validation. There is also a hyperlink that redirects users to sign up if they don't have an account.

3. [Create the signup page](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/1) and [implement back-end connection to store user information:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/16)
- The signup page contains textfields for the user's first and last name, email address, and password. 
- The textfields have validation to authenticate valid input from the user.

4. [Create connection to mongoDB:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/2)
- The backend was able to connect to the mongoDB database.
- The schema for the user data was created.

5. [Implemented authentication for Login and Sign Up using JWT:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/16)
- The sign up endpoint was implement where user data is validated and stored in the database with hashed password and a JWT token.
- The login endpoint validates the user's credentials and responds with a JWT token if the user is authenticated.
- The token can then be used to fetch user data from database through getUser endpoint.

6. [Implement Unit Testing for sign up endpoint:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/18)
- The sign up endpoint was tested using Go testing with valid and invalid user data.

## Sprint 1 Video Demo:
- [Video Demo of Front end and Back end](https://www.youtube.com/watch?v=LSEPh0IBjCM)