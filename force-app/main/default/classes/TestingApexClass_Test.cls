@isTest
public class TestingApexClass_Test {
    public static CERM__Contract__c contractTest;
    public static CERM__Contract_Item__c contractItemTest;
    public static CERM__Contract__c contractTest1;
    public static CERM__Contract_Item__c contractItemTest1;
    
    private static testmethod void LightningContract1(){
        		
        Id recTypeId_ContractItem =Schema.SObjectType.Contract_Item__c.getRecordTypeInfosByName().get('Contract Buy').getRecordTypeId();
        Id recTypeId_ContractItem1 =Schema.SObjectType.Contract_Item__c.getRecordTypeInfosByName().get('Contract Sell').getRecordTypeId();
        Id recTypeId_ContractItem2 =Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Ticket Buy').getRecordTypeId();
        Id recTypeId_ContractItem3 =Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Ticket Sell').getRecordTypeId();
        Id recTypeId_ContractItem4 =Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Production Order').getRecordTypeId();
        Id recTypeId_ContractItem5 =Schema.SObjectType.CERM__Price_Component__c.getRecordTypeInfosByName().get('Instrument').getRecordTypeId();
        
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
        
        CERM__Currency__c curr1 =  new CERM__Currency__c();
        curr1.Name = 'USD';
        insert curr1;
        
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
        
        CERM__MD_Price_Component__c  prc = new CERM__MD_Price_Component__c();
        prc.Name = 'Fix Basis';
        prc.CERM__Type__c='Buy';
        insert prc;
        
        CERM__MD_Pricing_Header__c pheader = new CERM__MD_Pricing_Header__c();
        pheader.CERM__Account__c = a.id;
        pheader.CERM__Commodity__c = com.id;
        pheader.CERM__Location__c = bLoc.id;
        insert pheader;
        
        CERM__Pricing_Components__c pcomp = new CERM__Pricing_Components__c();
        //pcomp.CERM__Contract_Item__c = cfItem.id;
        pcomp.CERM__MD_Price_Component__c = prc.id;
        pcomp.CERM__MD_Pricing_Header__c = pheader.id;
        //insert pcomp;
        
        CERM__Price_Master__c pmaster = new CERM__Price_Master__c();
        pmaster.CERM__Price_Component__c = prc.id;
        pmaster.CERM__Price__c=100;
        pmaster.CERM__Account__c = a.id;
        pmaster.CERM__Business_Location__c = bloc.id;
        pmaster.CERM__Commodity__c = com.id;
        insert pmaster;
        
        
        //Created Contract record
        contractTest = new CERM__Contract__c();
        contractTest.CERM__Price_Type__c = 'Basis';
        contractTest.CERM__Account__c = a.Id;
        contractTest.CERM__BuySell__c  = 'Buy';
        contractTest.CERM__External_Reference__c = 'test ref';
        contractTest.CERM__Dispute_Resolution__c = 'Mediation';
        contractTest.CERM__Contract_Type__c='Contract Buy';
        contractTest.CERM__Marketing_Pool__c='Call Pool';
        insert contractTest;
        
        //Created ContractItem record
        contractItemTest = new CERM__Contract_Item__c();
        contractItemTest.CERM__Contract__c = contractTest.Id;
        contractItemTest.CERM__Account__c = a.Id;
        contractItemTest.CERM__Commodity__c = com.Id;
        contractItemTest.CERM__Quantity__c = 1000;
        contractItemTest.CERM__Business_Location__c = Bloc.Id;
        contractItemTest.CERM__DeliveryStartDate__c = Date.today();
        contractItemTest.CERM__DeliveryEndDate__c = Date.today() + 2;
        contractItemTest.CERM__BuySell__c = 'Buy';
        contractItemTest.RecordTypeId=recTypeId_ContractItem;
        contractItemTest.CERM__UoM__c=uom.Id;
        contractItemTest.CERM__Bag_UoM__c=uom.id;
        contractItemTest.CERM__FCL__c=1;
        contractItemTest.CERM__Bags__c=1;
        contractItemTest.CERM__Weight_Per_Bag__c=10;
        contractItemTest.CERM__Packaging_Material_Weight__c=10;
        insert contractItemTest;
        
        contractItemTest1 = new CERM__Contract_Item__c();
        contractItemTest1.CERM__Contract__c = contractTest.Id;
        contractItemTest1.CERM__Account__c = a.Id;
        contractItemTest1.CERM__Commodity__c = com.Id;
        contractItemTest1.CERM__Quantity__c = 1000;
        contractItemTest1.CERM__Business_Location__c = Bloc.Id;
        contractItemTest1.CERM__DeliveryStartDate__c = Date.today();
        contractItemTest1.CERM__DeliveryEndDate__c = Date.today() + 2;
        contractItemTest1.CERM__BuySell__c = 'Buy';
        contractItemTest1.RecordTypeId=recTypeId_ContractItem;
        contractItemTest1.CERM__UoM__c=uom.Id;
        contractItemTest1.CERM__Bag_UoM__c=uom.id;
        contractItemTest1.CERM__FCL__c=1;
        contractItemTest1.CERM__Bags__c=1;
        contractItemTest1.CERM__Weight_Per_Bag__c=10;
        contractItemTest1.CERM__Packaging_Material_Weight__c=10;
        insert contractItemTest1;
        
        CERM__Price_Component__c pcomponent=new CERM__Price_Component__c();
        pcomponent.name='price';
        pcomponent.CERM__Components__c=prc.id;
        pcomponent.CERM__Percent_of_Total_New__c=null;
        pcomponent.CERM__Contract_Item__c=contractItemTest.Id;
        insert pcomponent;
        
        CERM__Price_Component__c pcomponent1=new CERM__Price_Component__c();
        pcomponent1.name='price';
        pcomponent1.CERM__Components__c=prc.id;
        pcomponent1.CERM__Percent_of_Total_New__c=null;
        pcomponent1.CERM__Contract_Item__c=contractItemTest1.Id;
        insert pcomponent1;

        
        test.startTest();
        TestingApexClass tS=new TestingApexClass();
        tS.GenerateContractPdf_Controller(contractTest.Id);
        system.assertEquals(2, tS.Citem.size());
        test.stopTest();
    }

}