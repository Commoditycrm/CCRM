global with sharing class DailyUpdate_Batch implements Database.Batchable<sObject>, Database.Stateful {
    
    Set<Id> userOrGrpids = new Set<Id>();
    List<string> updatecomment= new List<String>();
    list<string> toadd = new list<string>();
    set<string> emailfromgroup = new set<string>();
    Map<id,String> updatesmap= new Map<id,String>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        if(Schema.sObjectType.Daily_Updates__c.isAccessible() && Schema.sObjectType.Daily_Updates__c.isQueryable() 
           &&  Schema.sObjectType.Daily_Updates__c.fields.Name.isAccessible() && Schema.sObjectType.Daily_Updates__c.fields.Employee__c.isAccessible() 
           &&  Schema.sObjectType.Daily_Updates__c.fields.Comments__c.isAccessible()  ){
               String Query = 'select id,name,Employee__c,Employee__r.name,Comments__c from Daily_Updates__c WHERE createddate= TODAY';
               return Database.getQueryLocator(Query);    
           }  else{
               return null;
           }
    }
    global void execute(Database.BatchableContext bc,List<Daily_Updates__c> dUpdates)
    {
        if(Schema.sObjectType.Daily_Updates__c.isAccessible() &&
           Schema.sObjectType.Daily_Updates__c.isCreateable()
           && Schema.sObjectType.Daily_Updates__c.isQueryable())
        {
            for(Daily_Updates__c getdupdate: dUpdates)
            {
                updatesmap.put(getdupdate.Employee__c,getdupdate.Comments__c);
            }
        }
        
    }
    
    global void finish(Database.BatchableContext bc){
        
        //Get user mail id from public group and add it to set
        if(Schema.sObjectType.GroupMember.isAccessible() && Schema.sObjectType.GroupMember.isQueryable()
           && Schema.sObjectType.GroupMember.fields.GroupId.isAccessible() && Schema.sObjectType.GroupMember.fields.UserOrGroupId.isAccessible()){
            for(GroupMember gpmem : [SELECT GroupId,Id,UserOrGroupId FROM GroupMember where Group.Developername='Daily_Updates']){
                if(gpmem.UserOrGroupId != null)
                    userOrGrpids.add(gpmem.UserOrGroupId);
            }
           }
        if(Schema.sObjectType.user.isAccessible() && Schema.sObjectType.user.isQueryable()
           && Schema.sObjectType.user.fields.Name.isAccessible()   && Schema.sObjectType.user.fields.email.isAccessible()){
                for(user usrmail : [select id,name,email from user where id IN:userOrGrpids])
            {
                emailfromgroup.add(usrmail.email);
            }
           }
        //Get mail from set and add it to list, since SingleEmailMessage accepts only lists or array of strings.
        for(String addmailtolist: emailfromgroup)
        {
            toadd.add(addmailtolist) ;
        }
        Date d = date.today();
        String updatedate = DateTime.newInstance(d.year(),d.month(),d.day()).format('d/MM/YYYY');
        String[] ccEmail = new String[] {'gokul.rgp@gmail.com'};
            //	system.debug('updatedate-->'+updatedate);
            //	system.debug('User Email-->'+toadd);
            //SingleEmailMessage implementation
        Messaging.SingleEmailMessage dUpdateEmail = new Messaging.SingleEmailMessage();
        dUpdateEmail.settoaddresses(toadd);
        //dUpdateEmail.setccAddresses(ccEmail);
        dUpdateEmail.setsubject('Daily Updates');
        string body;
        body =  '<html><body>';
        body +='Dear Karthik,<br/><br/>';
        body +='Updates for the day: '+ updatedate + '<br/><br/>';
        if(Schema.sObjectType.account.isAccessible() && Schema.sObjectType.account.isQueryable()
          && Schema.sObjectType.account.fields.name.isAccessible())
        {
            for(Account empname :  [select id,name from account WHERE Is_Employee__c=TRUE ORDER BY Name ASC])
            {
                //Check account name with values in the map 
                if(!updatesmap.isEmpty() && updatesmap.containsKey(empname.Id))
                {
                    body += '<table>';
                    body += '<tr><th style="vertical-align:top;">'+  empname.name +  '</th></tr></table>';
                    body += '<span style="white-space:pre;">' + updatesmap.get(empname.Id) + '</span>'+'<br/><br/>';
                }  
                else{
                    body += '<table>';
                    body += '<tr><th style="vertical-align:top;">'+ empname.name +  '</th></tr></table>';
                    body += ' No Updates for the day'+ '<br/><br/>';
                    
                }
            }
        }
        body += '</body></html>';
        dUpdateEmail.setHtmlBody(body);
        //Messaging.sendEmail(new Messaging.SingleEmailMessage[]{dUpdateEmail});    
    }
}