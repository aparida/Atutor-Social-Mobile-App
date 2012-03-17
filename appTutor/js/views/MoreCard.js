/*VideosCard.js*/Ext.ns("Atutor.views");

Atutor.views.MoreCard = Ext.extend(Ext.Panel, {
    layout: 'fit'
    ,initComponent: function() {
    	
    
        var toolbarBase = {
            xtype: 'toolbar',
            title: 'ATutor Info',
            ui: 'light',
			 items: [
				{
                    ui: "button",
                    iconCls: "info",
                    iconMask: true,
 					scope: this,
                    handler: function () {}      
                },
				{
                    xtype: "spacer",
                    flex: 1
                }, {
                    ui: "button",
                    
                    iconMask: true,
					text: "Logout",
                    scope: this,
                    handler: function (a, b) {
                        Ext.dispatch({
                            controller: "activity",
                            action: "add",
                            prevCard: this.wrapper,
                            parent: this
                        })
                    }
                }]
        };
        
        this.dockedItems = toolbarBase;

    	this.store = new Ext.data.Store({
		    model: 'More',
		    storeID: 'more',
		    getGroupString : function(record) {
			        return record.get('head').toString() ;
			    }
		});
    	
 	

    	this.MoreList = new Ext.List({
			grouped: true,
    		store: this.store,
    		loadingText: 'Loading More',
    		disableSelection: true,
    		scroll: 'vertical',
        	itemTpl: '<strong>{description}</strong>'

        });
    	
				
		this.items = [this.MoreList];
		
        Atutor.views.MoreCard.superclass.initComponent.apply(this, arguments);
        
        this.on('activate', function() {
        	this.store.load();
        }, this, {single: true, delay: Atutor.loadDelay});
    }
    
});


Ext.reg('more', Atutor.views.MoreCard);
