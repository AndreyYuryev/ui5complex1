sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("appflex.controller.detail2", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("detail2").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._orderid = oEvent.getParameter("arguments").orderid || this._orderid || "0";
			this._itemid = oEvent.getParameter("arguments").itemid || this._itemid || "0";
			let sPath = this.getView().getModel().createKey('/PMOrderItemSet', { OrderID: this._orderid, ItemID: this._itemid });
			this.getView().bindElement(sPath);
		},

		handleClose: function () {
			let oModel = this.getView().getModel("local");
			let sNextLayout = oModel.getProperty("/actionButtonsInfo/endColumn/closeColumn");
			this.oRouter.navTo("detail", {layout: sNextLayout, orderid: this._orderid});
		},

		onExit: function () {
			this.oRouter.getRoute("detail2").detachPatternMatched(this._onProductMatched, this);
		}
	});
});
