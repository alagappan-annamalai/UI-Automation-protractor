let autoReloadJson = require ('auto-reload-json');
const querySelectorShadowDom = require('query-selector-shadow-dom');
let workbook_location1 = './extFiles/inputData.xlsx';
let workbook_location2 = './extFiles/Design_eureQa.xlsx';

var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
const writeJsonFile = require('write-json-file');
const excelToJson = require('convert-excel-to-json');

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


function _getElementById(source, targetId)  {
	if(!source || !targetId) return;
	let sourceElement;
	let hasShadowRoot = false;
	let excludedTags = ["SLOT", "STYLE", "BEDROCK-PUBSUB", "IMG"]
	if(source.shadowRoot){
		hasShadowRoot = true;
	}
	if(hasShadowRoot){
		sourceElement = source.shadowRoot;
	}else{
		sourceElement = source;
	}
	let targetElement = sourceElement.querySelector('#'+targetId);
	if(targetElement){
		return targetElement;
	}else{
		let allChildren = sourceElement.querySelectorAll("*");
		if(allChildren && allChildren.length){
			for(let childIndex = 0; childIndex < allChildren.length; childIndex++){
				let childElement = allChildren[childIndex];
				if(excludedTags.indexOf(childElement.tagName) == -1){
					let childTargetElement = this._getElementById(childElement,targetId);
					if(childTargetElement){
						return childTargetElement;
					}
				}
			}
		}else{
			return null;
		}
	}
};

function sourceTarget(source1, target1) {
	let source1Elem = this.querySelector("#"+source1);
	let comp = this._getElementById(source1Elem, ""+target1);
	console.log(comp);
	return comp;
};


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
	
	},60000);

	it('Looping through different Customers', async () =>{
		for(let i=9;i<12;i++){
			await PO_automationPractice.fn_clickQuickActions();
			await PO_automationPractice.fn_clickEntityFromQuickActions(dataJSONPageInfoReadConverted1.Quick_Actions[6] ["Menu Items"]);
			//await PO_automationPractice.fn_CustomerCreationFromQuickActions(dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Customer ID"], dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Customer Display Name"], dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Full Billing Address"], dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Full Shipping Address"]);
			expect(await PO_automationPractice.fn_CustomerCreationFromQuickActions(dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Customer ID"], dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Customer Display Name"], dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Full Billing Address"], dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Full Shipping Address"])).toEqual(dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Full Shipping Address"]);
			await PO_automationPractice.fn_CustomerCreationCreateButton(dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Full Shipping Address"]);
			browser.driver.sleep(5000);
			await PO_automationPractice.fn_CustomerCreationNextButton();
			await PO_automationPractice.fn_CustomerCreationFinishAndCloseButton();
		//	expect(await PO_automationPractice.fn_CustomerCreationCompletion()).toEqual(dataJSONPageInfoReadConverted1.Customer_Creation[i] ["Customer Display Name"]);
		}
		
	});


// it('Click Quick Actions', async () =>{
// 	await PO_automationPractice.fn_clickQuickActions();
// });

// it('Click Entity from Quick Actions', async () =>{
	
// });

// it('Customer Creation', async () =>{
// 	expect(await PO_automationPractice.fn_CustomerCreationFromQuickActions(dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Customer ID"], dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Customer Display Name"], dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Full Billing Address"], dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Full Shipping Address"])).toEqual(dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Full Shipping Address"]);
// //	browser.driver.sleep(5000);
// });
// it('Customer Creation - Create Button Click', async () =>{
// 	await PO_automationPractice.fn_CustomerCreationCreateButton(dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Full Shipping Address"]);
// 	//await PO_automationPractice.fn_CustomerCreationFromQuickActions(dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Customer ID"], dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Customer Display Name"], dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Full Billing Address"], dataJSONPageInfoReadConverted1.Customer_Creation[1] ["Full Shipping Address"] );
// 	//browser.driver.sleep(5000);
// });

// it('Customer Creation - Next Button Click', async () =>{
// 	await PO_automationPractice.fn_CustomerCreationNextButton();
// 	//browser.driver.sleep(5000);
// });	
// it('Customer Creation - Finish and Close Button Click', async () =>{
// 	await PO_automationPractice.fn_CustomerCreationFinishAndCloseButton();
// 	browser.driver.sleep(5000);
// });	



});	