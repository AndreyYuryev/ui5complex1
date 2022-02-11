sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/f/library',
	'appflex/model/models'
], function(UIComponent, JSONModel, fioriLibrary, models) {
	'use strict';

	return UIComponent.extend('appflex.Component', {

		metadata: {
			manifest: 'json'
		},

		init: function () {
			var oModel,
				//oProductsModel,
				oRouter;

			UIComponent.prototype.init.apply(this, arguments);

			oModel = new JSONModel();
			this.setModel(oModel, "local");
			this.setModel(models.createDeviceModel(), "device");

			// set products demo model on this sample
			//oProductsModel = new JSONModel(sap.ui.require.toUrl("appflex/products.json"));
			//oProductsModel.setSizeLimit(1000);
			//this.setModel(oProductsModel, 'products');

			oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();
		},

		_onBeforeRouteMatched: function(oEvent) {
			let oModel = this.getModel("local");
			let sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		}
	});
});