sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "ns/dialogapp/model/formatter",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, formatter, MessageBox) {
		"use strict";

		return Controller.extend("ns.dialogapp.controller.Main", {

            formatter: formatter,

			onInit: function () {

                let oModel = new JSONModel({
                    ThemeId: "",
                    Title: "",
                    Description: "",
                    Owner: "",
                    Status: "",
                    CreationDate: ""
                });
                this.getView().setModel(oModel, "viewModel");
                
            },
            
            onSelectionChange: function(oEvent){

                let oItem = oEvent.getSource().getSelectedItem();
                let sPath = oItem.getBindingContext().getPath();
                let oData = this.getView().getModel().getProperty(sPath);
                this.getView().getModel("viewModel").setProperty("/ThemeId", oData.ThemeId);
                this.getView().getModel("viewModel").setProperty("/Title", oData.Title);
                this.getView().getModel("viewModel").setProperty("/Description", oData.Description);
                this.getView().getModel("viewModel").setProperty("/Owner", oData.Owner);
                this.getView().getModel("viewModel").setProperty("/Status", oData.Status);
                this.getView().getModel("viewModel").setProperty("/CreationDate", oData.CreationDate);

            },

            onCreatePress: function(){

                let sPath = "/ThemeSet";
                let oEntry = this.getView().getModel("viewModel").getProperty("/");
                let oParameters = {
                    success: function(){
                        MessageBox.show('Created');
                    }.bind(this),
                    error: function(){
                        MessageBox.show('Error by create');
                    }.bind(this)
                };
                this.getView().getModel().create(sPath, oEntry, oParameters);

            },

            onUpdatePress: function(){

                let oItem = this.getView().byId("idListThemes").getSelectedItem();
                let sPath = oItem.getBindingContext().getPath();
                let oEntry = this.getView().getModel("viewModel").getProperty("/");
                let oParameters = {
                    success: function(){
                        MessageBox.show('Updated');
                    },
                    error: function(){
                        MessageBox.show('Error by update');
                    }
                };
                this.getView().getModel().update(sPath, oEntry, oParameters);


            },

            onDeletePress: function(){

                let oItem = this.getView().byId("idListThemes").getSelectedItem();
                let sPath = oItem.getBindingContext().getPath();
                let oParameters = {
                    success: function(){
                        MessageBox.show('Deleted');
                    },
                    error: function(){
                        MessageBox.show('Error by delete');
                    }
                };
                this.getView().getModel().remove(sPath, oParameters);    
            }


		});
	});
