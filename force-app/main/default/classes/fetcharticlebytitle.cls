//Created on 20-11-2020
public class fetcharticlebytitle {
  @AuraEnabled(cacheable = true)
 public static List<Knowledge__kav> fetcharticle()
    {
        List<Knowledge__kav> artlist = new List<Knowledge__kav>();
        
        artlist = [select Id,Title from Knowledge__kav where Title = 'Knowledge Landing Page'];
        if(artlist.size() > 0)
            Knowledge__kav artrecord = artlist[0];
        else
        {
            Knowledge__kav dummyrec = new Knowledge__kav();
                      artlist.add(dummyrec);   
        }
        return artlist;
        
    }

}