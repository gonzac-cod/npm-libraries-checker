# npm-libraries-checker

### Scanner to find specific compromised versions of libraries

-----

### Steps:

1.  **Move the `scanner.js` file into the parent folder of the projects** you want to scan.

2.  **Add the libraries and their versions** that you want to check for into the `MALICIOUS_VERSIONS` object in the `scanner.js` file.

    ```javascript
    const MALICIOUS_VERSIONS = {
      "example-library": ["1.0.1", "1.2.0"]
    };
    ```

3.  **Run the script** from your terminal to begin the scan.

    ```bash
    node scanner.js
    ```
