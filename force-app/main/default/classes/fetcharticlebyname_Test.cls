/* Created on 26/11/20
 * test class for fetcharticlebyname Apex class
 * coverage 100% */
@isTest
public class fetcharticlebyname_Test {
    @isTest
    Public static void fetcharticlemethod(){
         List<CERM__Knowledge__kav> artlist = new List<CERM__Knowledge__kav>();
        CERM__Knowledge__kav know=new CERM__Knowledge__kav();
        know.Title='Knowledge Landing Page';
         know.Summary='Test Article';
        know.UrlName='Test';
        artlist.add(know);
        insert artlist;
       
        
       
        fetcharticlebyname.fetcharticle();
                        system.assertEquals(1, artlist.size()); 

    }

}