({
	loadinit : function(component, event, helper) {
	var action = component.get("c.commlist");
    action.setCallback(this,function(response){
        
           if(response.getState() == "SUCCESS"){
            	component.set("v.clist",response.getReturnValue());
            }
        });	
        $A.enqueueAction(action);
     
	},
    
    drag : function(component, event, helper) {
        
        var data = component.find("comname").get("v.value");
        event.dataTransfer.setData("Text",data);
        
    },
    
    drop : function(component, event, helper) {
        
       // var result = event.dataTransfer.getData("Text");
       // alert(result);
        
    }
})