//Created on 21-10-2020
//Populate the Account Id from the Account while creating/updating case with accountid empty and the domain name 
//is in the 'Account' object 'Core__Domain__C' field

public with sharing class PopulateAccountInCase {
    public static void PopulateAccountInCase(List<Case> newlist)
{
    List<Account> listAccounts = new List<Account>();

         
               if(Schema.sObjectType.Case.isAccessible() && Schema.sObjectType.Case.isQueryable())
               {
                    
                   
                      Map<String,Account> emailToAccountMap = new Map<String,Account>();
                      List<Case> casesToUpdate = new List<Case>();
                   
                      for (Case caseObj:newlist) 
                      {
         				//check the account id of the case and the supplied email field
                       //   if ((caseobj.AccountId==null || caseobj.AccountId=='')  && (caseObj.SuppliedEmail!=null &&  caseObj.SuppliedEmail!='' ))
                          if ((caseobj.AccountId==null || (string.isBlank((string.valueOf(caseobj.AccountId)))))  && (caseObj.SuppliedEmail!=null &&  caseObj.SuppliedEmail!='' ))
                         {
                 				//IF the account field is 	empty and the email is not empty , get the domain of the email by split
                 				//abc@123.com ==> 123.com  is the domain
                                string domainname =caseObj.SuppliedEmail.split('@')[1];
                             //Check the Account object with the  core__domain__c value as domain name  and the type  Customer - Direct
                             //if exists map the supplied email and the Account object 
                             //push the case record into the new list caseToUpdate
                             //
                             //
                             //Added on 04-12-2021 from TP Org
                             
                                domainname = domainname.split('\\.')[0];
                                domainname = '%'+ domainname +'%'; 
                               // System.debug( '------DOMAIN Name ----' + domainname); 
                                             
                             // Ended on 04-12-2021
                            // listAccounts =[Select Id,Name,core_Domain__c,Type From Account where core_Domain__c = :domainname and Type = 'Customer - Direct'];   
                             //and Type like 'Customer - Direct'
                if(Schema.sObjectType.Account.isAccessible() 
                && Schema.sObjectType.Account.isCreateable()
              && Schema.sObjectType.Account.fields.Id.isCreateable()
              && Schema.sObjectType.Account.fields.Name.isCreateable() 
               && Schema.sObjectType.Account.fields.id.isAccessible()
              && Schema.sObjectType.Account.fields.Name.isAccessible()
                  && Schema.sObjectType.Account.fields.core_Domain__c.isCreateable()
              && Schema.sObjectType.Account.fields.core_Domain__c.isAccessible())

              listAccounts =[Select Id,Name,core_Domain__c,Type From Account where  Name LIKE :domainname ORDER BY CreatedDate DESC LIMIT 1];    
                                             
                          //   system.debug('Account Details:' +listAccounts[0]);
                             if(listAccounts.size() > 0)
                             {Account act = listAccounts[0];
            				  // for(Account act:listAccounts)
                               // {
            				      //      if(act.Core_Domain__c==domainname && act.Type=='Customer - Direct')
                                     //   {
                                                  emailToAccountMap.put(caseObj.SuppliedEmail,act);
                                                  casesToUpdate.add(caseObj);
                                        }//If 
                             //   }//For Account
                          }//Case AccountId and supplied Email check
                          else
                                ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR, 'Check Account Id and Supplied Email'));
             }//case for
     
     //Update the accountid of the case with the account id in the map
     for (Case caseObj:casesToUpdate) {
                Account newAccount =emailToAccountMap.get(caseObj.SuppliedEmail);
                caseObj.AccountId =newAccount.Id;
     }
                   
               }   //Object Accessibility checking
    else
                  ApexPages.addmessage(new ApexPages.message(ApexPages.severity.ERROR, 'Insufficient access.'));
          }
        
}