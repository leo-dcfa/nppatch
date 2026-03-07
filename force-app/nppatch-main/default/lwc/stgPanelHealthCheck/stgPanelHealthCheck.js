import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import runHealthCheck from "@salesforce/apex/HealthCheckController.runHealthCheck";

const STATUS_ICON = {
    Success: "utility:success",
    Warning: "utility:warning",
    Error: "utility:error",
};

const STATUS_CLASS = {
    Success: "result-row result-pass",
    Warning: "result-row result-warn",
    Error: "result-row result-fail",
};

export default class StgPanelHealthCheck extends LightningElement {
    _isRunning = false;
    _runningMessage = "";
    _hasResults = false;
    _results = [];
    _passCount = 0;
    _failCount = 0;
    _warnCount = 0;
    _elapsedTime = "";

    async handleRunHealthCheck() {
        this._isRunning = true;
        this._runningMessage = "Running health check...";
        this._hasResults = false;
        try {
            const start = Date.now();
            const rawResults = await runHealthCheck();
            const elapsed = ((Date.now() - start) / 1000).toFixed(1);
            this._elapsedTime = `${elapsed}s`;

            let passCount = 0;
            let failCount = 0;
            let warnCount = 0;

            this._results = rawResults.map((r, idx) => {
                if (r.status === "Success") passCount++;
                else if (r.status === "Error") failCount++;
                else if (r.status === "Warning") warnCount++;
                return {
                    id: `hc-${idx}`,
                    setting: r.name || "Check",
                    status: r.status,
                    description: r.details,
                    solution: r.solution,
                    iconName: STATUS_ICON[r.status] || "utility:info",
                    rowClass: STATUS_CLASS[r.status] || "result-row result-info",
                };
            });

            this._passCount = passCount;
            this._failCount = failCount;
            this._warnCount = warnCount;
            this._hasResults = true;
        } catch (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: "Error",
                message: error?.body?.message || "An error occurred running the health check.",
                variant: "error",
            }));
        } finally {
            this._isRunning = false;
        }
    }

}
