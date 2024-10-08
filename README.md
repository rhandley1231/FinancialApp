# FinancialApp
This is the repository that will be used to develop the application for the machine learning internship students are participating in.
React Frontend, Spring Boot backend in Java, and Apache Derby as the database.

**Remember to always work in a detatched branch so the main repository stays protected**

### To local host the app:
In separate terminals, follow these commands:
- startServerNetwork      //This will initialize the derby database
  
- cd FinancialAppBackend
  - mvn install           // Install the Spring Boot dependencies in the environment locally (typically only done when we pull the newest version of code into our environment or when we clone the repository locally)
  - mvn spring-boot:run   // Local host the backend
   
- cd FinancialAppFrontend
  - npm install           // Install the React dependencies in the environment locally (typically only done when we pull the newest version of code into our environment or when we clone the repository locally)
  - npm run dev           // Local host the frontend of the website
 
Frontend team: you will still need to local host the backend & start the database to test the website, not just the frontend
Backend & database team: you will still need to local host the frontend to test the website, not just the backend and database

When we're debugging our code, use Google Chrome's developer tools to check for any issues (Inspect Element, view the console for errors and debuging statements)
Get the react developer tools for google chrome (google chrome extension)

This code base uses a Model View Controller (MVC) design on the backend.  This is a software design approach which uses a data model to represent and interact with information (See the User.java file), a view to show the user the data (See the UserView.java file), and a Controller is the middleman which handles the interactions between the model and the view (See the UserController.java file).  

- Say the user enters their username and password on the UI, our view, and clicks login:
  - The controller will process this event and ask the model to validate the user data from the database.
  - The model will check the database for the username and a matching password, if they're valid, we return a success, otherwise return a failure.
  - With the results of the database check, the controller will tell the view to either log the user in, or show them that they have an invalid login.
  - The view will show the result on the front end.
 
 
    




