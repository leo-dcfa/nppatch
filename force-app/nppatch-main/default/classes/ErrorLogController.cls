public with sharing class ErrorLogController {

    private static final Integer MAX_ROWS = 1000;

    @AuraEnabled(cacheable=true)
    public static List<Error__c> getErrors() {
        STG_Panel.throwAuraExceptionIfRunningUserNotAdmin();
        return [
            SELECT Id, CreatedDate, Datetime__c, Context_Type__c,
                   Object_Type__c, Error_Type__c, Full_Message__c,
                   Stack_Trace__c, Related_Record_ID__c, Record_URL__c
            FROM Error__c
            ORDER BY CreatedDate DESC
            LIMIT :MAX_ROWS
        ];
    }

    @AuraEnabled
    public static void clearErrors() {
        STG_Panel.throwAuraExceptionIfRunningUserNotAdmin();
        List<Error__c> errors = [SELECT Id FROM Error__c LIMIT 10000];
        if (!errors.isEmpty()) {
            delete errors;
        }
    }
}
