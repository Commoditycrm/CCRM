({
    doInit : function(component, event, helper){
        
        var action = component.get("c.sendSMS3");
        action.setParams({
        	"contrctId": component.get("v.recordId")
        });
        
        action.setCallback(this , function(response){
            
            if(response.getState() == "SUCCESS"){
              /**  var toastEvent = $A.get("e.force:showToast");
    			toastEvent.setParams({
        		"title": "Success!",
                "message": "The record has been updated successfully."
    			});
    			toastEvent.fire() **/
                $A.get("e.force:closeQuickAction").fire();
            }else{
                alert('Error: ' + response.getReturnValue());
            }
            
        });
         $A.enqueueAction(action);
	}
})