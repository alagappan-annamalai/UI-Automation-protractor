//'use strict';
const EC = protractor.ExpectedConditions;

const commonHelper = browser.params.commonHelperAbsPath;

let autoReloadJson = require ('auto-reload-json');
//import { testHelpers } from '../src/core/e2e/helpers';


const automationPractice_PO = function () {

    let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);

let dataJSONLogin = browser.params.dataConfigJSONLoginInfo;
let dataJSONLoginRead = autoReloadJson(dataJSONLogin);

    let dataJSONPageInfoConvertedPO = browser.params.dataConfigJSONPageConvertedExcel1;
    let dataJSONPageInfoReadConverted1po = autoReloadJson(dataJSONPageInfoConvertedPO);

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

let entity_elm_All =  elm_navmenu.element(by.css_sr("::sr pebble-actions-dropdown::sr"));

let entity_landing_Page_elm1 =  elm_homepage_root.all(by.css_sr("::sr #contentViewManager::sr rock-content-view")).get(1);
let elm_customer_creation_next_button = entity_landing_Page_elm1.element(by.css_sr("::sr app-business-function::sr #wizardManage::sr #next"));
let elm_customer_creation_create_button = entity_landing_Page_elm1.all(by.css_sr("::sr app-business-function::sr #wizardManage::sr rock-entity-create::sr #next::sr #buttonTextBox")).get(0);
let elm_customer_creation_finish_close_button = entity_landing_Page_elm1.all(by.css_sr("::sr app-business-function::sr #wizardManage::sr rock-business-function-finish::sr pebble-button::sr #buttonTextBox")).get(0);
let elm_customer_creation_completeText = entity_landing_Page_elm1.element(by.css_sr("::sr app-entity-manage::sr #entityTitlebar::sr rock-titlebar::sr #supSubTitle"));
let entity_landing_Page_elm2 =  entity_landing_Page_elm1.element(by.css_sr("::sr app-business-function::sr #wizardManage::sr rock-entity-create::sr rock-attribute-list::sr "));
//attribute-box attribute-box-3
let customer_customerID_landing_page =  entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[0] ["Corresponding name in WebElement"]+'"]'));
let customer_customerID_input_elm = customer_customerID_landing_page;

let customer_customerID_input_field_Par =  customer_customerID_input_elm.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
let customer_customerID_input_field =  customer_customerID_input_field_Par.element(by.id("textbox"));

let custID1 =  entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[0] ["Corresponding name in WebElement"]+'"]'));
    let custID1_input_field_Par =  custID1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
    let custID1_input_field =  custID1_input_field_Par.element(by.id("textbox"));


    let custDisplayName1 =  entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[1] ["Corresponding name in WebElement"]+'"]'));
    let custDisplayName1_input_field_Par =  custDisplayName1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
    let custDisplayName1_input_field =  custDisplayName1_input_field_Par.element(by.id("textbox"));


    let fullBillingAddress1 =  entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[2] ["Corresponding name in WebElement"]+'"]'));
    let fullBillingAddress1_input_field_Par =  fullBillingAddress1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
    let fullBillingAddress1_input_field =  fullBillingAddress1_input_field_Par.element(by.id("textbox"));


    let fullShippingAddress1 =  entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[3] ["Corresponding name in WebElement"]+'"]'));
    let fullShippingAddress1_input_field_Par =  fullShippingAddress1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
    let fullShippingAddress1_input_field =  fullShippingAddress1_input_field_Par.element(by.id("textbox"));



let itemType_Input_Field_root =  entity_landing_Page_elm2.element(by.css('div[name="itemtype"]'));
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

let ecWaitForNextButtonInCustomerCreation= EC.and(EC.elementToBeClickable(elm_customer_creation_next_button));

let ecWaitForFinishButtonInCustomerCreation= EC.and(EC.visibilityOf(elm_customer_creation_finish_close_button),EC.elementToBeClickable(elm_customer_creation_finish_close_button));

let ecWaitForCompletionInCustomerCreation = EC.and(EC.visibilityOf(elm_customer_creation_completeText));

let ecWaitForEntityPageToLoad= EC.and(EC.visibilityOf(customer_customerID_landing_page));

let ecWaitForitemType_InputField_PopOverToLoad= EC.and(EC.visibilityOf(itemType_InputField_PopOver));

