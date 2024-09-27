({
    doInit : function(component, event, helper){ 
        var action = component.get("c.sendWhatsAppMessage");
        action.setParams({
        	"contrctId": component.get("v.recordId")
        });
        
        action.setCallback(this , function(response){
            
            if(response.getState() == "SUCCESS"){
                component.set("v.msg","Message has been Successfully sent"); 
            }else{
               component.set("v.msg","Message not sent");  
            }
        });
        
        $A.enqueueAction(action);
	}
})