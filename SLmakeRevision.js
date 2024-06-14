/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/record', 'N/log', 'N/redirect'], function(record, log, redirect) {

    function onRequest(context) {
        var recordId = context.request.parameters.recordId;

        if (!recordId) {
            log.error('Error', 'No record ID provided.');
            return;
        }

        try {
            // Load the current record
            var currentRecord = record.load({
                type: record.Type.ESTIMATE, // Change to the appropriate record type
                id: recordId,
                isDynamic: true
            });

            if (!currentRecord) {
                log.error('Error', 'Record not found.');
                return;
            }

            // Get the current document number
            var docNumber = currentRecord.getValue({ fieldId: 'tranid' });
            var newDocNumber;
            var revisionNumber;

            // Check if the docNumber already includes a decimal
            if (docNumber.includes('.')) {
                // Split the docNumber to get the base number and the current revision
                var parts = docNumber.split('.');
                revisionNumber = parseInt(parts[1]) || 0;
                newDocNumber = parts[0] + '.' + (revisionNumber + 1);
            } else {
                // If no decimal, start the revision with .1
                newDocNumber = docNumber + '.1';
            }

            // Create a copy of the current record
            var newRecord = record.copy({
                type: record.Type.ESTIMATE, // Change to the appropriate record type
                id: recordId,
                isDynamic: true
            });

            // Set the new transaction ID with the revised format
            newRecord.setValue({
                fieldId: 'tranid',
                value: newDocNumber
            });

            // Save the new record
            var newRecordId = newRecord.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
            });

            // Update the original record to mark it as requoted
            currentRecord.setValue({
                fieldId: 'custbody_salelostreason',
                value: 8 // 'Requoted'
            });

            // Save the original record
            currentRecord.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
            });

            // Redirect to the new record
            redirect.toRecord({
                type: record.Type.ESTIMATE, // Change to the appropriate record type
                id: newRecordId
            });
        } catch (e) {
            log.error('Error during duplication', e.toString());
        }
    }

    return {
        onRequest: onRequest
    };

});
