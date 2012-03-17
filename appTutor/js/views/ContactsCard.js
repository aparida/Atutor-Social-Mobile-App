/*VideosCard.js*/Ext.ns("Atutor.views");

Atutor.views.ContactsCard = Ext.extend(Ext.Panel, {
    layout: 'fit'
    ,initComponent: function() {
	
        var toolbarBase = {
            xtype: 'toolbar',
            title: 'Contacts',
            ui: 'light',
			items:[{
                    xtype: "spacer",
                    flex: 1
                }, {
                    ui: "button",
                    iconCls: "team",
                    iconMask: true,
					text: "Groups",
                    scope: this,
                    handler: function () {
                     //
                    }
                }]
        };
        

	
        this.dockedItems = 	toolbarBase;

    	this.store = new Ext.data.Store({
		    model: 'Users',
		    storeID: 'users',
	     	sorters: 'displayName',
		    getGroupString : function(record) {
			        return record.get('displayName')[0];
			    }
		});
    	
    	this.contactsList = new Ext.List({
			grouped: true
            ,indexBar: true
    		,store: this.store
    		,loadingText: 'Loading Contacts'
    		,disableSelection: true
    		,scroll: 'vertical'
        	,itemTpl: '<strong>{displayName}</strong>&nbsp;User ID : {id}<br/> <a href="http://atutor.ca/atutor/demo/mods/_standard/social/sprofile.php?id={id}">Link </a> '
        	,onItemDisclosure: Ext.emptyFn
			,listeners: {
        		scope: this
        		,afterrender: {
        			single: true
        			,fn: function(){
        				this.store.load();
			    	}
			    }
			    
			    ,itemtap: function(list, index, item, ev) {
			    	var record = list.store.getAt(index);
			    	
			    	var article = new Atutor.views.ArticleCard({
		    			record: record
		    			,prevCard:  this.contactsList
					    	});
			    	
			    	this.setActiveItem(article, {
			    		type: 'slide'
			    		,scope: this
			    		,after: function() {
			    			this.contactsList.getSelectionModel().deselectAll();
			    		}
			    	});
			    }
        	}
        });
    	
				
		this.items = [this.contactsList];
		
        Atutor.views.ContactsCard.superclass.initComponent.apply(this, arguments);
        
        this.on('activate', function() {
        	this.store.load();
        }, this, {single: true});
    }
    
});


Ext.reg('contacts', Atutor.views.ContactsCard);
