const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const inquirer = require("inquirer");

// List of file extensions to analyze
const allowedExtensions = [".js", ".jsx", ".ts", ".tsx"];
const excludePatterns = [/\.json$/i, /\.html$/i, /\.css$/i, /\.min\.js$/i, /\.config\.js$/i, /eslint\.config.*\.js$/i];

// Load code smells from a configuration file if available
let customSmellsPath = path.resolve(__dirname, "codeSmells.json");
let codeSmells = [];
if (fs.existsSync(customSmellsPath)) {
  try {
    codeSmells = JSON.parse(fs.readFileSync(customSmellsPath, "utf-8"));
  } catch (err) {
    console.error("Error reading codeSmells.json:", err.message);
    process.exit(1);
  }
} else {
  console.warn(
    "Using default code smells. Provide a `codeSmells.json` file to customize."
  );
  codeSmells = require("./smells");
}

// Recursive function to explore directories
const exploreFolder = (dirPath, files = [], ignore = []) => {
  let entries;
  try {
    entries = fs.readdirSync(dirPath);
  } catch (err) {
    console.error(`Error reading directory: ${dirPath}`, err.message);
    return files;
  }

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory() && !ignore.includes(entry)) {
      exploreFolder(fullPath, files, ignore);
    } else if (stats.isFile()) {
      const ext = path.extname(fullPath);
      const isAllowedExtension = allowedExtensions.includes(ext);
      const matchesExcludePattern = excludePatterns.some((pattern) =>
        pattern.test(fullPath)
      );

      if (isAllowedExtension && !matchesExcludePattern) {
        files.push(fullPath);
      }
    }
  });

  return files;
};

// Analyze a file for code smells
const analyzeFile = async (filePath, projectRoot, selectedSmells = null) => {
  let content;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err.message);
    return [];
  }

  // Skip empty files
  if (!content.trim()) {
    console.warn(`Skipping empty file: ${filePath}`);
    return [];
  }

  const lines = content.split("\n");
  const smellsDetected = new Map();

  // Use either selected smells or all smells
  const smellsToCheck = selectedSmells 
    ? codeSmells.filter(smell => selectedSmells.includes(smell.name))
    : codeSmells;

  smellsToCheck.forEach((smell) => {
    const occurrences = smell.check(lines, filePath, projectRoot);
    occurrences.forEach((occurrence) => {
      const key = `${filePath}-${occurrence.line}-${smell.name}`;
      if (!smellsDetected.has(key)) {
        smellsDetected.set(key, {
          file: filePath,
          line: occurrence.line,
          smell: smell.name,
          description: occurrence.description,
          fix: smell.fix
        });
      }
    });
  });

  return Array.from(smellsDetected.values());
};

// Analyze all files in the project
const analyzeProject = async (files, projectRoot, selectedSmells = null) => {
  let results = [];
  for (const file of files) {
    const fileResults = await analyzeFile(file, projectRoot, selectedSmells);
    results = results.concat(fileResults);
  }

  // Check for project-level smells
  const smellsToCheck = selectedSmells 
    ? codeSmells.filter(smell => selectedSmells.includes(smell.name))
    : codeSmells;

  smellsToCheck.forEach((smell) => {
    if (smell.name === "Unused Dependency") {
      const packageJsonPath = path.join(projectRoot, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const occurrences = smell.check([], packageJsonPath, projectRoot);
        results = results.concat(occurrences);
      }
    }
  });

  return results;
};

// Generate reports (your existing report generation functions)
const generateDetailedReport = (results) => {
  const groupedByFile = results.reduce((acc, r) => {
    acc[r.file] = acc[r.file] || [];
    acc[r.file].push(r);
    return acc;
  }, {});

  const report = [];
  for (const [file, issues] of Object.entries(groupedByFile)) {
    report.push(`FILE: ${file.replace(/\\/g, "/")}`);
    issues.forEach((issue) => {
      report.push(
        ` - [Line ${issue.line}] ${issue.smell}\n` +
          `   Defect: ${issue.description}\n` +
          `   Solution: ${issue.fix}\n`
      );
    });
  }

  return report.join("\n");
};

const generateSummaryReport = (results) => {
  const totalSmells = results.length;
  const fileCount = new Set(results.map((r) => r.file)).size;
  const averageSmells = (totalSmells / fileCount).toFixed(2);

  let report = [
    "\nSummary Report:",
    "===============",
    `Total Code Smells: ${totalSmells}`,
    `Average Defects Per File: ${averageSmells}`,
    "\nDefects by File:",
  ];

  const groupedByFile = results.reduce((acc, r) => {
    acc[r.file] = acc[r.file] || [];
    acc[r.file].push(r);
    return acc;
  }, {});

  for (const [file, issues] of Object.entries(groupedByFile)) {
    report.push(`${file}: ${issues.length} defects`);
  }

  return report.join("\n");
};

