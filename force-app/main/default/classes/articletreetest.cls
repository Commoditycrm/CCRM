// Created On 10-09-2020
// Data from Datacategories for Article with all subcategories
// 
// //Id=02o2w000000L9nDAAS, DataCategoryName=Delete_User
// //05:36:48:047 USER_DEBUG [8]|DEBUG|Articles(Knowledge__DataCategorySelection:{Id=02o2w000000L9nDAAS, DataCategoryName=Delete_User, ParentId=ka02w000001E48LAAS, DataCategoryGroupName=Admin}, Knowledge__DataCategorySelection:{Id=02o2w000000L9nNAAS, DataCategoryName=Add_New_User, ParentId=ka02w000001E48VAAS, DataCategoryGroupName=Admin})
//ParentId is the Article Id


//articles(Knowledge__DataCategorySelection:{Id=02o2w000000L9nDAAS, DataCategoryName=Delete_User, ParentId=ka02w000001E48LAAS, DataCategoryGroupName=Admin}, 
//Knowledge__DataCategorySelection:{Id=02o2w000000L9nJAAS, DataCategoryName=All, ParentId=ka02w000001E48QAAS, DataCategoryGroupName=Manager}, 
//Knowledge__DataCategorySelection:{Id=02o2w000000L9nNAAS, DataCategoryName=Add_New_User, ParentId=ka02w000001E48VAAS, DataCategoryGroupName=Admin},
// Knowledge__DataCategorySelection:{Id=02o2w000000L9o4AAC, Da
// 
// 
//Articles(Knowledge__DataCategorySelection:{Id=02o2w000000L9nDAAS, DataCategoryName=Delete_User, ParentId=ka02w000001E48LAAS, DataCategoryGroupName=Admin}, 
//Knowledge__DataCategorySelection:{Id=02o2w000000L9nIAAS, DataCategoryName=Add_New_User, ParentId=ka02w000001E48QAAS, DataCategoryGroupName=Admin}, 
//Knowledge__DataCategorySelection:{Id=02o2w000000L9nNAAS, DataCategoryName=Add_New_User, ParentId=ka02w000001E48VAAS, DataCategoryGroupName=Admin}, 
// Knowledge__DataCategorySelection:{Id=02o2w000000L9o4
    

