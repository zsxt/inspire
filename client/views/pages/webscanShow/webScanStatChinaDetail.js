Template.webScanStatChinaDetail.helpers({
    webScanChinaDetail: function(){
        return Inspire.Collection.WebScanStatChinaStat.find({attr: "region"}).fetch();
    },

    fixNumber: function(num){
        if(num){
            return num.toFixed(2);
        }
    }
});

Template.webScanStatChinaDetail.onRendered(function() {
    this.$('.full-height-scroll').slimscroll({
        height: '300px',
        railOpacity: 1,
        color: '#cccccc',
        opacity: 1,
        alwaysVisible: true,
        allowPageScroll: false
    });
});