/*
 * Licensed Materials - Property of IBM
 *
 * 5725-M39
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define("platform/ui/widget/NotificationModal",
	[
	"dojo/_base/declare",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dojo/text!js/platform/ui/widget/templates/PushNotificationModal.html",
	"platform/translation/MessageService",
	"dojo/on",
	"dojo/touch",
	"dojo/dom-style",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"platform/util/XSSSanitizer"],
    function(declare, _WidgetBase, _TemplatedMixin, modalTemplate, MessageService, on, touch, domStyle, lang, domAttr, XSSSanitizer){
        return declare([_WidgetBase, _TemplatedMixin], {
        
        	title: "No Data",
        	description:"No Description",
        	Next: MessageService.createStaticMessage('pushModalNext').getMessage(),
        	Open: MessageService.createStaticMessage('pushModalOpen').getMessage(),
        	Dismiss: MessageService.createStaticMessage('pushModalDismiss').getMessage(),

        	nextAction:null,
        	openAction:null,
        	dismissAction: null,
        	closeAction: null,
        	parentControl: null,

        	templateString: modalTemplate,

        	baseClass: "notificationsModal",

        	constructor: function(props){
        		this.nextAction = props.nextAction;
        		this.openAction = props.openAction;
        		this.dismissAction = props.dismissAction;
        		this.closeAction = props.closeAction;

        		this.parentControl = props.parentControl;
        	},

        	_setTitleAttr: function(title) {
			    if (title != "") {
			    	title = XSSSanitizer.sanitizeValue(title);
			        this._set("title", title);
			        this.titleNode.children[0].innerHTML = title;
			    }else{
			    	this._set("title", "No Data");
			        this.descriptionNode.children[0].innerHTML = MessageService.createStaticMessage('pushModalNoData').getMessage();
			    }
			},

			_setDescriptionAttr: function(description) {
			    
			    if (description != "") {
			    	description = XSSSanitizer.sanitizeValue(description);
			        this._set("description", description);
			        this.descriptionNode.children[0].innerHTML = description;
			    }else{
			    	this._set("description", "No Data");
			        this.descriptionNode.children[0].innerHTML = MessageService.createStaticMessage('pushModalNoData').getMessage();
			    }
			},

			disableNextButton: function(){
				domAttr.set(this.NextButtonNode, 'disabled', 'disabled');
			},

			enableNextButton: function(){
				domAttr.remove(this.NextButtonNode, "disabled");


			},

			enableOpenButton: function(){
				domAttr.remove(this.OpenButtonNode, "disabled");
			},

			disableOpenButton: function(){
				domAttr.set(this.OpenButtonNode, 'disabled', 'disabled');
			},

			postCreate: function(){

			    this.inherited(arguments);

			    this.own(
					on(this.CloseButtonNode, touch.press, lang.hitch(this, "_closePushModal")),
					on(this.NextButtonNode, touch.press, lang.hitch(this, "_nextPushRecord")),
					on(this.DismissButtonNode, touch.press, lang.hitch(this, "_dismissRecord")),
					on(this.OpenButtonNode, touch.press, lang.hitch(this, "_openRecord"))
			    )
			},

			show: function(recordSet, disableOpenButton){
				
				if(recordSet.count() === 0)
					return

				if(recordSet.count() > 1){
					this.enableNextButton();
				}else if(recordSet.count() === 1){
					this.disableNextButton();
				}

				if(disableOpenButton){
					this.disableOpenButton();
				}else{
					this.enableOpenButton();
				}
				
				this._setPushContents(recordSet.getCurrentRecord());
			},


			_setPushContents: function(record){
				if(!record)
					return;

				this.set('title', record.title);
				this.set('description', record.description);
			},

			_closePushModal: function(){
				if(this.closeAction)
					return this.closeAction(this);
			},

			_nextPushRecord: function(){
				if(domAttr.get(this.NextButtonNode, 'disabled') === true)
					return;
				if(this.nextAction)
					return this.nextAction(this);
			},

			_dismissRecord: function(){
				if(this.dismissAction)
					return this.dismissAction(this);
			},

			_openRecord: function(){
				if(domAttr.get(this.OpenButtonNode, 'disabled') === true)
					return;
				if(this.openAction)
					return this.openAction(this);
			}

        });
});
