sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(
	Controller,
	History
) {
	"use strict";

	return Controller.extend("antenna.controller.Detail", {
        onInit: function (){
			this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this.onPatternMatched, this);
        },

		onPatternMatched: function(oEvent){
			let oArguments = oEvent.getParameter('arguments');
			//let sPath = this.getView().getModel().createKey('/PMOrderSet', { OrderID: oArguments.orderid });
			//let sPath = this.getView().getModel("antenna").getProperty('/ProtokollItem', { ProtokollID: oArguments.protokolid });
			let oItems = this.getView().getModel("antenna").getProperty('/ProtokollItem').filter( function (item) {
				return item.ProtokollID===oArguments.protokolid;
			});
			this.getView().getModel("antenna").setProperty("/Protokollitemsfiltered", oItems);
			let sPath = "/Protokollitemsfiltered";
			this.getView().bindElement({
				"path": sPath,
				"model": "antenna",
			});
		},

		onNavBack: function() {
			let oHistory = History.getInstance();
			let sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("Master", {}, true);
			}
		},

		onItemsPress2: function(oEvent) {
			let oObject = oEvent.getSource().getBindingContext("antenna").getObject();
			this.getOwnerComponent().getRouter().navTo('Detail', {
				protokolid: oObject.ProtokollID,
			});
		}
	});
});