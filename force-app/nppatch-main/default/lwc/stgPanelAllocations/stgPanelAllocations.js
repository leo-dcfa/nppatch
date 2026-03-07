import { LightningElement, api, wire, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import getSettings from "@salesforce/apex/NppatchSettingsController.getSettings";
import saveSettings from "@salesforce/apex/NppatchSettingsController.saveSettings";
import getRecordTypeOptions from "@salesforce/apex/NppatchSettingsController.getRecordTypeOptions";
import getPicklistOptions from "@salesforce/apex/NppatchSettingsController.getPicklistOptions";

import stgNavDonations from "@salesforce/label/c.stgNavDonations";
import stgNavAllocations from "@salesforce/label/c.stgNavAllocations";
import stgHelpDefaultAllocationsEnabled from "@salesforce/label/c.stgHelpDefaultAllocationsEnabled";
import stgHelpDefaultGAU from "@salesforce/label/c.stgHelpDefaultGAU";
import stgHelpRollupExcludeAlloOppRecType from "@salesforce/label/c.stgHelpRollupExcludeAlloOppRecType";
import stgHelpRollupExcludeAlloOppType from "@salesforce/label/c.stgHelpRollupExcludeAlloOppType";
import stgHelpAlloNDayValue from "@salesforce/label/c.stgHelpAlloNDayValue";
import stgHelpAlloFiscalYearRollups from "@salesforce/label/c.stgHelpAlloFiscalYearRollups";

const SETTINGS_OBJECT = "Allocations_Settings__c";

export default class StgPanelAllocations extends LightningElement {
    _settings;
    @track _workingCopy = {};
    _crlpEnabled = false;
    _oppRecordTypes = [];
    _oppTypes = [];
    _hasError = false;
    _errorMessage;
    _wiredSettingsResult;

    labels = {
        sectionLabel: stgNavDonations,
        pageLabel: stgNavAllocations,
        helpDefaultAllocEnabled: stgHelpDefaultAllocationsEnabled,
        helpDefaultGAU: stgHelpDefaultGAU,
        helpExclOppRecTypes: stgHelpRollupExcludeAlloOppRecType,
        helpExclOppTypes: stgHelpRollupExcludeAlloOppType,
        helpNDayValue: stgHelpAlloNDayValue,
        helpFiscalYear: stgHelpAlloFiscalYearRollups,
        defaultAllocEnabled: "Default Allocations Enabled",
        defaultGAU: "Default General Accounting Unit",
        exclOppRecTypes: "Excluded Opp Record Types",
        exclOppTypes: "Excluded Opp Types",
        nDayValue: "N-Day Rollup Value",
        fiscalYear: "Use Fiscal Year for Rollups",
    };

    get sectionDescription() {
        if (this._crlpEnabled) {
            return "Allocations distribute Opportunity amounts across General Accounting Units (GAUs) for fund tracking. Enable default allocations to automatically assign a GAU to new Opportunities.";
        }
        return "Allocations distribute Opportunity amounts across General Accounting Units (GAUs) for fund tracking. These settings control default allocation behavior and which Opportunity types to exclude from allocation rollups.";
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

    @wire(getSettings, { settingsObjectName: "Customizable_Rollup_Settings__c" })
    wiredCrlpSettings({ data }) {
        if (data) {
            this._crlpEnabled = !!data.Customizable_Rollups_Enabled__c;
        }
    }

    @wire(getRecordTypeOptions, { sObjectApiName: "Opportunity" })
    wiredOppRecordTypes({ data, error }) {
        if (data) {
            this._oppRecordTypes = data.map((opt) => ({ label: opt.label, value: opt.value }));
        } else if (error) {
            this._oppRecordTypes = [];
        }
    }

    @wire(getPicklistOptions, { sObjectApiName: "Opportunity", fieldApiName: "Type" })
    wiredOppTypes({ data, error }) {
        if (data) {
            this._oppTypes = data.map((opt) => ({ label: opt.label, value: opt.value }));
        } else if (error) {
            this._oppTypes = [];
        }
    }

    get isLoading() {
        return !this._settings && !this._hasError;
    }

    get showRollupSection() {
        return !this._crlpEnabled;
    }

    get selectedExclOppRecTypes() {
        return this._parseMultiSelect(this._workingCopy?.Excluded_Opp_RecTypes__c);
    }

    get selectedExclOppTypes() {
        return this._parseMultiSelect(this._workingCopy?.Excluded_Opp_Types__c);
    }

    _parseMultiSelect(rawValue) {
        if (!rawValue) {
            return [];
        }
        return rawValue.split(";").filter(Boolean);
    }

    handleDefaultAllocEnabledChange(event) {
        this._workingCopy.Default_Allocations_Enabled__c = event.detail.checked;
    }

    handleDefaultGAUChange(event) {
        this._workingCopy.Default__c = event.detail.value || null;
    }

    handleExclOppRecTypesChange(event) {
        this._workingCopy.Excluded_Opp_RecTypes__c = event.detail.value.join(";");
    }

    handleExclOppTypesChange(event) {
        this._workingCopy.Excluded_Opp_Types__c = event.detail.value.join(";");
    }

    handleNDayChange(event) {
        this._workingCopy.Rollup_N_Day_Value__c =
            event.detail.value !== "" ? Number(event.detail.value) : null;
    }

    handleFiscalYearChange(event) {
        this._workingCopy.Use_Fiscal_Year_for_Rollups__c = event.detail.checked;
    }

    @api
    async save() {
        try {
            const fieldValues = {
                Default_Allocations_Enabled__c: this._workingCopy.Default_Allocations_Enabled__c,
                Default__c: this._workingCopy.Default__c,
            };
            if (!this._crlpEnabled) {
                fieldValues.Excluded_Opp_RecTypes__c =
                    this._workingCopy.Excluded_Opp_RecTypes__c || null;
                fieldValues.Excluded_Opp_Types__c =
                    this._workingCopy.Excluded_Opp_Types__c || null;
                fieldValues.Rollup_N_Day_Value__c = this._workingCopy.Rollup_N_Day_Value__c;
                fieldValues.Use_Fiscal_Year_for_Rollups__c =
                    this._workingCopy.Use_Fiscal_Year_for_Rollups__c;
            }
            await saveSettings({ settingsObjectName: SETTINGS_OBJECT, fieldValues });
            await refreshApex(this._wiredSettingsResult);
            this.dispatchEvent(
                new ShowToastEvent({ title: "Success", message: "Allocation settings saved.", variant: "success" })
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
        if (error?.body?.message) {
            return error.body.message;
        }
        if (error?.message) {
            return error.message;
        }
        return "An unexpected error occurred.";
    }
}
