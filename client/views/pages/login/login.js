/**
 * Created by meteor on 12/8/15.
 */
Template.login.events({
    'submit form': function(e) {
        var password, username;
        e.preventDefault();
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();

        return Meteor.loginWithPassword(username, password, function(error) {
            if (error) {
                $("#logintip")[0].setAttribute("class", "alert alert-danger");
                return $("#logintip")[0].innerHTML = "用户名或者密码不正确";
            } else {
                Session.set('username', username);
                return Router.go('/');
            }
        });
    }
});