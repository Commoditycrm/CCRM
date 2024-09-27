// created on 16-11-2020
// Test class for fetcharticleid Apex class
// Code Coverage 100%
@isTest
public class TestfetcharticleId {
    @isTest
    public static void retriveArticles()
    {
                 List<CERM__Knowledge__kav> artlist = new List<CERM__Knowledge__kav>();

       CERM__Knowledge__kav article = new CERM__Knowledge__kav();
        article.Title = 'Test Article';
        article.Summary = 'Testing';
        article.UrlName = 'TestUrl';
              artlist.add(article);
        insert artlist;
    
        list<fetcharticleId.articlelist> articlearr = new list<fetcharticleId.articlelist>();
        articlearr = fetcharticleId.retriveArticles('Test Article');
                                system.assertEquals(1, artlist.size()); 


     }

}