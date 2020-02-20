let path = require('path');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
require('protractor-screenshoter-plugin');
let currentDate = new Date();
var totalDateString = currentDate.getDate()+'-'+ (currentDate.getMonth() + 1)+'-'+(currentDate.getYear()+1900) +'-'+ currentDate.getHours()+'hrs-'+currentDate.getMinutes()+'min-'+currentDate.getUTCSeconds()+'sec';
let reportDirectory = './reportFolderScreenshotReporter'+totalDateString;

exports.config = {
  //  seleniumAddress:"http://localhost:4444/wd/hub",
 //   seleniumArgs: ["-Dwebdriver.ie.driver=C:\\Users\\alagappan.annamalai\\Downloads\\IEDriverServer_x64_3.9.\\IEDriverServer.exe"],
    //seleniumArgs: ['-Dwebdriver.edge.driver=C:\\Users\\alagappan.annamalai\\Downloads\\edgedriver_win64\\msedgedriver.exe'],


	directConnect:true,
    chromeDriver: './chromedriver.exe',
   //firefoxDriver: './geckodriver.exe',
   //With Shadow DOM, Firefox browser won't identify the elements which are in Shadow DOM.
   // So the test cases built with shadow DOM identiy elemnets will fail.
	capabilities:{
    	browserName: 'chrome'
    //  browserName: 'firefox',
    //  marionette: true
    // browserName: 'internet explorer',
    //     platform: 'ANY',
    //     version: '11'

        // 'browserName': 'MicrosoftEdge',
        // 'maxInstances': 1,
        // 'platformName': 'windows',
        // 'nativeEvents': false,
	},
	framework:'jasmine',
	specs:[
    //	'./specs/*.js'
    './specs/indexPage.js'
	],
	getPageTimeout:3000000,
    allScriptsTimeout:3000000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },
	plugins: [{
        
        package: 'protractor-screenshoter-plugin',
        screenshotPath: reportDirectory,
        screenshotOnExpect: 'failure+success',
        screenshotOnSpec: 'failure+success',
        withLogs: 'true',
        writeReportFreq: 'asap',
        htmlReport:'true',
        verbose:'info',
        clearFoldersBeforeTest: true,
     /*   failTestOnErrorLog: {
            failTestOnErrorLogLevel: 900
        }*/
    }],
	onPrepare(){

        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: false,     // display stacktrace for each failed assertion
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec: true,  // display each successful spec
            displayFailedSpec: true,      // display each failed spec
            displayPendingSpec: true,    // display each pending spec
            displaySpecDuration: true,   // display each spec duration
            displaySuiteNumber: true,    // display each suite number (hierarchical)
            colors: {
                success: 'green',
                failure: 'red',
                pending: 'cyan'
            },
            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '- '
            },
            customProcessors: []
        }));

        by.addLocator('css_sr', (cssSelector, opt_parentElement, opt_rootSelector) => {
            let selectors = cssSelector.split('::sr');
            if (selectors.length === 0) {
                return [];
            }
        
            let shadowDomInUse = (document.head.createShadowRoot || document.head.attachShadow);
            let getShadowRoot  = (el) => ((el && shadowDomInUse) ? el.shadowRoot : el);
            let findAllMatches = (selector, targets, firstTry) => {
                let using, i, matches = [];
                for (i = 0; i < targets.length; ++i) {
                    using = (firstTry) ? targets[i] : getShadowRoot(targets[i]);
                    if (using) {
                        if (selector === '') {
                            matches.push(using);
                        } else {
                            Array.prototype.push.apply(matches, using.querySelectorAll(selector));
                        }
                    }
                }
                return matches;
            };
        
            let matches = findAllMatches(selectors.shift().trim(), [opt_parentElement || document], true);
            while (selectors.length > 0 && matches.length > 0) {
                matches = findAllMatches(selectors.shift().trim(), matches, false);
            }
           return matches;
        });

        

		browser.params.dataConfigJSONPageStaticInfo = path.resolve(__dirname,'./common/pageStaticConfig.json');
		browser.params.commonHelperAbsPath = require('./helper/helperFunction.js');
        browser.params.automationPractice_PO = require('./pageObjects/automationPractice_PO.js');
        browser.params.dataConfigJSONPageConvertedExcel1 = path.resolve(__dirname,'./common/excelConvertJson1-inputData.json');
		browser.params.dataConfigJSONPageConvertedExcel2 = path.resolve(__dirname,'./common/excelConvertJson2-inputData.json');
        browser.params.dataConfigJSONLoginInfo = path.resolve(__dirname,'./.gitignore/environment.json');
		
    }



};
