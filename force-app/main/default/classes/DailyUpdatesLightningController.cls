public class DailyUpdatesLightningController {
    
    public static CERM__Daily_Updates__c newupdate;
    public static Boolean successmessage{get;set;}
    @Auraenabled
    public static Id createUpdates(map<string,string> values)
    {
       // system.debug('updatemap-->'+values);
        string Employee;
        string Comments;
        if(values.containskey('Employee')){
            Employee = values.get('Employee');  
        }
        if(values.containskey('Comments')){
            Comments = values.get('Comments');  
        }
                newupdate = new CERM__Daily_Updates__c();
        
        
        if(Schema.sObjectType.CERM__Daily_Updates__c.fields.Employee__c.isCreateable() == true) {
            newupdate.Employee__c = Employee;   
        } 
        if(Schema.sObjectType.CERM__Daily_Updates__c.fields.Comments__c.isCreateable() == true) {
            newupdate.Comments__c = Comments;   
        }
        try{
            Database.SaveResult saveres;
            
            if(Schema.sObjectType.CERM__Daily_Updates__c.isCreateable()){    // if contract is creatable for user then only insert the list.
                // saveres = Database.insert(, false);
                insert newupdate;
                //con.id = contract.id;
                successmessage = true;
                //contractID = contract.id;
                //System.debug('contrack number'+contractID);
                //saveContractItem( values,quantity,convalue,pcompvalue);
            }else{    
                //ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR,'Insufficient access'));
            }
            
        }catch (Exception e) {
          //  system.debug('Debug Exception Message'+e.getMessage());
            //ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR, e.getMessage()));
        } 
        //}
        //else {
        //  ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.Info, 'Please generate items before saving Contract.');
        // ApexPages.addMessage(myMsg);
        //}
        return newupdate.Id;

    }

}