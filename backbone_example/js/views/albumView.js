app.Views.Album = Backbone.View.extend({
    model: new app.Models.Album(),
    tagName:'tr',
    events:{
        'click .delete-album':'deleteAlbum',
        'click .edit-album':'editAlbum',
        'click .update-album': 'updateAlbum',
        'click .cancel':'cancelUpdateAlbum'
    },
    initialize:function(){
        this.template = _.template($('.beatles-album').html());
        this.render();
    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    editAlbum:function(){
        $('.edit-album').hide();
        $('.delete-album').hide();

        this.$('.update-album').show();
        this.$('.cancel').show();

        var path = this.$('.cover').children().attr('src');
            title = this.$('.title').html(),
            date = this.$('.date').html(),
            description = this.$('.description').html();
        this.$('.cover').html('<input type="text" class="form-control cover-update" value="' + path + '">');
        this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
        this.$('.date').html('<input type="text" class="form-control date-update" value="' + date + '">');
        this.$('.description').html('<textarea type="text" class="form-control desc-update" rows="3">'+description+'</textarea>');
    },
    updateAlbum:function(){
        this.model.set({
            coverPath:$('.cover-update').val(),
            title:$('.title-update').val(),
            date:$('.date-update').val(),
            description:$('.desc-update').val(),
        });
    },
    cancelUpdateAlbum:function(){
        app.ApplicationView.render();
    },
    deleteAlbum:function(){
        this.model.destroy();
    }
});
