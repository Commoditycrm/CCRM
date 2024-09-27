public class GlobalSearchController_Lightning {
    public static List<CERM__TC_Link__c> allAppLinks = new List<CERM__TC_Link__c>();
    public static List<CERM__Contract_Item__c> allContractItems = new List<CERM__Contract_Item__c>();
    public static List<Account> allAccounts = new List<Account>();
    public static List<CERM__Price_Component__c> scheduleOrder = new List<CERM__Price_Component__c>();
    public boolean NewScheduleLoad;
	public static List<List<SObject>> searchList;
    @AuraEnabled
    public static List<List<SObject>> searchForIds(String searchText) 
    {               
        String rectype = 'Planned Load';
        List<string> recTypes = new List<String> {'Contract Buy' , 'Contract Sell'};
        /*List<List<SObject>> results = [FIND :searchText IN ALL FIELDS RETURNING Account(Name), CERM__Contract_Item__c(Name,CERM__Account__c,CERM__Commodity__c,CERM__Pos_Unapplied__c,RecordType.Name where RecordType.Name IN : recTypes)  , CERM__Price_Component__c (Name,Account__c,Commodity__c,RecordType.Name,CERM__Contract_Item__c,Reference_No__c where RecordType.Name =: recType)];
        List<SObject> ids = new List<SObject>();
        for (List<SObject> sobjs : results) {
          for (SObject sobj : sobjs) {
            ids.add(sobj);
          }
        }
        return ids;*/
 		try{
            if(searchText != null && searchText.length() > 0){
                String searchquery = 'FIND \'' + String.escapeSingleQuotes(searchText)+'\' IN ALL FIELDS RETURNING Account(Name), CERM__TC_Link__c(Name), CERM__Contract_Item__c(Name,CERM__Account__c,CERM__Commodity__c,CERM__Pos_Unapplied__c,RecordType.Name where RecordType.Name IN : recTypes), CERM__Price_Component__c (Name,Account__c,Commodity__c,RecordType.Name,CERM__Contract_Item__c,Reference_No__c where RecordType.Name =: recType)';
              //  system.debug('###---searchquery--' + searchquery);
                searchList = search.query(searchquery);
                
                /*allAccounts = (Account[])searchList[0];
                allAppLinks = (CERM__TC_Link__c[])searchList[1];
                allContractItems = (CERM__Contract_Item__c[])searchList[2];
                scheduleOrder = (CERM__Price_Component__c[])searchList[3];
                system.debug('allAccounts---->'+allAccounts);
                system.debug('allAppLinks---->'+allAppLinks);
                system.debug('allContractItems---->'+allContractItems);*/
               // system.debug('searchList---->'+searchList);
            }else{
                ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Enter some text to search.'));
            }
        }catch(Exception exp){
             ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, exp.getMessage()));
        }   
        //wrapperclass recwrapper=new wrapperclass();
       // recwrapper.accounts=allAccounts;
       //system.debug('recwrapper.accounts---->'+recwrapper.accounts);
       // recwrapper.applink=allAppLinks;
        //recwrapper.item=allContractItems;
        //recwrapper.pcomponent=scheduleOrder; 
        return searchList;
    }
		
    /*public class wrapperclass {
     @AuraEnabled
     public list<Account> accounts {get;set;}
      //public list<CERM__TC_Link__c> applink {get;set;}
     // public list<CERM__Contract_Item__c> item {get;set;}
     // public list<CERM__Price_Component__c> pcomponent {get;set;}
      public wrapperclass(){
          //this.accounts = new list<Account>();
        system.debug('wrapper-------->'+accounts);
          //this.applink = new list<CERM__TC_Link__c>();
          //this.item = new list<CERM__Contract_Item__c>();
          //this.pcomponent = new list<CERM__Price_Component__c>();
      }
    }*/
    
}