$(document).ready(function(){
    app.ApplicationView = new app.Views.AppView();
    app.router = new app.Router();

    $('.add-new').on('click',function(){
        if(($('.title-news-input').val()!=='')&&($('.desc-news-input').val()!=='')&&($('.full-desc-input').val()!=='')){
            var news = new app.Models.Member({
                title:$('.title-news-input').val(),
                description:$('.desc-news-input').val(),
                fullNew:$('.full-desc-input').val(),
            });
            app.Global.News.add(news);
            $('.title-news-input').val('');
            $('.desc-news-input').val('');
            $('.full-desc-input').val('');
        }else{
            alert('Не все поля заполнены!');
        }
    });

    $('.add-member').on('click',function(){
        if(($('.photo-input').val()!=='')&&($('.name-input').val()!=='')&&($('.yol-input').val()!=='')&&($('.desc-input').val()!=='')){
            var member = new app.Models.Member({
                photoPath:$('.photo-input').val(),
                name:$('.name-input').val(),
                yol:$('.yol-input').val(),
                description:$('.desc-input').val()
            });
            app.Global.Members.add(member);
            $('.photo-input').val('');
            $('.name-input').val('');
            $('.yol-input').val('');
            $('.desc-input').val('');
        }else{
            alert('Не все поля заполнены!');
        }
    });

    $('.add-album').on('click',function(){
        if(($('.cover-input').val()!=='')&&($('.title-input').val()!=='')&&($('.date-input').val()!=='')&&($('.description-input').val()!=='')){
            var album = new app.Models.Album({
                coverPath:$('.cover-input').val(),
                title:$('.title-input').val(),
                date:$('.date-input').val(),
                description:$('.description-input').val()
            });
            app.Global.Albums.add(album);
            $('.cover-input').val('');
            $('.title-input').val('');
            $('.date-input').val('');
            $('.description-input').val('');
        }else{
            alert('Не все поля заполнены!');
        }
    });
})
