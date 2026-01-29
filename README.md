ITPM Assignment 1 - IT23665866
Project Description
This project is for the IT3040 - ITPM module assignment. I have automated the testing of the SwiftTranslator website (Singlish to Sinhala) using Playwright.
+4

The goal is to check if the system converts Singlish to Sinhala correctly and to find any errors in the conversion.
+2

What I have tested:
I have identified and automated 35 test cases in total:
+4


24 Positive Tests: Checking if common sentences and greetings are translated correctly .
+2


10 Negative Tests: Checking where the system fails, like with English brand names (iPhone, MacBook) or URLs .
+1


1 UI Test: Checking if the output updates automatically while typing without clicking a button .
+1

How to Install the Project
Follow these steps to set up the project on your computer:

Clone the repository from GitHub using my link:
https://github.com/YasassriThamaliEkanayaka/IT23665866_ITPM_Assignment.git

Open the project folder in your terminal or VS Code.

Install the dependencies by typing this command:

Bash
npm install
Install the browsers needed for testing:

Bash
npx playwright install
How to Run the Tests
Once everything is installed, you can run all the tests by typing:

Bash
npx playwright test
How to View the Results
To see a detailed report of which tests passed or failed, type:

Bash
npx playwright show-report
