@isTest
public class Priority_cntrl_Test {
 private static testmethod void Priority_cntrl_Test()
   {
       Account a = new Account();
         a.Name ='Sabareesh';
         a.Is_Employee__c=True;
         a.Employee_Email__c='sabareeshvijay07@gmail.com';
         insert a;
        
       priority__c prio= new priority__c();
       	prio.Account__c=a.id;
       prio.Title__c='Test';
       prio.Description__c='Testing';
       insert prio;
       
        test.startTest();
      
       Priority prioty= new Priority();
		prioty.emailAcc ='sabareeshvijay07@gmail.com';
       prioty.save();
       test.stopTest();
	  System.assertEquals(prio.Account__c, prioty.prio.Account__c);
   }
}