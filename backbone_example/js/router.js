app.Router = Backbone.Router.extend({
    routes: {
        "":                     "news",
        "news":                 "news",
        "members":              "members",
        "albums":               "albums"
    },
    initialize: function() {
        Backbone.history.start();
    },
    news: function(query,category) {
        $('.unit').hide();
        $('#main-page').show();
    },
    members: function() {
        $('.unit').hide();
        $('#members-page').show();
    },
    albums: function() {
        $('.unit').hide();
        $('#albums-page').show();
    }
});
