////Created on 22-09-2020 for the article search with Id for display article in the same page

public with sharing class fetcharticleId {
@AuraEnabled(Cacheable = true)
    public static list<articlelist> retriveArticles(String title) {
        title = '%' + title + '%';
      //  list<ArticleCategory__c> kavlist = [select Name,ArticleName__C,InternalCategory__C,ExternalCategory__C from ArticleCategory__c  where ArticleName__C like :title]; 
          list<CERM__Knowledge__kav> kavlist = [select Id,Title,Summary  from CERM__Knowledge__kav where title like :title ]; 
          list<articlelist> articlearr = new list<articlelist>();
      if(kavlist.size() > 0)
      {
        for (CERM__Knowledge__kav singlearticle : kavlist)
        {
            articlelist lstarticle = new articlelist();
           lstarticle.ID=singlearticle.ID;
           lstarticle.Title=singlearticle.Title;
           lstarticle.InternalCategory='';
           lstarticle.ExternalCategory='';
           articlearr.add(lstarticle);
        }
       }
        system.debug('arr element' +articlearr);
        return articlearr; 
    }
public Class articlelist
{
   @AuraEnabled
    public String Id{get;set;}
    @AuraEnabled
    public String Title{get;set;}
    @AuraEnabled
    public String InternalCategory{get;set;}
     @AuraEnabled
    public String ExternalCategory{get;set;}
  }  
}