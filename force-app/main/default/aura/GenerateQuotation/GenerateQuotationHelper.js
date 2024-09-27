({
	getPricehelper : function(component, event, helper) {
        
        component.set("v.percent",'%');
        
        var getAccId = component.get("v.Account.Id");
        var getComId = component.get("v.commodity.Id");
        var getlocId = component.get("v.Location.Id");
        
        var nodys = component.get("v.AccountRec.CERM__Number_of_Days__c");
        var action = component.get("c.getValue");
              
        action.setParams({'comId' : getComId,
                          'AccId' : getAccId,
                          'locId' : getlocId,
                          'nfdays' : nodys});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                var returnVal = response.getReturnValue();
                alert(returnVal);
                	component.set("v.InterestRatepercent",null);
                	component.set("v.InterestRatedays",nodys);
                for(var i in returnVal ){
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Interest rate'){
                    	component.set("v.InterestRatepercent",returnVal[i].CERM__Percent__c);
                        component.set("v.InterestRatedays",returnVal[i].CERM__Number_of_Days__c);
                        component.set("v.InterestRateUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.InterestRatePrice",returnVal[i].CERM__Currency_Formula__c);
                    }
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Custom Clearance'){
                    	component.set("v.CustomClearance",returnVal[i].CERM__Price__c);
                        component.set("v.CustomClearanceUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.CustomClearancePrice",returnVal[i].CERM__Currency_Formula__c);
                    
                    }
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Conversion Cost'){
                    	component.set("v.ConversionCost",returnVal[i].CERM__Price__c); 
                        component.set("v.ConversionCostUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.ConversionCostPrice",returnVal[i].CERM__Currency_Formula__c);
                    }
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Margin'){
                    	component.set("v.Marginpercent",returnVal[i].CERM__Percent__c);
                        component.set("v.MarginUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.MarginPrice",returnVal[i].CERM__Currency_Formula__c);
                    
                    }
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Premium/Discount'){
                    	component.set("v.Premium",returnVal[i].CERM__Price__c);
                        component.set("v.PremiumUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.PremiumPrice",returnVal[i].CERM__Currency_Formula__c);
                    }
                    component.set("v.KGval",'KG');
                    component.set("v.MTval",'MT');
                    component.set("v.INRval",'INR');
                    component.set("v.USDval",'USD');
                }
                
            }   
        });
		$A.enqueueAction(action);
	},
     createObjectData: function(component, event) {
        // get the pricemaster from component and add(push) New Object to List  
         
         var RowItemList = component.get("v.PriceMasterList");
       //  alert(RowItemList);
         
         RowItemList.push({
            'sobjectType': 'CERM__Price_Master__c',
            'CERM__Price_Component_Name__c': '',
            'CERM__Commodity__c': '',
            'CERM__Currency__c': '',
            'CERM__Percent__c': '',
            'CERM__Price__c': '',
            'CERM__Per__c': '',
            'CERM__UoM_Name__c': '',
            'CERM__Account__c': ''
        });
        // set the updated list to attribute (pricemaster) again    
        component.set("v.PriceMasterList", RowItemList);
         component.set("v.Spinner", true); 
    },
    getdefaultuom : function(component,event,handler){
        var action = component.get("c.getuom");
       // alert('called');
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                var returnVal = response.getReturnValue();
                
                component.set(  "v.uomMap",returnVal);
                var mymap = component.get("v.uomMap");
                var fromuom = component.get("v.uomMap.Kilogram");
               /// alert('fromuom'+fromuom);
                var uom;
                 //alert('mymap'+mymap);
                for(var i in mymap ){
                   //  alert('mymap'+mymap[i]);
                   component.set("v.Fromuom.CERM__UOM__c",fromuom);
                    uom = component.get("v.Fromuom.CERM__UOM__c");
                  //  alert('uom value'+uom);
                }
                var fromuom1 = component.get("v.Fromuom");
               // alert('fromuom111'+fromuom1);
            }   
        });
		$A.enqueueAction(action);
    },
    helperFun : function(component,event,secId) {
	  var sec = component.find(secId);
        	for(var cmp in sec) {
        	$A.util.toggleClass(sec[cmp], 'slds-show');  
        	$A.util.toggleClass(sec[cmp], 'slds-hide');  
       }
	},
    helperFun1 : function(component,event,secId) {
	  var sec = component.find(secId);
        	for(var cmp in sec) {
        	$A.util.toggleClass(sec[cmp], 'slds-show');  
        	$A.util.toggleClass(sec[cmp], 'slds-hide');  
       }
	},
    
   
    
})