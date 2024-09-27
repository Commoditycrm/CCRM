@isTest
public class CaseTriggerhandler_Test {
    @isTest
    public static void casetriggerhandlermethod()
    {
        List<Case> caselist = new List<Case>();
       Account acc=new Account();
        acc.Name='Test Acc';
        acc.Type='Customer - Direct';
        acc.Core_Domain__c='gmail.com';
        insert acc;
        case cc=new case();
        cc.SuppliedEmail='Test@gmail.com';
        cc.Origin='Lab';
        cc.Status='Open';
        insert cc;
        caselist.add(cc);
       
     
        CaseTriggerhandler.PopulateAccountInCase(caselist);
                system.assertEquals(1, caselist.size()); 

        
       
    }

}