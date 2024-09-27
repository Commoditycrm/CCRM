@isTest
public class Daily_Updates_Extensions_Test {
   private static testmethod void Daily_Updates_Extensions()
   {
       Account a = new Account();
         a.Name ='Sabareesh';
         a.Is_Employee__c=True;
         insert a;
        Account a1 = new Account();
         a1.Name ='Gokul';
         a1.Is_Employee__c=True;
         insert a1;
         Daily_Updates__c createdupdate= new Daily_Updates__c ();
        createdupdate.Comments__c='Tetsing';
        createdupdate.Employee__c=a.Id;
        insert createdupdate;
       
       test.startTest();
      
	   Apexpages.StandardController stdController = new Apexpages.StandardController(createdupdate);
       Daily_Updates_Extensions dupd= new Daily_Updates_Extensions(stdController);
       PageReference readPage =dupd.save();
       system.assertEquals(null, readPage);
       test.stopTest();
   }

}