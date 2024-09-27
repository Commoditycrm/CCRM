({
	myAction : function(component, event, helper) {
		var getAccId = component.get("v.Account.Id");
		var getComId = component.get("v.commodity.Id");
        var getlocId = component.get("v.Location.Id");
       
        var action = component.get("c.getPlistValue");
        action.setParams({'comid' : getComId,
                          'AccId' : getAccId,
                          'locId' : getlocId});
        alert(getAccId);
        //alert(getComId);
        //alert(getlocId);
     
        action.setCallback(this,function(response){
        
           if(response.getState() == "SUCCESS"){
               
            	component.set("v.Plist",response.getReturnValue());
       			//alert(response.getReturnValue());
            }
        });	
        $A.enqueueAction(action);
	},
   
    // function call on component Load
    doInit: function(component, event, helper) {
        // create a Default RowItem [Contact Instance] on first time Component Load
        // by call this helper function  
       // helper.createObjectData(component, event);
    },
 
    // function for save the Records 
    Save: function(component, event, helper) {
        
        if (helper.validateRequired(component, event)) {
              
            var action = component.get("c.saveContacts");
            action.setParams({
                "ListContact": component.get("v.contactList")
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    // if response if success then reset/blank the 'contactList' Attribute 
                    // and call the common helper method for create a default Object Data to Contact List 
                    component.set("v.contactList", []);
                    helper.createObjectData(component, event);
                    alert('record Save');
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    },
 
    // function for create new object Row in Contact List 
    addNewRow: function(component, event, helper) {
        // call the comman "createObjectData" helper method for add new Object Row to List  
        helper.createObjectData(component, event);
    },
 
    // function for delete the row 
    removeDeletedRow: function(component, event, helper) {
        // get the selected row Index for delete, from Lightning Event Attribute  
        var index = event.getParam("indexVar");
        // get the all List (contactList attribute) and remove the Object Element Using splice method    
        var AllRowsList = component.get("v.Plist");
        AllRowsList.splice(index, 1);
        // set the contactList after remove selected row element  
        component.set("v.Plist", AllRowsList);
    },
           
})