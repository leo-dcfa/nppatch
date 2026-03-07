import { LightningElement, api, wire, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import getSettings from "@salesforce/apex/NppatchSettingsController.getSettings";
import saveSettings from "@salesforce/apex/NppatchSettingsController.saveSettings";

import stgNavSystem from "@salesforce/label/c.stgNavSystem";
import stgNavErrorNotify from "@salesforce/label/c.stgNavErrorNotify";
import stgHelpStoreErrorsOn from "@salesforce/label/c.stgHelpStoreErrorsOn";
import stgHelpErrorNotifyOn from "@salesforce/label/c.stgHelpErrorNotifyOn";
import stgHelpErrorNotifyTo from "@salesforce/label/c.stgHelpErrorNotifyTo";
import stgHelpRespectDuplicateRuleSettings from "@salesforce/label/c.stgHelpRespectDuplicateRuleSettings";

const SETTINGS_OBJECT = "Error_Settings__c";

export default class StgPanelErrorNotif extends LightningElement {
    _settings;
    @track _workingCopy = {};
    _hasError = false;
    _errorMessage;
    _wiredSettingsResult;

    labels = {
        sectionLabel: stgNavSystem,
        pageLabel: stgNavErrorNotify,
        helpStoreErrors: stgHelpStoreErrorsOn,
        helpErrorNotifications: stgHelpErrorNotifyOn,
        helpNotifyTo: stgHelpErrorNotifyTo,
        helpRespectDupeRules: stgHelpRespectDuplicateRuleSettings,
        storeErrors: "Store Errors",
        errorNotifications: "Error Notifications",
        notifyTo: "Error Notification Recipient",
        respectDupeRules: "Respect Duplicate Rule Settings",
    };

    get sectionDescription() {
        return "Error handling controls whether NPPatch logs errors to Error__c records and sends notifications. When error storage is enabled, you can configure who receives notifications when processing errors occur.";
    }

    @wire(getSettings, { settingsObjectName: SETTINGS_OBJECT })
    wiredSettings(result) {
        this._wiredSettingsResult = result;
        if (result.data) {
            this._settings = { ...result.data };
            this._workingCopy = { ...result.data };
            this._hasError = false;
        } else if (result.error) {
            this._hasError = true;
            this._errorMessage = this._extractError(result.error);
        }
    }

    get isLoading() {
        return !this._settings && !this._hasError;
    }

    get storeErrorsValue() {
        return this._workingCopy?.Store_Errors_On__c || false;
    }

    get errorNotificationsValue() {
        return this._workingCopy?.Error_Notifications_On__c || false;
    }

    get notifyToValue() {
        return this._workingCopy?.Error_Notifications_To__c || "";
    }

    get respectDupeRulesValue() {
        return this._workingCopy?.Respect_Duplicate_Rule_Settings__c || false;
    }

    get isNotifToggleDisabled() {
        return !this._workingCopy?.Store_Errors_On__c;
    }

    handleStoreErrorsChange(event) {
        this._workingCopy.Store_Errors_On__c = event.detail.checked;
        if (!event.detail.checked) {
            this._workingCopy.Error_Notifications_On__c = false;
        }
    }

    handleErrorNotificationsChange(event) {
        this._workingCopy.Error_Notifications_On__c = event.detail.checked;
    }

    handleNotifyToChange(event) {
        this._workingCopy.Error_Notifications_To__c = event.detail.value;
    }

    handleRespectDupeRulesChange(event) {
        this._workingCopy.Respect_Duplicate_Rule_Settings__c = event.detail.checked;
    }

    @api
    async save() {
        try {
            await saveSettings({
                settingsObjectName: SETTINGS_OBJECT,
                fieldValues: {
                    Store_Errors_On__c: this._workingCopy.Store_Errors_On__c,
                    Error_Notifications_On__c: this._workingCopy.Error_Notifications_On__c,
                    Error_Notifications_To__c: this._workingCopy.Error_Notifications_To__c || null,
                    Respect_Duplicate_Rule_Settings__c: this._workingCopy.Respect_Duplicate_Rule_Settings__c,
                },
            });
            await refreshApex(this._wiredSettingsResult);
            this.dispatchEvent(
                new ShowToastEvent({ title: "Success", message: "Error notification settings saved.", variant: "success" })
            );
            return true;
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({ title: "Error", message: this._extractError(error), variant: "error" })
            );
            return false;
        }
    }

    @api
    reset() {
        this._workingCopy = { ...this._settings };
    }

    _extractError(error) {
        if (error?.body?.message) return error.body.message;
        if (error?.message) return error.message;
        return "An unexpected error occurred.";
    }
}
