tutor.views.MusicFest = Ext.extend(Ext.Panel, {
    initComponent: function () {
       
        var a = new Ext.TabPanel({
            id: "viewport",
            cardSwitchAnimation: "fade",
            fullscreen: true,
            layout: "hbox",
      
            listeners: { },
            tabBar: {
                ui: "gray",
                dock: "bottom",
                layout: {
                    pack: "center"
                }
            },
            items: [{
                xtype: "activity",
                title: "Activity",
                iconCls: "chat3",
                historyUrl: "activity/list"
            },{
	           xtype: "networkcard",
               title: "Network",
               iconCls: "team",
               historyUrl: "friend/list"
	        },{
                xtype: "contact",
                title: "Contacts",
                iconCls: "bookmarks",
                historyUrl: "friend/list"
            }, {
	             	xtype: "gadgets",
	               title: "Gadgets",
				
	               iconCls: "settings",
	               historyUrl: "schedule/list"
	            }, {
                xtype: "morecard",
                title: "More",
                iconCls: "more",
                historyUrl: "more/index"
            }]
        });
        Ext.apply(this, {
            items: a
        });
        tutor.views.MusicFest.superclass.initComponent.call(this)
    }
});
Ext.reg("tutor.views.MusicFest", tutor.views.MusicFest);
