public with sharing class HandlerTopOpportunities implements BotHandler {
    
    public BotResponse handle(String utterance, String[] params, Map<String, String> session) {
        Integer qty = Integer.valueof(params[0]);
        List<BotRecord> records = new List<BotRecord>();
        
        if(Schema.sObjectType.Opportunity.isAccessible() && Schema.sObjectType.Opportunity.isQueryable() 
           && Schema.SobjectType.Opportunity.fields.Name.isAccessible() && Schema.SobjectType.Opportunity.fields.Amount.isAccessible()
           && Schema.SobjectType.Opportunity.fields.Probability.isAccessible() && Schema.SobjectType.Opportunity.fields.StageName.isAccessible() && Schema.SobjectType.Opportunity.fields.CloseDate.isAccessible()){
               List<Opportunity> opportunities = 
                   [SELECT Id, Name, Amount, Probability, StageName, CloseDate FROM Opportunity where isClosed=false ORDER BY amount DESC LIMIT :qty];
               
               
               for (Opportunity o : opportunities) {
                   List<BotField> fields = new List<BotField>();
                   fields.add(new BotField('Name', o.Name, '#/sObject/' + o.Id + '/view'));
                   fields.add(new BotField('Amount', '$' + o.Amount));
                   fields.add(new BotField('Probability', '' + o.Probability + '%'));
                   fields.add(new BotField('Stage', o.StageName));
                   records.add(new BotRecord(fields));
               }
           }
        return new BotResponse(new BotMessage('Bot', 'Here are your top ' + params[0] + ' opportunities:', records));
        
    }
    
}