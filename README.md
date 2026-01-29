# IT23665866_ITPM_Assignment

![Node.js](https://img.shields.io/badge/Node.js-v16+-brightgreen) ![Playwright](https://img.shields.io/badge/Playwright-1.38-blue) ![Module](https://img.shields.io/badge/Module-IT3040--ITPM-orange)

Automated **Playwright** test suite for **IT3040 ITPM** that evaluates the **accuracy of SwiftTranslator** in translating **Singlish to Sinhala**. 

The primary objective is to evaluate the system's transliteration accuracy, UI stability, and robustness under diverse conditions.

### 🧪 Test Suite Overview
The suite validates **35 distinct scenarios**:
* **24 Positive Functional Tests** – Correct transliteration for daily language, formal requests, and complex sentences.
* **10 Negative Functional Tests** – Robustness tests targeting technical brand names, URLs, and joined word variations.
* **1 UI Test** – Verification of real-time output updates without manual conversion triggers.

---

<details>
<summary>📋 Prerequisites</summary>

Before running the tests, ensure you have the following installed:
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
</details>

<details>
<summary>⚙️ Installation</summary>

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/YasassriThamaliEkanayaka/IT23665866_ITPM_Assignment.git](https://github.com/YasassriThamaliEkanayaka/IT23665866_ITPM_Assignment.git)
Navigate to the Project Directory

Bash
cd IT23665866_ITPM_Assignment
Install Dependencies
Installs Playwright and all required testing libraries:

Bash
npm install
Install Playwright Browsers
Installs Chromium, Firefox, and WebKit engines:

Bash
npx playwright install
</details>

<details>
<summary>▶️ Running the Tests</summary>

To execute all 35 automated test cases against the live system:

Bash
npx playwright test
</details>

<details>
<summary>📊 Viewing the Test Report</summary>

After execution, view a detailed HTML report providing a breakdown of each scenario:

Bash
npx playwright show-report
</details>
