public class HrUserBatch implements Database.Batchable<HrUserWrapper.UserDetail>, Database.AllowsCallouts {
        
        public Iterable<HrUserWrapper.UserDetail> start(Database.BatchableContext BC) {
            
            return HrCalloutService.getUsersFromApi();
    }

    public void execute(Database.BatchableContext BC, List<HrUserWrapper.UserDetail> scope) {
     
        List<Contact> contactsToInsert = new List<Contact>();

        for(HrUserWrapper.UserDetail tekilkisi : scope){

            Contact c = new Contact();
            c.FirstName = tekilkisi.firstName;
            c.LastName = tekilkisi.lastName;
            c.Email = tekilkisi.email;
            c.DummyJson_ID__c = tekilkisi.id;

            contactsToInsert.add(c);
        }

        if(!contactsToInsert.isEmpty()){
            upsert contactsToInsert;
        }
    }

    public void finish(Database.BatchableContext BC) {
    System.debug('İşlem başarıyla tamamlandı!');
    }
}