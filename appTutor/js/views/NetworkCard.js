/*VideosCard.js*/Ext.ns("Atutor.views");

Atutor.views.NetworkCard = Ext.extend(Ext.Panel, {
    layout: 'fit'

    ,initComponent: function() {
    			 	
    		    			         var toolbarBase = {
    		    			             xtype: 'toolbar',
    		    			             title: 'My Network',
    		    			             // ui: 'light',
    		    			 items: [{
    		    			                     xtype: "spacer",
    		    			                     flex: 1
    		    			                 }, {
    		    			                     ui: "button",
    		    			 					text: "Logout",
    		    			                     // iconCls: "action",
    		    			                     iconMask: true,
    		    			                     scope: this,
    		    			                     handler: function (a, b) {
    		    			 							
    		    			 							this.destroy();
    		    			 							Ext.Ajax.request({
    		    			 								url: 'http://atutor.ca/atutor/demo/logout.php', 
    		    			 								method: 'GET',
    		    			 								scope: this
    		    			 							});
    		    			 							
    		    			                         Ext.dispatch({
    		    			                             controller: "auth",
    		    			                             action: "logout",
    		    			                          
    		    			                         })
    		    			                     }
    		    			                 }]
    		    			         };
    		    			         
    		    			         this.dockedItems = toolbarBase;
    		
    	this.store = new Ext.data.Store({
		    model: 'Activity',
		    storeID: 'activity',
			proxy: {
		        type: 'ajax',
		        url :  tutor.url +  '/shindig/php/social/rest/activities/'+ tutor.badgeText + '/@friends',
		        reader: {
		            type: 'json',
		            root: 'entry'
		        }
		    }
		});
    	// this.store.load();
    	this.NetworkList = new Ext.List({
			
    		store: this.store,
    		loadingText: 'Loading Activity',
    		disableSelection: true,
    		scroll: 'vertical',
        	itemTpl: '<a  href="http://atutor.ca/atutor/demo/mods/_standard/social/sprofile.php?id={userId}">{userId}</a><strong> {title}</strong><br>{postedTime}',
        	
			plugins: [{
                ptype: 'listpaging',
                autoPaging: false
            }, {
                ptype: 'pullrefresh'
            }]
        });
    	
				
		this.items = [this.NetworkList];
		
        Atutor.views.NetworkCard.superclass.initComponent.apply(this, arguments);
        
        this.on('activate', function() {
                     	this.store.load();
                     }, this, {single: true});
    }
    
});


Ext.reg('networkcard', Atutor.views.NetworkCard);
