//------------------------ACTIVITY LIST---------------------------
tutor.views.ActivityList = Ext.extend(Ext.Panel, {
    id: "activitylist",
    layout: "card",
 	listeners: {
        activate: function () {
         
            var a = this.buttons.getPressed();
			
			
           }
    },
    // historyUrl: "activity/list",
    initComponent: function () {
		
        this.buttons = new Ext.SegmentedButton({
            defaults: {
                flex: 1
            },
			listeners: {
                afterlayout: function () {
                    this.setPressed(0, true)
                }
            },
            items: [{
                text: "My Activity",
                scope: this,
                handler: function (a, b) {
                    Ext.dispatch({
                                                              controller: "activity",
                                                              action: "myactivity",
                                                              btn: a,
                                                              callback: function () {
                                                              a.removeCls(a.pressedCls)
                                           }
                                                          })
                }
            }, {
                text: "My Network",
                scope: this,
                handler: function (a, b) {
                    Ext.dispatch({
                                                               controller: "activity",
                                                               action: "network",
                                                               btn: a,
                                                               callback: function () {
                                                               a.removeCls(a.pressedCls)
                                            }
                                                           })
                }
            }],
            layout: {
                pack: "center"
            },
            style: {
                width: "100%",
                fontSize: "80%"
            }
        });
        this.wrapper = new Ext.Panel({
                          layout: "fit",
                          items: Atutor.views.ActivityCard,
                          dockedItems: [{
                              xtype: "toolbar",
                              title: "activity stream",
                          }, {
                              xtype: "toolbar",
                              ui: "light",
                              items: this.buttons,
                              layout: {
                                  pack: "center"
                              }
                          }]
                      });
                      Ext.apply(this, {
                          items: [this.wrapper]
                      });
        tutor.views.ActivityList.superclass.initComponent.call(this)
	},
	
   




	});
	
	


	Ext.reg('activitylist', tutor.views.ActivityList);


