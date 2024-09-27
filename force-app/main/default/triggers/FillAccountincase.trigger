/*created On 10/11/2020.....
 * Trigger for CaseTriggerHandler */
trigger FillAccountincase on Case (before insert) {
    if(trigger.isbefore && trigger.isinsert){    
        PopulateAccountInCase.PopulateAccountInCase(trigger.new);
    }
}