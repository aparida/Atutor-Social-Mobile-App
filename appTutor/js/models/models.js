/*models.js*/Ext.ns('Atutor.models');


Atutor.models.Prospect = Ext.regModel('Prospect', {
    fields: [
        {name: 'ActRoundNo',  type: 'int'}
        ,{name: 'ProjRoundNo',  type: 'int'}
		,{name: 'PickNo',  type: 'int'}
		,{name: 'DraftedBy',  type: 'string'}
		,{name: 'Name',  type: 'string'}
        ,{name: 'Position',   type: 'string'}
        ,{name: 'Year', type: 'string'}
        ,{name: 'College', type: 'string'}
        ,{name: 'Height', type: 'string'}
        ,{name: 'Weight', type: 'string'}
        ,{name: 'ArmLength', type: 'string'}
        ,{name: 'HandSize', type: 'string'}
        ,{name: 'Headshot', type: 'string'}
        ,{name: 'Analysis', type: 'string'}

    ]
    
    ,proxy: {
        type: 'ajax'
        ,url : 'http://draft.philadelphiaeagles.com/prospects/json'
        ,reader: {
            type: 'json'
            ,root: 'data'
        }
    }
});

Atutor.models.Pick = Ext.regModel('Pick', {
    fields: [
        
        {name: 'RoundNo',  type: 'int'}
		,{name: 'PickNo',  type: 'int'}
        ,{name: 'Name',  type: 'string'}
		,{name: 'Position',   type: 'string'}
        ,{name: 'Year', type: 'string'}
        ,{name: 'College', type: 'string'}
        ,{name: 'Height', type: 'string'}
        ,{name: 'Weight', type: 'string'}
        ,{name: 'ArmLength', type: 'string'}
        ,{name: 'HandSize', type: 'string'}
        ,{name: 'Headshot', type: 'string'}
        ,{name: 'Analysis', type: 'string'}

    ]
    
    ,proxy: {
        type: 'ajax'
        ,url : 'http://draft.philadelphiaeagles.com/draft_picks/json'
        ,reader: {
            type: 'json'
            ,root: 'data'
        }
    }
});





// ATSOCIAL Models BEGIN

Atutor.models.Activity = Ext.regModel('Activity', {
    fields: [ 'postedTime', 'title','userId'],
    idProperty: 'activity',
});



Atutor.models.Users = Ext.regModel('Users', {
    fields: ['id', 'displayName', 'link', 'profileUrl'],
    idProperty: 'users',
});

Atutor.models.Gadgets = Ext.regModel('Gadgets', {
    fields: ['url', 'description' ],
    
    // proxy: {
    //        type: 'ajax',
    //        url : 'http://avipar.xtreemhost.com/ats/ats/gadget.json',
    //        reader: {
    //            type: 'json',
    //            root: 'entry'
    //        }
    //    }
});


Atutor.models.Profile = Ext.regModel('Profile', {
    fields: ['id', 'displayName', 'photo', 'url', 'descriptions'],
    
    proxy: {
        type: 'ajax',
        url : 'profile.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

Atutor.models.More = Ext.regModel('More', {
    fields: ['head', 'description'],
    
    proxy: {
        type: 'ajax',
        url : 'more.json',
        reader: {
            type: 'json',
            root: 'entry'
        }
    }
});

