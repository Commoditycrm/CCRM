({
	drop : function(component, event, helper) {
	var result = event.dataTransfer.getData("Text");
        
    var action = component.get("c.showdata1");
    action.setParams({'iname': result});
    action.setCallback(this,function(response){
        
           if(response.getState() == "SUCCESS"){
               
            	component.set("v.clist",response.getReturnValue());
            }
        });	
        $A.enqueueAction(action);
	},
    
    drop1 : function(component, event, helper) {
        
    }
})