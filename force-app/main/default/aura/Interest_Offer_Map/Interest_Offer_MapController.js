({
    doinit : function(component, event, helper) {
        var selectedmap = component.find("mapId").get("v.value");
        component.set("v.selectedvalue",selectedmap);
        var svalue =  component.get("v.selectedvalue");
        //alert(svalue);
        
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": svalue,
            
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 
              /**  if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                       
                        value: ""
                    });
                }**/
                for (var i = 0; i < allValues.length; i++) {
                 
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
           
                if(selectedmap == 'Inventory'){
                    component.find("option").set("v.options", opts);
                    var a = component.get('c.onPicklistChange');
        			$A.enqueueAction(a);
                }else if(selectedmap == 'Interest'){
                    component.find("optionINT").set("v.options", opts);
                    var a = component.get('c.onInterestchange');
        			$A.enqueueAction(a);
                }else if(selectedmap == 'Account'){
                    component.find("optionAcc").set("v.options", opts);
                    //var a = component.get('c.onAccountchange');
        			//$A.enqueueAction(a);
                }else if(selectedmap == 'Offer'){
                    component.find("optionOff").set("v.options", opts);
                    //var a = component.get('c.onAccountchange');
        			//$A.enqueueAction(a);
                }else if(selectedmap == 'Contracts'){
                    component.find("optionItem").set("v.options", opts);
                    //var a = component.get('c.onAccountchange');
        			//$A.enqueueAction(a);
                }
                
            }
        });
        $A.enqueueAction(action);
    },
	changevalue : function(component, event, helper) {
		var selectedmap = component.find("mapId").get("v.value")
        component.set("v.Spinner", true);
        component.set("v.selectedvalue",selectedmap);
        var svalue =  component.get("v.selectedvalue");
        //alert(svalue);
        
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": component.get("v.selectedvalue"),
           
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 				//alert(allValues);
             /**   if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                        
                        value: ""
                    });
                } **/
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                if(selectedmap == 'Inventory'){
                    component.find("option").set("v.options", opts);
                    var a = component.get('c.onPicklistChange');
        			$A.enqueueAction(a);
                }else if(selectedmap == 'Interest'){
                    component.find("optionINT").set("v.options", opts);
                    var a = component.get('c.onInterestchange');
        			$A.enqueueAction(a);
                }else if(selectedmap == 'Account'){
                    component.find("optionAcc").set("v.options", opts);
                    var a = component.get('c.onAccountchange');
        			$A.enqueueAction(a);
                }else if(selectedmap == 'Offer'){
                    component.find("optionOff").set("v.options", opts);
                    var a = component.get('c.onOfferchange');
        			$A.enqueueAction(a);
                }else if(selectedmap == 'Contracts'){
                    component.find("optionItem").set("v.options", opts);
                    var a = component.get('c.onItemchange');
        			$A.enqueueAction(a);
                }
                
            }
        });
        $A.enqueueAction(action);
	},
    onPicklistChange : function(component, event, helper) {
    	//alert("called");
    	 var objvalue = component.find("mapId").get("v.value");
         var liviewvalue = component.find("option").get("v.value");
        component.set("v.title",'Inventory');
        component.set("v.Spinner", true);
        component.set("v.Livalue", liviewvalue);
        var action = component.get("c.getdatabylistview");
        action.setParams({
            "objvalue": objvalue,
             "liviewvalue": liviewvalue,
           
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
               component.set("v.inventorylist",allValues);
                //alert('allValues'+allValues.length);
                var value = component.get("v.inventorylist");
                if(value.length == 0){
                    component.set("v.intmsg",true);
                }else{
                  component.set("v.intmsg",false);  
                }
                var event = $A.get("e.c:MapEvent");
        		event.setParams({"accounts": allValues});
        		event.fire();
                
            }
        });
        $A.enqueueAction(action);
    },
        onInterestchange : function(component, event, helper) {
    	//alert(event.getSource().get("v.value"));
    	 var objvalue = component.find("mapId").get("v.value");
            component.set("v.title",'Interest');
            component.set("v.Spinner", true);
         var liviewvalue = component.find("optionINT").get("v.value");
            component.set("v.Livalue", liviewvalue);
        var action = component.get("c.getdatabylistview");
        action.setParams({
            "objvalue": objvalue,
             "liviewvalue": liviewvalue,
           
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
               	component.set("v.interestlist",allValues);
                //alert('allValues'+component.get("v.interestlist"));
                var value = component.get("v.interestlist");
                if(value.length == 0){
                    component.set("v.intmsg",true);
                }else{
                  component.set("v.intmsg",false);  
                }
                var event = $A.get("e.c:MapIntEvent");
        		event.setParams({"InTaccounts": allValues});
        		event.fire();
 				
            }
        });
        $A.enqueueAction(action);
    },
    onAccountchange : function(component, event, helper) {
    	 var objvalue = component.find("mapId").get("v.value");
            component.set("v.title",'Account');
        component.set("v.Spinner", true);
         var liviewvalue = component.find("optionAcc").get("v.value");
         component.set("v.Livalue", liviewvalue);
        //alert(component.get("v.Livalue"));
        var action = component.get("c.getdatabylistview");
        action.setParams({
            "objvalue": objvalue,
             "liviewvalue": liviewvalue,
           
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
               	component.set("v.Accountlist",allValues);
                //alert('allValues'+component.get("v.interestlist"));
                var value = component.get("v.Accountlist");
                if(value.length == 0){
                    component.set("v.intmsg",true);
                }else{
                  component.set("v.intmsg",false);  
                }
                var event = $A.get("e.c:MapAccEvent");
        		event.setParams({"Accaccounts": allValues});
        		event.fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    onOfferchange : function(component, event, helper) {
    	 var objvalue = component.find("mapId").get("v.value");
            component.set("v.title",'Offer');
        component.set("v.Spinner", true);
         var liviewvalue = component.find("optionOff").get("v.value");
        component.set("v.Livalue", liviewvalue);
        var action = component.get("c.getdatabylistview");
        action.setParams({
            "objvalue": objvalue,
             "liviewvalue": liviewvalue,
           
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
               	component.set("v.Offerlist",allValues);
                //alert('allValues'+component.get("v.interestlist"));
                var value = component.get("v.Offerlist");
                if(value.length == 0){
                    component.set("v.intmsg",true);
                }else{
                  component.set("v.intmsg",false);  
                }
                var event = $A.get("e.c:MapOffEvent");
        		event.setParams({"Offaccounts": allValues});
        		event.fire();
            }
        });
        $A.enqueueAction(action);
    },
     onItemchange : function(component, event, helper) {
    	 var objvalue = component.find("mapId").get("v.value");
            component.set("v.title",'Contracts');
        component.set("v.Spinner", true);
         var liviewvalue = component.find("optionItem").get("v.value");
        component.set("v.Livalue", liviewvalue);
        var action = component.get("c.getdatabylistview");
        action.setParams({
            "objvalue": objvalue,
             "liviewvalue": liviewvalue,
           
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
               	component.set("v.itemlist",allValues);
                //alert('allValues'+component.get("v.interestlist"));
                var value = component.get("v.itemlist");
                if(value.length == 0){
                    component.set("v.intmsg",true);
                }else{
                  component.set("v.intmsg",false);  
                }
                var event = $A.get("e.c:MapItemEvent");
        		event.setParams({"Itemaccounts": allValues});
        		event.fire();
            }
        });
        $A.enqueueAction(action);
    },
    showSpinner: function(component, event, helper) {
       // make Spinner attribute true for display loading spinner 
      // component.set("v.Spinner", true); 
   },
    
 // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
     // make Spinner attribute to false for hide loading spinner    
       component.set("v.Spinner", false);
    },
})