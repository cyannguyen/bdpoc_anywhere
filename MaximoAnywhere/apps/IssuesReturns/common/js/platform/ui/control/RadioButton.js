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

define("platform/ui/control/RadioButton",
	   [ "dojo/_base/declare",
	     "platform/ui/control/_ControlBase",
	     "platform/ui/control/_StatefulControlMixin",
	     "platform/ui/control/_BoundControlMixin",
	     "dijit/layout/ContentPane",
	     "platform/ui/widget/RadioButtonWidget",
	     "platform/ui/widget/Label",
	     "dojo/_base/lang",
	     "dojo/_base/array",
	     "dojo/on",
	     "dojo/touch",
	     "dojo/_base/event",
	     "dojo/dom-construct",
	     "dojox/mvc/at",
	     "dojox/gesture/tap",
	     "dojo/dom-construct"
	     ],
function(declare, ControlBase, StatefulControlMixin, BoundControlMixin, ContentPane, RadioButton, Label, lang, array, on, touch, event, domConstruct, at, tap, domConstruct) {
	return declare( [ ControlBase, BoundControlMixin, StatefulControlMixin ], {
    	editable: true,
    	value: '',
    	button: null,
    	label: null,
    	type: 'boolean',
    	focusNode: null,
    	radiobutton: null,
    	labelObject: null,
    	labelElement: null,
    	name:null,
    	
		constructor : function(options) {
			this._controlType = 'RadioButton';
			this.style = 'display: inline;';
		},

/**@memberOf platform.ui.control.RadioButton */
		build: function(){
//			summary:
//				build the control
//
//			description:
//				This is where we setup all internals and create any widgets

			this.binding();

			if(this.type!='boolean'){
				this.application.log(this._controlType+' must be bound to a boolean resource attribute.',0);
			}
			
			this.baseWidget = this.createWidget(ContentPane, {
				'class': 'leafControl radioButtonPane',
			});
			
			

            if (this['labelCss']) {
                this.labelClassName = this['labelCss'];
            }

			this.radiobutton = this.createWidget(RadioButton, {
				control: this,
				id: this.getId(),
				checked: (this.bound && this.validBinding)? this._attributeAsBindable(this.resourceAttribute) : this.getProperty(this.value).toLowerCase == 'true',
				name: this.name,
				label: this.label,
				'cssClass': ' ' + ((this['cssClass'])?this['cssClass']:'')
				
			}).build();
			
			this.focusNode = this.radiobutton;
			
			if (this.bound && this.validBinding) {
				if(!this.editable){
					this._setReadOnly(!this.editable); //if this was intentionally set in xml, use it
				}
				else{
					this._setReadOnly(this.getCurrentRecord().getRuntimeFieldMetadata(this.resourceAttribute).readonly);
				}
            }

			if (this.bound && this.validBinding) {
				if(!this.editable){
					this._setReadOnly(!this.editable); //if this was intentionally set in xml, use it
				}
				else{
					this._setReadOnly(this.getCurrentRecord().getRuntimeFieldMetadata(this.resourceAttribute).readonly);
				}
            }

			//Need to suppress this tap event to indicate that our widget can handle this
		    //For instance so that if we're on a groupitem
		    //with a transitionto, that that doesn't trigger the transitionto as well
			this.addHandler(on(this.baseWidget, tap, function(e) {
				e.stopPropagation();
			}));
			
			

			domConstruct.place(this.radiobutton,this.baseWidget.domNode, 'first' );
			return this.inherited(arguments);
		},
		
		getValue: function(){
			return this.radiobutton.get('value');
		},
		
		getLabel: function(){
			return this.label;
		},
		
		postCreate: function() {
//			summary:
//				To be implemented by children
//
//			description:
//				Will be called after all controls are built and placed in the DOM
		    this.inherited(arguments);
		},
		
	    _setReadOnly : function(readOnly){
	    	
	    },
	    
        destroy: function () {
            this.inherited(arguments);
        	this.focusNode = null;
        	this.radiobutton = null;
        	if(this.labelObject){
        		this.labelObject.destroy();
            	this.labelObject = null;
        	}
        	this.labelElement = null;
        },
		
	});
});
