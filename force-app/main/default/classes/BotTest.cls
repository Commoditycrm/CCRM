@isTest
public class BotTest {
    
    static testMethod void testBotController() {
        Bot_Command__c bc = new Bot_Command__c(Sample_Utterance__c='help lightning', apex_class__c='HandlerHelpTopic', pattern__c='help (.*)');
        insert bc;
        BotResponse response = BotController.submit('help lightning', null);
        Map<String, String> session = response.session;
        Map<String, String> session1= new Map<String, String>();
        session1.put('Developer', 'Developer');
        response = BotController.submit('Developer', session);
        System.assert(response.messages[0].items.size() > 0);
        test.startTest();
        response = BotController.upload('CompanyLogo', 'base64');
        response = BotController.upload('base64', string.valueof(bc));
        response = BotController.submit(string.valueof(session), session1);
        response = BotController.submit(null, session1);
        test.stopTest();
    }

    static testMethod void testHello() {
        BotHandler handler = new HandlerHello();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].messageText == 'Hi there!');
    }

    static testMethod void testAddTwoNumbers() {
        BotHandler handler = new HandlerAddTwoNumbers();
        BotResponse response = handler.handle('', null, null);
        Map<String, String> session = response.session;
        response = handler.handle('1', null, session);
        session = response.session;
        response = handler.handle('2', null, session);
        System.assert(response.messages[0].messageText == '1 + 2 = 3');
    }
    
    static testMethod void testCostCenter() {
        BotHandler handler = new HandlerCostCenter();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].messageText == 'Your cost center is 21852');
    }
    
    static testMethod void testEmployeeId() {
        BotHandler handler = new HandlerEmployeeId();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].messageText == 'Your employee id is 9854');
    }

    static testMethod void testFindAccount() {
        Account a = new Account(Name='TestAccount');
        insert a;
        BotHandler handler = new HandlerFindAccount();
        BotResponse response = handler.handle('', new String[]{'Test'}, null);
        System.assert(response.messages[0].records.size() == 1);
    }
    
    static testMethod void testFindContact() {
        Account a = new Account(Name='TestAccount');
        insert a;
        Contact c = new Contact(LastName='TestContact');
        insert c;
        
        CERM__MD_Unit_of_Measure__c uom=new CERM__MD_Unit_of_Measure__c();
        uom.name='MT';
        insert uom;
        
        CERM__Commodity__c Com= new CERM__Commodity__c();
         Com.Name='Copper';
         insert Com;
        
        CERM__Contract__c con = new CERM__Contract__c();
        con.CERM__Price_Type__c = 'Flat/Fixed Price';
        insert con;
        
        CERM__Contract_Item__c cfITem = new CERM__Contract_Item__c();
        //cfItem.CERM__Commodity__c  = com.id;
        cfitem.CERM__Account__c=a.Id;
        cfitem.CERM__Commodity__c=com.Id;
        cfitem.CERM__UoM__c=uom.id;
        cfitem.CERM__Quantity__c = 10000;
        cfitem.CERM__FCL__c=2;
        cfItem.CERM__Contract__c = con.Id;
        cfitem.RecordTypeId='01237000000EvgQAAS';
        //cfItem.CERM__Business_Location__c = bizLoc.id;
        
        insert cfItem;
                
        BotHandler handler = new HandlerFindContact();
        BotHandler handler1 = new HandlerFindContract();
        BotResponse response = handler.handle('', new String[]{'Test'}, null);
        BotResponse response1 = handler1.handle('', new String[]{'Test'}, null);
        System.assert(response.messages[0].records.size() == 1);
    }
    
    static testMethod void testHelp() {
        Bot_Command__c bc = new Bot_Command__c(Sample_Utterance__c='Hello', apex_class__c='HelloHandler', pattern__c='Hello');
        insert bc;
        BotHandler handler = new HandlerHelp();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].items.size() == 1);
    }
    
    static testMethod void testHelpTopic() {
        BotHandler handler = new HandlerHelpTopic();
        BotResponse response = handler.handle('', null, null);
        Map<String, String> session = response.session;
        handler.handle('User', null, session);
        
        response = handler.handle('', null, null);
        session = response.session;
        response = handler.handle('Admin', null, session);

        response = handler.handle('', null, null);
        session = response.session;
        response = handler.handle('Developer', null, session);

        System.assert(response.messages[0].items.size() > 0);
    }
    
    static testMethod void testMyOpenCases() {
        Case c = new Case(Subject='TestCase');
        insert c;
        BotHandler handler = new HandlerMyOpenCases();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].records.size() == 1);
    }

    static testMethod void testTopOpportunities() {
        Account a = new Account(Name='TestAccount');
        insert a;
        Opportunity o = new Opportunity(Name='TestOpportunity', AccountId=a.id, StageName='Prospecting', CloseDate=System.today().addMonths(1));
        insert o;
        BotHandler handler = new HandlerTopOpportunities();
        BotResponse response = handler.handle('', new String[]{'3'}, null);
        System.assert(response.messages[0].records.size() == 1);
    }

    static testMethod void testTravelApproval() {
        BotHandler handler = new HandlerTravelApproval();
        BotResponse response = handler.handle('', null, null);
        Map<String, String> session = response.session;
        handler.handle('Boston', null, session);
        handler.handle('Customer Facing', null, session);
        handler.handle('02/23/2017', null, session);
        handler.handle('1000', null, session);
        handler.handle('1000', null, session);
        System.assert(response.messages[0].messageText.length() > 0);
    }

    static testMethod void testPipeline() {
        BotHandler handler = new HandlerPipeline();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].imageURL != null);
    }

    static testMethod void testQuarter() {
        BotHandler handler = new HandlerQuarter();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages[0].imageURL != null);
    }

    static testMethod void testNext() {
        Account a = new Account(Name='TestAccount');
        insert a;
        Opportunity o = new Opportunity(Name='TestOpportunity', AccountId=a.id, StageName='Prospecting', CloseDate=System.today().addMonths(1));
        insert o;
        Case c = new Case(Subject='TestCase', Priority='High');
        insert c;
        BotHandler handler = new HandlerNext();
        BotResponse response = handler.handle('', null, null);
        System.assert(response.messages.size() > 1);
    }

    static testMethod void testSOQL() {
        Account a = new Account(Name='TestAccount');
        insert a;
        BotHandler handler = new HandlerSOQL();
        BotResponse response = handler.handle('select id from account', null, null);
        System.assert(response.messages[0].records.size() == 1);
    }

}