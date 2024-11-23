Feature: User login on santa website creates a box and holds raffle

  Scenario: User logs in successfully
    Given user is on santa login page
    When user logs in with valid credentials 1time
    Then user is on dashboard page

  Scenario: User creates a new box successfully
    Given user presses on create box button
    Then  user fills in boxname, minamount, maxamount, currency
 

  Scenario: User gets new box ID to be able to delete it
    When box is created with new ID
    Then user gets ID after slash

  Scenario: User invites participants
    Given user gets invitation link
    Then user invites participants
      | invite link      | userEmail                   | userPassword   | wishes   |
      | <inviteLink>     | yuliyabanko+test1@gmail.com | Test1234 | 111111111111 |
      | <inviteLink>     | yuliyabanko+test2@gmail.com | Test1234 | 222222222222 |
      | <inviteLink>     | yuliyabanko+test3@gmail.com | Test1234 | 333333333333 |

  Scenario: User is organizing raffle
    Given user logs in with valid credentials
    When user is organizing raffle
    Then user is on raffle page

  Scenario: User deletes a created box
    When user sends a DELETE request to delete the box
    Then user receives a 404 response when checking the box status