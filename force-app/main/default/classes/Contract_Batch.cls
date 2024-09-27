global with sharing class Contract_Batch implements Database.Batchable<sObject>, Database.Stateful {
    Public Task scheduleTask;
    Set<Id> userOrGrpids = new Set<Id>();
    Set<Id> cfitemid = new Set<Id>();
    List<Task> createTask= new List<Task>();
    Public Boolean Flag;
    //Public user userId;
	
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        Date todayDate= date.today();
        Date NextDate=todayDate.addDays(60);
       // system.debug('Next of 60 days-->'+NextDate);
        String Query= 'select id,name,CERM__DeliveryStartDate__c from CERM__Contract_Item__c where CERM__DeliveryStartDate__c =: NextDate AND RecordType.Developername='+ '\''+'Brokerage_Contract'+'\'';
	//	system.debug(Database.getQueryLocator(Query));
      //  system.debug('<---start method run successfully--->');
        return Database.getQueryLocator(Query);    
    }
    global void execute(Database.BatchableContext bc,List<CERM__Contract_Item__c> cItems)
    {
     //   system.debug('<---Entering Execute method successfully--->');
      //  system.debug('Contract Item-->'+ cItems);
 		if(Schema.sObjectType.GroupMember.isAccessible() && Schema.SObjectType.GroupMember.isCreateable() && Schema.SObjectType.GroupMember.isQueryable()
           && Schema.sObjectType.GroupMember.fields.GroupId.isAccessible() && Schema.sObjectType.GroupMember.fields.GroupId.isCreateable() 
           && Schema.sObjectType.GroupMember.fields.UserOrGroupId.isAccessible() && Schema.sObjectType.GroupMember.fields.UserOrGroupId.isCreateable() ){
               for(GroupMember gpmem : [SELECT GroupId,Id,UserOrGroupId FROM GroupMember where Group.Developername='MNH_Task']){
                  if(gpmem.UserOrGroupId != null)
                  	 userOrGrpids.add(gpmem.UserOrGroupId);
               }
           }
        //Security Issue
        if(Schema.SObjectType.Task.isCreateable() && Schema.SObjectType.Task.isAccessible() 
           && Schema.sObjectType.Task.fields.WhatId.isCreateable()   && Schema.sObjectType.Task.fields.WhatId.isAccessible()
           && Schema.sObjectType.Task.fields.OwnerId.isCreateable()  && Schema.sObjectType.Task.fields.OwnerId.isAccessible()
           && Schema.sObjectType.Task.fields.Status.isCreateable()  && Schema.sObjectType.Task.fields.Status.isAccessible() 
           && Schema.sObjectType.Task.fields.Subject.isCreateable() && Schema.sObjectType.Task.fields.Subject.isAccessible() 
           && Schema.sObjectType.Task.fields.Priority.isCreateable() && Schema.sObjectType.Task.fields.Priority.isAccessible() 
           && Schema.sObjectType.Task.fields.CurrencyIsoCode.isCreateable() && Schema.sObjectType.Task.fields.CurrencyIsoCode.isAccessible()){
               for(CERM__Contract_Item__c cItem :  cItems)
               { 
                   for(Id usrId : userOrGrpids)
                   {
                       scheduleTask = new Task();
                       scheduleTask.WhatId=cItem.id;
                       scheduleTask.OwnerId=usrId;
                       scheduleTask.Status='In Progress';
                       scheduleTask.Subject='Shippment startdate is approaching';
                       scheduleTask.Priority='High';
                       scheduleTask.CurrencyIsoCode='USD';
                       //scheduleTask.WhoId=usrId;
                       createTask.add(scheduleTask);
                   }
                   cfitemid.add(cItem.Id);
                 //  system.debug('cfitemid is -->>'+ cfitemid);
               }
           }
       // system.debug('Task Created-->'+createTask);
        if(createTask.size()>0)
        {
            //Security Issue
            if(Schema.SObjectType.Task.isCreateable()){
                insert createTask;
            }
        }
        /*Flag=TRUE;
       }
        else
        {
            Flag=FALSE;
        }*/
       // system.debug('<---Execute method run successfully--->');
    }
    

    global void finish(Database.BatchableContext bc){
        
        if(!cfitemid.isEmpty() 
           && Schema.sObjectType.CERM__Contract_Item__c.isAccessible() && Schema.SObjectType.CERM__Contract_Item__c.isQueryable() 
           && Schema.sObjectType.user.isAccessible()  && Schema.SObjectType.user.isQueryable()){
             
               list<string> toadd = new list<string>();
               string mails;
               if(Schema.sObjectType.user.fields.name.isAccessible() && Schema.sObjectType.user.fields.email.isAccessible()){
                   for(user usrmail : [select id,name,email from user where id IN:userOrGrpids])
                   {
                       toadd.add(usrmail.email);
                   }
               }
              
               list<string> itemname = new list<string>();
               if(Schema.sObjectType.CERM__Contract_Item__c.fields.name.isAccessible() ){
                   for(CERM__Contract_Item__c citem : [select id,name from CERM__Contract_Item__c where id IN: cfitemid] )
                   {
                       itemname.add(citem.name);
                   }
               }
               ListView listvw;
               if(Schema.sObjectType.ListView.isAccessible() && Schema.SObjectType.ListView.isQueryable()){ 
              	  listvw= [SELECT Id FROM ListView WHERE SObjectType = 'CERM__Contract_Item__c' and DeveloperName = 'ALL'];
               }
               Messaging.SingleEmailMessage dueEmail = new Messaging.SingleEmailMessage();
               dueEmail.settoaddresses(toadd);
               dueEmail.setsubject('Testing Shipment Dues');
               string body =  '<html><body>';
               body +='Dear User,<br/><br/>';
               body +='Shipment startdate is approaching for this contracts: ' + itemname + '<br/><br/>';
               body +='<a href="'+URL.getSalesforceBaseUrl().toExternalForm() + '/lightning/o/CERM__Contract_Item__c/list?filterName=' + listvw.id +'">click here to view all contracts</a>';
               body += '</body></html>';
               dueEmail.setHtmlBody(body);
              
               
           }
    }
}