//Functions to use
this.fn_URLNavigation = async (elm10,elm20,elm30,elm40) => {
    if(elm10 && elm20){
        console.log(elm10,elm20);
    }
    else if (elm20)
    {
        console.log(elm20);
    }
    else if (elm10)
    {
        console.log(elm10);
    }
    else
    {
        console.log("Alagappan");
    }
    await browser.get(dataJSONPageInfoRead.indexPage.pageURL);
console.log(elm10);
console.log(elm20);

    for (var i=1; i<100 ; i++){
        browser.sleep(5000);
        //await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        
    if(!(await (elm_loginPage_submitButton.isPresent()))){
        console.log("i-value:",i);
      //  await browser.navigate(dataJSONPageInfoRead.indexPage.pageURL);
     // await browser.actions().sendKeys(protractor.Key.ENTER).perform();
     browser.refresh();
            }
    else{
        console.log("Else i-value:",i);
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
    let ecWaitForHomePageToLoad = await EC.and(EC.visibilityOf(elm_homepage_root));
	await browser.wait(ecWaitForHomePageToLoad, 70000, 'Timeout: PageLoadError');
	browser.driver.sleep(10000);
};

this.fn_clickQuickActions = async () => {

    await browser.wait(ecWaitForQuickActions, 20000, 'Timeout: Unable to View the Quick Actions');
    await quickActions_elm.click();
};

this.fn_clickEntityFromQuickActions = async (entity) => {
    //let entity_elm =  entity_elm_All.element(by.css('div[title="'+dataJSONPageInfoReadConverted1po.Quick_Actions[6] ["Menu Items"]+'"]'));
    let entity_elm =  entity_elm_All.element(by.css('div[title="'+entity+'"]'));
    let ecWaitForEntityFromQuickActions= EC.and(EC.visibilityOf(entity_elm));
    await browser.wait(ecWaitForEntityFromQuickActions, 20000, 'Timeout: Unable to View the Entity from Quick Actions');
    await entity_elm.click();
};

this.fn_SKUCreationFromQuickActions = async () => {
    await browser.wait(ecWaitForEntityPageToLoad, 50000, 'Timeout: SKU Page Loading Error');
    let mdmID=commonHelper.randomNumber(100000000,999999999);
    await customer_customerID_input_field.sendKeys(mdmID);
    await itemType_Input_Field.click();
    await browser.wait(ecWaitForitemType_InputField_PopOverToLoad, 50000, 'Timeout: SKU Page Loading Error');
   // await itemType_Input_Field_search.click();
  //  await itemType_Input_Field_search.sendKeys("New");
    browser.driver.sleep(5000);
};

this.fn_CustomerCreationFromQuickActions = async (customerId, customerDisplayName, fullBillingAddress, fullShippingAddress, shippingAddress) => {
    await browser.wait(ecWaitForEntityPageToLoad, 50000, 'Timeout: SKU Page Loading Error');
    if(customerId && customerDisplayName && fullBillingAddress && fullShippingAddress && shippingAddress){
console.log("Alagappan If Loop");
        // let custID1 = await entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[0] ["Corresponding name in WebElement"]+'"]'));
        // let custID1_input_field_Par = await custID1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
        // let custID1_input_field = await custID1_input_field_Par.element(by.id("textbox"));
        // await custID1_input_field.sendKeys(customerId);

        // let custDisplayName1 = await entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[1] ["Corresponding name in WebElement"]+'"]'));
        // let custDisplayName1_input_field_Par = await custDisplayName1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
        // let custDisplayName1_input_field = await custDisplayName1_input_field_Par.element(by.id("textbox"));
        // await custDisplayName1_input_field.sendKeys(customerDisplayName);

        // let fullBillingAddress1 = await entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[2] ["Corresponding name in WebElement"]+'"]'));
        // let fullBillingAddress1_input_field_Par = await fullBillingAddress1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
        // let fullBillingAddress1_input_field = await fullBillingAddress1_input_field_Par.element(by.id("textbox"));
        // await fullBillingAddress1_input_field.sendKeys(fullBillingAddress);

        // let fullShippingAddress1 = await entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[3] ["Corresponding name in WebElement"]+'"]'));
        // let fullShippingAddress1_input_field_Par = await fullShippingAddress1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
        // let fullShippingAddress1_input_field = await fullShippingAddress1_input_field_Par.element(by.id("textbox"));
        // await fullShippingAddress1_input_field.sendKeys(fullShippingAddress);

        // let shippingAddress1 = await entity_landing_Page_elm2.element(by.css('div[name="'+dataJSONPageInfoReadConverted1po.Customer_Attributes[0] ["Corresponding name in WebElement"]+'"]'));
        // let shippingAddress1_input_field_Par = await shippingAddress1.element(by.css_sr("rock-attribute::sr pebble-textbox::sr"))
        // let shippingAddress1_input_field = await shippingAddress1_input_field_Par.element(by.id("textbox"));
        // await shippingAddress1_input_field.sendKeys(customerId);
}
else if(customerId && customerDisplayName && fullBillingAddress && fullShippingAddress)
{

    await custID1_input_field.sendKeys(customerId);

    await custDisplayName1_input_field.sendKeys(customerDisplayName);

    await fullBillingAddress1_input_field.sendKeys(fullBillingAddress);

    return fullShippingAddress1_input_field.sendKeys(fullShippingAddress).then(function(){
        return fullShippingAddress1_input_field.getAttribute('value');
    });

  //  await browser.wait(EC.textToBePresentInElementValue(fullShippingAddress1_input_field, fullShippingAddress), 5000);
   // await console.log(fullShippingAddress1_input_field.getAttribute('value'));

   //  return await fullShippingAddress1_input_field.getAttribute('value');
     
    // await fullShippingAddress1_input_field.getText().then(function(text){
    //      console.log("Else Portion",text);
    //      return text;
    // })
}
else{
    console.log("Else Loop");
}

};
this.fn_CustomerCreationNextButton = async() =>{
 //   await browser.wait(commonHelper.isClickable(elm_customer_creation_next_button),5000);
   await browser.wait(ecWaitForNextButtonInCustomerCreation, 5000, 'Timeout: Next Button Error'); 
   await elm_customer_creation_next_button.click();
}

this.fn_CustomerCreationCreateButton = async(fullShippingAddress) =>{
    await browser.wait(EC.textToBePresentInElementValue(fullShippingAddress1_input_field, fullShippingAddress), 5000);
    await elm_customer_creation_create_button.click();
}

this.fn_CustomerCreationFinishAndCloseButton = async() =>{
    await browser.wait(ecWaitForFinishButtonInCustomerCreation, 50000, 'Timeout: Finish and Close Error'); 
    await elm_customer_creation_finish_close_button.click();
}

this.fn_CustomerCreationCompletion = async() =>{
    await browser.wait(ecWaitForCompletionInCustomerCreation, 50000, 'Timeout: SKU Page Loading Error'); 
    return await elm_customer_creation_completeText.getText().then(function(text){
        console.log(text);
            return text;
    });
}


};
module.exports = automationPractice_PO;