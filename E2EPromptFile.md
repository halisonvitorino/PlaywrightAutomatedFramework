# End-to-End QA Workflow with Natural Language

## Workflow Overview

This prompt guides you through a complete 7-step QA workflow using MCP servers and AI agents to go from user story to committed automated test scripts.

---

## 🎯 STEP 1: Read User Story

### Prompt:

I need to start a testing workflow. Read the user story from the file: user-stories/signUp_feature.md
Summarize the key requirements, acceptance criteria and testing scope.

### Expected Output:

- Summary of the user story
- List of acceptance criteria
- Application URL
- Key features to test

---

## 🎯 STEP 2: Create Test Plan

### Prompt:

Based on the user story signUp_feature that we just reviewed, use the playwright-test-planner agent to:

1. Read the application URL from the user story
2. Explore the application and understand all workflows mentioned in the acceptance criteria
3. Create a comprehensive test plan that covers all acceptance criteria including:
   - Happy path scenarios
   - Negative scenarios (validation errors, empty fields, invalid data)
   - Edge cases and boundary conditions
   - Navigation flow tests
   - UI element validation

4. Save the test plan as: specs/bugbank-test-plan.md (Portuguese)

Ensure each test scenario includes:

- Clear test case title
- Detailed step-by-step instructions
- Expected results for each step
- Test data requirements

### Expected Output:

- Complete test plan markdown file saved to specs/
- Organized test scenarios with clear structure
- Gherkin and BDD format
- Browser exploration screenshots (if needed)

---

## 🧪 STEP 3: Perform Exploratory Testing

### Prompt:

Now I need to perform manual exploratory testing using Playwright MCP browser tools.
Read the test plan from: specs/bugbank-test-plan.md

Then execute the test scenarios defined in that plan:

1. Use Playwright browser tools to manually execute each test scenario from the plan
2. Follow the step-by-step instructions in each test case
3. Verify expected results match actual results
4. Take screenshots at error states occurs
5. Document your findings:
   - Test execution results for each scenario
   - Any UI inconsistencies or unexpected behaviors
   - Missing validations or bugs discovered
   - Screenshots as evidence

### Expected Output:

- Manual test execution results
- Screenshots of the application at various states
- List of observations and findings
- Any issues discovered during exploration

---

## ⚙️ STEP 4: Generate Automation Scripts

### Prompt:

Create automated test scripts using the playwright-test-generator agent.

Review:

1. Test plan from: specs/bugbank-test-plan.md (for test scenarios and steps)
2. Exploratory testing results from Step 3 (for actual element selectors and UI insights)

Using insights from the manual exploratory (Step 3) testing:

- Leverage the element selectors and locators that were successfully used in Step 3
- Use stable element properties (IDs, data attributes, roles) discovered during exploration
- Apply wait strategies and UI behaviors observed during manual testing
- Incorporate any workarounds for UI quirks discovered

Generate Playwright JavaScript automation scripts:

1. Create scripts for each test scenario from the test plan
2. Organize scripts into appropriate test suite files in: tests/signUp-tests/
3. Use the test case names and steps from the test plan
4. Use reliable selectors and strategies from exploratory testing

Requirements for all scripts:

- Follow Playwright best practices
- Include proper assertions using expect()
- Use descriptive test names matching the format in the test plan
- Use robust element selectors discovered during manual testing (Step 3)
- Add comments for complex steps
- Use proper wait strategies based on actual application behavior
- Add proper test hooks (beforeEach, afterEach)
- Configure for browsers (Chrome)

After generating the scripts, run the tests to verify they pass.

### Expected Output:

- Test suite files created in tests/signUp-tests/ based on test plan scenarios
- Scripts using robust selectors discovered during exploratory testing
- All scripts follow Playwright best practices
- Initial test generation complete

---

## 🔧 STEP 5: Execute and Heal Automation Tests

### Prompt:

Now execute the generated automation scripts and heal any failures using the playwright-test-healer agent.

1. Run all automation scripts in: tests/signUp-tests/
2. Identify any failing tests
3. For each failing test, use the playwright-test-healer agent to:
   - Analyze the failure (selector issues, timing issues, assertion failures)
   - Auto-heal the test by fixing selectors, adding waits, or adjusting assertions
   - Update the test script with the fixes
4. Re-run the healed tests to verify they pass
5. Repeat the heal process until all tests are stable and passing
6. Delete all exploratory scripts
7. Document (In Portuguese):
   - Initial test results (pass/fail count)
   - Healing activities performed
   - Final test results after healing
   - Any tests that couldn't be auto-healed

### Expected Output:

- All automation tests executed
- Failing tests identified and healed using test-healer agent
- Healed test scripts updated in tests/signUp-tests/
- Final stable test execution results
- Summary of healing activities performed
- Deleted exploratory scripts (debug-test.js, empty-test.js, exploratory-test.js, etc.)

---

## 📊 STEP 6: Create Test Report (In Portuguese)

### Prompt:

Now create a comprehensive test execution report based on manual testing, automation execution, and healing activities. Save the test report as: test-results/signUp-tests-report.md (Portuguese)

Please compile results from:

- Step 3: Manual exploratory testing results
- Step 4: Generated automation scripts
- Step 5: Automated test execution and healing results

Include:

1. Executive Summary
   - Total test cases planned
   - Test cases executed (manual + automated)
   - Overall Pass/Fail/Blocked status

2. Manual Test Results
   - Results from Step 3 exploratory testing
   - Screenshots and observations
   - Issues found during manual testing

3. Automated Test Results
   - Initial automation results from Step 5
   - Healing activities performed
   - Final test execution results after healing
   - Test suite execution summary
   - Pass/Fail count for each test suite

4. Defects Log
   - For any failed tests (manual or automated):
   - Bug ID
   - Severity (Critical/High/Medium/Low)
   - Title and Description
   - Steps to Reproduce
   - Expected vs Actual Behavior
   - Screenshots/Evidence
   - Environment Details

5. Test Coverage Analysis
   - Which acceptance criteria are covered
   - Coverage from manual vs automated tests
   - Any gaps in test coverage
   - Recommendations for additional testing

6. Summary and Recommendations
   - Overall quality assessment
   - Risk areas
   - Next steps

### Expected Output:

- Comprehensive test execution report covering both manual and automated testing
- Clear PASS/FAIL status for all test scenarios
- Detailed bug reports for failures
- Complete test coverage analysis
- Evidence and screenshots attached

---

## 🚀 STEP 7: Commit to Git Repository

**Git Repository URL:** `https://github.com/halisonvitorino/PlaywrightAutomatedFramework`

### Prompt:

Now commit all the test artifacts to the Git repository using the GitHub MCP server.

Git Repository URL: https://github.com/halisonvitorino/PlaywrightAutomatedFramework

Please perform the following Git operations:

1. Initialize Git repository (if not already initialized)
2. Stage all files in the workspace (all new and modified files) if not already staged
3. Create a commit with the message:
   "feat(tests): Add complete test suite for bugbank workflow
   - Add user story documentation
   - Add comprehensive test plan with all scenarios
   - Add test execution report with results
   - Add automated test scripts for checkout process
   - Include validation, navigation, and edge case tests

   Resolves signUp_feature

4. Push all changes to the Git repository
5. Provide a summary of what was committed and save as: test-results/summary-tests-report.md (Portuguese)

### Expected Output:

- All workspace files committed to Git
- Descriptive commit message following conventional commit format
- Confirmation of successful push to the provided repository
- Summary of changes
