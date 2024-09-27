@isTest(SeeAllData='true')
private class CustomTab_Controller_Test {
    static testMethod void testMethod3() {
        
        Test.startTest();
            Test.setCurrentPage(Page.CustomTabs);
            CustomTab_Controllers cc = new CustomTab_Controllers();  
            System.assert(cc != null);
            CustomTab_Controllers.objectDetails ccc = new CustomTab_Controllers.objectDetails();
        	CustomTab_Controllers.getUIThemeDescription();
        	cc.getSettlementLink();
        	cc.getInvoiceLink();
        	cc.getReports();
        	cc.getserviceExpenseLink();
        	CustomTab_Controllers.getTabs('Commodity');
        	CustomTab_Controllers.getTabs('Inventory');
        	CustomTab_Controllers.getTabs('Price Updates');
        	CustomTab_Controllers.getTabs('Contract');
        	CustomTab_Controllers.getTabs('account');
        	//CustomTab_Controllers.getTabs('Fixed Cost Components');
        	//CustomTab_Controllers.getListView('Fixed Cost Components');
        	CustomTab_Controllers.getListView('Account');
        Test.stopTest();
    } 

}