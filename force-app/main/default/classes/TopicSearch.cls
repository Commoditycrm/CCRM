public class TopicSearch {
    @AuraEnabled(cacheable = true)
    public static List<TopicArray> findTopics(String artId){
        list<Topic> topiclist;
        if(Schema.sObjectType.topic.isAccessible() &&
           Schema.sObjectType.topic.isCreateable()
           && Schema.sObjectType.topic.fields.Id.isCreateable()
           && Schema.sObjectType.topic.fields.Name.isCreateable() 
           && Schema.sObjectType.topic.fields.id.isAccessible()
           && Schema.sObjectType.topic.fields.Name.isAccessible()
           && Schema.sObjectType.topic.isqueryable()){
               
               topiclist = [Select  id,Name FROM topic limit 50000]; 
           }
        List<TopicAssignment> talist = new List<TopicAssignment>();
        list<TopicArray> toparrlist = new list<TopicArray>();
        
        if(Schema.sObjectType.TopicAssignment.isAccessible() &&
           Schema.sObjectType.TopicAssignment.isCreateable()
           && Schema.sObjectType.TopicAssignment.isQueryable())
        {
            talist =[Select id,EntityId,TopicId from TopicAssignment  where EntityId = :artId];
            
            for(TopicAssignment taitem : talist )
            {
                for(Topic topitem : topiclist)
                {
                    // system.debug('Inside Checking' +taitem.TopicId + ',' + topitem.id);
                    if( taitem.TopicId == topitem.id)
                    {
                        //  system.debug('Inside Matching' +taitem.TopicId + ',' + topitem.id);
                        TopicArray toparritem = new TopicArray();
                        toparritem.name = topitem.id;
                        toparritem.label = topitem.Name;
                        //   toparritem.href = 'https://www.salesforce.com';
                        
                        // toparritem.href = 'https://commodityforce-dev-ed.lightning.force.com/lightning/r/Topic/'+taitem.TopicId+'/view';
                        
                        toparrlist.add(toparritem);
                    }//if taitem
                }//for topic
            }
        }//for topic assignment
        //    System.debug('Return List' +toparrlist);
        return toparrlist;
    }
    
    public class TopicArray
    {
        @AuraEnabled
        public string name {get;set;}
        @AuraEnabled
        public string label {get;set;}
        @AuraEnabled
        public string href {get;set;}
    }
}