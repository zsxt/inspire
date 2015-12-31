Template.blankLayout.rendered = function(){

    // Add gray color for background in blank layout
    $('body').addClass('body');

}

Template.blankLayout.destroyed = function(){

    // Remove special color for blank layout
    $('body').removeClass('body');
};