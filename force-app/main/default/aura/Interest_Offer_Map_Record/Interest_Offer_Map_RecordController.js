({
	 accountSelected : function(component) {
         //alert("Called in selected item");
        var event = $A.get("e.c:AccountSelected");
        event.setParams({"account": component.get("v.account")});
        event.fire();
    },
    
})