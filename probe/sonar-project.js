const sonarqubeScanner =  require('sonarqube-scanner'); // https://www.npmjs.com/package/sonarqube-scanner
const sonarqubeServerURL = process.env["SONARQUBE_SERVER_URL"] ||'http://localhost:9000'
sonarqubeScanner(
    {
        serverUrl:  sonarqubeServerURL,
        options : {
            'sonar.projectName': 'my-first-sonarqube-project',
            'sonar.projectDescription': 'R&D project containing Fn function Probe',
            'sonar.sources':  '.',
            'sonar.tests':  '.',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  '**/*.test.js,./**/*.test.jsx',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});

