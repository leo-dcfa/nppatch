<?xml version="1.0" encoding="UTF-8"?>
<Profile xmlns="http://soap.sforce.com/2006/04/metadata">
    <layoutAssignments>
        <layout>Account-%%%NAMESPACE%%%Household Layout</layout>
        <recordType>Account.HH_Account</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Account-%%%NAMESPACE%%%Organization Layout</layout>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Account-%%%NAMESPACE%%%Organization Layout</layout>
        <recordType>Account.Organization</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Campaign-%%%NAMESPACE%%%NPPatch Campaign Layout</layout>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Contact-%%%NAMESPACE%%%Fundraising Contact Layout</layout>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%Donation Layout</layout>
        <recordType>Opportunity.NPPatch_Default</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%Donation Layout</layout>
        <recordType>Opportunity.%%%NAMESPACE%%%Donation</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%Grant Layout</layout>
        <recordType>Opportunity.%%%NAMESPACE%%%Grant</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%In-Kind Gift Layout</layout>
        <recordType>Opportunity.%%%NAMESPACE%%%InKindGift</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%Major Gift Layout</layout>
        <recordType>Opportunity.%%%NAMESPACE%%%MajorGift</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%Matching Gift Layout</layout>
        <recordType>Opportunity.%%%NAMESPACE%%%MatchingGift</recordType>
    </layoutAssignments>
    <layoutAssignments>
        <layout>Opportunity-%%%NAMESPACE%%%Membership Layout</layout>
        <recordType>Opportunity.%%%NAMESPACE%%%Membership</recordType>
    </layoutAssignments>
    <recordTypeVisibilities>
        <default>true</default>
        <recordType>Opportunity.%%%NAMESPACE%%%Donation</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <recordTypeVisibilities>
        <default>false</default>
        <recordType>Opportunity.%%%NAMESPACE%%%Grant</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <recordTypeVisibilities>
        <default>false</default>
        <recordType>Opportunity.%%%NAMESPACE%%%InKindGift</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <recordTypeVisibilities>
        <default>false</default>
        <recordType>Opportunity.%%%NAMESPACE%%%MajorGift</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <recordTypeVisibilities>
        <default>false</default>
        <recordType>Opportunity.%%%NAMESPACE%%%MatchingGift</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <recordTypeVisibilities>
        <default>false</default>
        <recordType>Opportunity.%%%NAMESPACE%%%Membership</recordType>
        <visible>true</visible>
    </recordTypeVisibilities>
    <recordTypeVisibilities>
        <default>false</default>
        <recordType>Opportunity.NPPatch_Default</recordType>
        <visible>false</visible>
    </recordTypeVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Address__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Contact_Merge</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%DataImport__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%DataImportBatch__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Engagement_Plan_Template__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Manage_Household</tab>
        <visibility>DefaultOff</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%General_Accounting_Unit__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Level__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%NPPatch_Bulk_Processes</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%NPPatch_Error_Log</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%NPPatch_Health_Check</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%NPPatch_Settings</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%OppPayment__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Relationship__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%Affiliation__c</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
    <tabVisibilities>
        <tab>%%%NAMESPACE%%%GE_Gift_Entry</tab>
        <visibility>DefaultOn</visibility>
    </tabVisibilities>
</Profile>
