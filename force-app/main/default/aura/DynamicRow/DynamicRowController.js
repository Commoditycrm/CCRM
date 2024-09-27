({
    AddNewRow : function(component, event, helper){
       // fire the AddNewRowEvt Lightning Event 
        component.getEvent("AddRowEvt").fire();     
    },
    
    removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("DeleteRowEvt").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    },
    getdata : function(component, event, helper){
       // fire the AddNewRowEvt Lightning Event 
      // alert('called');
      //var pcomp = component.get("v.PriceValue.CERM__Price_Component_Name__c");
     // console.log(pcomp);
        
       // var name;
        //alert(name);
        
        
      // 	for (var i = 0; i < pcomp.length; i++) { 
            
    			//name = pcomp[i].Name;
               // console.log('name--->'+name);
        	
		//} 
        
        
      //  var irrate1 = event.getParam('irrate');
        	//console.log('in dynamic event '+event.getParam('irrate'));
         //   component.set("v.irrate",irrate1);
           
           // console.log('in dynamic irrate'+irrate1);
      // 	console.log(' in dynamic interest rate'+component.get("v.irrate"));
       //component.set("v,irrate",irrate);
    },
    
  
})