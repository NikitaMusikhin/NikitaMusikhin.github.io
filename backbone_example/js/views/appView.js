app.Views.AppView = Backbone.View.extend({
    modelAlbums:app.Global.Albums,
    modelMembers:app.Global.Members,
    modelNews:app.Global.News,
    initialize:function(){
        this.modelAlbums.on('all',this.renderAlbums,this);
        this.modelMembers.on('all',this.renderMembers,this);
        this.modelNews.on('all',this.renderNews,this);
        this.render();
    },
    render:function(){
        this.renderAlbums();
        this.renderMembers();
        this.renderNews();
    },
    renderAlbums:function(){
        var self = this;
        this.el = $('.albums-list'),
        this.el.html('');
        _.each(this.modelAlbums.toArray(),function(album){
            self.el.append((new app.Views.Album({model:album})).el);
        });
    },
    renderMembers:function(){
        var self = this;
        this.el = $('.members-list');
        this.el.html('');
        _.each(this.modelMembers.toArray(),function(member){
            self.el.append((new app.Views.Member({model:member})).el);
        });
    },
    renderNews:function(){
        var self = this;
        this.el = $('.news-list');
        this.el.html('');
        _.each(this.modelNews.toArray(),function(member){
            self.el.append((new app.Views.News({model:member})).el);
        });
    }
});
