/******************************************************************************************************************************************
    Developer : CommodityERM
    Action    : This class is used as extension in vf page : GenerateContractPdf.
******************************************************************************************************************************************/

public with sharing class TestingApexClass {
    
    public List<CERM__Contract_Item__c> Citem{get;set;}
    public Set<Id> Citemid;
    public List<CERM__Price_Component__c> Cprice{get;set;}//
    public String currentDate{get;set;} 
    public CERM__Organization_Details__mdt orgDetails{get;set;} 
    
    /*****************************************************************************************************************************************
        Constructor :
    *****************************************************************************************************************************************/

    public void GenerateContractPdf_Controller(id recId) {
        Citem = new List<CERM__Contract_Item__c>();
        Cprice = new List<CERM__Price_Component__c>();
      	Citemid = new Set<Id>();
        List<CERM__Contract_Item__c> CitemList = new List<CERM__Contract_Item__c>();
      //  system.debug('recId'+recId);
       // String recId = (Id)controller.getRecord().id;
        currentDate = Date.today().format();
      
        if(Schema.sObjectType.CERM__Organization_Details__mdt.isAccessible() && Schema.sObjectType.CERM__Organization_Details__mdt.isQueryable()) {
            orgDetails = [select id, MasterLabel, DeveloperName from CERM__Organization_Details__mdt LIMIT 1];
        }
        else {  
            ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR, 'Insufficient access.'));
        }
        
        integer cnt = [Select count() From  CERM__Contract_Item__c Where (CERM__Contract__c =: recId AND RecordType.Name  IN ('Contract Buy','Contract Sell'))];
        if(cnt > 0){
            Citem=([Select Id,Name,CERM__Commodity__r.Name,CERM__UoM__r.Name,CERM__Business_Location__r.CERM__Account__r.BillingStreet, 
                    CERM__Business_Location__r.CERM__Account__r.BillingCity, CERM__Business_Location__r.CERM__Account__r.BillingState, 
                    CERM__Business_Location__r.CERM__Account__r.BillingPostalCode, CERM__Business_Location__r.CERM__Account__r.BillingCountry,
                    CERM__Business_Location__r.Name,CERM__PPU__c,CERM__IncoTerm__c,CERM__IncoTerm2__c,CERM__PaymentTerm__c,CERM__Delivery_Pickup_Time__c  
                    From  CERM__Contract_Item__c Where (CERM__Contract__c =: recId AND RecordType.Name  IN ('Contract Buy','Contract Sell'))]);
        }
     //   system.debug('Citem'+Citem);
        for(CERM__Contract_Item__c item : Citem)
        {
            Citemid.add(item.Id);
        }
        
      //  system.debug('Citemid'+Citemid);
      //  system.debug('Citemid'+Citemid.size());
        for(Id cId : Citemid){

        String theQuery2 = fetchFieldsApiNames('CERM__Price_Component__c');
        theQuery2 += 'CERM__Commodity__r.Name,'; 
        theQuery2 += 'CERM__Priced_Quantity_UoM__r.Name,'; 
        theQuery2 += 'CERM__UoM__r.Name'; 
        
        theQuery2 += ' from CERM__Price_Component__c where CERM__Contract_Item__c =: cId '; 
        if(Schema.sObjectType.CERM__Price_Component__c.isAccessible() && Schema.sObjectType.CERM__Price_Component__c.isQueryable()) {
            Cprice = Database.query(theQuery2);    
        }
        else {  
            ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR, 'Insufficient access.'));
        }
        }
      //  system.debug('Cprice'+Cprice);
    }   
    
    /*****************************************************************************************************************************************
        Method 1: This method is to create a dynamic soql string based on object api name.
    *****************************************************************************************************************************************/
    
    public static String fetchFieldsApiNames(String SobjectApiName) {
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(SobjectApiName).getDescribe().fields.getMap();
        
        String queryString = 'select ';
        for(String fieldName : fieldMap.keyset()) {
            queryString += fieldName + ',';    
        }        
        return queryString;
    }   
}