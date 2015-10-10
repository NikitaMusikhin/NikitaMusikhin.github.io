app.Collections.Albums = Backbone.Collection.extend({
    model:app.Models.Album
});
app.Collections.Members = Backbone.Collection.extend({
    model:app.Models.Member
});
app.Collections.News = Backbone.Collection.extend({
    model:app.Models.News
});

app.Global.News = new app.Collections.News([
    {
        title:'Liverpool marks John Lennon\'s 75th birthday',
        description:'The people of Liverpool marked what would have been John Lennon\'s 75th birthday.',
        fullNew:'The people of Liverpool marked what would have been John Lennon\'s 75th birthday. The people of Liverpool marked what would have been John Lennon\'s 75th birthday.'
    },
    {
        title:'Liverpool marks John Lennon\'s 75th birthday',
        description:'The people of Liverpool marked what would have been John Lennon\'s 75th birthday.',
        fullNew:'The people of Liverpool marked what would have been John Lennon\'s 75th birthday. The people of Liverpool marked what would have been John Lennon\'s 75th birthday.'
    }
]);

app.Global.Albums = new app.Collections.Albums([
    {
        coverPath:'images/beatles_for_sale.jpeg',
        title:'Beatles For Sale',
        date:'04-12-1964',
        description:'Comming...'
    },
    {
        coverPath:'images/help.jpg',
        title:'Help!',
        date:'06-08-1965',
        description:'Comming...'
    },
    {
        coverPath:'images/abbey_road.jpg',
        title:'Abbey Road',
        date:'26-09-1969',
        description:'Comming...'
    }
]);
app.Global.Members = new app.Collections.Members([
    {
        photoPath:'images/lennon.jpg',
        name:'John Lennon',
        yol:'09-10-1940 - 08-12-1980',
        description:'Британский рок-музыкант, певец, поэт, композитор, художник, писатель. Один из основателей и участник группы The Beatles, популярный музыкант XX века. После распада The Beatles начал сольную карьеру, но в 1980 году был убит.'
    },
    {
        photoPath:'images/mccartney.jpg',
        name:'Paul McCartney',
        yol:'18-06-1942 - Наши Дни',
        description:'Британский музыкант, мультиинструменталист и продюсер, один из основателей группы The Beatles, 16-кратный обладатель премии Грэмми, рыцарь-бакалавр, кавалер ордена Британской империи (MBE) (1965).'
    },
    {
        photoPath:'images/harrison.png',
        name:'George Harrison',
        yol:'25-02-1943 - 29-11-2001',
        description:'Британский рок-музыкант, певец, композитор, писатель, продюсер, ситарист и гитарист, получивший наибольшую известность как соло-гитарист The Beatles. Харрисон занимает 21 место в списке 100 величайших гитаристов всех времён по версии журнала Rolling Stone.'
    },
    {
        photoPath:'images/star.jpg',
        name:'Ringo Star',
        yol:'07-07-1940 - Наши Дни',
        description:'Британский музыкант, автор песен, актёр. Известен как барабанщик группы The Beatles.'
    }
]);
