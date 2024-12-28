# JS Code Smell Detector Tool

## Overview

The **JS Code Smell Detector** is a JavaScript-based static code analysis tool designed to automatically detect and flag potential **code smells** in JavaScript and TypeScript codebases. This tool helps developers identify issues related to **code quality**, **readability**, **security vulnerabilities**, and **performance inefficiencies**.

By using this tool, you can improve your code's maintainability, reduce technical debt, and proactively address potential problems before they escalate. The tool utilizes various linting techniques and regular expressions to detect 14 common code smells in a codebase.

## Features

- **Comprehensive Detection**: Identifies 14 different types of code smells, including security issues, readability problems, and maintainability concerns.
- **Actionable Fixes**: Provides detailed descriptions and suggestions to help resolve each identified code smell.
- **Customizable Configuration**: Customize detection rules to fit your project's specific needs.
- **Interactive CLI**: A command-line interface (CLI) that guides users through the detection and analysis process.
- **Detailed Reporting**: Outputs a comprehensive report on the identified issues, with file names and line numbers.
- **Extensible Architecture**: Easily extend the tool by adding new detection rules or integrating it with your CI/CD pipeline.

## Installation

### Prerequisites

- **Node.js** (version 12.x or higher)
- **npm** (Node Package Manager)

### Steps to Install

1. Clone the repository:
    ```bash
    git clone https://github.com/Mustafa-tariq23/JS-codeSmells-detector-tool.git
    ```

