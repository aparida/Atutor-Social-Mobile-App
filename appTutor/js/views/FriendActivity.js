/*ArticleCard.js*/Ext.ns("Atutor.views");

Atutor.views.ArticleCard = Ext.extend(Ext.Panel, {
    layout: 'fit'
    ,cls: 'articleCard'
    ,initComponent: function() {
    	
    	this.dockedItems = [{
    		xtype:'toolbar'
    		,ui: 'light'
/*     		,title: 'Eagles News' */
    		,items: [
    			{
    				xtype:'button'
    				,ui: 'back'
    				,text:'News'
    				,scope: this
    				,handler: this.goBack
    			}
    		]
    	}];
    	
        this.article = new Ext.BoxComponent({
			data: this.record.data
		    ,scroll: 'vertical'
			,tpl: new Ext.XTemplate('' 
			+'<article>'
				+'<h1>{Title}</h1>'
				+'<div class="body">{Body}</div>'
				+'<footer><small>&copy; 2011 PhiladelphiaEagles.com. All rights reserved.</small></footer>'
			+'</article>'
			,{
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
		
				
		this.items = [this.article];
        
        
        this.article.on('afterrender', function(){
        	if(this.record.get('Body'))
        		return;
        		
	 		this.loadMask = new Ext.LoadMask(this.article.getEl(), {
				msg: 'Loading Article'
			});
			this.loadMask.show();
			
    		Ext.Ajax.request({
    			url: 'http://draft.philadelphiaeagles.com/news/json/'+this.record.get('ID')
    			,success: function(response){
    				var r = Ext.decode(response.responseText);
    				if(r.data)
    				{
	    				this.record.set('Body', r.data['Body']);
	    				this.article.update(this.record.data);
	    				this.loadMask.hide();
	    			}
    			}
    			,scope: this
    		});

        }, this, {delay: '200'});
        
		
        Atutor.views.ArticleCard.superclass.initComponent.apply(this, arguments);
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


Ext.reg('Article', Atutor.views.ArticleCard);
