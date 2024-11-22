Feature: User login on santa website creates a box and holds raffle

Scenario: User logs in successfully
  Given user is on santa login page
  When user logs in with table
    | login                     | password  |
    | yuliyabanko@gmail.com     | Test1234  |
  Then user is on dashboard page

Scenario: User creates a new box successfully
  Given user presses on create box button
  When user fills in new boxname field
  When user fills in minamount, maxamount, currency
  Then user creates a new box with a new name

Scenario: User gets new box ID to be able to delete it
  When box is created with new ID
  Then user gets ID after slash

Scenario: User invites participants
  Given user gets invitation link
  Then user approves participants with <inviteLink> and <userEmail> and <userPassword> and <wishes>
    | invite link      | userEmail       | userPassword   | wishes   |
    | <inviteLink>     | users.user1.email | <userPassword> | <wishes> |
    | <inviteLink>     | users.user2.email | <userPassword> | <wishes> |
    | <inviteLink>     | users.user3.email | <userPassword> | <wishes> |

Scenario: User is organizing raffle
  Given user logs in with table
    | login                     | password  |
    | yuliyabanko@gmail.com     | Test1234  |
  When user is organizing raffle
  Then user is on raffle page

Scenario: User deletes a created box
  When user sends a DELETE request to delete the box
  Then user receives a 200 response confirming the deletion
  Then user receives a 404 response when checking the box status
