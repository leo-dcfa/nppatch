public with sharing class HealthCheckController {

    /**
     * @description Runs the full NPPatch Health Check and returns results.
     * Admin only.
     * @return List of result maps with keys: name, status, details, solution
     */
    @AuraEnabled
    public static List<Map<String, String>> runHealthCheck() {
        STG_Panel.throwAuraExceptionIfRunningUserNotAdmin();
        STG_PanelHealthCheck_CTRL hc = new STG_PanelHealthCheck_CTRL();
        hc.runDetector();
        List<Map<String, String>> results = new List<Map<String, String>>();
        for (STG_PanelHealthCheck_CTRL.DetectResult dr : hc.listDR) {
            results.add(new Map<String, String>{
                'name' => dr.strName,
                'status' => dr.strStatus,
                'details' => dr.strDetails,
                'solution' => dr.strSolution
            });
        }
        return results;
    }
}
