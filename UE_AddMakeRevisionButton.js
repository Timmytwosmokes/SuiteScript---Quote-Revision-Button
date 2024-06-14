// File: UE_AddMakeRevisionButton.js

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([], () => {

    const beforeLoad = (scriptContext) => {
        const form = scriptContext.form;
        form.addButton({
            id: "custpage_make_revision_button",
            label: "Make a Revision",
            functionName: "makeRevision()"
        });
        form.clientScriptModulePath = "SuiteScripts/CLMakeRevisionButton.js"; // Update the path to your client script
    };

    return { beforeLoad };

});
