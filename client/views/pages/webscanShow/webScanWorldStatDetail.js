Template.webScanWorldStatDetail.helpers({
    webScanWorldDetail: function(){
        return Inspire.Collection.WebScanStatWorldStat.find({attr: "country"}).fetch();
    },

    fixNumber: function(num){
        if(num){
            return num.toFixed(2);
        }
    }
});

Template.webScanWorldStatDetail.onRendered(function() {
    this.$('.full-height-scroll').slimscroll({
        height: '300px',
        railOpacity: 1,
        color: '#cccccc',
        opacity: 1,
        alwaysVisible: true,
        allowPageScroll: false
    });
});