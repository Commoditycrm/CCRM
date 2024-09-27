global with sharing class DailyUpdate_Batch_Scheduler implements schedulable {
    
    global void execute(SchedulableContext sc) {
    
      DailyUpdate_Batch dupdatebatch = new DailyUpdate_Batch();
      database.executebatch(dupdatebatch);
    
    }
}