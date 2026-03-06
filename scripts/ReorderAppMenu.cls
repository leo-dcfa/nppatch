/**
 * @description Reorders the App Menu to put NPPatch apps at the top in a logical order.
 *              All other apps stay in their existing relative order.
 *              Used by reorder_app_menu CCI task.
 */
private static String FUNDRAISING = 'NPPatch_Fundraising';
private static String GIFT_PROCESSING = 'NPPatch_GiftProcessing';
private static String FINANCE = 'NPPatch_Finance';
private static String PROGRAM_MANAGEMENT = 'NPPatch_Programs';
private static String ADMIN = 'NPPatch_Lightning';

private static List<String> PRIORITY_APPS = new List<String>{
    FUNDRAISING,
    GIFT_PROCESSING,
    FINANCE,
    PROGRAM_MANAGEMENT,
    ADMIN
};

public static void applyOrgAppOrder() {
    applyOrgAppOrder(PRIORITY_APPS);
}

public static void applyOrgAppOrder(List<String> appNames) {
    List<UserAppMenuItem> current = [
        SELECT ApplicationId, Name
        FROM UserAppMenuItem
        ORDER BY SortOrder
    ];

    Map<String, Id> nameToAppId = new Map<String, Id>();

    for (UserAppMenuItem item : current) {
        nameToAppId.put(item.Name, item.ApplicationId);
    }

    List<Id> finalOrder = new List<Id>();
    Set<Id> alreadyAdded = new Set<Id>();

    for (String wantedName : appNames) {
        Id appId = nameToAppId.get(wantedName);
        if (appId != null) {
            finalOrder.add(appId);
            alreadyAdded.add(appId);
        }
    }

    for (UserAppMenuItem item : current) {
        if (!alreadyAdded.contains(item.ApplicationId)) {
            finalOrder.add(item.ApplicationId);
        }
    }

    AppLauncher.AppMenu.setOrgSortOrder(finalOrder);
}
