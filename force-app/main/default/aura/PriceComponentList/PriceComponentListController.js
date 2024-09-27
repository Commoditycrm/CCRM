({
    doInit : function(component, event, helper) {
     
        var components = component.get("v.components");
        components.push({
            'sobjectType': 'CERM__MD_Price_Component__c',
            'Component':'',
            'Commodity':'',
            'Priced Date':'',
            'Priced Quantity':'',
            'Price':'',
            'Per':'',
            'UoM':'',
            'Account':''
        });
        component.set("v.components",components);
    }
    ,
    addComponent : function(component, event, helper){
       var components = component.get("v.components");
        components.push({
			'sobjectType': 'CERM__MD_Price_Component__c',
            'Component':'',
            'Commodity':'',
            'Priced Date':'',
            'Priced Quantity':'',
            'Price':'',
            'Per':'',
            'UoM':'',
            'Account':''
        });
        component.set("v.components",components);
    }
    ,
    removeComponent : function(component, event, helper){
       var selCont = event.getParam("selectedComponent");
        alert('selcont'+selCont);
       var components = component.get("v.components");
       var index = components.indexOf(selCont);
        alert('index'+index);
       if (index > -1) {
            components.splice(index, 1);
       }
       component.set("v.components",components);
    },
     submit : function(component, event, helper){
      alert('called');
       var components = component.get("v.components");
       alert(components);
       var action = component.get("c.display");
       // var action = component.get("c.disp");
        // action.setParams({"msg" : 'fii'});  
           action.setCallback(this, function(response) {
            var state = response.getState();
                           alert('state'+response.getReturnValue());
            //check if result is successfull
            if(state == "SUCCESS"){
                alert('success');
                component.set("v.components",response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
         
         
    }
})