Template.register.events
({
    'submit form': function(e)
    {
        var username, password;
        var role, name, avatar;
        e.preventDefault();
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        
        var radioRole = $('input[name="roleOptions"]:checked').prop("id");
        switch (radioRole)
        {
            case "radioAdmin":
                role = "admin";
                name = "超级用户";
                avatar = "img/profile_small_admin.jpg";           
                break;
            
            case "radioAnalyst":
                role = "analyst";
                name = "李逍遥";
                avatar = "img/profile_small_lxy.jpg";
                break;
                
            case "radioGuest":
                role = "guest";
                name = "游客";
                avatar = "img/profile_small.jpg";
                break;
                
            default:
                role = "normal";
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
                    avatar : avatar
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
