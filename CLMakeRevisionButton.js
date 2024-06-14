/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(["N/currentRecord", "N/url"], function(currentRecord, url) {

    function pageInit(scriptContext) {
        // Do Nothing
    }

    function makeRevision() {
        var recordId = currentRecord.get().id;

        var slUrl = url.resolveScript({
            scriptId: 'customscript_custom_sl_make_revis',
            deploymentId: 'customdeploy_custom_sl_make_revis',
            params: { recordId: recordId }
        });
        window.open(slUrl);
    }

    return {
        pageInit: pageInit,
        makeRevision: makeRevision
    };

});
