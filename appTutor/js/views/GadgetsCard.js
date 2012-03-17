/*VideosCard.js*/Ext.ns("Atutor.views");

Atutor.views.GadgetsCard = Ext.extend(Ext.Panel, {
    layout: 'fit',
  html: '<p style="padding: 50px 0 0 0;text-align:center;font-size: 30px;color: #cccccc;font-weight:bold;">Coming Soon</p><br/><br/><p style="text-align:center;font-size: 18px;color: #cccccc;" >This allows you to access all the Gadgets installed and  check the app data settings.</p>'
    ,initComponent: function() {
    	
        var toolbarBase = {
            xtype: 'toolbar',
            title: 'My Gadgets',
            // ui: 'light',
			 items: [
				// {
				//                     ui: "button",
				//                     iconCls: "refresh",
				//                     iconMask: true,
				//  					scope: this,
				//                     handler: function () {}
				//                         
				//                        
				//                 },
				// 			{
				//                     xtype: "spacer",
				//                     flex: 1
				//                 }, {
				//                     ui: "button",
				//                     iconCls: "action",
				//                     iconMask: true,
				//                     scope: this,
				//                     handler: function (a, b) {
				//                         Ext.dispatch({
				//                             controller: "activity",
				//                             action: "add",
				//                             prevCard: this.wrapper,
				//                             parent: this
				//                         })
				//                     }
                // }
]
        };
        
        this.dockedItems = toolbarBase;

    	// this.store = new Ext.data.JsonStore({
    	// 	    model: 'Gadgets',
    	// 	    storeID: 'gadgets'
    	// 	});
    			// 	
    			//     	this.gadgetsList = new Ext.List({
    			// 
    			//     		store: this.store,
    			//     		loadingText: 'Loading Gadgets',
    			//     		disableSelection: true,
    			//     		scroll: 'vertical',
    			// // html: '<p>Coming Soon</p>'
    			//         	itemTpl: '<strong>{description}</strong>'
    			// 
    			//         });
    			//     	
				
		
            
          
            
       
		
        Atutor.views.GadgetsCard.superclass.initComponent.apply(this, arguments);
        
        // this.on('activate', function() {
        //    	this.store.load();
        //    }, this, {single: true, delay: Atutor.loadDelay});
    }
    
});


Ext.reg('gadgets', Atutor.views.GadgetsCard);
