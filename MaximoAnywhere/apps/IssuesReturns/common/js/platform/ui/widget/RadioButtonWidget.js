/*
 * Licensed Materials - Property of IBM
 * "Restricted Materials of IBM"
 *
 * 5725-M39
 *
 * (C) COPYRIGHT IBM CORP. 2013,2020 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp. 
 *
 */

define("platform/ui/widget/RadioButtonWidget", 
	[	"dojo/_base/declare",
	 	"platform/ui/widget/_domWidget",
        "dojo/dom-class",
	 	"dojo/dom-construct",
	     "dojo/dom-attr",
	 	"dojo/_base/lang",
	 	"dojo/query", "dojo/NodeList-dom" ], 
function(declare, domWidget, domClass, domConstruct, domAttr, lang, query){
	return declare( domWidget, {
 		
		domElement: null,
		control: null,
		
		constructor : function(options) {
			this._widgetType = 'RadioButton';
			this.fieldId = '';
			lang.mixin(this, options);
			if(this.control) {
				this.fieldId = this.control.fieldId;
			}
		},
		
/**@memberOf platform.ui.widget.Label */
		build: function() {
			if(this.control) {
				
				this.domElement = domConstruct.create("div",{
					id: this.getId() + '_Radiobutton_div',
					'class': 'radioButtonCtrl ' + ('' + ((this['cssClass'])?this['cssClass']:''))

				});

				this.labelElement = domConstruct.create("label", {
					'style': 'width: 100%'
				});

				var inputElementOptions =  {
					id : this.getId() + '_radiobutton',
        			type: 'radio',
        			value: this.value,
        			name: this.name,
        			'style' : this.style
        		}

        		if(this.checked)
        			inputElementOptions.checked = "checked";

				this.inputElement = domConstruct.create("input", inputElementOptions);
	            
	            
        		this.spanElement = domConstruct.create("span", {
        			innerHTML: this.label.textMsg,
        			'style': 'width:100%'
        		});
        			
        		domConstruct.place(this.labelElement, this.domElement, 'first');
	            domConstruct.place(this.inputElement, this.labelElement, 'first');
	            domConstruct.place(this.spanElement, this.labelElement, 'last');
	            
	            if(this.role){
	            	domAttr.set(this.inputElement,'role',this.role);
	            }
			}
	    	return this.inherited(arguments);
		},
		
		setReadOnly : function(readOnly){
			if(readOnly){
				domClass.remove(this.domElement,'editableLabel');
				domClass.add(this.domElement,'nonEditableLabel');		
			}
			else{
				domClass.remove(this.domElement,'nonEditableLabel');
				domClass.add(this.domElement,'editableLabel');		
			}
		},
		
		setRequired : function(required){
			query(".requiredLabel", this.domElement).style("display", required?'inline':'none');
            if(required){
            	domClass.add(this.domElement, 'requiredControl');
            }
            else {
                domClass.remove(this.domElement, 'requiredControl');
            }
		},
		
		destroy: function(){
			this.control = null;
			if (this.domElement){
				domConstruct.destroy(this.domElement);
				this.domElement = null;
			}
		}
		
	});
});
