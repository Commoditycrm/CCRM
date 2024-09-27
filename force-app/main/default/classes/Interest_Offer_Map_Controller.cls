public with sharing class Interest_Offer_Map_Controller {
    
    @AuraEnabled
    public static string setbasequery(string objapi){
        String baseQuery = '';
        string Fields = '';
        baseQuery = 'Select Id,Name FROM '+objapi;
        return baseQuery;
    }
    
    @Auraenabled
    public static String[] getObjectLabel(){
        String[] getLabel= new String[]{};
            for(CERM__Object_label__mdt ob : [select Id, MasterLabel, CERM__Original_label__c,CERM__Is_Active__c
                                              from CERM__Object_label__mdt
                                              where MasterLabel != null AND CERM__Is_Active__c=TRUE]) {
                                                  getLabel.add(ob.MasterLabel);       
                                              }
        // system.debug('label'+getLabel);
        
        return getLabel;
    }
    
    @AuraEnabled
    public static List < String > getselectOptions(string objObject) {
        
        List < String > allOpts = new list < String > ();
        String obapi;
        // system.debug('objObject --->' + objObject);
        //  system.debug('fld --->' + fld);
        // Get all the objects label and api name
        
        if(objObject!='Interest' && Schema.sObjectType.CERM__Object_label__mdt.isAccessible() &&
           Schema.sObjectType.CERM__Object_label__mdt.isCreateable()
           && Schema.sObjectType.CERM__Object_label__mdt.isQueryable()
           && Schema.SobjectType.CERM__Object_label__mdt.fields.MasterLabel.isAccessible()
           && Schema.SobjectType.CERM__Object_label__mdt.fields.CERM__Original_label__c.isAccessible()
           
          ){
              // get object label in metadata
              Map<String,String> oblabel = new Map<String,String>();
              for(CERM__Object_label__mdt ob : [select Id, MasterLabel, CERM__Original_label__c
                                                from CERM__Object_label__mdt
                                                where MasterLabel != null]) {
                                                    oblabel.put(ob.MasterLabel, ob.CERM__Original_label__c);
                                                }
              
              List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();    
              Map<String,String> objAPIName = new Map<String,String>();
              for(Schema.SObjectType f : gd)
              {
                  objAPIName.put(f.getDescribe().getLabel(),f.getDescribe().getName());
              }
              // System.debug('Object Names'+objAPIName);
              if(objAPIName.ContainsKey(objObject)){
                  // System.debug('yes');
                  obapi = objAPIName.get(objObject);
              }else{
                  if(oblabel.ContainsKey(objObject)){
                      objObject = oblabel.get(objObject);
                      // System.debug('objObject'+objObject);
                      if(objAPIName.ContainsKey(objObject)){
                          // System.debug('yes');
                          obapi = objAPIName.get(objObject);
                      }
                  }
                  
              }
              //  System.debug('obapi Names'+obapi);
              if(Schema.sObjectType.ListView.isAccessible() &&
                 Schema.sObjectType.ListView.isCreateable()
                 && Schema.sObjectType.ListView.isQueryable()
                 && Schema.SobjectType.ListView.fields.Name.isAccessible())
              {
                  for(ListView  lv : [select Id, Name FROM ListView Where SobjectType =: obapi]){
                      allOpts.add(lv.Name);
                  }
              }else{
                  allOpts.add('All');
                  allOpts.add('This Month');
                  allOpts.add('Last Month');
              }
          }
        // system.debug('allOpts --->' + allOpts);
        return allOpts;
    }
    
    @Auraenabled
    public static string getobjAPI(string objlabel){
        Map<String,String> oblabel = new Map<String,String>();
        String objAPI = '';
        Map<String,String> objAPIName = new Map<String,String>();
        for(CERM__Object_label__mdt ob : [select Id, MasterLabel, CERM__Original_label__c
                                          from CERM__Object_label__mdt
                                          where MasterLabel != null]) {
                                              oblabel.put(ob.MasterLabel, ob.CERM__Original_label__c);
                                          }
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();    
        
        for(Schema.SObjectType f : gd)
        {
            objAPIName.put(f.getDescribe().getLabel(),f.getDescribe().getName());
        }
        // System.debug('Object Names'+objAPIName);
        if(objAPIName.ContainsKey(objlabel)){
            //  System.debug('yes');
            objAPI = objAPIName.get(objlabel);
        }else{
            if(oblabel.ContainsKey(objlabel)){
                objlabel = oblabel.get(objlabel);
                //  System.debug('objlabel'+objlabel);
                if(objAPIName.ContainsKey(objlabel)){
                    // System.debug('yes');
                    objAPI = objAPIName.get(objlabel);
                }
            }
            
        }
        // System.debug('obapi Names'+objAPI);
        return objAPI;
    }
    
    @AuraEnabled
    public static Map<String,List<sObject>> getDataFromDB(string getObjLabel, string getListView, string getCommodity){
        List <sObject> Recordlist = new List <sObject>();
        List <CERM__BL_Commodity__c> inventorylist = new List <CERM__BL_Commodity__c>();
        List <sObject> interestList = new List <sObject>();
        List <sObject> offerList = new List <sObject>();
        List<List<sObject>> getInterestOffer = new List<List<sObject>>();
        Map<String,List<sObject>> interestOfferMap =new Map<String,List<sObject>>(); 
        // system.debug('getObjLabel'+getObjLabel);
        // system.debug('getListView'+getListView);
        // system.debug('getCommodity'+getCommodity);
        
        String getobjapi = '';
        String getbasequery = '';
        String selListViewId = '';
        ApexPages.StandardSetController sc;
        Map<string,Id> listview = new Map<string,Id>();
        set<string> recordids = new set<string>();
        if(getObjLabel != null && getObjLabel!='Interest'){
            getobjapi = getobjAPI(getObjLabel);
            // SYstem.debug('getobjapi--->'+getobjapi);
        }
        if(getobjapi != null && getobjapi!=''){
            getbasequery = setbasequery(getobjapi);
            // SYstem.debug('getbasequery--->'+getbasequery);
        }   
        for(ListView  lv : [select Id, Name FROM ListView Where SobjectType =: getobjapi]){
            listview.Put(lv.Name, lv.Id);
        }
        // SYstem.debug('listview--->'+listview); 
        if(listview.ContainsKey(getListView)){
            selListViewId = listview.get(getListView);
            // SYstem.debug('selListViewId--->'+selListViewId); 
        }
        
        if(getbasequery!=null && getbasequery !=''){
            sc = new ApexPages.StandardSetController(Database.getQueryLocator(getbasequery));
            // SYstem.debug('sc--->'+sc);
            sc.setFilterId(selListViewId);
            sc.setPageSize(sc.getResultSize());
            //  SYstem.debug('sc--->'+sc+' '+(List<sObject>) sc.getRecords()); 
            if(sc.getHasNext()){
                
                //  System.debug('1');
                while(sc.getHasNext()){
                    //  System.debug('2');
                    for(sObject rec : (List<sObject>) sc.getRecords()){
                        recordids.add(rec.Id);
                    }
                    sc.next(); 
                }
                
            }else{
                for(sObject rec : (List<sObject>) sc.getRecords()){
                    recordids.add(rec.Id);
                }
            }
        }
        
        if(getObjLabel!=null && getListView!=null){
            if(getObjLabel!='Interest'){
                if(getObjLabel == 'Inventory' && getCommodity!=null){
                    //  system.debug('recordids----------->'+recordids);
                    if(Schema.sObjectType.CERM__BL_Commodity__c.isAccessible() && Schema.sObjectType.CERM__BL_Commodity__c.isQueryable()
                       && Schema.SobjectType.CERM__BL_Commodity__c.fields.CERM__Business_Location__c.isAccessible() && Schema.SobjectType.CERM__BL_Commodity__c.fields.CERM__Storage_Net__c.isAccessible()
                       && Schema.SobjectType.CERM__BL_Commodity__c.fields.CERM__Org_Country__c.isAccessible() && Schema.SobjectType.CERM__BL_Commodity__c.fields.CERM__Inventory_DB__c.isAccessible()
                       && Schema.SobjectType.CERM__BL_Commodity__c.fields.CERM__Net_Stock_Position__c.isAccessible() && Schema.SobjectType.CERM__BL_Commodity__c.fields.CERM__Inventory_Net__c.isAccessible())
                        
                        for(CERM__BL_Commodity__c loc : [Select id,Name,CERM__Business_Location__r.CERM__Account__r.Name,CERM__Storage_Net__c,
                                                         CERM__Business_Location__r.CERM__Account__r.BillingStreet,CERM__Business_Location__r.CERM__Account__r.BillingPostalCode,
                                                         CERM__Business_Location__r.CERM__Account__r.BillingCity,CERM__Business_Location__r.CERM__Account__r.BillingState,
                                                         CERM__Business_Location__r.Name,CERM__Org_Country__c,CERM__Inventory_DB__c,CERM__Commodity__c,CERM__Commodity__r.Name,CERM__UoM__r.Name,
                                                         CERM__Net_Stock_Position__c,CERM__Business_Location__r.CERM__Account__r.BillingCountry,CERM__Inventory_Net__c,
                                                         CERM__Business_Location__r.CERM__Account__r.BillingLatitude,CERM__Business_Location__r.CERM__Account__r.BillingLongitude
                                                         From CERM__BL_Commodity__c Where (CERM__Inventory_Net__c > 0 OR CERM__Storage_Net__c > 0 )AND CERM__Business_Location__r.CERM__Account__r.Name != null And CERM__Business_Location__r.CERM__Account__r.BillingCountry != null AND CERM__UoM__r.Name != null AND CERM__Commodity__r.Name !=null AND CERM__Commodity__c =:getCommodity AND ID IN : recordids]){
                                                             
                                                             Recordlist.add(loc);    
                                                         }
                    // system.debug('inventorylist------.'+inventorylist);
                    /*for(CERM__BL_Commodity__c inv : inventorylist){
if(inv.CERM__Commodity__c==getCommodity){
system.debug('');
Recordlist.add(inv);
}
}
system.debug('Recordlist'+Recordlist.size());*/
                    if(Recordlist.size()>0){
                        interestOfferMap.put('Inventory',Recordlist);
                    }
                    // system.debug('interestOfferMap'+interestOfferMap.size());
                }else if(getObjLabel == 'Accounts' && Schema.sObjectType.Account.isAccessible() &&
                         Schema.sObjectType.Account.isCreateable()
                         && Schema.sObjectType.Account.isQueryable()
                         && Schema.SobjectType.Account.fields.Name.isAccessible() && Schema.SobjectType.Account.fields.Type.isAccessible() 
                         && Schema.SobjectType.Account.fields.BillingStreet.isAccessible() && Schema.SobjectType.Account.fields.BillingPostalCode.isAccessible() 
                         && Schema.SobjectType.Account.fields.BillingCity.isAccessible() && Schema.SobjectType.Account.fields.BillingState.isAccessible() 
                         && Schema.SobjectType.Account.fields.BillingCountry.isAccessible() && Schema.SobjectType.Account.fields.BillingLatitude.isAccessible() 
                         && Schema.SobjectType.Account.fields.BillingLongitude.isAccessible()){
                             
                             for(Account Acc : [Select id,Name,Type,
                                                BillingStreet,BillingPostalCode,
                                                BillingCity,BillingState,
                                                BillingCountry,BillingLatitude,BillingLongitude
                                                From Account Where BillingLatitude != null AND BillingLongitude != null AND ID IN : recordids]){
                                                    
                                                    Recordlist.add(Acc);    
                                                }
                             if(Recordlist.size()>0){
                                 interestOfferMap.put('Accounts',Recordlist);
                             }
                         }
            }else if(getCommodity!=null){
                if(getListView=='All'){
                    if(Schema.sObjectType.CERM__Bid__c.isAccessible() && Schema.sObjectType.CERM__Bid__c.isQueryable() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Account__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.Name.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Record__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.CERM__Quantity__c.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Uom__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.CERM__Commodity__c.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Uom__c.isAccessible())
                        
                        
                        for(CERM__Bid__c loc : [Select id,Name,CERM__Record__c,CERM__Quantity__c,
                                                CERM__Account__r.BillingStreet,CERM__Account__r.BillingPostalCode,CERM__Uom__c,
                                                CERM__Account__r.BillingCity,CERM__Account__r.BillingState,
                                                CERM__Account__r.Name,CERM__Commodity__r.Name,CERM__Uom__r.Name,
                                                CERM__Account__r.BillingCountry,CERM__Account__r.BillingLatitude,CERM__Account__r.BillingLongitude
                                                From CERM__Bid__c Where CERM__Quantity__c > 0 AND CERM__Account__r.BillingLatitude != null AND CERM__Account__r.BillingLongitude != null AND CERM__UoM__r.Name != null AND CERM__Commodity__c != null AND CERM__Commodity__c =:getCommodity]){
                                                    
                                                    interestList.add(loc);    
                                                }
                    if(Schema.sObjectType.CERM__Offer__c.isAccessible() && Schema.sObjectType.CERM__Offer__c.isQueryable()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Record__c.isAccessible() && Schema.SobjectType.CERM__Offer__c.fields.Name.isAccessible()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Quantity__c.isAccessible() && Schema.SobjectType.CERM__Offer__c.fields.CERM__Account__c.isAccessible()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Commodity__c.isAccessible())
                        
                        for(CERM__Offer__c off : [Select id,Name,CERM__Record__c,CERM__Quantity__c,
                                                  CERM__Account__r.BillingStreet,CERM__Account__r.BillingPostalCode,CERM__Uom__c,
                                                  CERM__Account__r.BillingCity,CERM__Account__r.BillingState,
                                                  CERM__Account__r.Name,CERM__Commodity__r.Name,CERM__Uom__r.Name,
                                                  CERM__Account__r.BillingCountry,CERM__Account__r.BillingLatitude,CERM__Account__r.BillingLongitude
                                                  From CERM__Offer__c Where CERM__Quantity__c > 0 AND CERM__Account__r.BillingLatitude != null AND CERM__Account__r.BillingLongitude != null  AND CERM__UoM__r.Name != null AND CERM__Commodity__c != null AND CERM__Commodity__c =:getCommodity]){
                                                      
                                                      offerList.add(off);    
                                                  }
                    //  system.debug('interest'+interestList.size());
                    // system.debug('offer'+offerList.size());
                    // system.debug('getInterestOffer'+getInterestOffer);
                    if(interestList.size()>0){
                        interestOfferMap.put('Interest',interestList);
                    }
                    if(offerList.size()>0){
                        interestOfferMap.put('Offer',offerList);
                    }
                }else if(getListView=='This Month'){
                    if(Schema.sObjectType.CERM__Bid__c.isAccessible() && Schema.sObjectType.CERM__Bid__c.isQueryable() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Account__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.Name.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Record__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.CERM__Quantity__c.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Uom__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.CERM__Commodity__c.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Uom__c.isAccessible())
                        for(CERM__Bid__c loc : [Select id,Name,CERM__Record__c,CERM__Quantity__c,
                                                CERM__Account__r.BillingStreet,CERM__Account__r.BillingPostalCode,CERM__Uom__c,
                                                CERM__Account__r.BillingCity,CERM__Account__r.BillingState,
                                                CERM__Account__r.Name,CERM__Commodity__r.Name,CERM__Uom__r.Name,
                                                CERM__Account__r.BillingCountry,CERM__Account__r.BillingLatitude,CERM__Account__r.BillingLongitude
                                                From CERM__Bid__c Where CERM__Quantity__c > 0 AND CERM__Account__r.BillingLatitude != null AND CERM__Account__r.BillingLongitude != null AND CERM__UoM__r.Name != null AND CERM__Commodity__c != null AND CERM__Commodity__c =:getCommodity AND Createddate= This_Month]){
                                                    
                                                    interestList.add(loc);    
                                                }
                    if(Schema.sObjectType.CERM__Offer__c.isAccessible() && Schema.sObjectType.CERM__Offer__c.isQueryable()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Record__c.isAccessible() && Schema.SobjectType.CERM__Offer__c.fields.Name.isAccessible()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Quantity__c.isAccessible() && Schema.SobjectType.CERM__Offer__c.fields.CERM__Account__c.isAccessible()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Commodity__c.isAccessible())
                        for(CERM__Offer__c off : [Select id,Name,CERM__Record__c,CERM__Quantity__c,
                                                  CERM__Account__r.BillingStreet,CERM__Account__r.BillingPostalCode,CERM__Uom__c,
                                                  CERM__Account__r.BillingCity,CERM__Account__r.BillingState,
                                                  CERM__Account__r.Name,CERM__Commodity__r.Name,CERM__Uom__r.Name,
                                                  CERM__Account__r.BillingCountry,CERM__Account__r.BillingLatitude,CERM__Account__r.BillingLongitude
                                                  From CERM__Offer__c Where CERM__Quantity__c > 0 AND CERM__Account__r.BillingLatitude != null AND CERM__Account__r.BillingLongitude != null  AND CERM__UoM__r.Name != null AND CERM__Commodity__c != null AND CERM__Commodity__c =:getCommodity AND Createddate= This_Month]){
                                                      
                                                      offerList.add(off);    
                                                  }
                    //  system.debug('interest'+interestList.size());
                    // system.debug('offer'+offerList.size());
                    // system.debug('getInterestOffer'+getInterestOffer);
                    if(interestList.size()>0){
                        interestOfferMap.put('Interest',interestList);
                    }
                    if(offerList.size()>0){
                        interestOfferMap.put('Offer',offerList);
                    }
                }else{
                    if(Schema.sObjectType.CERM__Bid__c.isAccessible() && Schema.sObjectType.CERM__Bid__c.isQueryable() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Account__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.Name.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Record__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.CERM__Quantity__c.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Uom__c.isAccessible()
                       && Schema.SobjectType.CERM__Bid__c.fields.CERM__Commodity__c.isAccessible() && Schema.SobjectType.CERM__Bid__c.fields.CERM__Uom__c.isAccessible())
                        for(CERM__Bid__c loc : [Select id,Name,CERM__Record__c,CERM__Quantity__c,
                                                CERM__Account__r.BillingStreet,CERM__Account__r.BillingPostalCode,CERM__Uom__c,
                                                CERM__Account__r.BillingCity,CERM__Account__r.BillingState,
                                                CERM__Account__r.Name,CERM__Commodity__r.Name,CERM__Uom__r.Name,
                                                CERM__Account__r.BillingCountry,CERM__Account__r.BillingLatitude,CERM__Account__r.BillingLongitude
                                                From CERM__Bid__c Where CERM__Quantity__c > 0 AND CERM__Account__r.BillingLatitude != null AND CERM__Account__r.BillingLongitude != null AND CERM__UoM__r.Name != null AND CERM__Commodity__c != null AND CERM__Commodity__c =:getCommodity AND Createddate= Last_Month]){
                                                    
                                                    interestList.add(loc);    
                                                }
                    if(Schema.sObjectType.CERM__Offer__c.isAccessible() && Schema.sObjectType.CERM__Offer__c.isQueryable()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Record__c.isAccessible() && Schema.SobjectType.CERM__Offer__c.fields.Name.isAccessible()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Quantity__c.isAccessible() && Schema.SobjectType.CERM__Offer__c.fields.CERM__Account__c.isAccessible()
                       && Schema.SobjectType.CERM__Offer__c.fields.CERM__Commodity__c.isAccessible())
                        for(CERM__Offer__c off : [Select id,Name,CERM__Record__c,CERM__Quantity__c,
                                                  CERM__Account__r.BillingStreet,CERM__Account__r.BillingPostalCode,CERM__Uom__c,
                                                  CERM__Account__r.BillingCity,CERM__Account__r.BillingState,
                                                  CERM__Account__r.Name,CERM__Commodity__r.Name,CERM__Uom__r.Name,
                                                  CERM__Account__r.BillingCountry,CERM__Account__r.BillingLatitude,CERM__Account__r.BillingLongitude
                                                  From CERM__Offer__c Where CERM__Quantity__c > 0 AND CERM__Account__r.BillingLatitude != null AND CERM__Account__r.BillingLongitude != null  AND CERM__UoM__r.Name != null AND CERM__Commodity__c != null AND CERM__Commodity__c =:getCommodity AND Createddate= Last_Month]){
                                                      
                                                      offerList.add(off);    
                                                  }
                    // system.debug('interest'+interestList.size());
                    // system.debug('offer'+offerList.size());
                    // system.debug('getInterestOffer'+getInterestOffer);
                    if(interestList.size()>0){
                        interestOfferMap.put('Interest',interestList);
                    }
                    if(offerList.size()>0){
                        interestOfferMap.put('Offer',offerList);
                    }
                }
            }
        }
        return interestOfferMap;
    }
}