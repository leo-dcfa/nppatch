import { LightningElement, api } from "lwc";

export default class StgPanelContent extends LightningElement {
    @api isLoading = false;
    @api hasError = false;
    @api errorMessage;
    @api description;

    get isReady() {
        return !this.isLoading && !this.hasError;
    }
}
