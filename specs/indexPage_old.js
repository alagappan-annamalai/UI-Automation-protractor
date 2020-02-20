let autoReloadJson = require ('auto-reload-json');
let workbook_location1 = './extFiles/inputData.xlsx';
let workbook_location2 = './extFiles/Design_eureQa.xlsx';

let workbook = XLSX.readFile('./extFiles/inputData.xlsx');
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
const writeJsonFile = require('write-json-file');
const excelToJson = require('convert-excel-to-json');

let worksheet1 = workbook.Sheets.Quick_Actions;
let worksheet2 = workbook.Sheets.SKU_Creation;

const EC = protractor.ExpectedConditions;

let dataJSONLogin = browser.params.dataConfigJSONLoginInfo;
let dataJSONLoginRead = autoReloadJson(dataJSONLogin);

let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);

 let dataJSONPageInfoConverted1 = browser.params.dataConfigJSONPageConvertedExcel1;
 let dataJSONPageInfoReadConverted1 = autoReloadJson(dataJSONPageInfoConverted1);

let dataJSONPageInfoConverted2 = browser.params.dataConfigJSONPageConvertedExcel2;
let dataJSONPageInfoReadConverted2 = autoReloadJson(dataJSONPageInfoConverted2);

let PO_automationPractice = new browser.params.automationPractice_PO();

beforeEach(async () => {
	await browser.waitForAngularEnabled(false);
});

describe('Testing Automation Practice site', () => {

it('Login Page', async () =>{

const result = excelToJson({
	sourceFile: workbook_location1,
	header:{    
        rows: 1
	},
	columnToKey: {
		'*': '{{columnHeader}}'
    }
});

(async () => {
	await writeJsonFile(dataJSONPageInfoConverted1, result);
})();


const result2 = excelToJson({
	sourceFile: workbook_location2,
	header:{
        rows: 1
	},
	columnToKey: {
		'*': '{{columnHeader}}'
    }
});
(async () => {
	await writeJsonFile(dataJSONPageInfoConverted2, result2);
})();

	expect(await PO_automationPractice.fn_URLNavigation()).toEqual(dataJSONPageInfoRead.indexPage.pageTitle);
});

it('After Login', async () =>{

	await PO_automationPractice.fn_loginToApplication();
	let elm1 =  await element(by.id("app"));
	let ecWaitForHomePageToLoad = await EC.and(EC.visibilityOf(elm1));
	await browser.wait(ecWaitForHomePageToLoad, 70000, 'Timeout: PageLoadError');
	browser.driver.sleep(10000);
	},60000);

it('Click Quick Actions', async () =>{
	await PO_automationPractice.fn_clickQuickActions();
});

it('Click SKU from Quick Actions', async () =>{
	await PO_automationPractice.fn_clickSKUFromQuickActions();
});

it('SKU Creation', async () =>{
	await PO_automationPractice.fn_SKUCreationFromQuickActions();
	browser.driver.sleep(5000);
});

});	