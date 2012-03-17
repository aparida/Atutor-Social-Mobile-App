/*AppViewport.js*/Ext.ns('Jarvus.mobile');

Jarvus.mobile.AppViewport = Ext.extend(Ext.Panel, {
	
	fullscreen: true
	,layout: 'card'

	,initComponent: function() {

		if(navigator.onLine)
		{			
			this.dockedItems = this.buildDocks();
		
			this.items = this.buildItems();
		}
		else
		{
			this.on('render', function() {
				this.el.mask('A network connection is required to use this app.', 'offline-msg');
			}, this);
		}
	
		Jarvus.mobile.AppViewport.superclass.initComponent.apply(this, arguments);
	}
	
	,afterRender: function() {
		Jarvus.mobile.AppViewport.superclass.afterRender.apply(this, arguments);
		
		this.tabBar.on('change', this.onTabChange, this);
		
		this.onViewportRender();
	}
	
	
	,onViewportRender: function() {
	
	}
	
	
	,buildDocks: function() {
	
		this.tabBar = this.buildTabBar();
		
		return [
			this.tabBar
		];
	}
	
	,buildTabBar: function() {
		return new Ext.TabBar({
			dock: 'bottom'
			,layout: {
				pack:'center'
			}
			,ui: 'dark'
			,defaults: {
				iconMask: true
			}
			,items: [{
				text: 'Home'
				,itemId: 'home'
				,iconCls: 'home'
				,cardType: 'home'
			},{
				text: 'Search'
				,itemId: 'search'
				,iconCls: 'search'
				,cardType: 'search'
			}]
		});
	}
	
	,buildItems: function() {
		return [];
	}
	
	,goHome: function() {
	
		this.loadCard('home');
	}
	
	,showNav: function() {
		this.addDocked(this.tabBar);
	}
	
	,hideNav: function() {
		this.removeDocked(this.tabBar, false);
	}
	
	,onTabChange: function(tabBar, tab, card) {
		
		if(tab.getEl().hasCls('x-tab-active'))
		{
			// click was on already active tab, tell panel to goHome
			this.items.get(0).fireEvent('goHome');
		}
		else
		{
			this.loadCard(tab.cardType ? tab.cardType : {html: 'This tab is not yet implemented', navSection: tab.itemId});
		}
	}
	
	,markActiveTab: function(tab) {
		tab.getEl().radioCls('x-tab-active');
		this.activeTab = tab;
		this.activeTabIndex = this.tabBar.items.indexOf(tab);
	}
	
	,unmarkTabs: function() {
		if(this.activeTab)
		{
			this.activeTab.removeCls('x-tab-active');
			this.activeTab = null;
			this.activeTabIndex = null;
		}
	}
	
	,loadCard: function(card, options) {
	
		options = Ext.apply({
			animate: 'slide'
			,reverse: false
			,prune: true
		}, options || {});
	
		if(typeof card == "string")
			card = {xtype: card};
		
		// insantiate card
		var nextCard = Ext.create(card, 'panel');

		// detect tab change
		var nextTab = this.tabBar.items.findBy(function(tab) {
			return (tab.itemId == nextCard.navSection);
		}, this);
		
		if(nextTab)
		{
			if(nextTab != this.activeTab)
			{
				options.reverse = (this.tabBar.items.indexOf(nextTab) <= this.activeTabIndex);
				this.markActiveTab(nextTab);
			}
		}
		else
			this.unmarkTabs();
			
		
		var cardLoaded = Ext.createDelegate(function() {
			if(options.prune)
				this.pruneCards();
		}, this);
			
		if(options.animate)
		{
			this.setActiveItem(nextCard, {
				type: options.animate
				,reverse: options.reverse
				,after: cardLoaded
			});
		}
		else
		{
			this.setActiveItem(nextCard);
			Ext.defer(cardLoaded, 50);
		}
	}
	
	,pruneCards: function() {
		while(this.items.length > 1)
		{
			//console.info('pruning: %o', this.items.get(0));
			this.remove(this.items.get(0));			
		}
	}
		

});
