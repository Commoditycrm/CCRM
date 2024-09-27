public with sharing class Priority {
    
    //public set<ID> id {get; set;}
    public priority__c prio {get; set;}
    public String emailAcc {get; set;}
    //public String mailAcc {get; set;}
    
    /*   public void mail()
{
for(account acct: [select id,name,Email__c from account ])
{
if(acct.Email__c ==emailAcc )
{
//acct1.id=acct.id; 
//id.add(acct.id);
Priority(acct.id);
}
}


}*/
    
    public Priority()
    {
        
        prio = new priority__c();
    }
    
    public void save() {
        if(Schema.sObjectType.account.isAccessible() &&
           Schema.sObjectType.account.isCreateable()
           && Schema.sObjectType.account.fields.Id.isCreateable()
           && Schema.sObjectType.account.fields.Name.isCreateable() 
           && Schema.sObjectType.account.fields.id.isAccessible()
           && Schema.sObjectType.account.fields.Name.isAccessible()
           && Schema.sObjectType.account.fields.Employee_Email__c.isAccessible()
           && Schema.sObjectType.account.fields.Employee_Email__c.isCreateable()
           && Schema.sObjectType.account.isqueryable())
            
            for(account acct: [select id,name,Employee_Email__c from account where Employee_Email__c =: emailAcc]){
                //Security Issue
                if(Schema.SObjectType.priority__c.isCreateable() && Schema.SObjectType.priority__c.fields.Account__c.isCreateable()){
                    prio.Account__c=acct.Id;
                }
            }
        insert prio;
        
    }
    
}