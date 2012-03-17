tutor.views.MoreSettings = Ext.extend(Ext.form.FormPanel, {
    id: "moresettings",
    initComponent: function () {
	
	
		var mystore =  new Ext.data.Store({
			    model: 'Users',
			    storeID: 'users',
				proxy: {
			        type: 'ajax',
			        url :  tutor.myurl + '/shindig/php/social/rest/people/'+ tutor.badgeText + '/@self',
			        reader: {
			            type: 'json',
			            root: 'entry'
			        }
			    }
			});
		
		
        this.toolbar = new Ext.Toolbar({
            title: "settings",
			store: mystore,
            items: [{
                ui: "back",
                text: "Back",
                scope: this,
                handler: function () {
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: "slide",
                        reverse: true,
                        scope: this,
                        after: function () {
                            this.destroy()
                        }
                    })
                }
            }]
        });

	
        Ext.apply(this, {
            scroll: "vertical",
			store: mystore,
            defaults: {
                xtype: "fieldset",
                defaults: {
                    labelWidth: "35%"
                }
            },
            listeners: {
                beforesubmit: function (b, a) {
                    Ext.dispatch({
                        controller: "more",
                        action: "settingsAction",
                        form: b,
                        values: a
                    });
                    return false
                }
            },
            items: [{
                instructions: " Account settings. Please check your Name,  password and User Id.",
                items: [{
                    xtype: "textfield",
                    name: "displayname",
                    label: "Userame",
					value: tutor.username,
                    // value: mystore.getById("displayName").data,

                    // placeHolder: Ext.data.auth.get("user").username,
                    autoCapitalize: false,
                    useClearIcon: true
                }, {
                    xtype: "textfield",
                    name: "password",
                    label: "Password",
					value: tutor.mypassword,
                    useClearIcon: true
                }, {
	                xtype: "textfield",
                   	name: "memberid",
                   	label: "User ID",
                    value: tutor.badgeText,
                   	autoCapitalize: false,
                   	useClearIcon: true
	                }]
            },  {
                instructions: "Please enter your the URL on which Atutor is hosted.",
                items: [{
                    xtype: "textfield",
                    name: "baseurl",
                    label: "Base URL",
					value: tutor.myurl,
                    useClearIcon: true
                }]
            }, {
                xtype: "button",
                text: "Save settings",
                scope: this,
                formBind: true,
                handler: function (a) {
                    this.submit()
                }
            }],
            dockedItems: [this.toolbar]
		
			
        });
				// alert(this.toolbar.store.get("displayName"));
        tutor.views.MoreSettings.superclass.initComponent.call(this)
    }
});
Ext.reg("morecard", tutor.views.MoreSettings);