// Main function
const main = async (inputPath, options) => {
  if (!inputPath && options.listSmells) {
    const report = [
      "\nAvailable Code Smells:",
      "====================",
      ...codeSmells.map(
        (smell) => `- ${smell.name}: ${smell.description || 'No description available'}`
      ),
    ].join("\n");

    if (options.output) {
      const outputPath = path.join(process.cwd(), options.output);
      fs.writeFileSync(outputPath, report);
      console.log(`Report saved to ${outputPath}`);
    } else {
      console.log(report);
    }
    return;
  }

  if (!inputPath || !fs.existsSync(inputPath)) {
    console.error("Invalid or empty path provided!");
    return;
  }

  console.log(`Analyzing path: ${inputPath}`);

  let files = [];
  const stats = fs.statSync(inputPath);
  let projectRoot = inputPath;

  if (stats.isDirectory()) {
    files = exploreFolder(inputPath);
    console.log(`Found ${files.length} files to analyze.`);
    projectRoot = inputPath;
  } else if (stats.isFile() && allowedExtensions.includes(path.extname(inputPath))) {
    files = [inputPath];
    projectRoot = path.dirname(inputPath);
  } else {
    console.error("Unsupported file type.");
    return;
  }

  if (files.length === 0) {
    console.log("No valid files found to analyze!");
    return;
  }

  const results = await analyzeProject(files, projectRoot, options.selectedSmells);
  if (results.length === 0) {
    console.log("No code smells detected!");
    return;
  }

  let output;
  if (options.listSmells) {
    const detectedSmells = new Set(results.map((r) => r.smell));
    output = [
      "\nDetected Code Smells:",
      "====================",
      ...Array.from(detectedSmells).map((smell) => {
        const count = results.filter((r) => r.smell === smell).length;
        return `- ${smell} (${count} occurrences)`;
      }),
    ].join("\n");
  } else if (options.summary) {
    output = generateSummaryReport(results);
  } else {
    output = generateDetailedReport(results);
  }

  if (options.output) {
    let outputPath = path.join(process.cwd(), options.output);
    fs.writeFileSync(outputPath, output);
    console.log(`Report saved to ${outputPath}`);
  } else {
    console.log(output);
  }
};

// Interactive menu
async function showInteractiveMenu() {
  const initialQuestion = {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: 'Analyze code for all smells', value: 'analyzeAll' },
      { name: 'Analyze code for specific smells', value: 'analyzeSpecific' },
      { name: 'List available code smells', value: 'list' },
      { name: 'Exit', value: 'exit' }
    ]
  };

  const { action } = await inquirer.prompt(initialQuestion);

  if (action === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  }

  if (action === 'list') {
    await main(null, { listSmells: true });
    return;
  }

  // Get available smells for selection
  const availableSmells = codeSmells.map(smell => ({
    name: `${smell.name}: ${smell.description || 'No description available'}`,
    value: smell.name,
    checked: false
  }));

  // Analysis questions
  const analysisQuestions = [
    {
      type: 'input',
      name: 'path',
      message: 'Enter the path to analyze (file or directory):',
      validate: (input) => {
        if (!input) return 'Path cannot be empty';
        if (!fs.existsSync(input)) return 'Path does not exist';
        return true;
      }
    }
  ];

  // Add smell selection if user chose specific analysis
  if (action === 'analyzeSpecific') {
    analysisQuestions.push({
      type: 'checkbox',
      name: 'selectedSmells',
      message: 'Select which code smells to detect:',
      choices: availableSmells,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one code smell.';
        }
        return true;
      }
    });
  }

  analysisQuestions.push(
    {
      type: 'list',
      name: 'reportType',
      message: 'What type of report would you like?',
      choices: [
        { name: 'Detailed report', value: 'detailed' },
        { name: 'Summary report', value: 'summary' }
      ]
    },
    {
      type: 'confirm',
      name: 'saveToFile',
      message: 'Would you like to save the output to a file?',
      default: false
    },
    {
      type: 'input',
      name: 'outputPath',
      message: 'Enter the output file path:',
      when: (answers) => answers.saveToFile,
      default: 'report.txt'
    },
    {
      type: 'list',
      name: 'format',
      message: 'Select output format:',
      choices: [
        { name: 'Text', value: 'txt' },
        { name: 'JSON', value: 'json' },
        { name: 'CSV', value: 'csv' }
      ],
      when: (answers) => answers.saveToFile
    }
  );

  const answers = await inquirer.prompt(analysisQuestions);

  // Convert answers to program options format
  const options = {
    summary: answers.reportType === 'summary',
    report: answers.reportType === 'detailed',
    output: answers.saveToFile ? answers.outputPath : null,
    format: answers.saveToFile ? answers.format : null,
    selectedSmells: action === 'analyzeSpecific' ? answers.selectedSmells : null
  };

  await main(answers.path, options);

  // Ask if user wants to perform another action
  const { continueAnalysis } = await inquirer.prompt({
    type: 'confirm',
    name: 'continueAnalysis',
    message: 'Would you like to perform another action?',
    default: false
  });

  if (continueAnalysis) {
    await showInteractiveMenu();
  } else {
    console.log('Goodbye!');
    process.exit(0);
  }
}

// CLI setup
program
  .description("Analyze JavaScript/TypeScript code for code smells.")
  .option("-i, --interactive", "Run in interactive mode")
  .parse(process.argv);

const options = program.opts();

// Run either interactive mode or process command line arguments
if (options.interactive) {
  showInteractiveMenu().catch((err) => {
    console.error("Error during analysis:", err);
  });
} else {
  const filePath = program.args[0];
  main(filePath, options).catch((err) => {
    console.error("Error during analysis:", err);
  });
}