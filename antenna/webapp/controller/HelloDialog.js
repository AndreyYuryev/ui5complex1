sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Object, Fragment) {
        "use strict";

        return Object.extend("antenna.controller.HelloDialog", {
            
            constructor: function (oOwnerController, sId) {
                Object.prototype.constructor.call(this);

                this._oOwnerController = oOwnerController;
                this._oView = oOwnerController.getView();
                this._sFragmentPath = "antenna.view.fragments.HelloDialog";
                this._sId = sId;
            },
            _getDialog: function () {
                return new Promise(function (resolve, reject) {
                    if (!this._oDialog) {
                        Fragment.load({
                            id: this._sId,
                            name: this._sFragmentPath,
                            controller: this._oOwnerController
                        }).then(function (oDialog) {
                            this._oView.addDependent(oDialog);
                            this._oDialog = oDialog;
                            resolve(this._oDialog);
                        }.bind(this));
                    }else{
                        resolve(this._oDialog);
                    }
                }.bind(this));
            },
            open: function(sText) {
                this._getDialog().then(function(){
                /*    Fragment.byId(this._sId, "idText").setText("Title" + this._oView.getModel("viewModel").getProperty("/Title") + " " + sText);
                */
                //Fragment.byId(this._sId, "idText").setText("Title" + " " + sText);
                this._oDialog.open();
                }.bind(this));
            }
        });
    });