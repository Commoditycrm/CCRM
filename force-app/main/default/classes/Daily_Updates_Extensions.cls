public with sharing class Daily_Updates_Extensions {
Public Daily_Updates__c DUpdate{get; set;}

    public Daily_Updates_Extensions(ApexPages.StandardController controller) {
          DUpdate= new Daily_Updates__c ();

    }

   
    public PageReference save(){
    try{
        insert DUpdate;
        DUpdate= new Daily_Updates__c ();
        ApexPages.AddMessage(new ApexPages.Message(ApexPages.Severity.CONFIRM,'Updated Successfully. Thank you!'));
    }catch(DMLException e){
        ApexPages.AddMessage(new ApexPages.Message(ApexPages.Severity.ERROR,'Updation failed: ' + e.getMessage()));
    }
    return null;
}
    
}