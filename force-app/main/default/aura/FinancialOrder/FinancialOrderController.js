({
	doinit : function(component, event, helper) {
        //var cn = component.find("inpt").get("v.value");
    	var cn = event.getParam("comname");
        //alert("commodity"+event.getParam("comname"));
        var action = component.get("c.Showorders");
        //alert('current record id'+component.get("v.recordId"));
        //action.setParams({commId : component.get("v.recordId")});
        action.setParams({'commname': cn});
        $A.enqueueAction(action);
        
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                //alert('agg val'+response.getReturnValue());
                var val = response.getReturnValue();
                if(val != null){
                component.set("v.arggVal",val );
                component.set("v.renderval",true );
                } 
                if(val.length <= 0){
                    
                    component.set("v.renderval",false );
                    //alert("No order found for selected Commodity ");         
                } 
            }
        });
	}
    
})