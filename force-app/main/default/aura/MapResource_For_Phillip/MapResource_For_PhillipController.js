({
    
	jsLoaded1: function(component, event, helper) {
       var	RailUrl = $A.get('$Resource.Rail');
        var	ProductUrl = $A.get('$Resource.Product_Terminal');
        var refinery = $A.get('$Resource.Refinery');
       var greenIcon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            iconSize:     [38, 95], // size of the icon
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
   		//alert('called');
   		var Railicon = L.icon({
            iconUrl: RailUrl,
            iconSize:     [38, 40], // size of the icon
            iconAnchor:   [20, 26],
        });
        var refineryicon = L.icon({
            iconUrl: refinery,
            iconSize:     [38, 40], // size of the icon
            iconAnchor:   [20, 26],
        });
        var Producticon = L.icon({
            iconUrl: ProductUrl,
            iconSize:     [38, 40], // size of the icon
            iconAnchor:   [20, 26],
        });
        var interest = L.layerGroup();
        var Inventory = L.layerGroup();
         var lgrp = L.layerGroup();
        var lgrp1 = L.layerGroup();
        var map;
        
        /*try{
            if(map == undefined){
                map = new L.map('map');
            }
         
     }catch(err){
        console.log(err);
         map = document.getElementById('map');
         map.remove();
         map = new L.map('map')
     }*/
      //var ex = document.getElementById('map');
        //alert(ex);
       var container = L.DomUtil.get('map');
      		if(container != null){
                //alert(container);
                // var c1 = JSON.stringify(container);
                //alert(c1);
        		container._leaflet_id = null;
               // var c = JSON.stringify(container);
                //alert(c);
            }
       

         map = new L.map('map', {zoomControl: true, tap: false,attributionControl: false,minZoom: 0,
		layers: [interest,Inventory]})
                  .setView([39.055451,-99.360986], 4);
        //var offset = map.getSize().y * 0.15;
       // alert(offset);
		//map.panBy(new L.Point(0, -offset), {animate: false});
	
      var tl = new L.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       }).addTo(map);
        //  var baseLayers = {
		//"Grayscale": grayscale,
		//"Streets": streets
		//};
		 var overlays = {
			"interests": lgrp,
            "Inventory": lgrp1,
		};
        /*var legend = L.control({position: 'bottomleft'});
        
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend');
            div.innerHTML +=  '<img src="Producticon">' + '     Refinery' + '<br>'
            div.innerHTML +=  Railicon  + '     Rail Terminal' + '<br>'
            div.innerHTML +=  Producticon   +  '    Product Terminal'
            
            return div;
        };
        
        legend.addTo(map);
       */
           var layerscontrol = new L.control.layers(null, overlays);
        component.set("v.control", tl);
   		component.set("v.tile", tl);
        component.set("v.map", map);
       

        
  },
     menuchanged: function(component, event, helper) {
        
        //var obj = 'Refinery';
        var marker;
        var obj = event.getParam('menuvalue');
        //alert(obj);
       component.set("v.title",obj);
        var accounts = event.getParam('INVENTORYaccounts');
         var interestaccounts = event.getParam('INTERESTaccounts');
         var offeraccounts = event.getParam('OFFERaccounts');
         var Accountaccounts = event.getParam('Accountaccounts');
         //alert('interestaccounts'+interestaccounts);
         //alert('offeraccounts'+offeraccounts);
        var map = component.get('v.map');
        helper.plotmarker(obj,component,accounts,interestaccounts,offeraccounts,Accountaccounts);
        
    },
   	
    accountSelected: function(component, event, helper) {
        // Center the map on the account selected in the list
         /*$A.createComponent(
            "lightning:button",
            {
                "aura:id": "findableAuraId",
                "label": "Press Me",
                "onclick": component.getReference("c.handlePress")
            },
            function(newButton, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(newButton);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );*/
       var Interesticon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
            iconSize:     [38, 40], // size of the icon
        });
                var offericon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            
            iconSize:     [38, 40], // size of the icon
            
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
           
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var customOptions =
        {
        'maxWidth': '500',
        'className' : 'custom'
        }
        var map = component.get('v.map');
        var marker;
        var popvalue;
        var title = component.get("v.title");
        var account = event.getParam("account"); 
       // alert('title'+title);
        if(title == 'Inventory'){
             popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Inventory_Net__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
        	 map.panTo([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == "Interest"){
            popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
        	map.panTo([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == "Offer"){
            popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
        	map.panTo([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == "Account"){
            popvalue = 'Account : '+account.Name+"<br/>"+'Type : '+account.Type;
        	map.panTo([account.BillingLatitude, account.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.BillingLatitude, account.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == "Contracts"){
            popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Pos_Unapplied__c+' ('+account.CERM__UoM__r.Name +')'; 
        	map.panTo([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == 'Refinery'){
             popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Inventory_Net__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
        	 map.panTo([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == 'Rail Terminal'){
             popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Inventory_Net__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
        	 map.panTo([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }else if(title == 'ALL'){
            if(account.CERM__Record__c == 'Interest'){
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
                map.panTo([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude]);
                var popup = L.popup()
                .setLatLng([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude])
                .setContent(popvalue)
                .openOn(map); 
            }else if(account.CERM__Record__c == 'Offer'){
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
                map.panTo([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude]);
                var popup = L.popup()
                .setLatLng([account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude])
                .setContent(popvalue)
                .openOn(map); 
            }else if(account.CERM__Record__c == 'Inventory'){
              popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Inventory_Net__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
        	 map.panTo([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map);   
            }
             
        }else if(title == 'Product Terminal'){
             popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Inventory_Net__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
        	 map.panTo([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude]);
        	var popup = L.popup()
    		.setLatLng([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude])
    		.setContent(popvalue)
    		.openOn(map); 
        }
       // var latlng = [account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude];
        
       
        
        
    },
    handlePress : function(component) {
        // Find the button by the aura:id value
        var comp = component.find("findableAuraId");
        console.log("button: " + component.find("findableAuraId"));
        console.log("button pressed");
          comp.destroy();
    },
   /* accountsLoaded: function(component, event, helper) {
     
        	var offericon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            iconSize:     [38, 40], // size of the icon
            
        });
        var Interesticon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
            iconSize:     [38, 40], // size of the icon
        });
        component.set("v.title",'Inventory');
        var obj = 'Inventory';
        var marker;
        var accounts = event.getParam('accounts');
        var map = component.get('v.map');
        var value = component.get('v.value');
       	//alert(value);
       	helper.plotmarker(obj,component,accounts);
    },
    INTaccountsLoaded: function(component, event, helper) {
        
        	var offericon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            iconSize:     [38, 95], // size of the icon
            iconAnchor:   [15, 94],
        });
        var Interesticon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
            iconSize:     [38, 40], // size of the icon
        });
        component.set("v.title",'Interest');
        var obj = 'interest';
        var marker;
        var accounts = event.getParam('InTaccounts');
        var map = component.get('v.map');
        helper.plotmarker(obj,component,accounts);
        
    },
    AccaccountsLoaded: function(component, event, helper) {
        	var offericon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            iconSize:     [38, 95], // size of the icon
            iconAnchor:   [15, 94],
        });
        var Interesticon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
            iconSize:     [38, 40], // size of the icon
        });
        component.set("v.title",'Account');
        var obj = 'Account';
        var marker;
        var accounts = event.getParam('Accaccounts');
        var map = component.get('v.map');
        helper.plotmarker(obj,component,accounts);
        
    },
    ItemaccountsLoaded: function(component, event, helper) {
        	var offericon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            iconSize:     [38, 95], // size of the icon
            iconAnchor:   [15, 94],
        });
        var Interesticon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
            iconSize:     [38, 40], // size of the icon
        });
        component.set("v.title",'Contracts');
        var obj = 'Contracts';
        var marker;
        var accounts = event.getParam('Itemaccounts');
        var map = component.get('v.map');
        helper.plotmarker(obj,component,accounts);
        
    },
    OffaccountsLoaded: function(component, event, helper) {
        	var offericon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
            iconSize:     [38, 95], // size of the icon
            iconAnchor:   [15, 94],
        });
        var Interesticon = L.icon({
            iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
            iconSize:     [38, 40], // size of the icon
        });
        component.set("v.title",'Offer');
        var obj = 'Offer';
        var marker;
        var accounts = event.getParam('Offaccounts');
        var map = component.get('v.map');
        helper.plotmarker(obj,component,accounts);
        
    },*/
   
    
    

})