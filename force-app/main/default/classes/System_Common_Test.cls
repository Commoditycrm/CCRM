@isTest
public class System_Common_Test {
    
   public static testmethod void commodity_Price(){
       
       
       CERM__MD_Unit_of_Measure__c uom=new CERM__MD_Unit_of_Measure__c();
        uom.name='Metric Ton';
        insert uom;
        CERM__MD_Unit_of_Measure__c uom1=new CERM__MD_Unit_of_Measure__c();
        uom1.name='Kilogram';
        insert uom1;
       
       CERM__Commodity_Price__c commarketprice=new CERM__Commodity_Price__c();
        commarketprice.Name='USDINR=X';
        commarketprice.CERM__Expiry_Date__c=Date.today()+3;
        commarketprice.CERM__Ask__c =0.7761;
        commarketprice.CERM__Bid__c = 0.7758;
        commarketprice.CERM__Open__c =0.7756;
        commarketprice.CERM__Last_Trade__c =0.7758;
        commarketprice.CERM__Type__c='Currency';
        insert commarketprice;   
        
       string str='USDINR=X';
       Set<String> setOfFutureMonths=new Set<String>();
		setOfFutureMonths.add(str);
	       
        test.startTest();
		System_Common.commodity_Price(setOfFutureMonths);   
        CERM__Commodity_Price__c result=System_Common.fx_Rate('INR','USD');  
        system.assertEquals(commarketprice.Name, result.Name);
        test.stopTest();
    }

       public static testmethod void fx_Rate(){

      CERM__MD_Unit_of_Measure__c uom=new CERM__MD_Unit_of_Measure__c();
        uom.name='Metric Ton';
        insert uom;
        CERM__MD_Unit_of_Measure__c uom1=new CERM__MD_Unit_of_Measure__c();
        uom1.name='Kilogram';
        insert uom1;
           
         CERM__Commodity_Price__c commarketprice=new CERM__Commodity_Price__c();
        commarketprice.Name='USDINR=X';
        commarketprice.CERM__Expiry_Date__c=Date.today()+3;
        commarketprice.CERM__Ask__c =0.7761;
        commarketprice.CERM__Bid__c = 0.7758;
        commarketprice.CERM__Open__c =0.7756;
        commarketprice.CERM__Last_Trade__c =0.7758;
        commarketprice.CERM__Type__c='Currency';
        insert commarketprice;   
           
           set<string> fromcurr=new set<string>();
           set<string> tocurr=new set<string>();
           fromcurr.add('Metric Ton');
           fromcurr.add('INR');
           tocurr.add('Kilogram');
           tocurr.add('USD');

       test.startTest();
       System_Common syscom=new System_Common();
       Map<String, CERM__Commodity_Price__c> result = System_Common.fx_Rate(fromcurr,tocurr);   
           system.assertEquals(1, result.size());
           test.stopTest();   
       
       }
    public static testmethod void GetFutureMonths1(){

        CERM__Commodity__c Com= new CERM__Commodity__c();
         Com.Name='Copper Bolts';
         Com.CERM__Commodity_Group__c='Copper';  
         Com.CERM__ExchangeCode__c='CBOT';
         //Com.CERM__Need_Prescription__c=false;   
         insert Com;
         
        CERM__Futures_Exchange__c furex=new CERM__Futures_Exchange__c();
         furex.name='CBOT';
         insert furex;
           
           CERM__ExchangeCommodity__c  excomm=new CERM__ExchangeCommodity__c();
           excomm.name='Copper';
           excomm.CERM__FuturesExchange__c=furex.Id;
		   excomm.CERM__May_K__c=true;
           excomm.CERM__June_M__c=true;
           excomm.CERM__July_N__c=true;
           insert excomm;
           
           set<Id> comid=new set<Id>();
           comid.add(Com.Id);
           
       test.startTest();
       System_Common syscom=new System_Common();
       Map<Id, List<SelectOption>> result=System_Common.GetFutureMonths1(comid); 
        system.assertEquals(true, result.containsKey(Com.Id));
           test.stopTest();   
       
       }
}