app.Views.News = Backbone.View.extend({
    model: new app.Models.News(),
    tagName:'tr',
    events:{
        'click .delete-new':'deleteNew',
        'click .edit-new':'editNew',
        'click .update-new':'updateNews',
        'click .cancel':'cancelNewUpdate'
    },
    initialize:function(){
        this.template = _.template($('.beatles-new').html());
        this.render();
    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    editNew:function(){
        $('.edit-new').hide();
        $('.delete-new').hide();
        this.$('.update-new').show();
        this.$('.cancel').show();

        var title = this.$('.title-new').html();
            desc = this.$('.description-new').html(),
            full = this.$('.full-new').html();
        this.$('.title-new').html('<input type="text" class="form-control input-title-new" value="' + title + '">');
        this.$('.description-new').html('<input type="text" class="form-control input-description-new" value="' + desc + '">');
        this.$('.full-new').html('<textarea type="text" class="form-control input-full-new" rows="3">'+full+'</textarea>');
    },
    updateNews:function(){
        this.model.set({
            title:$('.input-title-new').val(),
            description:$('.input-description-new').val(),
            fullNew:$('.input-full-new').val()
        });

    },
    cancelNewUpdate:function(){
        app.ApplicationView.render();
    },
    deleteNew:function(){
        this.model.destroy();
    }
});
