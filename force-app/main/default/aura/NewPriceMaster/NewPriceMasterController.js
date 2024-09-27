({
    createRecord : function (component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "CERM__Price_Master__c"
        });
        createRecordEvent.fire();
    },
})