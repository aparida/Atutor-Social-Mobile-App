/*VideosCard.js*/Ext.ns("Atutor.views");

Atutor.views.ContactCard = Ext.extend(Ext.Panel, {
    layout: 'fit'
    ,initComponent: function() {
    	
        var toolbarBase = {
            xtype: 'toolbar',
            title: 'Contacts',
            // ui: 'light',
			 items: [{
                    xtype: "spacer",
                    flex: 1
                }, {
                    ui: "button",
                    // iconCls: "delete",
					text: "Groups",
                    iconMask: true,
                    scope: this,
                    handler: function () {
						       // Ext.dispatch({
						       // 			                                     controller: "auth",
						       // 			                                     action: "login"
						       // 			                                     })        
							 
								alert('1');
								new tutor.panel.Groups().show('pop');	
						                
						                       }
                }]
        };
        
        this.dockedItems = toolbarBase;

    	this.store = new Ext.data.Store({
		    model: 'Users',
		    storeID: 'users',
			sorters: 'displayName',
		    getGroupString : function(record) {
			        return record.get('displayName')[0];
			    },
			proxy: {
		        type: 'ajax',
		        url :  tutor.url +  '/shindig/php/social/rest/people/'+ tutor.badgeText + '/@all',
		        reader: {
		            type: 'json',
		            root: 'entry'
		        }
		    }
		});
    	
    	this.ContactList = new Ext.List({
			grouped: true,
            indexBar: true,
    		store: this.store,
    		loadingText: 'Loading Contacts',
    		disableSelection: true,
    		scroll: 'vertical',
        	itemTpl: '<strong>{displayName}</strong><br/>User ID : {id} &nbsp; <a href="http://atutor.ca/atutor/demo/mods/_standard/social/sprofile.php?id={id}">Link </a> ',
        	
			
        });
    	
				
		this.items = [this.ContactList];
		
        Atutor.views.ContactCard.superclass.initComponent.apply(this, arguments);
        
        this.on('activate', function() {
        	this.store.load();
        }, this, {single: true});
    }
    
});


Ext.reg('contact', Atutor.views.ContactCard);
