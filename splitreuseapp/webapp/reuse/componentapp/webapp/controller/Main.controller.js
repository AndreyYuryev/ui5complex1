sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, MessageBox, Sorter, Filter) {
        "use strict";

        return Controller.extend("ns.componentapp.controller.Main", {

            onInit: function () {

            },

            onSelectionChange: function (oEvent) {

                let oItem = oEvent.getSource().getSelectedItem();
                let sPath = oItem.getBindingContext().getPath();
                let oData = this.getView().getModel().getProperty(sPath);
                /*
                this.getView().getModel("viewModel").setProperty("/ThemeId", oData.ThemeId);
                this.getView().getModel("viewModel").setProperty("/Title", oData.Title);
                this.getView().getModel("viewModel").setProperty("/Description", oData.Description);
                this.getView().getModel("viewModel").setProperty("/Owner", oData.Owner);
                this.getView().getModel("viewModel").setProperty("/Status", oData.Status);
                this.getView().getModel("viewModel").setProperty("/CreationDate", oData.CreationDate);
                */
                this.getOwnerComponent().getRouter().navTo('RouteDetails', {
                    id: oData.ThemeId,
                })
            },

            onSortPress: function () {
                this._bDesc = !this._bDesc;
                let oList = this.byId("idListThemes");
                let oBinding = oList.getBinding('items');
                let oSorter = new Sorter({
                    path: "ThemeId",
                    descending: this._bDesc
                });
                oBinding.sort(oSorter);
            },

            onSearch: function (oEvent) {
                let sValue = oEvent.getParameter('query');
                let oList  = this.byId("idListThemes");
                let oBinding = oList.getBinding('items');
                let oFilter = new Filter({
                    path: 'Title',
                    operator: 'Contains',
                    value1: sValue
                });
                oBinding.filter(oFilter);
            }

        });
    });
