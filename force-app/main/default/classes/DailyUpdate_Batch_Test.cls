@isTest
public class DailyUpdate_Batch_Test {

    @testSetup
    static void setup() {
  
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
    }
                
    static testmethod void Contract_BatchTest(){
		List<Daily_Updates__c> dupdate=[select id,name,Employee__c,Employee__r.name,Comments__c from Daily_Updates__c WHERE createddate= TODAY];      
        
        
        //ListView listvw= [SELECT Id FROM ListView WHERE SObjectType = 'CERM__Contract_Item__c' and DeveloperName = 'ALL'];
        list<string> toadd = new list<string>();
		/*toadd.add('sabareeshvijay07@gmail.com');
		        Messaging.SingleEmailMessage dueEmail = new Messaging.SingleEmailMessage();
							dueEmail.settoaddresses(toadd);
                            dueEmail.setsubject('Testing Shipment Dues');
        					string body =  '<html><body>';
        					body +='Dear User,<br/><br/>';
                            body +='Shipment startdate is approaching for this contracts:<br/><br/>';
        					//body +='<a href="'+URL.getSalesforceBaseUrl().toExternalForm() + '/lightning/o/CERM__Contract_Item__c/list?filterName=+' ">click here to view all contracts</a>';
        					body += '</body></html>';
        					dueEmail.setHtmlBody(body);
      	Messaging.sendEmail(new Messaging.SingleEmailMessage[]{dueEmail});*/
         
        test.startTest();
        
            DailyUpdate_Batch  dupdatebatch = new DailyUpdate_Batch();
            DataBase.executeBatch(dupdatebatch);
        system.assertEquals([select count() from Daily_Updates__c], dupdate.size());// Updated by Sabareesh
        test.stopTest();
    }
        
}