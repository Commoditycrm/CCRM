({
   
	plotmarker : function(obj,component,accounts,interestaccounts,offeraccounts,Accountaccounts) {
        
        var setZIndex;
        var rmarker;
        var refinery = $A.get('$Resource.Refinery');
        var transUrl = $A.get('$Resource.Transporter');
        var supplierUrl = $A.get('$Resource.Supplier');
        var serviceproviderUrl = $A.get('$Resource.ServiceProvider');
        var producerUrl = $A.get('$Resource.Producer');
        var InventoryUrl = $A.get('$Resource.Inventory');
        var LocationUrl = $A.get('$Resource.BusinessLocation');
        var BuyerUrl = $A.get('$Resource.Buyer');
        var SellerUrl = $A.get('$Resource.Seller');
        var InterestUrl = $A.get('$Resource.Interest');
        var OfferUrl = $A.get('$Resource.Offer');
        var	RailUrl = $A.get('$Resource.Rail');
        var	ProductUrl = $A.get('$Resource.Product_Terminal');
        var Interesticon = L.icon({
            iconUrl: InterestUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var Railicon = L.icon({
            iconUrl: RailUrl,
           iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
           
        });
        var Producticon = L.icon({
            iconUrl: ProductUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
           
        });
        var Buyericon = L.icon({
            iconUrl: BuyerUrl,
           iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var Sellericon = L.icon({
            iconUrl: SellerUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var Locationicon = L.icon({
            iconUrl: LocationUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
            
        });
        var offericon = L.icon({
            iconUrl: OfferUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
            
        });
        var Inventoryicon = L.icon({
            iconUrl: InventoryUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
            
        });
        var transportericon = L.icon({
            iconUrl: transUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var suppliericon = L.icon({
            iconUrl: supplierUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var serviceprovider = L.icon({
            iconUrl: serviceproviderUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var producericon = L.icon({
            iconUrl: producerUrl,
            iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
        });
        var refineryicon = L.icon({
            iconUrl: refinery,
           iconSize:     [20, 21], // size of the icon
            iconAnchor:   [10, 8],
           
        });
        
        var tl = new L.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
        var map = component.get('v.map');
        var tile = component.get('v.tile');
        var layerscontrol = component.get('v.control');
        var layer;
		var marker = new L.Marker();
        var lgrp = L.layerGroup();
        var lgrp1 = L.layerGroup();
        var marker2;
       var popvalue;
          
        if(obj == 'Interest'){
           map.eachLayer(function (layer) {
               
    			map.removeLayer(layer);
			});
            var tl = new L.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            
            for (var i=0; i<interestaccounts.length; i++){
                
            	var account = interestaccounts[i];
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
                marker = new L.marker([account.CERM__Account__r.BillingLatitude,account.CERM__Account__r.BillingLongitude],{icon:Buyericon})
                .bindPopup(popvalue).openPopup()
                .addTo(map);
            } 
            map.addLayer(tl);
        
        }else if(obj == 'Offer'){
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var tl = new L.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            
            for (var i=0; i<offeraccounts.length; i++){
                
            	var account = offeraccounts[i];
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
                marker = new L.marker([account.CERM__Account__r.BillingLatitude,account.CERM__Account__r.BillingLongitude],{icon:Sellericon})
                .bindPopup(popvalue).openPopup()
                .addTo(map);
            } 
            map.addLayer(tl);
        
        }else if(obj == 'Refinery'){
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var t2 = new L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
               });
            /*var latlngs =  [ [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
  							[[37.29, -118.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]],
                           [ [[41, -121.03],[45, -112.04],[45, -104.05],[41, -104.05]]]];
            var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
            // zoom the map to the polygon
            map.fitBounds(polygon.getBounds());*/
            for (var i=0; i<accounts.length; i++) {
                
                var account = accounts[i];
                popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Quantity__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
                var latLng = [account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude];
                
                marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:refineryicon})
                //.bindTooltip(account.CERM__Business_Location__r.Name, {permanent: true, className: "my-label", offset: [0, 0] })
                .bindPopup(popvalue).openPopup();
                
               marker.addTo(map);
            }
            map.addLayer(t2);
        } else if(obj == 'Rail Terminal'){
            
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var t2 = new L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            for (var i=0; i<accounts.length; i++) {
                
                var account = accounts[i];
                popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Quantity__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
                var latLng = [account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude];
                
                marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:Railicon})
                //.bindTooltip(account.CERM__Business_Location__r.Name, {permanent: true, className: "my-labelrailterminal", offset: [0, 0] })
                .bindPopup(popvalue).openPopup();
                
               marker.addTo(map);
            }
            map.addLayer(t2);
        }else if(obj == 'Product Terminal'){
            
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var t2 = new L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            for (var i=0; i<accounts.length; i++) {
                
                var account = accounts[i];
                popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Quantity__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
                var latLng = [account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude];
                
                marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:Producticon})
                //.bindTooltip(account.CERM__Business_Location__r.Name, {permanent: true, className: "my-labelproductterminal", offset: [0, 0] })
                .bindPopup(popvalue).openPopup();
                
               marker.addTo(map);
            }
            map.addLayer(t2);
        }else if(obj == 'ALL'){
                map.eachLayer(function (layer) {
                    map.removeLayer(layer);
                });
                var t2 = new L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {zIndex:1,
                     
                    });
            
            for (var i=0; i<accounts.length; i++) {
                
                var account = accounts[i];
                //console.log(account);
                var accid = account.CERM__Business_Location__r.CERM__Account__r.Id;
                var tagstartvalue = '<a href="https://commodityforce-dev-ed.lightning.force.com/';
                
                 var tagvalue = tagstartvalue+accid+'"'+'target="_blank">';
                var tagendvalue = '</a>';
                popvalue = 'Account : '+ tagvalue+account.CERM__Business_Location__r.CERM__Account__r.Name+tagendvalue + "<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Quantity__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
                var latLng = [account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude];
                if(account.CERM__Business_Location__r.CERM__Type__c == 'Refinery'){
                    marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:refineryicon})
                    //.bindTooltip(account.CERM__Business_Location__r.Name, {permanent: true, className: "my-label", offset: [0, 0] })
                   
                    .bindPopup(popvalue).openPopup();
                   marker.addTo(map);
                }else if(account.CERM__Business_Location__r.CERM__Type__c == 'Rail Terminal'){
                    marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:Railicon})
                    //.bindTooltip(account.CERM__Business_Location__r.Name, {permanent: true, className: "my-labelrailterminal", offset: [0, 0] })
                    .bindPopup(popvalue).openPopup();
                   marker.addTo(map);
                }else if(account.CERM__Business_Location__r.CERM__Type__c == 'Product Terminal'){
                    marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:Producticon})
                    //.bindTooltip(account.CERM__Business_Location__r.Name, {permanent: true, className: "my-labelproductterminal", offset: [0, 0] })
                    .bindPopup(popvalue).openPopup();
                    marker.addTo(map);
                }
                
            }
            for (var i=0; i<interestaccounts.length; i++){
                
            	var account = interestaccounts[i];
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
                marker = new L.marker([account.CERM__Account__r.BillingLatitude,account.CERM__Account__r.BillingLongitude],{icon:Buyericon})
                .bindPopup(popvalue).openPopup()
                .addTo(map);
            } 
            for (var i=0; i<offeraccounts.length; i++){
               
            	var account = offeraccounts[i];
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Quantity__c+' ('+account.CERM__Uom__r.Name +')'; 
                marker = new L.marker([account.CERM__Account__r.BillingLatitude,account.CERM__Account__r.BillingLongitude],{icon:Sellericon})
                .bindPopup(popvalue).openPopup()
                .addTo(map);
            } 
            for (var i=0; i<Accountaccounts.length; i++) {
                
                var account = Accountaccounts[i];
                popvalue = 'Account : '+account.Name+"<br/>"+'Type : '+account.Type;
                var latLng = [account.BillingLatitude, account.BillingLongitude];
                if(account.Type == 'Transporter' || account.Type == 'Freight Forwarder'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:transportericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Supplier'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:suppliericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Service Provider'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:serviceprovider})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Producer'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:producericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Buyer'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:Buyericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Seller'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:Sellericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else{
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:Locationicon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }               
                
            }
            map.addLayer(t2);
           
           
        }else if(obj == 'Inventory'){
            
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var t2 = new L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            for (var i=0; i<accounts.length; i++) {
                
                var account = accounts[i];
                popvalue = 'Account : '+account.CERM__Business_Location__r.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Owned Inventory : '+account.CERM__Inventory_DB__c+' ('+account.CERM__UoM__r.Name +')'+"<br/>"+'Storage : '+account.CERM__Storage_Net__c+' ('+account.CERM__UoM__r.Name +')';
                var latLng = [account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude, account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude];
                
                marker = new L.marker([account.CERM__Business_Location__r.CERM__Account__r.BillingLatitude,account.CERM__Business_Location__r.CERM__Account__r.BillingLongitude],{icon:refineryicon})
               .bindPopup(popvalue).openPopup();
                
               marker.addTo(map);
            }
            
            map.addLayer(t2);
        }else if(obj == 'Accounts'){
            //alert('Accounts');
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var t3 = new L.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            for (var i=0; i<Accountaccounts.length; i++) {
                
                var account = Accountaccounts[i];
                popvalue = 'Account : '+account.Name+"<br/>"+'Type : '+account.Type;
                var latLng = [account.BillingLatitude, account.BillingLongitude];
                if(account.Type == 'Transporter' || account.Type == 'Freight Forwarder'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:transportericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Supplier'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:suppliericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Service Provider'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:serviceprovider})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Producer'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:producericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Buyer'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:Buyericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else if(account.Type == 'Seller'){
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:Sellericon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }else{
                    marker = new L.marker([account.BillingLatitude,account.BillingLongitude],{icon:Locationicon})
               		.bindPopup(popvalue).openPopup();
               		marker.addTo(map);
                }               
                
            }
            map.addLayer(t3);
        }else if(obj == 'Contracts'){
            
           map.eachLayer(function (layer) {
    			map.removeLayer(layer);
			});
            var t2 = new L.tileLayer(
       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {zIndex:1,
             
       });
            for (var i=0; i<accounts.length; i++) {
                
                var account = accounts[i];
                popvalue = 'Account : '+account.CERM__Account__r.Name+"<br/>"+'Commodity : '+account.CERM__Commodity__r.Name+"<br/>"+'Quantity : '+account.CERM__Pos_Unapplied__c+' ('+account.CERM__UoM__r.Name +')';
                var latLng = [account.CERM__Account__r.BillingLatitude, account.CERM__Account__r.BillingLongitude];
                
                marker = new L.marker([account.CERM__Account__r.BillingLatitude,account.CERM__Account__r.BillingLongitude],{icon:transportericon})
               .bindPopup(popvalue).openPopup();
                
               marker.addTo(map);
            }
            map.addLayer(t2);
        }
    },
   
})