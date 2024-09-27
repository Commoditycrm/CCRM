global with sharing class Contract_Batch_Scheduler implements schedulable {
    
    global void execute(SchedulableContext sc) {
    
      Contract_Batch cbatch = new Contract_Batch();
      database.executebatch(cbatch);
    
    }
}