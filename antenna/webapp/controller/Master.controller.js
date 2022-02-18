sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"antenna/controller/HelloDialog"
], function(
	Controller,
	HelloDialog
) {
	"use strict";

	return Controller.extend("antenna.controller.Master", {
        onInit: function (){
			this.oDialog = new HelloDialog(this);			
        },

		onItemsPress: function(oEvent) {
			let oObject = oEvent.getSource().getBindingContext("antenna").getObject();
			this.getOwnerComponent().getRouter().navTo('Detail', {
				protokolid: oObject.ProtokollID,
			});
		},

		onObjectPress: function (oEvent) {
			this.oDialog.open();
		},

		onObjectClose: function (oEvent){
			oEvent.getSource().getParent().close();
		},

		onObjectSave: function (oEvent){
			let sValue = oEvent.getSource().getProperty("value");
			oEvent.getSource().getParent().close();
		},

		onObjectEdit: function (oEvent) {
			let oObject = oEvent.getSource().getBindingContext("antenna").getObject();
			this.getOwnerComponent().getRouter().navTo('EditMaster', {
				protokolid: oObject.ProtokollID,
			});
		},
		onObjectDisplay: function (oEvent) {
			let oObject = oEvent.getSource().getBindingContext("antenna").getObject();
			this.getOwnerComponent().getRouter().navTo('DisplayMaster', {
				protokolid: oObject.ProtokollID,
			});
		}

	});
});