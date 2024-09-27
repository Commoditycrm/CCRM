({
    doInit : function(component, event, helper) {
        //alert("called");
        var key = component.get("v.keyList");
        var map = component.get("v.CFITEMResult");
        //alert(map);
        var keySell = component.get("v.keyListSell");
        var mapSell = component.get("v.CFITEMSellResult");
        
        var keyInterest = component.get("v.keyListInterest");
        var mapInterest = component.get("v.InterestResult");
        
         var keyOffer = component.get("v.keyListOffer");
        var mapOffer = component.get("v.OfferResult");
         //var arrayMapvalues = [];
          var title = component.get("v.title");
        var object = component.get("v.object");
        //alert(title);
        //alert(object);
        var arrayMapKeys = [];
        for(var key in map){
            //alert(map[key]);
            arrayMapKeys.push({key: key, value: map[key]});
        }
        component.set("v.mapValues", arrayMapKeys);
        //for sell values
        var arrayMapKeysSell = [];
        for(var key in mapSell){
            //alert(map[key]);
            arrayMapKeysSell.push({key: key, value: mapSell[key]});
        }
        component.set("v.mapValuesSell", arrayMapKeysSell);
        
        var arrayMapKeysInterest = [];
        for(var key in mapInterest){
            //alert(map[key]);
            arrayMapKeysInterest.push({key: key, value: mapInterest[key]});
        }
        component.set("v.mapValuesInterest", arrayMapKeysInterest);
        var arrayMapKeysOffer = [];
        for(var key in mapOffer){
            //alert(map[key]);
            arrayMapKeysOffer.push({key: key, value: mapOffer[key]});
        }
        component.set("v.mapValuesOffer", arrayMapKeysOffer);
        
        //console.log('arrayMapvalues'+arrayMapKeys);
         // component.set("v.value" ,arrayMapvalues);   
        //console.log(component.get("v.value"));
       // alert('map value'+map);
       // alert('key value'+key);
    },
	Close : function(component, event, helper) {
		var toggleText = component.find("panel1");
        $A.util.toggleClass(toggleText, "toggle");
        var event = $A.get("e.c:Map_for_Phillip_Open_Panel");
        event.setParams({"panelvalue": false});
        event.fire();
	}
})