sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, MessageToast) {
		"use strict";

		return Controller.extend("ns.splitreuseapp.controller.Details", {
			onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteDetails").attachPatternMatched(this.onPatternMatched, this);
            },
            
            onPatternMatched: function(oEvent){
                let oArguments = oEvent.getParameter('arguments');
                this.getView().bindElement(this.getView().getModel().createKey('/EventSet', { EventId: oArguments.id} ));
            },

            onThemesPress: function () {
                this.getOwnerComponent().getThemesComponent().then(function(oComp) {
                    this.byId('idThemesComponent').setComponent(oComp);
                }.bind(this)).catch(function(oError){
                    MessageToast.show(oError.message);
                });
            }
		});
	});