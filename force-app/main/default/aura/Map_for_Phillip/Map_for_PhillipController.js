({
    doinit : function(component, event, helper) {
       
        var menuvalue ='ALL';
        component.set("v.title",menuvalue);
        
        component.set("v.Spinner", true);
        var action = component.get("c.getlocationviewmenu");
        // alert(menuvalue);
        action.setParams({
            "menuvalue": menuvalue,
        });
        
        action.setCallback(this, function(response) {
            //alert(response.getState());
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var allValues1 = JSON.stringify(allValues);
                //alert(allValues.length);
                //console.log('allvalues'+allValues1);
                var IN;
                var I;
                var O;
                var A;
                for(var i=0; i<allValues.length; i++){  
                    IN =  allValues[i].interest; 
                    I =  allValues[i].Inventory; 
                    O =  allValues[i].Offer; 
                    A = allValues[i].Account; 
                }
                //alert(IN.length);
                // alert(I.length);
                //alert(O.length);
                component.set("v.menuselectlist",I);
                component.set("v.interestlist",IN);
                component.set("v.Offerlist",O);
                 component.set("v.Accountlist",A);
                var inventory = component.get("v.menuselectlist");
                var interest = component.get("v.interestlist");
                var offer = component.get("v.Offerlist");
                var Account = component.get("v.Accountlist");
                var istringvalue = JSON.stringify(inventory);
                //alert('allValues'+component.get("v.Accountlist"));
                //component.set("v.menuselectlist",allValues);
                //alert('allValues'+component.get("v.interestlist"));
                var value = component.get("v.menuselectlist");
                if(menuvalue == 'ALL'){
                    //alert('all');
                    var totalitems = inventory.length + interest.length + offer.length + Account.length ;
                }else if(menuvalue == 'Interest'){
                    //alert('Interest');
                    var totalitems =  interest.length;
                }else if(menuvalue == 'Offer'){
                    //alert('Offer');
                    var totalitems = offer.length;
                }else{
                    //alert('Inventory');
                    var totalitems = inventory.length;
                }
                component.set("v.totalitems",totalitems);
                if(totalitems == 0){
                    component.set("v.intmsg",true);
                }else{
                    component.set("v.intmsg",false);  
                }
               
                var event = $A.get("e.c:MAP_Inv_Event");
                event.setParams({"INVENTORYaccounts": inventory,"OFFERaccounts": offer,"INTERESTaccounts": interest,"Accountaccounts": Account , "menuvalue":menuvalue});
                event.fire();
            }
        });
        $A.enqueueAction(action);
    },
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        // component.set("v.Spinner", true); 
    },
    handleClick : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    handleSearch : function(component, event, helper) {
        var issearch =  component.get("v.isSearch"); 
         component.set("v.isVisible",false);
        if(issearch === false ){
            component.set("v.isSearch",true); 
        }else if(issearch === true){
            component.set("v.isSearch",false); 
        }
        
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
    },
    openspliview : function(component,event,helper){
         component.set("v.isVisible",false);
        // make Spinner attribute to false for hide loading spinner 
        if(component.get("v.isOpen") == true){
            component.set("v.isOpen", false);
        }else if(component.get("v.isOpen") == false){
            component.set("v.isOpen", true);
        }
        
        //alert('component.set("v.isOpen")'+component.get("v.isOpen"));
    },
    handleSelect : function(component, event, helper) {
         component.set("v.isVisible",false);
        var menuvalue = event.getParam("value");
        component.set("v.title",menuvalue);
        var commvalue;
        var Locvalue;
        
        var menuItems = component.find("menuItems");
        console.log('menuItems'+menuItems);
        menuItems.forEach(function (menuItem) {
            // For each menu item, if it was checked, un-check it. This ensures that only one
            // menu item is checked at a time
            if (menuItem.get("v.checked")) {
                menuItem.set("v.checked", false);
                
            }
            // Check the selected menu item
            if (menuItem.get("v.value") === menuvalue) {
                menuItem.set("v.checked", true);
            }
        });
        
        
        
        // alert(component.get("v.isSearch"));
        if(component.get("v.isSearch") == true){
            // alert('true');
            commvalue = component.find("comm").get("v.value");
            Locvalue = component.find("Loc").get("v.value");
        }else if(commvalue == ''){
            commvalue = null;
        }else if(Locvalue == ''){
            Locvalue = null;
        }else{
            commvalue = null;
            Locvalue = null;
        }
        
        //alert('commvalue<--'+commvalue+'-->Locvalue'+Locvalue);
        //alert(menuvalue);
        component.set("v.Spinner", true);
        
        var action = component.get("c.getLocationbyCommLoc");
        //alert(menuvalue);
        action.setParams({
            "comId": commvalue,
            "LocId": Locvalue, 
            "menuvalue" : menuvalue
        });
        
        action.setCallback(this, function(response) {
            //alert(response.getState());
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                var allValues1 = JSON.stringify(allValues);
                //alert(allValues.length);
                //console.log('allvalues'+allValues1);
                var IN;
                var I;
                var O;
                for(var i=0; i<allValues.length; i++){  
                    IN =  allValues[i].interest; 
                    I =  allValues[i].Inventory; 
                    O =  allValues[i].Offer;  
                }
                component.set("v.menuselectlist",I);
                component.set("v.interestlist",IN);
                component.set("v.Offerlist",O);
                var inventory = component.get("v.menuselectlist");
                var interest = component.get("v.interestlist");
                var offer = component.get("v.Offerlist");
                var Account = component.get("v.Accountlist");
                var istringvalue = JSON.stringify(inventory);
                //alert('allValues'+component.get("v.Accountlist"));
                //component.set("v.menuselectlist",allValues);
                //alert('allValues'+component.get("v.interestlist"));
                var value = component.get("v.menuselectlist");
                if(menuvalue == 'ALL'){
                    //alert('all');
                    var totalitems = inventory.length + interest.length + offer.length + Account.length ;
                }else if(menuvalue == 'Interest'){
                    //alert('Interest');
                    var totalitems =  interest.length;
                }else if(menuvalue == 'Offer'){
                    //alert('Offer');
                    var totalitems = offer.length;
                }else if(menuvalue == 'Accounts'){
                    //alert('Offer');
                    var totalitems = Account.length;
                }else{
                    //alert('Inventory');
                    var totalitems = inventory.length;
                }
                component.set("v.totalitems",totalitems);
                if(totalitems == 0){
                    component.set("v.intmsg",true);
                }else{
                    component.set("v.intmsg",false);  
                }
               
                var event = $A.get("e.c:MAP_Inv_Event");
                event.setParams({"INVENTORYaccounts": inventory,"OFFERaccounts": offer,"INTERESTaccounts": interest,"Accountaccounts": Account , "menuvalue":menuvalue});
                event.fire();
            }
        });
        $A.enqueueAction(action);
    },
    onSearch : function(component, event, helper) {
        component.set("v.isVisible",false);
         var menuvalue;
        //var menuvalue =component.find("LocationMenu").get("v.value"); 
        //var menuvalue = component.get("v.menvalue");
        var accvalue = component.find("acc").get("v.value");
        var commvalue = component.find("comm").get("v.value");
        var Locvalue = component.find("Loc").get("v.value");
        var menuItems = component.find("menuItems");
         console.log('onsearch'+menuItems);
        if(menuItems != undefined){
            menuItems.forEach(function (menuItem) {
                console.log('yes');
                if (menuItem.get("v.checked")) {
                    menuvalue =  menuItem.get("v.value");
                }
            }); 
        }else{
            menuvalue = 'ALL'; 
        }
        if(menuvalue == undefined){
            // alert('yea');
            menuvalue = 'ALL';
        }
        if(!commvalue){
            //alert("blank"+commvalue);
            commvalue = null;
        }
        if(!Locvalue){
            // alert("blank location"+Locvalue);
            Locvalue = null;
        }if(!accvalue){
            // alert("blank location"+Locvalue);
            Locvalue = null;
        }
        var action = component.get("c.getLocationbyCommLoc");
         //alert(menuvalue);
        action.setParams({
            "comId": commvalue,
            "LocId": Locvalue, 
            "accId":accvalue,
            "menuvalue" : menuvalue
            
        });
        
        action.setCallback(this, function(response) {
            //alert(response.getState());
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                console.log(allValues);
                //component.set("v.menuselectlist",allValues);
                //	component.set("v.wrapperlist",allValues);
                var count = allValues.length;
                //alert(count);
                var IN;
                var I;
                var O;
                var A
                for(var i=0; i<allValues.length; i++){  
                    IN =  allValues[i].interest; 
                    I =  allValues[i].Inventory; 
                    O =  allValues[i].Offer;  
                    A = allValues[i].Account;  
                }
                component.set("v.menuselectlist",I);
                component.set("v.interestlist",IN);
                component.set("v.Offerlist",O);
                component.set("v.Accountlist",A);
                var inventory = component.get("v.menuselectlist");
                var interest = component.get("v.interestlist");
                var offer = component.get("v.Offerlist");
                var Account= component.get("v.Accountlist");
                var istringvalue = JSON.stringify(inventory);
                /* console.log('menulist values'+inventory);
                console.log('menulist string values'+istringvalue);
                console.log('interest'+IN); 
                console.log('offer'+O); 
                console.log('Inventory'+I);  */     
                //alert('menuvalue'+menuvalue);
                
                
                if(menuvalue == 'ALL'){
                    //alert('all');
                    var totalitems = inventory.length + interest.length + offer.length + Account.length;
                }else if(menuvalue == 'Interest'){
                   // alert('Interest');
                    var totalitems =  interest.length;
                }else if(menuvalue == 'Offer'){
                   // alert('Offer');
                    var totalitems = offer.length;
                }else if(menuvalue == 'Accounts'){
                   // alert('Interest');
                    var totalitems =  Account.length;
                }else{
                   // alert('Inventory');
                    var totalitems = inventory.length;
                }
                component.set("v.totalitems",totalitems);
                if(totalitems == 0){
                    component.set("v.intmsg",true);
                }else{
                    component.set("v.intmsg",false);  
                }
                var event = $A.get("e.c:MAP_Inv_Event");
                event.setParams({"INVENTORYaccounts": inventory,"OFFERaccounts": offer,"INTERESTaccounts": interest,"Accountaccounts": Account ,"menuvalue":menuvalue});
                event.fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    accountSelected: function(component, event, helper) {
        //alert('clicked');
        var account = event.getParam("account"); 
        var title = event.getParam("title");
        var object = event.getParam("object");
        component.set("v.object",object);
        //console.log('Account'+account);
        component.set("v.SelectedAccount",account);
        //alert('object'+object);
        // alert('title'+title);
        var accid;
        component.set("v.Spinner",true);
        component.set("v.isVisible",false);
        if(title == 'ALL'){
            //alert('yess All');
                if(object == 'Interest'){
                    accid = account.CERM__Account__c;
                    
                    var action = component.get("c.getnearbyoffloc");
                    // alert(menuvalue);
                    action.setParams({
                        "interest": account, 
                    });
                    
                    action.setCallback(this, function(response) {
                        //alert(response.getState());
                        if (response.getState() == "SUCCESS") {
                            var values =  response.getReturnValue();
                            component.set('v.BestOffer', values);
                            component.set("v.Spinner",false);
                            component.set("v.isVisible",true);
                        }
                    });
                    $A.enqueueAction(action);
                    
                }else if( object == 'Offer'){
                    accid = account.CERM__Account__c;
                    
                    var action = component.get("c.getnearbyinterestloc");
                    // alert(menuvalue);
                    action.setParams({
                        "offer": account, 
                    });
                    
                    action.setCallback(this, function(response) {
                        //alert(response.getState());
                        if (response.getState() == "SUCCESS") {
                            var values =  response.getReturnValue();
                            component.set('v.BestInterest', values);
                            component.set("v.Spinner",false);
                            component.set("v.isVisible",true);
                        }
                    });
                    $A.enqueueAction(action);
                    
                }else if(object == 'Accounts'){
                    accid = account.Id;
                    var action = component.get("c.getAccountRecordDetail");
                    // alert(menuvalue);
                    action.setParams({
                        "accid": accid, 
                    });
                    
                    action.setCallback(this, function(response) {
                        //alert(response.getState());
                        if (response.getState() == "SUCCESS") {
                            var values =  response.getReturnValue();
                            //component.set('v.CFITEMResult', values);
                            var cfitembuydata;
                            var cfitemselldata;
                            var interestdata;
                            var offerdata;
                            
                            for(var i=0; i<values.length; i++){  
                                cfitembuydata =  values[i].CitemBuyData; 
                                cfitemselldata =  values[i].CitemSellData; 
                                interestdata = values[i].InterestData; 
                                offerdata = values[i].OfferData; 
                                
                            }
                            component.set('v.CFITEMResult', cfitembuydata);
                            component.set('v.CFITEMSellResult', cfitemselldata);
                            component.set('v.InterestResult', interestdata);
                            component.set('v.OfferResult', offerdata);
                            //for buy data
                            var arrayMapKeysfor_Buy = [];
                            for (var key in cfitembuydata) {
                                arrayMapKeysfor_Buy.push(key);
                            }
                            component.set('v.keyList', arrayMapKeysfor_Buy);
                            //for sell data
                            var arrayMapKeysfor_Sell = [];
                            for (var key in cfitemselldata) {
                                arrayMapKeysfor_Sell.push(key);
                            }
                            component.set('v.keyListSell', arrayMapKeysfor_Sell);
                            component.set("v.isVisible",true);
                            
                            var arrayMapKeysfor_Interest = [];
                            for (var key in interestdata) {
                                arrayMapKeysfor_Interest.push(key);
                            }
                            component.set('v.keyListInterest', arrayMapKeysfor_Interest);
                            
                            var arrayMapKeysfor_Offer = [];
                            for (var key in offerdata) {
                                arrayMapKeysfor_Offer.push(key);
                            }
                            component.set('v.keyListOffer', arrayMapKeysfor_Offer);
                            
                            component.set("v.Spinner",false);
                            component.set("v.isVisible",true);
                        }
                    });
                    $A.enqueueAction(action);
            }else{
                //alert('yes');
                component.set("v.Spinner",false);
                accid = account.CERM__Business_Location__r.CERM__Account__r.Id;
                
            }          
        }else if(title=='Interest'){
            accid = account.CERM__Account__c;
            var action = component.get("c.getnearbyoffloc");
            // alert(menuvalue);
            action.setParams({
                "interest": account, 
            });
            
            action.setCallback(this, function(response) {
                //alert(response.getState());
                if (response.getState() == "SUCCESS") {
                    var values =  response.getReturnValue();
                    component.set('v.BestOffer', values);
                    component.set("v.Spinner",false);
                    component.set("v.isVisible",true);
                }
            });
            $A.enqueueAction(action);
            
        }else if(title=='Offer'){
            accid = account.CERM__Account__c;
            var action = component.get("c.getnearbyinterestloc");
            // alert(menuvalue);
            action.setParams({
                "offer": account, 
            });
            
            action.setCallback(this, function(response) {
                //alert(response.getState());
                if (response.getState() == "SUCCESS") {
                    var values =  response.getReturnValue();
                    component.set('v.BestInterest', values);
                    component.set("v.Spinner",false);
                    component.set("v.isVisible",true);
                }
            });
            $A.enqueueAction(action);
            
        }else if(title == 'Inventory'){
            accid = account.CERM__Business_Location__r.CERM__Account__r.id;
            component.set("v.Spinner",false);
            
        }else if(title == 'Accounts'){
            accid = account.Id;
            var action = component.get("c.getAccountRecordDetail");
            // alert(menuvalue);
            action.setParams({
                "accid": accid, 
            });
            
            action.setCallback(this, function(response) {
                //alert(response.getState());
                if (response.getState() == "SUCCESS") {
                    var values =  response.getReturnValue();
                    //component.set('v.CFITEMResult', values);
                    var cfitembuydata;
                    var cfitemselldata;
                    var interestdata;
                    var offerdata;
                    
                    for(var i=0; i<values.length; i++){  
                        cfitembuydata =  values[i].CitemBuyData; 
                        cfitemselldata =  values[i].CitemSellData; 
                        interestdata = values[i].InterestData; 
                        offerdata = values[i].OfferData; 
                        
                    }
                    component.set('v.CFITEMResult', cfitembuydata);
                    component.set('v.CFITEMSellResult', cfitemselldata);
                    component.set('v.InterestResult', interestdata);
                    component.set('v.OfferResult', offerdata);
                    //for buy data
                    var arrayMapKeysfor_Buy = [];
                    for (var key in cfitembuydata) {
                        arrayMapKeysfor_Buy.push(key);
                    }
                    component.set('v.keyList', arrayMapKeysfor_Buy);
                    //for sell data
                    var arrayMapKeysfor_Sell = [];
                    for (var key in cfitemselldata) {
                        arrayMapKeysfor_Sell.push(key);
                    }
                    component.set('v.keyListSell', arrayMapKeysfor_Sell);
                    component.set("v.isVisible",true);
                    
                    var arrayMapKeysfor_Interest = [];
                    for (var key in interestdata) {
                        arrayMapKeysfor_Interest.push(key);
                    }
                    component.set('v.keyListInterest', arrayMapKeysfor_Interest);
                    
                    var arrayMapKeysfor_Offer = [];
                    for (var key in offerdata) {
                        arrayMapKeysfor_Offer.push(key);
                    }
                    component.set('v.keyListOffer', arrayMapKeysfor_Offer);
                    
                    component.set("v.Spinner",false);
                    component.set("v.isVisible",true);
                }
            });
            $A.enqueueAction(action);
            
            
        }else{
            component.set("v.Spinner",false);
        }
        
          //alert(accid);
        
        
        
    },
    openpanel:function(component, event, helper) {
       //alert('clicked');
        var ispanel = event.getParam("panelvalue"); 
        component.set("v.isVisible",ispanel);
         
        
        
    },
   /*
	changevalue : function(component, event, helper) {
		var selectedmap = component.find("mapId").get("v.value")
        component.set("v.Spinner", true);
        component.set("v.selectedvalue",selectedmap);
        var svalue =  component.get("v.selectedvalue");
                
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": component.get("v.selectedvalue"),
           
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 				
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
    },*/
    
})