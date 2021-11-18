sap.ui.define([
		"sap/ui/core/UIComponent",
		"sap/ui/Device",
        "ns/dialogapp/model/models",
        "sap/ui/model/odata/v2/ODataModel"
	],
    function (UIComponent, Device, models, ODataModel) {
        "use strict";

        return UIComponent.extend("ns.dialogapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

				// set the device model
				this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);