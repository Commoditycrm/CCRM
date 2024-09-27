({
    doInit: function(component, event, helper) {
        var action = component.get("c.commlist");
    		action.setCallback(this,function(response){
        
           if(response.getState() == "SUCCESS"){
            	component.set("v.values",response.getReturnValue());
            }
         });		
        $A.enqueueAction(action);
        
	    
    },
    dragstart: function(component, event, helper) {
        component.set("v.dragid", event.target.dataset.dragId);
    },
    drop: function(component, event, helper) {
        var dragId = component.get("v.dragid"),
            values = component.get("v.values"),
            temp;
        temp = values[dragId];
      //  values[dragId] = values[event.target.dataset.dragId];
       // values[event.target.dataset.dragId] = temp;
        component.set("v.cname", temp);
        event.preventDefault();
        
        var cmname = component.get("v.cname.Name");
        var ev = $A.get("e.c:ComEvent");
        ev.setParams({"comname" :cmname });
       // alert('com name'+cmname);
        ev.fire();
    },
    cancel: function(component, event, helper) {
        event.preventDefault();
    }
    
   
    
})