2. Navigate to the project directory:
    ```bash
    cd JS-codeSmells-detector-tool
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

## Usage

### Running the Code Smell Detector

After installation, you can run the detector via the command line to analyze your JavaScript or TypeScript code files.

1. To run the tool, use the following command:

    ```bash
    node detector.js path/to/your/code/files
    ```

   - Replace `path/to/your/code/files` with the directory where your code files are located.
   - The script will analyze all JavaScript and TypeScript files in the specified directory and report any detected code smells.

### Sample Output

The tool will output the detected code smells in the following format:

- **Line 15**: The **switch statement** is missing a `default` case. It’s recommended to add one to handle unexpected inputs.
- **Line 38**: The **object** has too many properties (12 in this case), which can be hard to maintain. It’s suggested to break it into smaller objects for readability and modularity.
- **Line 80**: A **hard-coded API key** is detected in the code, which is a security risk. It's best practice to store sensitive data like API keys in environment variables or secure storage solutions.

The output will also provide **file names** and **line numbers** where the issues occur, making it easy for you to locate and fix them.

---

### How to Tackle Detected Code Smells

Once a code smell is detected, the following steps can be taken to resolve it:

1. **Review the Issue**: Inspect the code at the specified location (e.g., line 15) and understand why the smell was flagged.
2. **Apply the Suggested Fix**: The tool provides a brief suggestion on how to resolve the issue. For example:
   - If a `default` case is missing in a `switch` statement, add it to handle unexpected inputs.
   - If an object has too many properties, consider breaking it down into smaller, more manageable objects.
   - If hard-coded API keys are found, replace them with references to environment variables or configuration files.
3. **Test the Fix**: After applying the fix, ensure that the code still works as expected and that no other issues are introduced.

## Configuration

The tool can be customized through the `config.js` file, where you can define:

- Thresholds for large objects
- Enable/Disable specific checks
- Add custom detection rules using regular expressions
- Ignore specific files or directories

## Detailed Description of Code Smells Detected

The tool detects the following 14 types of code smells, with detailed descriptions and suggestions for fixing each one:

1. **Missing Default in Case Statement**  
   - Problem: Switch statements that lack a `default` case can lead to unhandled scenarios and unpredictable behavior.  
   - Fix: Add a `default` case to ensure all potential inputs are managed.

2. **Large Objects**  
   - Problem: Objects with too many properties increase complexity and reduce maintainability.  
   - Fix: Break large objects into smaller, focused objects to improve readability and modularity.

3. **Dead/Unused Code**  
   - Problem: Unused variables, functions, or unreachable code clutter the codebase and increase security risks.  
   - Fix: Remove or refactor unused code regularly.

4. **Hard-Coded Sensitive Information**  
   - Problem: Hard-coded sensitive data (e.g., API keys, passwords) exposes security risks.  
   - Fix: Store sensitive information in environment variables or secure storage solutions.

5. **Active Debugging Code**  
   - Problem: Leaving debugging code (like `console.log`) in production can expose internal details.  
   - Fix: Remove or conditionally disable debugging code in production.

6. **Insecure File Handling**  
   - Problem: Improper file handling during uploads can introduce security vulnerabilities.  
   - Fix: Implement strict file validation and sanitization mechanisms.

7. **Lengthy Lines**  
   - Problem: Lines of code exceeding 80-100 characters are hard to read.  
   - Fix: Break long lines into smaller, more manageable segments.

8. **Long Parameter List**  
   - Problem: Functions with many parameters are harder to understand and maintain.  
   - Fix: Reduce the number of parameters by using configuration objects or breaking down the function.

9. **Nested Callbacks (Callback Hell)**  
   - Problem: Excessively nested callback functions make code hard to read and debug.  
   - Fix: Use Promises or `async/await` for cleaner, more readable asynchronous code.

10. **Variable Re-Assign**  
    - Problem: Reassigning variables with different types can lead to bugs.  
    - Fix: Avoid reassignment or use unique variable names for different purposes.

11. **Duplicate Code**  
    - Problem: Repeated logic increases redundancy and the risk of errors.  
    - Fix: Refactor duplicate code into reusable functions or components.

12. **Unused Dependency**  
    - Problem: Unused dependencies bloat the codebase and may introduce security vulnerabilities.  
    - Fix: Regularly audit and remove unused dependencies.

13. **Empty Catch Block**  
    - Problem: Catch blocks without proper error handling can obscure issues.  
    - Fix: Log or handle errors within the `catch` block.

14. **Long Method/Function**  
    - Problem: Long methods/functions are difficult to maintain and test.  
    - Fix: Break large functions into smaller, focused ones.

## Tools and Techniques Used

- **JavaScript**: The primary language used to implement the code smell detection logic.
- **Node.js**: Provides the runtime environment.
- **Regular Expressions (Regex)**: Used extensively to match patterns in the source code.
- **Inquirer.js**: For creating an interactive CLI.
- **Babel Parser**: Parses JavaScript code into an Abstract Syntax Tree (AST) for deeper analysis.
- **ESLint** (Optional): Can be integrated for extended linting capabilities.

## Extending the Project

### Adding New Code Smells

To add a new code smell detection pattern, follow these steps:

1. Define a new regular expression to detect the code smell.
2. Add the regular expression to the `detector.js` file in the appropriate check functions.
3. Write a description for the issue and include a suggested fix.

### Example of Adding a Custom Check (Unused Import)

```javascript
{
  name: "Unused Import",
  check: (lines, filePath, projectRoot) => {
    const issues = [];
    const fullContent = lines.join("\n");
    const importRegex = /import\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+from\s+/g;
    let match;
    while ((match = importRegex.exec(fullContent)) !== null) {
      const lineNumber = fullContent.slice(0, match.index).split("\n").length;
      if (!new RegExp(`\\b${match[1]}\\b`).test(fullContent)) {
        issues.push({
          line: lineNumber,
          description: `Imported module ${match[1]} is not used. Consider removing it.`,
        });
      }
    }
    return issues;
  },
  fix: "Remove unused imports to reduce code complexity and improve performance."
}

### References

*   [MDN Web Docs](https://developer.mozilla.org/): Comprehensive resource for JavaScript syntax and best practices.
*   [ESLint Documentation](https://eslint.org/docs/): Linting tool for detecting potential issues in JavaScript code.
*   [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/): Security best practices for web development.
*   [Node.js Documentation](https://nodejs.org/en/docs/): Official documentation for Node.js.

---

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Contributing

To contribute to this project:

1.  Fork the repository.
2.  Create a new branch for your changes.
3.  Make your changes and write tests if necessary.
4.  Run the tests to ensure everything works as expected.
5.  Submit a pull request.

We welcome contributions to improve the tool!

### Contact Information

For questions, suggestions, or feedback, feel free to open an issue on [GitHub](https://github.com/Mustafa-tariq23/JS-codeSmells-detector-tool) or contact me at **SP22-BSE-119@cuilahore.edu.pk**.
