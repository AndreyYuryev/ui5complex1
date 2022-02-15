sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/f/library',
	'appflex/model/models',
	'sap/f/FlexibleColumnLayoutSemanticHelper',
], function(UIComponent, JSONModel, fioriLibrary, models, FlexibleColumnLayoutSemanticHelper) {
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

		getHelper: function () {
			return this._getFcl().then(function(oFCL) {
				var oSettings = {
					defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded
				};
				return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
			});
		},

		_getFcl: function () {
			return new Promise(function(resolve, reject) {
				var oFCL = this.getRootControl().byId('flexibleColumnLayout');
				if (!oFCL) {
					this.getRootControl().attachAfterInit(function(oEvent) {
						resolve(oEvent.getSource().byId('flexibleColumnLayout'));
					}, this);
					return;
				}
				resolve(oFCL);

			}.bind(this));
		},

		_onBeforeRouteMatched: function(oEvent) {
			let oModel = this.getModel("local");
			let sLayout = oEvent.getParameters().arguments.layout;
			let oNextUIState;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				this.getHelper().then(function (oHelper){
					oNextUIState = oHelper.getNextUIState(0);
					oModel.setProperty("/layout", oNextUIState.layout);
				});
				return;
				//sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		}
	});
});