const newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('../collection/API_Request.postman_collection.json'),
    environment: require('../ENV/API_Request_ENV.postman_environment.json'),
    reporters: ['htmlextra'],
    reporter: {
        htmlextra: {
            export: `./report/master_Report.html`,
            // template: './template.hbs'
            logs: true,
            showOnlyFails: false,
            noSyntaxHighlighting: true,
            // testPaging: true,
            browserTitle: "Request-report",
            title: "Request-Report",
            titleSize: 4,
            // omitHeaders: true,
            // skipHeaders: "Authorization",
            // hideRequestBody: ["Login"],
            // hideResponseBody: ["Auth Request"],
            showEnvironmentData: true,
            // skipEnvironmentVars: ["API_KEY"],
            // showGlobalData: true,
            // skipGlobalVars: ["API_TOKEN"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            // showFolderDescription: true,
            timezone: "Asia/Bangkok"
        }
    }

}).on('done', function (err, summary) {
    if (err) {
      throw err;
    }
    if (summary.run.failures !== 'undefined' && summary.run.failures.length != 0) {
      const output = {
        errors: [],
      };
      for (failure of summary.run.failures) {
        output.errors.push({
          name: failure.source.name,
          message: failure.error.message
        });
      }
      console.log(output);
    } else {
      console.log('Request-Scripts successful without errors');
    }
  });
  