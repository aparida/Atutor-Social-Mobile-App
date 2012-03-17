Ext.ns('tutor', 'tutor.panel', 'tutor.store', 'tutor.template', 'tutor.storage', 'tutor.views');


tutor.views.Login = Ext.extend(Ext.form.FormPanel, {

	id: 'loginform',
	fullscreen: true,
    modal: false,
    scroll: 'vertical',
	listeners: {
            beforesubmit: function (c, b) {
                // Ext.dispatch({
                //                    controller: "auth",
                //                    action: "loginAction",
                //                    form: c,
                //                    values: b
                //                });
                //                return false
            }
        },

    initComponent: function() {
	
		   this.dockedItems =  [{
	            xtype: "toolbar",
	            dock: "bottom",
	            ui: "gray",
	            items: [{
	                text: "Forgot password",
	                handler: function () {
	                    // form.destroy();
	                    //                  Ext.dispatch({
	                    //                      controller: "auth",
	                    //                      action: "password"
	                    //                  })
	                }
	            }, {
	                xtype: "spacer"
	            }, {
					xtype: "button",
			        text: "Log in",
			        scope: this,
			        formBind: true,
	                text: "Login",
	                ui: "confirm",
	                handler: function () {
						
	
							Ext.Ajax.request({
								url: 'http://atutor.ca/atutor/demo/login.php', 
								params : { 
										submit: 1,
										token: '45ab234sdfh305',
									//	action: 'get',
										auto: 1,
										p: 'bounce.php',
										form_login: this.username.getValue(),
										form_password_hidden: hex_sha1(hex_sha1(this.password.getValue()) + '45ab234sdfh305'),
										},
								method: 'POST',
								success: function (e) {
									
									 // var obj = Ext.util.JSON.decode(e.responseText);
									 // 									 Ext.Msg.alert('Success', obj.msg);	
									 // 								        alert('login');
										
									} ,
								scope: this
							});
							
							tutor.username = this.username.getValue();
							tutor.myurl = this.baseUrl.getValue();
							tutor.mypassword = this.password.getValue();
						// form.destroy();
						
                            tutor.badgeText = this.memberId.getValue();
							// alert(tutor.badgeText);
							tutor.url = this.baseUrl.getValue();
							// alert(tutor.url);
						    this.destroy();
							                      
								Ext.dispatch({
	                       			controller: "auth",
	               					action: "login"
	                                  })
											
	                }
	            }]
	        }]
      
     		


 
	      this.username = new Ext.form.Text({
	          	name: "username",
				id: 'username',
              	label: "Username",
              	useClearIcon: true,
              	autoCapitalize: false,
				placeHolder: 'username or email',
				required: true
			
	       });
	       this.password = new Ext.form.Password({
	           name: 'password',
	           label: 'Password',
	           id: 'password',
		    	required: true
	       });
	       this.memberId = new Ext.form.Text({
	           name: 'member_id',
	           label: 'User ID',
	           id: 'memberId',
				useClearIcon: true,
              	autoCapitalize: false,
				value: '313',
				placeHolder: '313',
				// required: true
	       });
		this.baseUrl = new Ext.form.Text({
	           name: 'baseUrl',
	           label: 'URL',
	           id: 'baseUrl',
				useClearIcon: true,
              	autoCapitalize: false,
				value: 'http://social.atutor.ca',
				placeHolder : 'http://social.atutor.ca',
				// required: true
	       });
  
	       this.fs = new Ext.form.FieldSet({
			instructions: 'Please enter your login name or your email address, and your password.',
				width: '80%',
	        
	
	
	 			items: [
			this.username, this.password, this.memberId,this.baseUrl, 
				]
	       });

	       this.items = [this.fs];

	  if (Ext.is.Phone) {
	        Ext.apply(tutor.views.Login, {
	            fullscreen: true,
	            modal: false
	        })
	    } else {
	        Ext.apply(tutor.views.Login, {
	            autoRender: true,
	            floating: true,
	            modal: true,
	            centered: true,
	            hideOnMaskTap: false,
	            height: 385,
	            width: 440
	        })
	    }
  
	    tutor.views.Login.superclass.initComponent.apply(this, arguments);

	}

});


Ext.reg('login', tutor.views.Login);



