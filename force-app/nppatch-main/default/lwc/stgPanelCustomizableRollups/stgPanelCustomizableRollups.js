import { LightningElement } from "lwc";
import { getCurrentNamespace } from "c/utilCommon";

export default class StgPanelCustomizableRollups extends LightningElement {
    handleOpenCRLP() {
        const ns = getCurrentNamespace();
        const prefix = ns ? ns + "__" : "";
        window.open("/apex/" + prefix + "CRLP_RollupSetup", "_blank");
    }
}
