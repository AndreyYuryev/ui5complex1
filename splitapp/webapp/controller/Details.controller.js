sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ns.splitapp.controller.Details", {
			onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteDetails").attachPatternMatched(this.onPatternMatched, this);
            },
            
            onPatternMatched: function(oEvent){
                let oArguments = oEvent.getParameter('arguments');
                this.getView().bindElement(this.getView().getModel().createKey('/EventSet', { EventId: oArguments.id} ));
            }
		});
	});