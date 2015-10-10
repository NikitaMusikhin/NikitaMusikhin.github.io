var app = app || {};
app.Global = {};
app.Models = {};
app.Collections = {};
app.Views = {};
app.Models.News = Backbone.Model.extend({
    defaults:{
        title:'Unknown',
        description:'Unknown',
        fullNew:'Unknown'
    }
});
app.Models.Album = Backbone.Model.extend({
    defaults:{
        coverPath:'Undefined',
        title:'Unknown',
        date:'00-00-00',
        description:'Unknown'
    }
});
app.Models.Member = Backbone.Model.extend({
    defaults:{
        photoPath:'Undefined',
        name:'Unknown',
        yol:'00-00-00 - 00-00-00',
        description:'Unknown'
    }
});
