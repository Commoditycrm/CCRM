public with sharing class TopicAdd {
    @AuraEnabled(cacheable=true)
    public static string addTopics(String TopicName,String ArticleId){
        if(Schema.sObjectType.TopicAssignment.isAccessible() &&
           Schema.sObjectType.TopicAssignment.isCreateable()
           && Schema.sObjectType.TopicAssignment.fields.EntityId.isCreateable()
           && Schema.sObjectType.TopicAssignment.fields.TopicId.isCreateable()
           && Schema.sObjectType.TopicAssignment.fields.EntityType.isCreateable()
           && Schema.sObjectType.topic.isAccessible() &&
           Schema.sObjectType.topic.isCreateable()
           && Schema.sObjectType.topic.fields.id.isCreateable()
           && Schema.sObjectType.topic.fields.Name.isCreateable())
            list<Topic> topiclist = [Select  id,Name FROM topic limit 50000];   
        List<TopicAssignment> talist =[Select id,EntityId,TopicId , EntityType from TopicAssignment limit 50000];
        //    list<TopicArray> toparrlist = new list<TopicArray>();
        
        // Security Review
        Topic topicitem = new Topic();
        topicitem.Name = TopicName;
        if(Schema.sObjectType.Topic.isAccessible() &&
           Schema.sObjectType.Topic.isCreateable()
           && Schema.sObjectType.Topic.fields.Name.isCreateable())
            insert topicitem;
        String TopId = topicitem.Id; 
        
        TopicAssignment taitem = new TopicAssignment();
        
        taitem.TopicId = TopId;
        taitem.EntityId = ArticleId;
        
        insert taitem;
        
        return 'Success';
    }
    
}