public with sharing class articletreetest {
   @AuraEnabled(cacheable=true)
    public static List<MenuWrapper> getTreeData( String commId){
         List<MenuWrapper> aooo = new List<MenuWrapper>();
      
       // List<MenuMaster__c> accs = [Select Id , Name,Name__c , ParentId__c from MenuMaster__c order by Name];
        list <knowledge__DataCategorySelection>  accs = [SELECT Id,DataCategoryName,ParentId,DataCategoryGroupName FROM knowledge__DataCategorySelection order by ParentId limit 50000];
        //System.debug('Articles' +accs);  
      // System.debug('Community Id : ' +commId);
        // External Community Id : 0DB2w0000004F8K 
        //Internal Community Id :  0DB2w0000004F9h


        List <knowledge__kav> articletitle = [Select ID,title from knowledge__kav limit 50000];
		
        Map<string, string>exMap= new map<string, string>();
        
        for(knowledge__kav kk : articletitle )
            exMap.put(kk.ID,kk.title);
        
         try{
        List<DescribeDataCategoryGroupResult> describeCategoryResult;
    List<DescribeDataCategoryGroupStructureResult> describeCategoryStructureResult;
   
        //Making the call to the describeDataCategoryGroups to
        //get the list of category groups associated
        List<String> objType = new List<String>();
        objType.add('KnowledgeArticleVersion');
        describeCategoryResult = Schema.describeDataCategoryGroups(objType);

        //Creating a list of pair objects to use as a parameter
        //for the describe call
        List<DataCategoryGroupSobjectTypePair> pairs = new List<DataCategoryGroupSobjectTypePair>();

        //Looping throught the first describe result to create
        //the list of pairs for the second describe call
      for(DescribeDataCategoryGroupResult singleResult : describeCategoryResult){
           DataCategoryGroupSobjectTypePair p = new DataCategoryGroupSobjectTypePair();
           p.setSobject(singleResult.getSobject());
           p.setDataCategoryGroupName(singleResult.getName());
           pairs.add(p);
         }
List<Schema.DescribeDataCategoryGroupStructureResult>results = 
      Schema.describeDataCategoryGroupStructures(pairs, false);
       //  System.debug('results:'+results); 
          for(Schema.DescribeDataCategoryGroupStructureResult r : results){
             //  System.debug('rvalue: ' +r); 
             // System.debug('Name:' +r.getName());
              
              if( r.getName() == 'External'  && commId == '0DB2w0000004F8K')
               {    //System.debug('Inside'); 
                  Schema.DataCategory[] topCategories = r.getTopCategories();
              for(Schema.DataCategory c : topCategories){
                //  System.debug('Top Category' +c.getName()); //ALL
                  Schema.DataCategory[] subCats = c.getChildCategories();
                //  System.debug('Child1Category' +subCats); 
                  for(Schema.DataCategory sc: subCats){
                     // System.debug('Parent' +sc.getName());//Admin,Manager,SalesExecutive
                      String Catgroupname;
                      Catgroupname = sc.getName();
                      //Form a tree with topnode 
                       MenuWrapper aWraper = new MenuWrapper() ;
                 
            			aWraper.name =Catgroupname ;
            			//aWraper.label =Catgroupname ; //Commented 17-09-2020
                      aWraper.label = sc.getLabel(); //Added 17-09-2020
            			aWraper.expanded =false ;
             			List<Items> co = new List<Items>();
             			List<Items> namearr = new List<Items>() ;
                                            
                       Schema.DataCategory[] subCats1 = sc.getChildCategories();
                   for(Schema.DataCategory sc1: subCats1){
                    //  System.debug('Category2' +sc1.getName());
                    String childname = sc1.getName();
                       Items childItem = new Items();
                       childItem.name = childname;
            	      //childItem.label =  childname; //Commented 17-09-2020
            	       childItem.label =  sc1.getLabel(); //Added 17-09-2020
                      childItem.expanded = false;
                     //  System.debug('Child : ' +sc1.getName());//User Creation
                       List<Items> namearr1 = new List<Items>() ; 
                    
                   for(knowledge__DataCategorySelection getarticle: accs){
                         String ArticleParent = sc1.getName();
                       
                       if(getarticle.DataCategoryName == childname) 
                       {
                            Items articleItem = new Items();
            		       articleItem.name = getarticle.ParentId;
                          articleItem.label = exMap.get(getarticle.ParentId);
            	          articleItem.expanded = false;
                         namearr1.add(articleItem);
                 /*        //Added 29-09-2020  
                           Items articleItem1 = new Items();
            		       articleItem1.name = 'ka02w0000012aZDAAY';
                          articleItem1.label = 'Sample1';
            	          articleItem1.expanded = false;
                         namearr1.add(articleItem1);
                           //END 29-09-2020
                           //*/
                       }
                   }//Article Loop
                      if(namearr1.size() > 0){//Check whether there is an article for the leaf node;if not no need to add that node
                       childItem.items = namearr1;
                       childItem.label = childItem.label + ' (' + namearr1.size() + ')' ; //Newly Added for article count 13-09-2020
                        namearr.add(childItem); 
                       } 
                   }  //Leaf Node
                      if(namearr.size() > 0) 
                      {  aWraper.items = namearr;
                       aooo.add(aWraper); } 
          }  
      }
          }//External Community loop  
              
              else   if( r.getName() == 'Internal'  && commId == '0DB2w0000004F9h')
               {   // System.debug('Inside Internal'); 
                  Schema.DataCategory[] topCategories = r.getTopCategories();
              for(Schema.DataCategory c : topCategories){
                 // System.debug('Top Category' +c.getName()); //ALL
                  Schema.DataCategory[] subCats = c.getChildCategories();
                //  System.debug('Child1Category' +subCats); 
                  for(Schema.DataCategory sc: subCats){
                     // System.debug('Parent' +sc.getName());//Admin,Manager,SalesExecutive
                      String Catgroupname;
                      Catgroupname = sc.getName();
                      //Form a tree with topnode 
                       MenuWrapper aWraper = new MenuWrapper() ;
                 
            			aWraper.name =Catgroupname ;
            			aWraper.label =Catgroupname ;
            			aWraper.expanded =false ;
             			List<Items> co = new List<Items>();
             			List<Items> namearr = new List<Items>() ;
                                            
                       Schema.DataCategory[] subCats1 = sc.getChildCategories();
                   for(Schema.DataCategory sc1: subCats1){
                    //  System.debug('Category2' +sc1.getName());
                    String childname = sc1.getName();
                       Items childItem = new Items();
                       childItem.name = childname;
            	      childItem.label =  childname;
                      childItem.expanded = false;
                     //  System.debug('Child : ' +sc1.getName());//User Creation
                       List<Items> namearr1 = new List<Items>() ; 
                    
                   for(knowledge__DataCategorySelection getarticle: accs){
                         String ArticleParent = sc1.getName();
                       
                       if(getarticle.DataCategoryName == childname) 
                       {
                          //  System.debug('Inside Article');
                           
                           Items articleItem = new Items();
            		       articleItem.name = getarticle.ParentId;
                          articleItem.label = exMap.get(getarticle.ParentId);
            	          articleItem.expanded = false;
                         namearr1.add(articleItem);
                            //New Added 29-09-2020
                           Items articleItem1 = new Items();
            		       articleItem1.name = 'ka02w0000012aZDAAY';
                          articleItem1.label = 'sample1 without DC';
            	          articleItem1.expanded = false;
                         namearr1.add(articleItem1);  
                        //New Ended 29-09-2020
                       // System.debug('Inside Article');
                       }
                   }//Article Loop
                      
                       
                      if(namearr1.size() > 0){//Check whether there is an article for the leaf node;if not no need to add that node
                        childItem.label = childItem.label + ' (' + namearr1.size() + ')' ; //Newly Added for article count 13-09-2020
                          // childItem.name = childItem.label  ; //Newly Added for article count 13-09-2020 
                       childItem.items = namearr1;
                        namearr.add(childItem); 
                       } 
                   }  //Leaf Node
                      if(namearr.size() > 0) 
                      {  aWraper.items = namearr;
                       aooo.add(aWraper); } 
          }  
      }
          }//Internal Community loop  
              
          }
         }catch (Exception e){}

      // System.debug('Items' +aooo);
      
           
        
       return aooo;
    
}//main menu
    
    public Class MenuWrapper{
        @AuraEnabled
        public String name{get;set;}
        @AuraEnabled
        public String label{get;set;}
        @AuraEnabled
        public Boolean expanded{get;set;}
        @AuraEnabled
        public List<Items> items{get;set;}
        
    }
    public Class Items{
        @AuraEnabled
        public String name{get;set;}
        @AuraEnabled
        public String label{get;set;}
        @AuraEnabled
        public Boolean expanded{get;set;}
         @AuraEnabled
        public List<Items> items{get;set;}
    }
}