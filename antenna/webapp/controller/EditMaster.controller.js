sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(
	Controller,
	History
) {
	"use strict";

	return Controller.extend("antenna.controller.EditMaster", {
        onInit: function (){
			this.getOwnerComponent().getRouter().getRoute("EditMaster").attachPatternMatched(this.onPatternMatched, this);
        },

		onPatternMatched: function(oEvent){
			let oArguments = oEvent.getParameter('arguments');
			//let sPath = this.getView().getModel().createKey('/PMOrderSet', { OrderID: oArguments.orderid });
			//let sPath = this.getView().getModel("antenna").getProperty('/ProtokollItem', { ProtokollID: oArguments.protokolid });
			let oItems = this.getView().getModel("antenna").getProperty('/Protokoll').filter( function (item) {
				return item.ProtokollID===oArguments.protokolid;
			});
			this.getView().getModel("antenna").setProperty("/Antennaprotokollheader", oItems);
			let sPath = "/Antennaprotokollheader";
			this.getView().bindElement({
				"path": sPath,
				"model": "antenna",
			});
		},

		onUpdatePress: function (oEvent) {
			//this.onNavBack();
			this.getOwnerComponent().getRouter().navTo("Master", {}, true);
		},

		onNavBack: function() {
			let oHistory = History.getInstance();
			let sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("Master", {}, true);
			}
		}
	});
});