const sonarqubeScanner =  require('sonarqube-scanner'); // https://www.npmjs.com/package/sonarqube-scanner
const sonarqubeServerURL = process.env["SONAR_URL"] ||'http://somehost:9000'
console.log(`sonarqubeServerURL = ${sonarqubeServerURL}` )
const sonarQubeprojectName = process.env["SONAR_PROJECT_NAME"] || 'my-first-sonarqube-project'
sonarqubeScanner(
    {
        serverUrl:  sonarqubeServerURL,
        options : {
            'sonar.projectName': sonarQubeprojectName,
            'sonar.projectDescription': 'R&D project containing Fn function Probe',
            'sonar.sources':  '.',
            'sonar.tests':  '.',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  '**/*.test.js,./**/*.test.jsx',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});

