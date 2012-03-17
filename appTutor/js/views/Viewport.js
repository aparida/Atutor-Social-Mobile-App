/*Viewport.js*/Ext.ns("Atutor.views");
 

Atutor.views.Viewport = Ext.extend(Ext.TabPanel, {
    id        : 'viewport'
    ,layout    : 'card'
	,fullscreen: true
	,activeItem	: 0
	,cardSwitchAnimation: 'slide'
	,tabBar: {
		dock: 'bottom'
		,cls: 'mainNav'
		,layout: {pack:'center'}
		,ui: 'dark'
		,defaults: {
			iconMask: true
		}
	}
    ,initComponent: function() {
      
      	this.items = [{
			xtype: 'activity'
			,itemId: 'landing'
			,iconCls: 'rss'
			,title: 'Activity'
		},{
			xtype: 'contacts'
			,itemId: 'poll'
			,iconCls: 'bookmarks'
			,title: 'Contacts'
		},{
			xtype: 'gadgets'
			,itemId: 'store'
			,iconCls: 'settings'
			,title: 'Gadgets'
		},{
			xtype: 'draft'
			,itemId: 'draft'
			,iconCls: 'user_fave'
			,title: 'Profile'
		},
		{
			xtype: 'login'
			,itemId: 'feed'
			,iconCls: 'more'
			,title: 'More'
		},
		
		];


       Atutor.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});


