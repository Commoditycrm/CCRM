@isTest
public class MixOrder_Testnew {

    public static CERM__Contract__c contractTest;
    public static CERM__Contract_Item__c contractItemTest;
    public static CERM__Contract__c contractTest1;
    public static CERM__Contract_Item__c contractItemTest1;
    static testMethod void method3() {
            
		Id recTypeId_ContractItem =Schema.SObjectType.Contract_Item__c.getRecordTypeInfosByName().get('Contract Buy').getRecordTypeId();
        Id recTypeId_ContractItem1 =Schema.SObjectType.Contract_Item__c.getRecordTypeInfosByName().get('Contract Sell').getRecordTypeId();
        Id recTypeId_ContractItem2 =Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Ticket Buy').getRecordTypeId();
        Id recTypeId_ContractItem3 =Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Ticket Sell').getRecordTypeId();
        Id recTypeId_ContractItem4 =Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Production Order').getRecordTypeId();

         Account a = new Account();
         a.Name ='Test';
         a.CERM__Email__c='sabareeshvijay07@gmail.com';   
         a.CERM__Additional_Emails__c='gokul.rgp@gmail.com';  
         a.phone='9600205548';   
         insert a;
        CERM__MD_Unit_of_Measure__c uom=new CERM__MD_Unit_of_Measure__c();
        uom.name='Metric Ton';
        insert uom;
        CERM__MD_Unit_of_Measure__c uom1=new CERM__MD_Unit_of_Measure__c();
        uom1.name='Kilogram';
        insert uom1;
         CERM__Commodity__c Com= new CERM__Commodity__c();
         Com.Name='Copper';
         //Com.CERM__Need_Prescription__c=false;   
         insert Com;
         CERM__Commodity__c Com1= new CERM__Commodity__c();
         Com1.Name='Zinc';
         Com1.CERM__Need_Prescription__c=false;   
         insert Com1;
         
         CERM__BusinessLocation__c Bloc= new CERM__BusinessLocation__c();
         Bloc.name= 'Chennai';  
         insert Bloc;
        
         //Created Contract record
        contractTest = new CERM__Contract__c();
        contractTest.CERM__Price_Type__c = 'Basis';
        contractTest.CERM__Account__c = a.Id;
        contractTest.CERM__BuySell__c  = 'sell';
        contractTest.CERM__External_Reference__c = 'test ref';
        contractTest.CERM__Dispute_Resolution__c = 'Mediation';
        //contractTest.CERM__Contract_Type__c='Contract Buy';
        contractTest.CERM__Marketing_Pool__c='Call Pool';
        insert contractTest;
        
        //Created ContractItem record
        contractItemTest = new CERM__Contract_Item__c();
        contractItemTest.CERM__Contract__c = contractTest.Id;
        contractItemTest.CERM__Account__c = a.Id;
        contractItemTest.CERM__Commodity__c = com.Id;
        contractItemTest.CERM__Quantity__c = 2000;
        contractItemTest.CERM__Business_Location__c = Bloc.Id;
        contractItemTest.CERM__DeliveryStartDate__c = Date.today();
        contractItemTest.CERM__DeliveryEndDate__c = Date.today() + 2;
        contractItemTest.CERM__BuySell__c = 'sell';
        contractItemTest.RecordTypeId=recTypeId_ContractItem4;
        contractItemTest.CERM__UoM__c=uom.Id;
        insert contractItemTest;
        
        contractItemTest1 = new CERM__Contract_Item__c();
        contractItemTest1.CERM__Contract__c = contractTest.Id;
        contractItemTest1.CERM__Account__c = a.Id;
        contractItemTest1.CERM__Commodity__c = com.Id;
        contractItemTest1.CERM__Quantity__c = 1500;
        contractItemTest1.CERM__Business_Location__c = Bloc.Id;
        contractItemTest1.CERM__DeliveryStartDate__c = Date.today();
        contractItemTest1.CERM__DeliveryEndDate__c = Date.today() + 2;
        contractItemTest1.CERM__BuySell__c = 'Buy';
        contractItemTest1.RecordTypeId=recTypeId_ContractItem2;
        contractItemTest1.CERM__Tickets__c=contractItemTest.Id; 
        contractItemTest1.CERM__UoM__c=uom.Id;
        insert contractItemTest1;
        
        CERM__BL_Commodity__c Inventory= new CERM__BL_Commodity__c();
        Inventory.CERM__Business_Location__c=Bloc.id;
        //Inventory.CERM__Inventory_DB__c=1200;
        //Inventory.CERM__Net_Stock_Position__c=500;
        //Inventory.CERM__Storage_Net__c=8560;
        Inventory.CERM__Commodity__c=com1.id;
        Inventory.CERM__Base_UoM__c=uom.id;
        Inventory.CERM__Quantity__c=1500;
        insert Inventory;
        
        CERM__Biz_Location_Commodity_Account__c busLoc_Comm_acc = new CERM__Biz_Location_Commodity_Account__c(CERM__Account__c = a.Id, CERM__Biz_Location_Commodity__c = Inventory.id);
        insert busLoc_Comm_acc;
        Map<String, CERM__Biz_Location_Commodity_Account__c> mapOfCommNameToStorage= new Map<String, CERM__Biz_Location_Commodity_Account__c>();
        mapOfCommNameToStorage.put(busLoc_Comm_acc.CERM__Commodity__c, busLoc_Comm_acc);
        
        CERM__Commodity_Movements__c cMov=new CERM__Commodity_Movements__c();
        cMov.CERM__Commodity__c=com.Id;
        cMov.CERM__UoM_Base__c=uom.id;
        cMOv.CERM__Account__c=A.Id;
        cMov.CERM__Contract_Item__c=contractItemTest1.Id;
        cMov.CERM__Biz_Location_Commodity_Account__c=busLoc_Comm_acc.id;
        cMov.CERM__BizLocCommodityRef__c=Inventory.Id;
        insert cMov;
            
         //CERM__Ingredient_Commodity__c ingredientcom= new CERM__Ingredient_Commodity__c();
            //ingredientcom.
         
          CERM__Ingredients__c ingredient= new CERM__Ingredients__c();
             ingredient.CERM__Quantity_Factor__c=10;
              ingredient.CERM__Ingredient_Commodity__c= com1.id; 
                ingredient.Input_Output__c='Input';
                ingredient.Alternate_UoM__c=uom1.id;
            ingredient.CERM__Parent_Commodity__c=contractItemTest.CERM__Commodity__c;
            insert ingredient;
            List<CERM__Ingredients__c> Lingredient=new List<CERM__Ingredients__c>();
            Lingredient.add(ingredient);
        
        	Map<Id, String> CommodityIdToCommName=new Map<Id, String>();
        	CommodityIdToCommName.put(com.Id, Com.Name);
            
            Test.startTest();
            //MixOrder_Controller mixorder= new MixOrder_Controller();
            
            Pagereference p = Page.MixOrder;
            test.setCurrentPage(p);
            p.getParameters().put('integer','0');
            //ApexPages.StandardController con = new ApexPages.StandardController();
            //ApexPages.currentPage().getParameters().put('id', 'indexOfPriceComp');
            MixOrder_Controller mixorder = new MixOrder_Controller();
            //mixorder.removePriceComp();
            //mixorder.setOfCompIds(bl.id);
                //public Contract__c con{get;set;}
    			//public Contract_Item__c conitem{get;set;}
        	//mixorder.CommodityIdToCommName=CommodityIdToCommName;
        	//mixorder.mapOfCommNameToStorage=mapOfCommNameToStorage;
			mixorder.con=contractTest;
            mixorder.conitem=contractItemTest;
            mixorder.toRunRenderCom_method=true;
            mixorder.listOfMasterIngredients=Lingredient;
            //mixorder.setOfCompIds=contractTest.Id;
            mixorder.showSubItem(100);
        	mixorder.splitContract();
        	mixorder.splitContractnRefresh();
        	mixorder.renderComponent();
            mixorder.addPrice();
        	//mixorder.removePriceComp();
        	mixorder.futureValues();
        	mixorder.showSubItem(100);
        	//mixorder.mapOfCommNameToInventory=Inventory;
        	mixorder.saveContract();
        	system.assertEquals(true, mixorder.successmessage);
            test.stopTest();
            
        }

}