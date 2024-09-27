@isTest
public class Contract_Batch_Test {
   
    
    @testSetup
    static void setup() {
    
       
       Id RecordTypeId= Schema.SObjectType.CERM__Contract_Item__c.getRecordTypeInfosByName().get('Brokerage Contract').getRecordTypeId();
		Account a = new Account();
         a.Name ='Test';
         a.CERM__Email__c='sabareeshvijay07@gmail.com';   
         a.CERM__Additional_Emails__c='gokul.rgp@gmail.com';  
         a.phone='9600205548';   
         insert a;
        
         CERM__Commodity__c Com= new CERM__Commodity__c();
         Com.Name='Copper';
         insert Com;
         
         CERM__BusinessLocation__c Bloc= new CERM__BusinessLocation__c();
         Bloc.name= 'Chennai';  
         insert Bloc;
        
         CERM__Contract__c Con = new CERM__Contract__c();
         Con.CERM__Account__c = a.id;
         insert Con;
        
        CERM__Contract_Item__c Citem = new CERM__Contract_Item__c();
        Citem.CERM__Account__c = a.id;
         Citem.CERM__Contract__c = Con.Id;
        Citem.RecordTypeId=RecordTypeId;
         Citem.CERM__DeliveryStartDate__c=date.today().addDays(60);
         insert Citem; 
        
    }
                
    static testmethod void Contract_BatchTest(){
        date todayDate = date.today();
       date NextDate=todayDate.addDays(60);
		List<CERM__Contract_Item__c> cItems=[select id,name,CERM__DeliveryStartDate__c from CERM__Contract_Item__c where CERM__DeliveryStartDate__c =: NextDate AND RecordType.Developername='Brokerage_Contract' ];      
        
        
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
        
            Contract_Batch  Conbatch = new Contract_Batch();
            DataBase.executeBatch(Conbatch);
        	system.assertEquals(1, cItems.size());
        test.stopTest();
    }
    
}