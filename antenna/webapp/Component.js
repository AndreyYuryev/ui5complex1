sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "antenna/model/models",
        'sap/ui/model/json/JSONModel'
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("antenna.Component", {
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

                let oAntennaModel = new JSONModel(sap.ui.require.toUrl('antenna/antennamodel.json'));
                this.setModel(oAntennaModel, "antenna");
            }
        });
    }
);