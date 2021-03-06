Template.register.events
({
    'submit form': function(e)
    {
        var username, password;
        var name, avatar;
        e.preventDefault();
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        
        var roles = new Array();        
        var radioRole = $('input[name="roleOptions"]:checked').prop("id");
        switch (radioRole)
        {
            case "radioAdmin":
                roles[0] = "admin";
                name = "超级用户";
                avatar = "img/profile_small_admin.jpg";           
                break;
            
            case "radioAnalyst":
                roles[0] = "analyst";
                name = "李逍遥";
                avatar = "img/profile_small_lxy.jpg";
                break;
                
            case "radioGuest":
                roles[0] = "guest";
                name = "游客";
                avatar = "img/profile_small.jpg";
                break;
                
            default:
                roles[0] = "normal";
                name = "一般用户";
                avatar = "img/profile_small.jpg";            
        }
        
        return Accounts.createUser
        (
            {
                username : username,
                password : password,
                profile : 
                {
                    name : name,
                    avatar : avatar,
                    roles : roles
                }
            }, 
            function (error)
            {
                if (error)
                {
                    $("#registerTip")[0].setAttribute("class", "alert alert-danger");
                    
                    return $("#registerTip")[0].innerHTML = "注册失败，请检查输入格式是否正确";
                }
                else
                {
                    Session.set('username', username);
                    
                    return Router.go('/');
                }
            }
        );
    }
});
