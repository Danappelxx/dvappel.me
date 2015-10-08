Controller('activityFeed', {
    helpers: {
        feed() {

            return Session.get('feed');
        }
    },

    rendered: function() {
        Meteor.call('loadGithubFeed', 'Danappelxx', function (error, result) {
            console.log(error);
            console.log(result);

            var feed = result.data.responseData.feed.entries;

            feed = feed.map( function (el) {
                return el.content;
            })

            feed = feed.slice(0, 5);
            Session.set('feed', feed);
        });
    }
});
