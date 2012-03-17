Ext.ns('tutor', 'tutor.panel', 'tutor.store', 'tutor.template', 'tutor.storage', 'tutor.views');


tutor.panel.Groups = Ext.extend(Ext.Panel, {
    floating: true,
    modal: true,
    centered: true,
    width: 250,
	height:150,
    scroll: 'vertical',
	 html: '<p style="padding: 15px 0 0 0;text-align:center;font-size: 26px;color: #cccccc;font-weight:bold;">Coming Soon</p><br/><p style="text-align:center;font-size: 16px;color: #cccccc;" >This allows you to access your groups and its members.</p>'
   
});