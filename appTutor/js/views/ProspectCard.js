/*ProspectCard.js*/Ext.ns("Eagles.views");

Eagles.views.ProspectCard = Ext.extend(Ext.Panel, {
    layout: 'auto'
    ,scroll: 'vertical'
    ,cls: 'ProspectCard'
    ,initComponent: function() {
    	
    	this.dockedItems = [{
    		xtype:'toolbar'
    		,ui: 'light'
    		,items: [
    			{
    				xtype:'button'
    				,ui: 'back'
    				,text:'Prospects'
    				,scope: this
    				,handler: this.goBack
    			}
    		]
    	}];
    	
        this.prospect = new Ext.BoxComponent({
			data: this.record.data
			,tpl: new Ext.XTemplate(
			{
				stripUrl: function(url) {
					url = url.replace(/^https?:\/\/(www\.)?/,"");
					url.toString();
					if(url.substr(0,7) == "http://")
					{
						return url;
					}
					else
					{
						url = "http://" + url;
						//console.info("%o",url);
						return url;
					}
				}			
			})
		});
		
				
		this.items = [this.prospect];
        
        
		
        Eagles.views.ProspectCard.superclass.initComponent.apply(this, arguments);
    }
    
    ,goBack: function() {
		this.ownerCt.setActiveItem(this.prevCard, {
			type: 'slide'
			,reverse: true
			,scope: this
			,after: function(){
				this.destroy();
			}
		});
	}
    
});


Ext.reg('Prospect', Eagles.views.ProspectCard);
