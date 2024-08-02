# Employees poll test cases

This document lists out all the test case in the applications.

## Scripts

### `npm test`

The tests are executed using the command line above

## Test cases

| Test case    | 1. Login successful                                                   |
| ------------ | --------------------------------------------------------------------- |
| Description  | Verify that user can log in to the system using the right credential  |
| Precondition | N/A                                                                   |
| Test steps   | User fill in the username and password -> click "Login" button        |
| Data         | Username = sarahedo, password = password123                           |
| Result       | Form displays success message and user is redirected to the home page |

| Test case    | 2. Login fail                                                           |
| ------------ | ----------------------------------------------------------------------- |
| Description  | Verify that user cannot log in to the system using the wrong credential |
| Precondition | N/A                                                                     |
| Test steps   | User fill in the username and wrong password -> click "Login" button    |
| Data         | Username = sarahedo, password = password124                             |
| Result       | Form displays error message and user is not redirected to the home page |

| Test case    | 3. Home page renders correctly                                                             |
| ------------ | ------------------------------------------------------------------------------------------ |
| Description  | Verify that home page renders correctly                                                    |
| Precondition | User is logged in                                                                          |
| Test steps   | Check that at the home page, the questions list displays answered and unanswered questions |
| Data         | N/A                                                                                        |
| Result       | The home page displays questions list for either answered or unanswered questions          |

| Test case    | 4. Home page fetch questions                                                                |
| ------------ | ------------------------------------------------------------------------------------------- |
| Description  | Verify that all questions are fetched when user is at the home page                         |
| Precondition | User is logged in                                                                           |
| Test steps   | Check that at the home page, the questions list displays answered and unanswered questions. |
| Data         | N/A                                                                                         |
| Result       | all questions are fetched when user is at the home page                                     |

| Test case    | 5. Home page allow user to see either answered or unanswered questions                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description  | Verify that home page can show answered/unanswered questions                                                                                                                           |
| Precondition | User is logged in                                                                                                                                                                      |
| Test steps   | (1) Check that ther is a questions list with the heading "unanswered questions" (2) Toggle the "show answered questions" checkbox -> check that the "answered questions" are displayed |
| Data         | N/A                                                                                                                                                                                    |
| Result       | The home page displays questions list for either answered or unanwered questions and user can toggle between showing the answered and unanswered questions.                            |

| Test case    | 6. View question details                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Description  | Verify that user can view questions details                                                                   |
| Precondition | User is logged in and is at the home page                                                                     |
| Test steps   | At the home page, click on an unaswered questions, check that the questions show the author and the 2 options |
| Data         | N/A                                                                                                           |
| Result       | User can view question details                                                                                |

| Test case    | 7. User can view question details                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| Description  | Verify that user can view questions details                                                                          |
| Precondition | User is logged in and is at the home page                                                                            |
| Test steps   | At the home page, click on a questions, check that the question details is display and the url show the questions id |
| Data         | N/A                                                                                                                  |
| Result       | When clicking on questions, question detail is fetched and the question id is shown in the url                       |

| Test case    | 8. User can vote                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Description  | Verify that user can view questions details                                                     |
| Precondition | User is logged in and is at the home page                                                       |
| Test steps   | At the home page, click on an unaswered questions -> Click to vote for one of the two questions |
| Data         | N/A                                                                                             |
| Result       | Sucess message is displayed about (1) what user voted on and (2) the percentage of votes        |

| Test case    | 9. Leaderboard renders correctly                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Description  | Verify leaderboard page renders correctly                                                                                                           |
| Precondition | User is logged in and is at the leader page                                                                                                         |
| Test steps   | At the leaderboard page, check that the leader board table is shown with the (1) employees, (2) their number of answers and (3) number of questions |
| Data         | N/A                                                                                                                                                 |
| Result       | The leaderboard show the employees ranking in term of numbers of answers and questions                                                              |

| Test case    | 10. User can add new question                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Description  | Verify that user can add new questions                                                                      |
| Precondition | User is logged in and is at the add new question page                                                       |
| Test steps   | At the Add page, fill in the option 1 and option 2 -> click "Add new question" button                       |
| Data         | option 1 = have your perfect body but be poor, option 2 = have a body your never satisfied with but be rich |
| Result       | Success message is displayed                                                                                |
