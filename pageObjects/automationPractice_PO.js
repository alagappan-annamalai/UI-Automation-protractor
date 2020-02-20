//'use strict';
const EC = protractor.ExpectedConditions;

const commonHelper = browser.params.commonHelperAbsPath;

let autoReloadJson = require ('auto-reload-json');

let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);

const automationPractice_PO = function () {

let dataJSONPageInfoConvertedPO = browser.params.dataConfigJSONPageConvertedExcel1;
let dataJSONPageInfoReadConverted1po = autoReloadJson(dataJSONPageInfoConvertedPO);

let dataJSONLogin = browser.params.dataConfigJSONLoginInfo;
let dataJSONLoginRead = autoReloadJson(dataJSONLogin);

//Elements in the page
let elm_loginPage_email = element(by.name("email"));
let elm_loginPage_password = element(by.name("password"));
let elm_loginPage_submitButton = element(by.className("auth0-lock-submit"));

let elm_homepage_root =   element(by.id("app"));
let elm_navmenu =  elm_homepage_root.element(by.css_sr("::sr app-common::sr  app-drawer rock-navmenu"));
let quickActions_elm_All =  elm_navmenu.element(by.css_sr("::sr"));
let quickActions_elm =  quickActions_elm_All.all(by.css('a[title = "Quick Actions"]')).get(0);

//class = "menuIcon page-title-icon"]
//let quickActions_elm = await elm_homepage_root(by.css_sr("::sr app-common::sr  app-drawer rock-navmenu::sr [title=\"Quick Actions\"]]"));

let sku_elm_All =  elm_navmenu.element(by.css_sr("::sr pebble-actions-dropdown::sr"));
let sku_elm =  sku_elm_All.element(by.css('div[title="'+dataJSONPageInfoReadConverted1po.Quick_Actions[0] ["Menu Items"]+'"]'));

let sku_landing_Page_elm1 =  elm_homepage_root.all(by.css_sr("::sr #contentViewManager::sr rock-content-view")).get(1);
let sku_landing_Page_elm2 =  sku_landing_Page_elm1.element(by.css_sr("::sr app-business-function::sr #wizardManage::sr rock-entity-create::sr rock-attribute-list::sr "))
//attribute-box attribute-box-3
let sku_landing_Page_elm3 =  sku_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.SKU_Creation[0] ["Corresponding name in WebElement"]+'"]'));
let sku_mdm_input_elm = sku_landing_Page_elm3;

let mdm_Id_Input_Field_Par =  sku_mdm_input_elm.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
let mdm_Id_Input_Field =  mdm_Id_Input_Field_Par.element(by.id("textbox"));

let itemType_Input_Field_root =  sku_landing_Page_elm2.element(by.css('div[name="itemtype"]'));
let itemType_Input_Field_par =  itemType_Input_Field_root.element(by.css_sr("rock-attribute::sr rock-entity-combo-box::sr pebble-combo-box::sr pebble-collection-container::sr"));
let itemType_Input_Field =  itemType_Input_Field_par.element(by.className("tags-container"));

let itemType_InputField_PopOver =  itemType_Input_Field_par.element(by.id("tagPopover"));

let itemType_Input_Field_search_par =  itemType_Input_Field_root.element(by.css_sr("rock-attribute::sr rock-entity-combo-box::sr pebble-combo-box::sr pebble-collection-container pebble-lov::sr"));
let itemType_Input_Field_search =  itemType_Input_Field_search_par.element(by.id("searchbox"));

//let random_number_9digits = _.random(100000000,999999999);
//Expected Conditions
let ecWaitForLoginPageToLoad = EC.and (EC.visibilityOf(elm_loginPage_email), 
	EC.elementToBeClickable(elm_loginPage_submitButton));

let ecWaitForQuickActions= EC.and(EC.visibilityOf(quickActions_elm));

let ecWaitForSKUFromQuickActions= EC.and(EC.visibilityOf(sku_elm));

let ecWaitForSKUPageToLoad= EC.and(EC.visibilityOf(sku_landing_Page_elm3));

let ecWaitForitemType_InputField_PopOverToLoad= EC.and(EC.visibilityOf(itemType_InputField_PopOver));

    for (var i=1; i<100 ; i++){
        browser.sleep(5000);
       
if(!(await (elm_loginPage_submitButton.isPresent()))){
        
     browser.refresh();
            }
    else{
                break;
    }
    }
	await browser.wait(ecWaitForLoginPageToLoad, 200000, 'Timeout: PageLoadError');
	return browser.getTitle();
};

this.fn_loginToApplication = async () => {
	await elm_loginPage_email.sendKeys(dataJSONLoginRead.login.email);
	await elm_loginPage_password.sendKeys(dataJSONLoginRead.login.password);
    await elm_loginPage_submitButton.click();
    
};

this.fn_clickQuickActions = async () => {
    await browser.wait(ecWaitForQuickActions, 20000, 'Timeout: Unable to View the Quick Actions');
    await quickActions_elm.click();
};

this.fn_clickSKUFromQuickActions = async () => {
    await browser.wait(ecWaitForSKUFromQuickActions, 20000, 'Timeout: Unable to View the SKU from Quick Actions');
    await sku_elm.click();
};

this.fn_SKUCreationFromQuickActions = async () => {
    await browser.wait(ecWaitForSKUPageToLoad, 50000, 'Timeout: SKU Page Loading Error');
    let mdmID=commonHelper.randomNumber(100000000,999999999);
    await mdm_Id_Input_Field.sendKeys(mdmID);
    await itemType_Input_Field.click();
    await browser.wait(ecWaitForitemType_InputField_PopOverToLoad, 50000, 'Timeout: SKU Page Loading Error');
   // await itemType_Input_Field_search.click();
  //  await itemType_Input_Field_search.sendKeys("New");
    browser.driver.sleep(5000);
};

};
module.exports = automationPractice_PO;