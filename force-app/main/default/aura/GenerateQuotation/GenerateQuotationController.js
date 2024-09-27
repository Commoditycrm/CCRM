({
    
    changePricetype : function(component , event , helper){
        
        var pricetype = component.find("makeId").get("v.value");
        var price = component.get("v.flatprice");
        console.log("welcome to console");
        var hideelement = component.find("flatPrice");
        if(pricetype != 'Flat Price'){
           // alert(pricetype);
            $A.util.toggleClass(hideelement, "slds-hide");
        	
        }else{
          //  $A.util.toggleClass(hideelement, "slds-hide");
        }
         
        if(pricetype == 'Flat Price'){
            
            component.find("flatPrice").set("v.disabled",false);
             component.find("Up").set("v.disabled",true);
            // component.find("Premium").set("v.disabled",true);
             component.find("RBI").set("v.disabled",true);
           //  component.find("customclearance").set("v.disabled",true);
           //  component.find("conversioncost").set("v.disabled",true);
             component.find("numberofdays").set("v.disabled",true);
             component.find("Interestrate").set("v.disabled",true);
             component.find("margin").set("v.disabled",true);
            component.find("customduty").set("v.disabled",true);
             component.set("v.basicPrice",price);
			var getAccId = component.get("v.Account.Id");
        var getComId = component.get("v.commodity.Id");
        var getlocId = component.get("v.Location.Id");
        
        var nodys = component.get("v.AccountRec.CERM__Number_of_Days__c");
        var action = component.get("c.getFlatPrice");
        
        action.setParams({'comId' : getComId,
                          'AccId' : getAccId,
                          'locId' : getlocId,
                          'nfdays' : nodys});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                var returnVal = response.getReturnValue();
                component.set("v.flatprice",returnVal.CERM__Price__c);
                
            }
        });
		$A.enqueueAction(action);
            
        }else{
        	component.set("v.flatprice",0);
            component.find("flatPrice").set("v.disabled",true);
            
             component.find("Up").set("v.disabled",false);
            // component.find("Premium").set("v.disabled",false);
             component.find("RBI").set("v.disabled",false);
           //  component.find("customclearance").set("v.disabled",false);
            // component.find("conversioncost").set("v.disabled",false);
             component.find("numberofdays").set("v.disabled",false);
             component.find("Interestrate").set("v.disabled",false);
             component.find("margin").set("v.disabled",false);     
            
        }
        
    },
    
    doinit : function(component , event , helper){
        
        component.find("emailvalue").set("v.disabled",true);
        component.find("flatPrice").set("v.disabled",true);
        
         var item = component.get('v.AccountRec') != null? component.get('v.AccountRec'): { 'sobjectType': 'Account'};
         item.CERM__Number_of_Days__c = '15';
         component.set("v.AccountRec" , item);
        
         component.set("v.percent","");
       /* var ir = component.get("v.InterestRate");
        alert('ir'+ir);
        var evt = component.getEvent("get_data");
        
    	evt.setParams({
        	"irrate": component.get("v.InterestRate")
    	});
    	evt.fire();  */
        
    },
    
    getInventoryInfo : function(component , event , helper){
        var getComId = component.get("v.commodity.Id");
        var getlocId = component.get("v.Location.Id");
        var action = component.get("c.getInvenobj");
        
        action.setParams({'comId' : getComId,
                          'locId' : getlocId,
                          });
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.inventory",response.getReturnValue());
                
            }
        });
		$A.enqueueAction(action);
        
    },
    
   accountChange : function(component, event, helper){
        var getAccId = component.get("v.Account.Id");
         
        if(getAccId != null){
        	
            var action1 = component.get("c.getAccountEmail");
            action1.setParams({'accId' : getAccId});
            action1.setCallback(this,function(response){
                if(response.getState() == "SUCCESS"){
                    
                    var email = response.getReturnValue();
                    component.set("v.accEmail" , email);
                    
                }
            })
             $A.enqueueAction(action1);
           
                var em = component.get("v.accEmail");
                var action2 = component.get("c.getAccountNoofDays");
                action2.setParams({'accId' : getAccId});
                action2.setCallback(this,function(response){
                    if(response.getState() == "SUCCESS"){
                        
                       var noofdays = response.getReturnValue();
                       component.set("v.AccountRec" , noofdays);
                        
                    }
                })  
                $A.enqueueAction(action2);
                
        }
       
        var a = component.get('c.getPrice');
        $A.enqueueAction(a);

    },
    getintPrice : function(component, event, helper) {
       
        
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
                	component.set("v.InterestRatepercent",null);
                	component.set("v.InterestRatedays",nodys);
                for(var i in returnVal ){
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Interest rate'){
                    	component.set("v.InterestRatepercent",returnVal[i].CERM__Percent__c);
                        component.set("v.InterestRatedays",returnVal[i].CERM__Number_of_Days__c);
                        component.set("v.InterestRateUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.InterestRatePrice",returnVal[i].CERM__Currency_Formula__c);
                    }
                }
            }
        });
		$A.enqueueAction(action);
	},
                           
    
	getPrice : function(component, event, helper) {
       
        
        component.set("v.percent",'%');
        
        var getAccId = component.get("v.Account.Id");
        var getComId = component.get("v.commodity.Id");
        var getlocId = component.get("v.Location.Id");
        
        var nodys = component.get("v.AccountRec.CERM__Number_of_Days__c");
        var action = component.get("c.getValue");
        if(getAccId != null){
        	
            var action1 = component.get("c.getAccountEmail");
            action1.setParams({'accId' : getAccId});
            action1.setCallback(this,function(response){
                if(response.getState() == "SUCCESS"){
                    
                    var email = response.getReturnValue();
                   // component.set("v.accEmail" , email);
                    
                }
            })
             $A.enqueueAction(action1);
           
                var em = component.get("v.accEmail");
                var action2 = component.get("c.getAccountNoofDays");
                action2.setParams({'accId' : getAccId});
                action2.setCallback(this,function(response){
                    if(response.getState() == "SUCCESS"){
                        
                       var noofdays = response.getReturnValue();
                      // component.set("v.AccountRec" , noofdays);
                        var a = component.get('c.eventfunc');
        		$A.enqueueAction(a);

                    }
                })  
                $A.enqueueAction(action2);
           
            
        }
        
        if(getlocId != null){
            
            var action3 = component.get("c.getLocationInfo");
            action3.setParams({'locId' : getlocId});
            action3.setCallback(this,function(response){
                if(response.getState() == "SUCCESS"){
                   component.set("v.LocationRec" , response.getReturnValue()); 
                }
            })
             $A.enqueueAction(action3);
        }
        action.setParams({'comId' : getComId,
                          'AccId' : getAccId,
                          'locId' : getlocId,
                          'nfdays' : nodys});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                if(response.getReturnValue() != null){
                    component.set("v.PriceMasterList",response.getReturnValue());
                }else{
                   // component.set("v.PriceMasterList",' ');
                }
                 
                 var returnVal = response.getReturnValue();
             //  alert(returnVal+''+response.getReturnValue());
                	component.set("v.InterestRatepercent",0);
                	component.set("v.InterestRatedays",nodys);
                	component.set("v.InterestRatepercent",0);
                    component.set("v.CustomClearance",0);
                    component.set("v.ConversionCost",0);
                    component.set("v.Marginpercent",0);
                	component.set("v.Premium",0);
                	component.set("v.flatprice",0);
                	component.set("v.UnitPrice",0);
                	component.set("v.RbiRate",0);
                	component.set("v.calculatedunitprice",0);
                	component.set("v.calculatedprmprice",0); 
                	
                for(var i in returnVal ){
                   // alert(returnVal+''+returnVal[i].CERM__Price_Component_Name__c);
                   // alert(returnVal[i].CERM__Currency__c);
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Interest rate'){
                    	component.set("v.InterestRatepercent",returnVal[i].CERM__Percent__c);
                        component.set("v.InterestRatedays",returnVal[i].CERM__Number_of_Days__c);
                        component.set("v.InterestRateUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.InterestRatePrice",returnVal[i].CERM__Currency_Formula__c);
                    }
                   /* if(returnVal[i].CERM__Price_Component_Name__c == 'Flat Price'){
                    	component.set("v.flatprice",returnVal[i].CERM__Price__c);	
                    }*/
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Custom Clearance'){
                    	component.set("v.CustomClearance",returnVal[i].CERM__Price__c);
                        component.set("v.CustomClearanceUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.CustomClearancePrice",returnVal[i].CERM__Currency_Formula__c);
                    
                    }
                    if(returnVal[i].CERM__Price_Component_Name__c == 'LME Price'){
                    	component.set("v.UnitPrice",returnVal[i].CERM__Price__c);
                        component.set("v.RbiRate",returnVal[i].CERM__FX_Rate__c);
                        // var calclmeprice = parseInt(component.get(returnVal[i].CERM__Price__c)) * parseInt(component.get(returnVal[i].CERM__FX_Rate__c));
        				//alert(calclmeprice);
                    	//component.set("v.calculatedunitprice",calclmeprice);
                        
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
                    if(returnVal[i].CERM__Price_Component_Name__c == 'GST'){
                    	component.set("v.gstper",returnVal[i].CERM__Percent__c);
                    }
                    if(returnVal[i].CERM__Price_Component_Name__c == 'Custom Duty'){
                    	component.set("v.cuspercent",returnVal[i].CERM__Percent__c);
                        component.set("v.cusginUoM",returnVal[i].CERM__UoM_Name__c);
                        component.set("v.cusPrice",returnVal[i].CERM__Currency_Formula__c);
                    
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
       
       // console.log(component.set("v.InterestRatepercent"));
	},
    

    calculateA : function(component, event, helper) {
    	var uprice = component.get("v.UnitPrice");
        var rbirate = component.get("v.RbiRate");
        var prmium = component.get("v.Premium");
        var action = component.get("c.calculateGrossA");
        var a = component.get('c.weightconv');
        $A.enqueueAction(a);
        var a1 = component.get('c.calculateLME');
        $A.enqueueAction(a1);
        var a2 = component.get('c.calculateprm');
        $A.enqueueAction(a2);
       // alert('called');
       // alert(prmium);
        action.setParams({'unitpr' : uprice,
                          'rbi' : rbirate,
                          'premium' : prmium});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.GTotal1",response.getReturnValue());
                
            }   
        });
		$A.enqueueAction(action);
        
    },
    calculateLME : function(component, event, helper) {
    	var uprice = component.get("v.UnitPrice");
        var rbirate = component.get("v.RbiRate");
       
      
        var action = component.get("c.calculateGrossA");
       // alert('called');
       // alert(uprice);
        action.setParams({'unitpr' : uprice,
                          'rbi' : rbirate,
                          
                          });
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
               component.set("v.calculatedunitprice",response.getReturnValue()); 
                
            }   
        });
		$A.enqueueAction(action);
        
    },
    calculateprm : function(component, event, helper) {
    	
        var rbirate = component.get("v.RbiRate");
        var prmium = component.get("v.Premium");
        var action = component.get("c.calculateGrossA");
       // alert('called');
       // alert(uprice);
        action.setParams({'rbi' : rbirate,
                          'premium' : prmium
                          });
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
               component.set("v.calculatedprmprice",response.getReturnValue()); 
                
            }   
        });
		$A.enqueueAction(action);
        
    },
    calculateB : function(component, event, helper) {
    	var grossA = component.get("v.GTotal1");
        var custom = component.get("v.CustomClearance");
        var conver = component.get("v.ConversionCost");
        var action = component.get("c.calculateGrossB");
        action.setParams({'grssA' : grossA,
                          'cstm' : custom,
                          'conversion' : conver});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.GTotal2",response.getReturnValue());
            }   
        });
		$A.enqueueAction(action);
        
    },
    
    calpricecustomduty : function(component, event, helper) {
        var grossB = component.get("v.GTotal2");
        var cuspercen = component.get("v.cuspercent");
        var action = component.get("c.calpricecusduty");
        action.setParams({'grssA' : grossB,
                          'cusper' : cuspercen });
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 

                component.set("v.customduty",response.getReturnValue());
            }   
        });
		$A.enqueueAction(action);
        
    },
    calGSTAmt : function(component, event, helper) {
    	var grossB = component.get("v.GTotal2");
        var gstper = component.get("v.gstper");
        var action = component.get("c.calcGST1Amt");
        action.setParams({'grssA' : grossB , 'gstper' : gstper});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.calcgstamt",response.getReturnValue());
            }   
        });
		$A.enqueueAction(action);
        
    },
    calpriceafterGST : function(component, event, helper) {
    	var grossB = component.get("v.GTotal2");
        var gstper = component.get("v.gstper");
        var a1 = component.get('c.calGSTAmt');
        $A.enqueueAction(a1); 
        var action = component.get("c.calpriceafterGST1");
        
        action.setParams({'grssA' : grossB , 'gstper' : gstper});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.GstPrice",response.getReturnValue());
            }   
        });
		$A.enqueueAction(action);
        
    },
    
    calculateFInal : function(component, event, helper) {
    	var gstpric = component.get("v.GstPrice");
        var intrest = component.get("v.InterestRate");
        var mrgin = component.get("v.Margin");
        var cusd = component.get("v.customduty");
        var action = component.get("c.calculateFinal");
        action.setParams({'grssA' : gstpric,
                          'cstm' : intrest,
                          'conversion' : mrgin,
                          'duty' : cusd});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.FinalPrice",response.getReturnValue());
            }   
        });
		$A.enqueueAction(action);
        
    },
    
    calculateMargin : function(component, event, helper) {
        
    	var grossB = component.get("v.GTotal2");
        var intrest = component.get("v.InterestRate");
        var MarPercent = component.get("v.Marginpercent");
        var action = component.get("c.calculateMar");
       // alert(called1);
       // alert(MarPercent);
        action.setParams({'grssA' : grossB,
                          'cstm' : intrest,
                          'Marper' : MarPercent});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.Margin",parseFloat(response.getReturnValue()).toFixed(4));
            }   
        });
		$A.enqueueAction(action);
        
    },
    
    calInterest : function(component, event, helper) {
        
        
    	var grossB = component.get("v.GTotal2");
        var gstpr = component.get("v.GstPrice");
        var insdays = component.get("v.InterestRatedays");
        var insper = component.get("v.InterestRatepercent");
        var action = component.get("c.calculateIR");
        action.setParams({'gst' : gstpr,
                          'instday' :insdays,
                          'instper' : insper
                          });
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                component.set("v.InterestRate", parseFloat(response.getReturnValue()).toFixed(4));
                var ir = component.get("v.InterestRate");
        		console.log('in before calling event gtq ir'+ir);
        		var a = component.get('c.eventfunc');
        		$A.enqueueAction(a);
                
            }   
        });
		$A.enqueueAction(action);
        
        
    },
    
    eventfunc : function(component, event, helper) {
    	var ir = component.get("v.InterestRate");
        //console.log('in before calling event gtq ir'+ir);
        
       // var evt = component.getEvent("get_data");
     
       // evt.setParams({
         //   "irrate": ir,
        //});
       // evt.fire();
      //  console.log('called after event in event (FIRE)');
      // component.getEvent("get_data").setParam({"irrate" : component.get("v.InterestRate") }).fire();
    	//console.log('called after event in event (FIRE22222)');   
    },
    
    calculatebase : function(component, event, helper) {
    	var fprice = component.get("v.FinalPrice");
        var action = component.get("c.calculateBase");
        action.setParams({'grssA' : fprice,
                          });
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){ 
                
                component.set("v.basicPrice",parseFloat(response.getReturnValue()).toFixed(4));
            }   
        });
		$A.enqueueAction(action);
        
    },
    
    redirect : function(component, event, helper) {
    	var comdty = component.get("v.commodity.Id");
        var accid = component.get("v.Account.Id");
        var rbi = component.get("v.RbiRate");
        var unitpri = component.get("v.UnitPrice");
        var grossA = component.get("v.GTotal1");
        var grossB = component.get("v.GTotal2");
        var totalprce = component.get("v.FinalPrice");
        var baseprce = component.get("v.basicPrice");
        var interestrate = component.get("v.InterestRate");
        var margin = component.get("v.Margin");
        
        var sendEmail = component.get("v.sendEmail");
        var email = component.get("v.accEmail");
        var quan = component.get("v.quantity");
        var pricetype = component.find("makeId").get("v.value");
        var custom = component.get("v.CustomClearance");
        var conver = component.get("v.ConversionCost");
        var prmium = component.get("v.Premium");
        var getlocId = component.get("v.Location.Id");
        var int_per1 = component.get("v.InterestRatepercent");
        var no_of_day = component.get("v.AccountRec.CERM__Number_of_Days__c");
        var mar_per1 = component.get("v.Marginpercent");
        var LME_price = component.get("v.Lmeprice");
        var MCX_Price = component.get("v.mcxprice");
        var etal_bullet = component.get("v.etalbullet");
        var Landed_cost = component.get("v.landedprocurement");
        var flatprice = component.get("v.flatprice");
        var refTitle = component.get("v.refernceTitle");
        var pstDate = component.get("v.postingDate");
        var dlvrytype = component.get("v.deliveryType");
        var dstrdate = component.get("v.DlvryStartDate");
        var denddate = component.get("v.DlvryEndDate");
        var pterm = component.get("v.paymentTerm");
        var Iterm = component.get("v.IncoTerm");
        var ntes = component.get("v.notes");
        var iterm2 = component.get("v.incoterm2");
		var Customduty = component.get("v.customduty");
      //  alert(Customduty);
        
        if(refTitle == null){
        	refTitle = '';    
        }
        if(LME_price == null){
            LME_price = 0;
        }
        if(Landed_cost == null){
            Landed_cost = 0;
        }
        if(MCX_Price == null){
            MCX_Price = 0;
        }
        if(etal_bullet == null){
            etal_bullet = 0;
        }
        
        var action = component.get("c.generatePDF");
        action.setParams({'unitpr' : unitpri,
                          'rbi' : rbi,
                          'comid' :comdty,
                          'accid' :accid,
                          'grssA' : grossA,
                          'GrssB' : grossB,
                          'totlprce' : totalprce,
                          'bsprice' : baseprce,
                          'sendemail' : sendEmail,
                          'email' : email,
                          'pricetype' : pricetype,
                          'intrate' : interestrate,
                          'mrgn' : margin,
                          'quant' : quan,
                          'locId': getlocId,
                          'cstm': custom,
                          'conversion': conver,
                          'premium' :prmium,
                          'no_of_days' : no_of_day,
                          'int_per' : int_per1,
                          'marg_per': mar_per1,
                          'lme' :LME_price,
                          'mcx' : MCX_Price,
                          'etalprice' : etal_bullet,
                          'landed_cost': Landed_cost,
                          'flatprice':flatprice,
                          'referencetitle' : refTitle,
                          'pstdate' : pstDate,
                          'cstmduty':Customduty,                          
                          'dstart' : dstrdate,
                          'dend' : denddate,
                          'values' : {
                          "payterm" : pterm,
                          "interm" : Iterm,
                          "notes1" : ntes,
                          "interm2" : iterm2,
                          "dlvytype1" : dlvrytype,
                         }
                          });
		var action1 = component.get("c.getBaseURL");
        var baseURL;
        action1.setCallback(this,function(response){
             if(response.getState() == "SUCCESS"){
                 
             	baseURL = response.getReturnValue();
               //  alert(baseURL);
             }
        });
       
            
        action.setCallback(this,function(response){
            
            if(response.getState() == "SUCCESS"){ 
                // $A.get('e.force:refreshView').fire();
                
                //component.set("v.msg","PDF Generated Successfully");
                
                
             // var showToast = $A.get("e.force:showToast"); 
             //   showToast.setParams({ 
             //   'title' : 'Custom Toast!', 
             //   'message' : 'PDF Generated sucessfully.' 
             //  }); 
              //  showToast.fire();
                var interestId = response.getReturnValue();
               // alert(interestId);
                var urlEvent = $A.get("e.force:navigateToURL");
                //window.open(baseURL+'/lightning/r/CERM__Quotation__c/'+interestId+'/view');
                urlEvent.setParams({
                    "url":'/one/one.app?#/sObject/'+ interestId + '/view'
                   // "url": baseURL+'/lightning/r/CERM__Quotation__c/'+interestId+'/view'
                    //alert(url);
                });
                urlEvent.fire();
               
               //  $A.get("e.force:closeQuickAction").fire();
             // component.set("v.msg",response.getReturnValue());
                 
            }
               
        });
        $A.enqueueAction(action1);
		$A.enqueueAction(action);
        
    },
    
    enableEmail : function(component , event , helper){
       
    	
        var cbval = component.get("v.sendEmail");
        if(cbval){
            component.find("emailvalue").set("v.disabled",false);
        }else{
            component.find("emailvalue").set("v.disabled",true);
        }
        
       /* var email = component.get("v.accEmail");
        // alert(email);
        var evt = component.getEvent("getdatafromgt_quote");
		evt.setParams({ "dispemail" : email});
		evt.fire();
        component.getEvent("get_data").setParams({ 'dispemail' : email }).fire();
       // alert(component.getEvent("get_data").setParams({ 'dispemail' : email }).fire()); */
    },
    
    // function call on component Load
    doInit: function(component, event, helper) {
        
        //component.getEvent("get_data").setParams({"irrate" : component.get("v.InterestRate") }).fire();
        
        //alert(component.get("v.InterestRate"));
        //alert('zgba');
      //  helper.getdefaultuom(component,event,helper);
      //alert('called1');
        //alert(component.get("v.InterestRate"));
       // component.getEvent("get_data").setParams({"irrate" : component.get("v.InterestRate") }).fire();
    },
 
    // function for save the Records 
    Save: function(component, event, helper) {
        
        	
             var getAccId = component.get("v.Account.Id");
        	 var getComId = component.get("v.commodity.Id");
        	 var getlocId = component.get("v.Location.Id");
        	 var uomId = component.get("v.uom.Id");
             var currency = component.get("v.currency.Id");
        	// var pricecomp = component.get("v.PriceMasterList.CERM__Price_Component_Name__c.id");
        //	alert(pricecomp);
             var action = component.get("c.updatepricelist");
        	 var plist = component.get("v.PriceMasterList");
             //alert(v.PriceMasterList.CERM__Currency__c);
        	// alert(plist);
        	
            action.setParams({
                "PriceList": component.get("v.PriceMasterList"),
                'comid' : getComId,
                'AccId' : getAccId,
                'locId' : getlocId,
               // 'pcomp' : pricecomp
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                     
                   // component.set("v.PriceMasterList", response.getReturnValue());
                    var a = component.get('c.getPrice');
                   // var b = component.get('c.calculateB');
                   // var c = component.get('c.calculateA');
        			$A.enqueueAction(a);
                    
                   // $A.enqueueAction(b);
                   // $A.enqueueAction(c);
                    
                    //alert('record Save');
                  
                }
            });
        	component.set("v.Spinner", true); 
            // enqueue the server side action  
            $A.enqueueAction(action);
     
    },
    // function for save the Records 
   
   //add new empty price component
    addNewRow: function(component, event, helper) {
        // call the comman "createObjectData" helper method for add new Object Row to List  
       /* if(component.get("v.PriceMasterList") == null){
            component.set("v.PriceMasterList", '');
         }*/
        helper.createObjectData(component, event);
       
        
    },
 
    // function for delete the row 
    removeDeletedRow: function(component, event, helper) {
        // get the selected row Index for delete, from Lightning Event Attribute  
        var index = event.getParam("indexVar");
        //var index = component.get("v.rowIndex");
        
        //alert(index);
       var Pname;
        
        var plist = component.get("v.PriceMasterList");
        var name = plist[index].Name;
       // alert(name);
        
        
       /*	for (var i = 0; i < plist.length; i++) { 
            if(i==index){
    			Pname = plist[i].Name;
             //   alert(plist[i].Name);
        	}
		} */
      
        var a = component.get("c.getPrice");
        var action = component.get("c.removeComponent");
        action.setParams({
                "PriceList": component.get("v.PriceMasterList"),
                'ind' : index,
            	'name': name,
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
               // alert('record Save1');
                if (state === "SUCCESS") {
                   // alert('yes');
                   // component.set("v.PriceMasterList", response.getReturnValue());
                   // alert('record Save');
                }else{
                   // alert('failed');
                }
            });
            // get the all List (pricemasterlist attribute) and remove the Object Element Using splice method    
            var AllRowsList = component.get("v.PriceMasterList");
           // alert(AllRowsList);
            AllRowsList.splice(index, 1);
			// set the pricemaster after remove selected row element 
        	component.set("v.PriceMasterList", AllRowsList);
        	component.set("v.Spinner", true); 
            // enqueue the server side action  
            $A.enqueueAction(action);
    },
    openpricecomp : function(component, event, helper) {
        helper.helperFun1(component,event,'collapsesection');
    },
    sectionhide : function(component, event, helper) {
       helper.helperFun(component,event,'collapsesection');
    },
    hideweightsection : function(component, event, helper) {
       helper.helperFun(component,event,'collapseweightsection');
    },
    hideinventorysection : function(component, event, helper) {
       helper.helperFun(component,event,'hideinventorysection');
    },
    hideshippingsection : function(component, event, helper) {
       helper.helperFun(component,event,'hideshippingsection');
    },
    hidebothsection :  function(component, event, helper) {
       helper.helperFun(component,event,'hidebothsection');
    },
    weightconv : function(component, event, helper) {
        
        
        var getComId = component.get("v.commodity.Id");
        var fromuom = component.get("v.Fromuom.Id");
        var touom = component.get("v.Touom.Id");
        var fromweight = component.get("v.quantity");
        var touomname = component.get("v.Touom.Name");
        var fromunitprice = component.get("v.UnitPrice");
        var toweight = component.get("v.Toweight");
        
      //  var from_curr_name = component.get("v.Fromcurrency.Name");
       // var to_curr_name = component.get("v.Tocurrency.Name");
       // alert(from_curr_name);
        //alert(to_curr_name);
        var from_curr_price = component.get("v.unit_price_for_Toweight");
        var from_curr = component.get("v.Fromcurrency.Id");
        var to_curr = component.get("v.Tocurrency.Id");
        var rbirate = component.get("v.RbiRate");
       // alert(touomname);
        component.set("v.Touom_name", touomname);
        var action = component.get("c.weightconversion");
		var action1 = component.get("c.pricepertouom");
        var action2 = component.get("c.currencyconversion");
        action.setParams({
                "fromUOM": fromuom,
                'toUOM' : touom,
            	'fromWeight': fromweight,
            	'commodityId': getComId,
            	'Fromuomprice': fromunitprice,
            });
        
            action.setCallback(this, function(response) {
                var state = response.getState();
            		
                if (state === "SUCCESS") {
                component.set("v.Toweight", response.getReturnValue());
                    
                }else{
                }
         });
        action1.setParams({
                "fromUOM": fromuom,
                'toUOM' : touom,
            	'toweight': toweight,
            	'commodityId': getComId,
            	'Fromuomprice': fromunitprice,
        });
        	action1.setCallback(this, function(response) {
                var state = response.getState();
            		
                if (state === "SUCCESS") {
                component.set("v.unit_price_for_Toweight", response.getReturnValue());
                    
                }else{
                }
            });
        action2.setParams({
                "fromprice": from_curr_price,
            	'rbirate': rbirate,
                "from_curr":from_curr,
                "to_curr":to_curr
            	
        });
        action2.setCallback(this, function(response) {
                var state = response.getState();
            		
                if (state === "SUCCESS") {
                component.set("v.convertedcurrency_val", response.getReturnValue());
                    
                }else{
                }
            });
            $A.enqueueAction(action);
        	$A.enqueueAction(action1);
        	$A.enqueueAction(action2);
   
    },
   /* openModel: function(component, event, helper) {
      // for Display Model,set the "isOpen" attribute to "true"
      component.set("v.sendEmail", true);
   },
 
   closeModel: function(component, event, helper) {
      // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
      component.set("v.sendEmail", false);
   },
 
   likenClose: function(component, event, helper) {
      // Display alert message on the click on the "Like and Close" button from Model Footer 
      // and set set the "isOpen" attribute to "False for close the model Box.
      alert('thanks for like Us :)');
      component.set("v.sendEmail", false);
   }, */
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