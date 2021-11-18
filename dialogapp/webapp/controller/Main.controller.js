sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("ns.dialogapp.controller.Main", {
			onInit: function () {
/*
                let oModel = new JSONModel({
                    ThemeId: "",
                    Title: "",
                    Description: "",
                    Owner: "",
                    Status: "",
                    CreationDate: ""
                });
                this.getView().setModel(oModel, "viewModel");
*/                
			}
		});
	});
