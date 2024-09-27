public with sharing class HandlerFindContract implements BotHandler {
    
    public BotResponse handle(String utterance, String[] params, Map<String, String> session) {
        String key = '%' + params[0] + '%';
        List<CERM__Contract_Item__c> contracts;
        if(Schema.sObjectType.CERM__Contract_Item__c.isAccessible() &&
           Schema.sObjectType.CERM__Contract_Item__c.isCreateable() &&
           Schema.sObjectType.CERM__Contract_Item__c.isQueryable() &&
           Schema.sObjectType.CERM__Contract_Item__c.fields.Id.isAccessible() &&
           Schema.sObjectType.CERM__Contract_Item__c.fields.Name.isAccessible() &&
           Schema.sObjectType.CERM__Contract_Item__c.fields.CERM__Account__c.isAccessible() &&
           Schema.sObjectType.CERM__Contract_Item__c.fields.CERM__Commodity__c.isAccessible() &&
           Schema.sObjectType.CERM__Contract_Item__c.fields.CERM__Pos_Unapplied__c.isAccessible() &&
           Schema.sObjectType.CERM__Contract_Item__c.fields.CERM__UoM__c.isAccessible()) {
               contracts = 
                   [SELECT Id, Name, CERM__Account__r.Name, CERM__Commodity__r.Name, CERM__Pos_Unapplied__c, CERM__UoM__r.Name
                    FROM CERM__Contract_Item__c
                    WHERE Name LIKE :key
                    ORDER BY Name
                    LIMIT 5];
           }
               
        List<BotRecord> records = new List<BotRecord>();
       
        
        for (CERM__Contract_Item__c c : contracts) {
            decimal decQty = c.CERM__Pos_Unapplied__c;
            string strQty = String.valueOf(decQty.format());
            List<BotField> fields = new List<BotField>();
            fields.add(new BotField('Contract', c.Name, '#/sObject/' + c.Id + '/view'));
          
            fields.add(new BotField('Account', c.CERM__Account__r.Name,'#/sObject/' + c.Id + '/view'));
            fields.add(new BotField('Commodity', c.CERM__Commodity__r.Name,'#/sObject/' + c.Id + '/view'));
            //fields.add(new BotField('Qty to Deliver', c.CERM__Pos_Unapplied__c,'#/sObject/' + c.Id + '/view'));
            fields.add(new BotField('Open Qty to Deliver',strQty ,'#/sObject/' + c.Id + '/view'));
            fields.add(new BotField('UoM', c.CERM__UoM__r.Name,'#/sObject/' + c.Id + '/view'));
            
            records.add(new BotRecord(fields));
        }
        return new BotResponse(new BotMessage('Bot', 'Here is a list of contacts matching "' + params[0] + '":', records));
        
    }
    
}