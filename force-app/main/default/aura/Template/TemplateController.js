({
    /**
     * Handler for receiving the updateLookupIdEvent event
     */
    templateChange : function(cmp, event, helper) {
        var action = cmp.get("c.getTemplateValues");
        var template = cmp.get("v.selectedTemplateId.Name");
        alert('selected value'+template);
        action.setParams({'templateId': template});
        $A.enqueueAction(action); 
        action.setCallback(this,function(response){
             alert('return' +response.getState());
            if(response.getState() == "SUCCESS"){
                alert('return'+response.getReturnValue());
                cmp.set("v.template" , response.getReturnValue());
                var returnval = response.getReturnValue();
                alert('length'+returnval.length);
                alert('called1'+returnval);
                if(typeof returnVal !== null){
                    alert('called1');
                  for(var i=0; i < returnval.length; i++){
                      alert('called');
                     var Acc = returnval[i];
                      var value = Acc.CERM__Account__c; 
                        alert('value'+value);
                      cmp.set('v.selectedAccountId' , value);
                      var value1 = cmp.get('v.selectedAccountId').Value;
                      alert('value1'+value1);
                  }
				}
            	
            }
            
        });
        
      
    }
 
   
})