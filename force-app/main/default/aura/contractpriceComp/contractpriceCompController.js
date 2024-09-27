({
	disp : function(component, event, helper) {
		
        var date = component.find("pricedDate").get("v.value");
        alert(date);
        var ev = $A.get("e.c:ContractEvent");
        ev.setParams({"aparam":date});
        ev.fire();
	}
})