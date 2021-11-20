sap.ui.define([

], function () {
    "use strict";
    return {
        statusState: function (sStatus){
            let oState = sap.ui.core.ValueState.None;
            switch(sStatus){
                case "active":
                    oState = sap.ui.core.ValueState.Success;
                    break;
                case "New":
                    oState = sap.ui.core.ValueState.Information;
                    break;
                case "test":
                    oState = sap.ui.core.ValueState.Warning;
                    break;
                default:
                    oState = sap.ui.core.ValueState.None;                    
            }
            return oState;
        },
        statusIcon: function(sStatus){
            let oIcon = "sap-icon://error";
            switch(sStatus){
                case "active":
                    oIcon = "sap-icon://sys-enter-2";
                    break;
                case "New":
                    oIcon = "sap-icon://information";
                    break;
                case "test":
                    oIcon = "sap-icon://alert";
                    break;
                default:
                    oIcon = "sap-icon://error";                    
            }
            return oIcon;            
        }
    };
});