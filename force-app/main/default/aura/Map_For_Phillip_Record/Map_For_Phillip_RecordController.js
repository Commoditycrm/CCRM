({
	 accountSelected : function(component) {
         //alert("Called in selected item");
        var event = $A.get("e.c:Map_For_Phillip_Select_RecordEvent");
         event.setParams({"account": component.get("v.account"),"title": component.get("v.title"),"object":component.get("v.object")});
        event.fire();
		
        
    },
    
})