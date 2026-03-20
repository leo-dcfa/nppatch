import { LightningElement, api } from "lwc";
import { prefixNamespace } from "c/util";

export default class OpenNewGift extends LightningElement {
    @api recordId;
    @api objectApiName;

    connectedCallback() {
        const tabName = prefixNamespace("GE_Gift_Entry");
        const url = `/lightning/n/${tabName}?c__view=Single_Gift_Entry&c__apiName=${this.objectApiName}&c__donorRecordId=${this.recordId}`;
        window.open(url, "_blank");
        this.dispatchEvent(new CustomEvent("close"));
    }
}
