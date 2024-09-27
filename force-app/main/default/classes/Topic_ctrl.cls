public with sharing class Topic_ctrl {
    @AuraEnabled(cacheable=true)
    public static list<Wrapperclass> getTopic(string searchKey) {
        string Searching = '%' + searchKey + '%';
        list<Topic> topiclist;
        List<TopicAssignment> Topicc;
        if(Schema.sObjectType.topic.isAccessible() &&
           Schema.sObjectType.topic.isCreateable()
           && Schema.sObjectType.topic.fields.Id.isCreateable()
           && Schema.sObjectType.topic.fields.Name.isCreateable() 
           && Schema.sObjectType.topic.fields.id.isAccessible()
           && Schema.sObjectType.topic.fields.Name.isAccessible()
           && Schema.sObjectType.topic.isqueryable()
           && Schema.sObjectType.TopicAssignment.isAccessible()
           && Schema.sObjectType.TopicAssignment.isCreateable()
           && Schema.sObjectType.TopicAssignment.fields.EntityId.isCreateable()
           && Schema.sObjectType.TopicAssignment.fields.TopicId.isCreateable() 
           && Schema.sObjectType.TopicAssignment.fields.EntityId.isAccessible()
           && Schema.sObjectType.TopicAssignment.fields.TopicId.isAccessible()){
               
               topiclist = [SELECT id,Name FROM topic where Name LIKE :Searching];
               Topicc =[Select id,EntityId,TopicId from TopicAssignment limit 50000];
           }
        List<CERM__Knowledge__kav> know;
        if(Schema.sObjectType.CERM__Knowledge__kav.isAccessible() &&
           Schema.sObjectType.CERM__Knowledge__kav.isCreateable()
           && Schema.sObjectType.CERM__Knowledge__kav.isQueryable())
        {
            know =[Select id,Title from CERM__Knowledge__kav limit 50000 ];
        }
        List<Wrapperclass>wrplist =new List<Wrapperclass>();
        Wrapperclass wrap=new Wrapperclass();
        for(Topic top : topiclist){ 
            for(TopicAssignment Topasg :Topicc){
                if(top.Id==Topasg.TopicId){
                    wrap.id=top.Id;
                    
                    for(CERM__Knowledge__kav knowss:know){
                        if(Topasg.EntityId==knowss.id ){
                            wrap.Title=knowss.Title;
                            //  system.debug('topcs-->'+top.Name+','+Topasg.EntityId+','+knowss.Title);
                        }
                        
                    }
                    wrplist.add(wrap);
                }
            }
        }
        
        //no records,throw an error
        if(topiclist.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
        }
        
        
        /*for(Topic top : topiclist){ 
Wrapperclass wrap =new Wrapperclass();
wrap.Id=top.Id;
}
for(CERM__Knowledge__kav knowss:know){
Wrapperclass wrap =new Wrapperclass();
wrap.Title=knowss.Title;
wrplist.add(wrap);
}
return wrplist;*/
        //   system.debug('wrapperList--->'+wrplist);
        return wrplist;
        
    } 
    public class Wrapperclass{   
        @AuraEnabled
        public String Id{get;set;}
        @AuraEnabled
        public String Title{get;set;}
    }
}