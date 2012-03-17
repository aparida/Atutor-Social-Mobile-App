Ext.regController("musicfest", {
    run: function (a) {
       
        this.render({
            xtype: "tutor.views.MusicFest",
            active: a.url
        });
        if (a.url) {
            Ext.redirect(a.url)
        } else {
            this.index()
        }
    },
    index: function (a) {
        Ext.dispatch({
            controller: "activity",
            action: "list",
            historyUrl: "activity/list",
            options: a
        })
    }
});




Ext.regController("activity", {
    myactivity: function (a) {
       
        this.render({
            xtype: "tutor.views.Login", 
        });
     
    },
    network: function (a) {
			var a = Ext.getCmp("activitycard");
				a.destroy();
	
      	this.render({
            xtype: "Atutor.views.NetworkCard",     
        });
    }
});



Ext.regController("contacts", {
    groups: function (a) {
       
        this.render({
            xtype: "tutor.views.Login", 
        });
     
    }
});




Ext.regController("auth", {
    index: function (a) {
        this.callback = a.callback;
        this.login(a)
    },
    login: function (a) {
        this.render({
            xtype: "tutor.views.MusicFest"
        })
    },
    loginAction: function (a) {
        var b = new Ext.LoadMask("loginform", {
            msg: "Logging in"
        });
        b.show();
        Ext.data.auth.login(a.values.username, a.values.password, Ext.createDelegate(function (c, d) {
            b.hide();
            delete b;
            if (c) {
                a.form.destroy();
                this.callback()
            } else {
                Ext.Msg.alert("Log in error", (d ? d : "Something went wrong.") + ". Please try again.", Ext.emptyFn)
            }
        }, this))
    },

   
 logout: function (a) {
		var a = Ext.getCmp("viewport");
			a.destroy();
			
          this.render({
	            xtype: "login"
	        })
    }
});