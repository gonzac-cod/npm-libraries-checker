const fs = require("fs");
const path = require("path");

// Add libraries here
const MALICIOUS_VERSIONS = {
  "example-library": ["1.0.1", "1.2.0"]
};

function checkPackageLock(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const deps = { ...data.dependencies };

    for (const [name, badVersions] of Object.entries(MALICIOUS_VERSIONS)) {
      if (deps[name] && badVersions.includes(deps[name].version)) {
        console.log(`! ${name}@${deps[name].version} found in ${filePath}`);
      }
    }
  } catch (err) {
    // Errors
  }
}

function scanDirectory(root) {
  const entries = fs.readdirSync(root, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath);

      const packageLockPath = path.join(fullPath, "package-lock.json");
      if (fs.existsSync(packageLockPath)) {
        checkPackageLock(packageLockPath);
      }
    }
  }
}

console.log("Scanning compromised versions...");
scanDirectory(process.cwd());
console.log("Review completed.");

