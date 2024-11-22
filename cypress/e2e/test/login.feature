Feature: User login on santa website

Scenario: User logs in successfully
Given user is on santa login page
When user logs in with table
| login              | password  |
| yuliyabanko@gmail.com              | Test1234   |
Then user is on dashboard page

Feature: User creates a box

Scenario: User creates a new box successfully
Given user presses on create box button
When user fills in new boxname field, minamount, maxamount, currency
Then user creates a new box with a new name

Feature: User gets new box ID

Scenario: User gets new box ID to be able to delete it
When box is created with new ID
Then user gets ID after slash