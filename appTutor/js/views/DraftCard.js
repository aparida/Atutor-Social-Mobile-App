/*DraftCard.js*/Ext.ns("Atutor.views");

Atutor.views.DraftCard = Ext.extend(Ext.TabPanel, {
    
	autoRefreshSeconds: 300
	
	,layout: 'fit'
    ,cardSwitchAnimation: (Ext.is.iOS || Ext.is.Desktop) ? 'flip' : false
    ,tabBar: {
		dock: 'top'
		,layout: {pack:'center'}
		,ui: 'light'
		,defaults: {
			iconMask: true
		}
	}
	
	
    ,initComponent: function() {
    	
    	this.seenPicks = 0;
    	
		this.prospectsStore = new Ext.data.Store({
		    model: 'Prospect'
		    ,storeID: 'prospects'
			,pageSize: false
		    ,getGroupString : function(record) {
		        return 'Round #' + record.get('ProjRoundNo').toString();
		    }
			,filters: [{
				property: 'Position'
				,value: 'QB'
			}]
		});
		
		this.picksStore = new Ext.data.Store({
		    model: 'Pick'
		    ,storeID: 'pick'
			,pageSize: false
		    ,listeners: {
		    	scope: this
		    	,load: this.onPicksLoaded
		    }
		    ,getGroupString : function(record) {
		        return 'Round #' + record.get('RoundNo').toString();
		    }	
		    
		});
		
         
		this.liveDraft = new Ext.List({
    		title:'Basic Profile'
    		//,loadingText: 'Loading picks'
    		,cls:'liveDraft'
    		,store: this.picksStore
			,grouped: true
			,disableSelection: true
			,deferEmptyText: false
    		
    		,itemCls: 'draftItem'
    		,itemTpl: []
        	,listeners: {
        		scope: this
        		,activate: {
        			delay: Atutor.loadDelay
        			,fn: function() {
        				this.markSeen();
        			}
        		}
         		,refresh: {
         			delay: Atutor.loadDelay
         			,fn: function() {
	         			if(this.picksStore.getCount() == 0)
	         			{
	         				this.countdownDays = Ext.get('countdown-days');
	         				this.countdownHours = Ext.get('countdown-hours');
	         				this.countdownMinutes = Ext.get('countdown-minutes');
	         				this.countdownSeconds = Ext.get('countdown-seconds');
	         				
	         				this.initCountdown();         				
	         			}
	         			else
	         			{
	         				this.disableCountdown();
	         			}
         			}
         		}
        	}
         });
		
		
		this.prospectsList = new Ext.Panel({
            layout: 'fit'
            ,dockedItems: [{
	            xtype: 'toolbar'
	            ,dock: 'top'
	            ,ui: 'light'
	            ,items: [{
	                xtype: 'selectfield'
	                ,flex: 1
	                ,name: 'options'
	                ,options: [
	                   
	                ]
	                ,listeners: {
	                	scope: this
	                	,change: function(select, newValue) {
	                	
	                		if(newValue == 'All')
	                		{
	                			this.prospectsStore.clearFilter();
	                		}
	                		else
	                		{
	                			this.prospectsStore.clearFilter(false);
		                		this.prospectsStore.filter('Position', newValue);
		                	}
		                	
		                	this.prospectsList.getComponent('list').scroller.scrollTo({x:0,y:0});
	                	}
	                }
				}]
			}]
			,items: new Ext.List({
	    		itemId: 'list'
	    		,loadingText: 'Loading prospects'
	    		,emptyText: 'No prospects found'
	    		,pressedCls: ''
	    		,grouped: true
	    		,cls:'prospectList'
	    		,store: this.prospectsStore
				,onItemDisclosure: Ext.emptyFn
				,itemCls: 'draftItem'
	        	,itemTpl: []
	        	,listeners: {
	        		scope: this
	        		
			    	,itemtap: function(list, index, item, ev) {
				    	var record = this.prospectsStore.getAt(index);
				    	
				    	var prospect = new Atutor.views.ProspectCard({
			    			record: record
			    			,prevCard:  this.prospectsList
				    	});
				    	
				    	this.prospectsPanel.setActiveItem(prospect, {
				    		type: 'slide'
				    		,scope: this
				    		,after: function() {
				    			this.prospectsList.getComponent('list').getSelectionModel().deselectAll();
				    		}
				    	});
				    }
	        	}
			})
		});
		
		this.prospectsPanel = new Ext.Panel({
            title:'Network Profile'
            ,layout: 'card'
            ,items: this.prospectsList
			,listeners: {
				scope: this
				,activate: {
        			single: true
        			,delay: Atutor.loadDelay
        			,fn: function(){
	        			this.prospectsStore.load();
	        		}
		    	}
			}
        });
		
				
		this.items = [this.liveDraft,this.prospectsPanel];
		
		
		this.on('afterrender', function() {
			
			this.initialDraftsLoadTimeout = Ext.defer(function() {
				this.initialDraftsLoadTimeout = false;
				this.picksStore.load({
					scope: this
					,callback: function() {
						this.startAutoRefresh();
					}
				});
			}, 2000, this);
			
		}, this, {single: true});
		
		this.on('activate', function() {
			if(this.liveDraft.isVisible())
				this.markSeen();
		}, this);
		
		
        Atutor.views.DraftCard.superclass.initComponent.apply(this, arguments);
    }
    
    ,onPicksLoaded: function(store, records, success){
    	
    	if(this.isVisible() && this.liveDraft.isVisible())
    	{
    		this.seenPicks = records.length;
    	}
    	else
    	{
    		this.updateUnseen(records.length);
    	}
	}
    
    ,markSeen: function(newCount) {
		this.seenPicks = newCount || this.picksStore.getCount();
		this.updateUnseen(this.seenPicks);
    }
    
    ,updateUnseen: function(newCount) {
    	newCount = newCount || this.picksStore.getCount();
    	this.ownerCt.getTabBar().items.get(1).setBadge(newCount - this.seenPicks);
    }
    
    
    ,initCountdown: function() {
		if(!this.updateInterval)
		{
			this.updateInterval = setInterval(Ext.createDelegate(this.updateCountdown, this), 1000);
			this.updateCountdown();
		}
	}
    
    ,disableCountdown: function() {
    	if(this.updateInterval)
    	{
        	clearInterval(this.updateInterval);
        	this.updateInterval = false;
    	}
    }
    
    ,updateCountdown: function() {
    	
		//unix timestamp now
		var now = Math.round((new Date()).getTime() / 1000);

		var Seconds = Atutor.draftTime - now;
		if(Seconds <= 0)
		{
			Seconds = 0;
			this.disableCountdown();
		}
		    
	    var Days = Math.floor(Seconds / 86400);
	    Seconds -= Days * 86400;
	
	    var Hours = Math.floor(Seconds / 3600);
	    Seconds -= Hours * (3600);
	
	    var Minutes = Math.floor(Seconds / 60);
	    Seconds -= Minutes * (60);
	    
	    this.countdownDays.dom.innerHTML = Days.toString();
	    this.countdownHours.dom.innerHTML = Hours.toString();
	    this.countdownMinutes.dom.innerHTML = Minutes.toString();
	    this.countdownSeconds.dom.innerHTML = Seconds.toString();
	}
    
    ,startAutoRefresh: function() {
    	if(!this.autoRefreshInterval)
    	{
    		this.autoRefreshInterval = setInterval(
    			Ext.createDelegate(this.picksStore.load, this.picksStore)
    			,this.autoRefreshSeconds * 1000
    		);
    	}
    	
    }
    
});



Ext.reg('draft', Atutor.views.DraftCard);
