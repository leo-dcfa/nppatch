import { LightningElement, api } from "lwc";
import { prefixNamespace } from "c/util";

export default class OpenManageHousehold extends LightningElement {
    @api recordId;

    connectedCallback() {
        const tabName = prefixNamespace("Manage_Household");
        const url = `/lightning/n/${tabName}?c__householdId=${this.recordId}`;
        window.open(url, "_blank");
        this.dispatchEvent(new CustomEvent("close"));
    }
}
