//Created for Internal , External Datacategory as root node

public with sharing class articlelistwithgroup {
    @AuraEnabled(cacheable=true)
    public static List<MenuWrapper> getTreeData( ){
        List<MenuWrapper> aooo = new List<MenuWrapper>();
        list <knowledge__DataCategorySelection>  accs; 
        // List<MenuMaster__c> accs = [Select Id , Name,Name__c , ParentId__c from MenuMaster__c order by Name];
        if(Schema.sObjectType.knowledge__DataCategorySelection.isAccessible() &&
           Schema.sObjectType.knowledge__DataCategorySelection.isQueryable()
           && Schema.sObjectType.knowledge__DataCategorySelection.fields.DataCategoryName.isAccessible() 
           && Schema.sObjectType.knowledge__DataCategorySelection.fields.ParentId.isAccessible()
           && Schema.sObjectType.knowledge__DataCategorySelection.fields.DataCategoryGroupName.isAccessible())
            accs = [SELECT Id,DataCategoryName,ParentId,DataCategoryGroupName FROM knowledge__DataCategorySelection order by ParentId limit 50000];
        //System.debug('Articles' +accs);  
        //   System.debug('Community Id : ' +commId);
        // External Community Id : 0DB2w0000004F8K 
        //Internal Community Id :  0DB2w0000004F9h
        List <knowledge__kav> articletitle;
        if(Schema.sObjectType.knowledge__kav.isAccessible() &&  Schema.sObjectType.knowledge__kav.isQueryable()
           && Schema.sObjectType.knowledge__kav.fields.title.isAccessible()  )
        {
            articletitle = [Select ID,title from knowledge__kav limit 50000];
        }
        Map<string, string>exMap= new map<string, string>();
        
        if(Schema.sObjectType.knowledge__kav.isAccessible() &&
           Schema.sObjectType.knowledge__kav.isCreateable()
           && Schema.sObjectType.knowledge__kav.isQueryable())
        {
            for(knowledge__kav kk : articletitle )
                exMap.put(kk.ID,kk.title);
        }
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
                //Added for Internal Article come first
                if(singleResult.getName() == 'Internal')
                    pairs.add(0,p);
                else
                    pairs.add(p);
            }
            List<Schema.DescribeDataCategoryGroupStructureResult>results = 
                Schema.describeDataCategoryGroupStructures(pairs, false);
            // System.debug('results:'+results); 
            
            for(Schema.DescribeDataCategoryGroupStructureResult r : results){
                //  System.debug('rvalue: ' +r); 
                //  System.debug('Name:' +r.getName());
                //Commented to show both internal and external articles     17-09-2020
                //     if( r.getName() == 'Internal'  )
                //{    System.debug('Inside Internal'); 
                Schema.DataCategory[] topCategories = r.getTopCategories();
                //Form a tree with topnode 
                MenuWrapper aWraper = new MenuWrapper() ;
                
                aWraper.name =r.getName() ;
                aWraper.label =r.getLabel();
                aWraper.expanded =false ;
                List<Items> TopItems = new List<Items>();
                List<Items> Toparr = new List<Items>() ;
                
                for(Schema.DataCategory c : topCategories){
                    //  System.debug('Top Category' +c.getName()); //ALL
                    Schema.DataCategory[] subCats = c.getChildCategories();
                    //  System.debug('Child1Category' +subCats); 
                    for(Schema.DataCategory sc: subCats){
                        // System.debug('Parent' +sc.getName());//Admin,Manager,SalesExecutive
                        String Catgroupname;
                        Catgroupname = sc.getName();
                        
                        List<Items> co = new List<Items>();
                        List<Items> namearr = new List<Items>() ;
                        String childname0 = sc.getName();
                        Items childItem0 = new Items();
                        childItem0.name = childname0;
                        childItem0.label = sc.getLabel();
                        childItem0.expanded = false;      
                        // TopItems.add(childItem0);
                        Schema.DataCategory[] subCats1 = sc.getChildCategories();
                        for(Schema.DataCategory sc1: subCats1){
                            //  System.debug('Category2' +sc1.getName());
                            String childname = sc1.getName();
                            Items childItem = new Items();
                            childItem.name = childname;
                            // childItem.label =  childname; //Comment on 17-09-2020
                            childItem.label =  sc1.getLabel(); // Newly Added for label display the categoryname not unique name 17-09-2020
                            childItem.expanded = false;
                            // System.debug('Child : ' +sc1.getName());//User Creation
                            List<Items> namearr1 = new List<Items>() ; 
                            
                            for(knowledge__DataCategorySelection getarticle: accs){
                                String ArticleParent = sc1.getName();
                                
                                if(getarticle.DataCategoryName == childname) 
                                {
                                    Items articleItem = new Items();
                                    articleItem.name = getarticle.ParentId;
                                    articleItem.label = exMap.get(getarticle.ParentId);
                                    articleItem.expanded = false;
                                    //  System.debug('Article Name' +articleItem);//Added for checking 18-09-2020
                                    if(articleItem.label != null) //Added for article not having mapping with parentid
                                        namearr1.add(articleItem);
                                }
                            }//Article Loop
                            if(namearr1.size() > 0){//Check whether there is an article for the leaf node;if not no need to add that node
                                childItem.label = childItem.label + ' (' + namearr1.size() + ')' ; //Newly Added for article count 13-09-2020
                                // childItem.name = childItem.label  ; //Newly Added for article count 13-09-2020 
                                childItem.items = namearr1;
                                namearr.add(childItem); 
                            }
                        }//chilld1
                        if(namearr.size() > 0) 
                        {  ChildItem0.items = namearr;
                         Toparr.add(ChildItem0); } 
                    }
                }  //Leaf Node
                if(Toparr.size() > 0) 
                {  aWraper.items = Toparr;
                 aooo.add(aWraper); } 
            }  
        }catch (Exception e){}
        //   }//Internal Community loop 
        // Commented to show both internal and external articles 17-09-2020  
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