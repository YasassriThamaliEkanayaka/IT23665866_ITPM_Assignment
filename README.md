# IT23665866_ITPM_Assignment
Automated test suite using Playwright for IT3040 ITPM assesses the accuracy of SwiftTranslator in translating Singlish to Sinhala. The test suite comprises 24 positive tests, 10 negative tests, and 1 UI test to ensure proper transliteration, robustness in handling mixed content, and real-time updates for reliability.

Prerequisites :
Before running the tests, ensure you have the following installed on your local machine:
Node.js (Version 16 or higher is recommended).
npm (Node Package Manager, which comes with Node.js).

Installation :
  1.Clone the Repository: git clone https://github.com/YasassriThamaliEkanayaka/IT23665866_ITPM_Assignment.git
  2.Navigate to the Project Directory: cd IT23665866_ITPM_Assignment
  3.Install Dependencies:
    This command installs Playwright and all necessary testing libraries - npm install
  4.Install Playwright Browsers: Ensure the required browser engines (Chromium, Firefox, WebKit) are installed.
     npx playwright install
  5.Running the Tests
    To execute all automated test cases and verify the results against the expected outputs, run: npx playwright test


Viewing the Test Report
After the tests have finished executing, you can view a detailed HTML report (which includes execution results for each of the 35 scenarios) by running: npx playwright show-report
  
