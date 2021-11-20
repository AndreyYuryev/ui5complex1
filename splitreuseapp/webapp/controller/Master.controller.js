sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ns.splitreuseapp.controller.Master", {
			onInit: function () {

            },
            
            onItemPress: function(oEvent) {
                let oObject = oEvent.getSource().getBindingContext().getObject();
                this.getOwnerComponent().getRouter().navTo('RouteDetails', {
                    id: oObject.EventId,
                })
            }
		});
	});