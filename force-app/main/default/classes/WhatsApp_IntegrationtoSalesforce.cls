global class WhatsApp_IntegrationtoSalesforce {
    
    @future(callout=true)
    @Auraenabled
    public static void sendWhatsAppMessage(String contrctId){
        /*system.debug('contrctId'+contrctId);
        List<CaseComment> csList = new List<CaseComment>();
        CERM__Contract__c contr = [select Id, CERM__Account__r.phone,CERM__Alternate_Phone__c, CERM__SMSMessage__c from CERM__Contract__c where id = : contrctId];

        Http h = new Http();
        HttpResponse response = new Httpresponse();
        HttpRequest req = new HttpRequest();     
        req.setMethod('GET');
        String endpoint = '';
        if(contr != null){
            String Comments = EncodingUtil.URLENCODE(contr.CERM__SMSMessage__c,'UTF-8');
            endpoint ='https://whatsapp-integration-app.herokuapp.com/?to='+contr.CERM__Alternate_Phone__c+'&msg='+Comments;
        }
        system.debug('enp'+endpoint);
        req.setEndpoint(endpoint);
        response = h.send(req);
        system.debug('response---->'+response);*/
    }
}