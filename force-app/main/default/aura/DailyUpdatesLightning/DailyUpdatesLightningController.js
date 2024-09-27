({
    validation: function(component, event, helper){
        var Employee =   component.find("Employee").get("v.value");        
        var Comments =   component.find("Comments").get("v.value");  
        var issave = component.get("v.isSave");
        
       console.log('is save is true-->>'+issave);
         if(issave == true){
            if(Employee == ""){
                Employee = null;
            }
            if(Comments == ""){
                Comments = null;
            }
           
        if (Employee == null || Comments == null) {
            //alert('yes');
            //validation for Employee
            if(Employee == null){
                //alert('error in Employee');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Employee Should not be empty...!!!',
                    messageTemplate: 'Employee Should not be empty...!!!',
                    duration:' 4000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                issave = false;
            }
            //validation for commodity
            if (Comments == null ) {
                //alert('error in comm');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Error',
                    message:'Comments Should not be empty...!!!',
                    messageTemplate: 'Comments Should not be empty...!!!',
                    duration:' 4000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
               issave = false;
            }
        }
        }
        
        if(issave ==  true){
            var saveup = component.get('c.saveupdate');
       console.log('saved-->>'+saveup);
            $A.enqueueAction(saveup);
        }
    },
    
    saveupdate: function(component, event, helper){
        var Employee =   component.find("Employee").get("v.value");        
        var Comments =   component.find("Comments").get("v.value");  
        var save = true;
        if(save == true){
            var action = component.get("c.createUpdates");
            action.setParams({'values' :{
            "Employee" : Employee,
            "Comments" : Comments,
            },
    });
            action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                console.log('state success-->>'+state);
               var updateid = response.getReturnValue();
               // alert(contractid);
               var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success',
                    message:'Updated Successfully ...!!!',
                    messageTemplate: 'Update Inserted',
                    duration:' 4000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                toastEvent.fire();
                var a = component.get('c.clearcomponent');
                $A.enqueueAction(a);
            }
        });
        component.set("v.Spinner", true); 
        $A.enqueueAction(action);

        }
    },
        
	clearcomponent :  function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    }
})