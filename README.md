# Udacity My Reads App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This applications allows employees in a company to create questions and votes on the created questions. Users can:

- Log in or sign up (only available for the `main` branch)
- View all the answered and unanswered questions
- View the question details and vote on the questions
- Create a new question
- View the ranking of the employees in their numbers of answers and number of questions

## Available Scripts

In the project directory, you can run:

### `npm install`

After cloning the project from Github, run this line to install all the necessary dependencies to run the project. (You might have to run the install command on each branch to make sure the dependencies are correctly installed.)

The project's backend run on either the `_DATA.js` file in the starter code or the json-server `db.json`:

- `main` branch: run on the `db.json` file. This branch allows user to sign up as new user. The database persists data.
- `starter-code-db` branch: run on the `_DATA.js` file. This branch only allows user to log in. The database does not persist data.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
To run this command line successfully in the `main` branch, you must run the `npm run db` command first.

- `main` branch: The unit tests in this branch do not include the test for `_saveQuestion` and `_saveQuestionAnswer` function.
- `starter-code-db` branch: The unit tests in this branch include the test for `_saveQuestion` and `_saveQuestionAnswer` function.

### `npm run db` (`main` branch)

Lauches the backend.
