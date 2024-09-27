({
    handleClick : function(component, event, helper) {
      var searchText = component.get('v.searchText');
      console.log(searchText); 
      var action = component.get('c.searchForIds');
      action.setParams({searchText: searchText});
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === 'SUCCESS') {
          var ids = response.getReturnValue();
          var allAccounts=ids[0];
          var allapplink=ids[1];
          var allitem=ids[2];
          var allpcomp=ids[3];
          component.set("v.accountlist", allAccounts);
          //component.set("v.applist", allapplink);
          component.set("v.itemlist", allitem);
          component.set("v.pcomplist", allpcomp);
          console.log(ids); 
        }
      });
      $A.enqueueAction(action);
    }
    
    /*getAccountOwner2 : function(cmp, event, helper) {
    // cleanup
    cmp.find("contactName").set('v.value', '');
    cmp.find("accountName").set('v.value', '');
    cmp.find("ownerName").set('v.value', '');

    var getContact = cmp.get("c.getContact");
    getContact.setParams( {"contactId": cmp.get("v.recordId")} );
    getContact.setCallback(this, contactCallback);
    $A.enqueueAction(getContact);

    function contactCallback(contact) {
        contact = contact.getReturnValue();
        cmp.find("contactName").set('v.value', contact.Name);
        var getAccount = cmp.get("c.getAccount");
        getAccount.setParams( {"accountId": contact.AccountId} );
        getAccount.setCallback(this, accountCallback);
        $A.enqueueAction(getAccount);
    }
    function accountCallback(account) {
        account = account.getReturnValue();
        cmp.find("accountName").set('v.value', account.Name);
        var getUser = cmp.get("c.getUser");
        getUser.setParams( {"userId": account.OwnerId} );
        getUser.setCallback(this, userCallback);
        $A.enqueueAction(getUser);
    }
    function userCallback(user) {
        user = user.getReturnValue();
        cmp.find("ownerName").set('v.value', user.Name);
    }
    }*/
})