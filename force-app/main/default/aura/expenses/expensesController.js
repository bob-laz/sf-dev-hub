({

    handleUpdateExpense: function (component, event, helper) {
        var updatedExp = event.getParam("expense");
        helper.updateExpense(component, updatedExp);
    },
    handleCreateExpense: function(component, event, helper) {
        var newExpense = event.getParam("expense");
        helper.createExpense(component, newExpense);
    },
    // Load expenses from Salesforce
    doInit: function (component, event, helper) {
        // Create the action
        var action = component.get("c.getExpenses");
        // Add callback behavior for when response is received
        action.setCallback(this, function (response) { // works?
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.expenses", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
})