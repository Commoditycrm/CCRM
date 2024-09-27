/*created on 10/11/2020.......
 * Populate Account In case */
public with sharing class CaseTriggerHandler {

public static void PopulateAccountInCase(List<Case> newlist)
{
    List<Account> listAccounts = new List<Account>();

         
               if(Schema.sObjectType.Account.isAccessible() && Schema.sObjectType.Account.isQueryable() && Schema.sObjectType.Case.isAccessible() && Schema.sObjectType.Case.isQueryable())
               {
                    if(Schema.sObjectType.Account.isAccessible() && Schema.sObjectType.Account.isQueryable()
                && Schema.sObjectType.Account.fields.Name.isAccessible()  && Schema.sObjectType.Account.fields.core_Domain__c.isAccessible() ){
                      listAccounts =[Select Id,Name,core_Domain__c,Type From Account];   
                }
                   
                      Map<String,Account> emailToAccountMap = new Map<String,Account>();
                      List<Case> casesToUpdate = new List<Case>();
                   
                      for (Case caseObj:newlist) 
                      {
         				//check the account id of the case and the supplied email field
                          if ((String.isBlank (caseobj.AccountId)  && (!String.isBlank (caseObj.SuppliedEmail ))))
                         {
                 				//IF the account field is 	empty and the email is not empty , get the domain of the email by split
                 				//abc@123.com ==> 123.com  is the domain
                                string domainname =caseObj.SuppliedEmail.split('@')[1];
                             //Check the Account object with the  core__domain__c value as domain name  and the type  Customer - Direct
                             //if exists map the supplied email and the Account object 
                             //push the case record into the new list caseToUpdate
            				   for(Account act:listAccounts)
                               {
            				            if(act.Core_Domain__c==domainname && act.Type=='Customer - Direct')
                                        {
                                                  emailToAccountMap.put(caseObj.SuppliedEmail,act);
                                                  casesToUpdate.add(caseObj);
                                        }//If 
                                }//For Account
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