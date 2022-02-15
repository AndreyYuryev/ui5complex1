sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library'
], function (Controller, fioriLibrary) {
	"use strict";

	return Controller.extend("appflex.controller.detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail2").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._orderid = oEvent.getParameter("arguments").orderid || this._orderid || "0";
			this.getView().bindElement({
				"path": "/PMOrderSet('" + this._orderid + "')",
				"parameters": { expand: "OrderToItem"}
			});
		},

		onSupplierPress: function (oEvent) {
			let sPath = oEvent.getSource().getBindingContext().getPath();
			let orderid = sPath.split("'").slice(1,2).pop();
			let itemid = sPath.split("'").slice(3,4).pop();
			let oNextUIState;

			this.getOwnerComponent().getHelper().then( function (oHelper) {
				oNextUIState = oHelper.getNextUIState(2);
				this.oRouter.navTo("detail2", {layout: oNextUIState.layout, orderid: orderid, itemid: itemid});
			}.bind(this));

		},

		handleClose: function () {
			let oModel = this.getView().getModel("local");
			let sNextLayout = oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("master", {layout: sNextLayout});
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}
	});
});
