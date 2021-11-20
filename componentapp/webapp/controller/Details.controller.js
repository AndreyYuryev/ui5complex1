sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ns/componentapp/model/formatter",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, formatter, MessageBox) {
		"use strict";

		return Controller.extend("ns.componentapp.controller.Details", {

            formatter: formatter,

			onInit: function () {
                this.getOwnerComponent().getRouter().getRoute('RouteDetails').attachPatternMatched(this.onPatternMatched, this);

            },

            onPatternMatched: function (oEvent) {
                this.arguments = oEvent.getParameter('arguments');
                this.getView().bindElement(this.getView().getModel().createKey('/ThemeSet', { ThemeId: this.arguments.id }));

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
                let oBindingContext = this.getView().getBindingContext();
                let sPath = oBindingContext.getPath();
                let oEntry = oBindingContext.getObject();
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
                let sPath = this.getView().getBindingContext().getPath();
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