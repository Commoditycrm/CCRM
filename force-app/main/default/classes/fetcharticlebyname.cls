// For Knowledge Landing Page
// Get the article with name 'Knowledge Landing Page ' for the knowledge open screen

public class fetcharticlebyname {
  @AuraEnabled(cacheable=true)
    public static ID fetcharticle()
    {
        List<CERM__Knowledge__kav> artlist = new List<CERM__Knowledge__kav>();
        
        artlist = [select ID,Title from CERM__Knowledge__kav where Title = 'Knowledge Landing Page' Limit 1];
        if(artlist.size() > 0)
            CERM__Knowledge__kav artrecord = artlist[0];
    
   
         return artlist[0].Id;
        
    }


}