public class HrUserSchedulabler implements Schedulable {

    public void execute(SchedulableContext SC) {

        Database.executeBatch(new HrUserBatch(), 200);

    }
}