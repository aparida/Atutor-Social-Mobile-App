Ext.setup({
	name: 'tutor',
	statusBarStyle: 'black',
    tabletStartupScreen: 'img/startup.png',
    phoneStartupScreen: 'img/startup.png',
    icon: 'img/startup.png',
    glossOnIcon: false,
    fullscreen: true,
	statusBarStyle: "black",
	onReady: function() {
		var app = new Ext.TabPanel({
			fullscreen: true,
            animation: false,
            tabBar: {
                dock: 'bottom',
                layout: { pack: 'center' }
            },
            items: [
               //tobe filled
            ],
            listeners: {
               
            }
		});
		
		
		//----------TabPanel------Ends
		
	
		new tutor.views.Login();
		
		Ext.data.user = Ext.ModelMgr.create({}, "Users");
		
	}
	
	
	
});