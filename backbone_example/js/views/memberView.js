app.Views.Member = Backbone.View.extend({
    model: new app.Models.Member(),
    tagName:'tr',
    events:{
        'click .delete-member':'deleteMember',
        'click .edit-member':'editMember',
        'click .update-member': 'updateMember',
        'click .cancel':'cancelUpdateMember'
    },
    initialize:function(){
        this.template = _.template($('.beatles-member').html());
        this.render();
    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    editMember:function(){
        $('.edit-member').hide();
        $('.delete-member').hide();

        this.$('.update-member').show();
        this.$('.cancel').show();

        var photo = this.$('.photo').children().attr('src');
            name = this.$('.name').html(),
            yol = this.$('.yol').html(),
            description = this.$('.description').html();

        this.$('.photo').html('<input type="text" class="form-control photo-update" value="' + photo + '">');
        this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
        this.$('.yol').html('<input type="text" class="form-control yol-update" value="' + yol + '">');
        this.$('.description').html('<textarea type="text" class="form-control desc-update" rows="5">'+description+'</textarea>');
    },
    updateMember:function(){
        this.model.set({
            photoPath:$('.photo-update').val(),
            name:$('.name-update').val(),
            yol:$('.yol-update').val(),
            description:$('.desc-update').val(),
        });
    },
    cancelUpdateMember:function(){
        app.ApplicationView.render();
    },
    deleteMember:function(){
        this.model.destroy();
    }
});
