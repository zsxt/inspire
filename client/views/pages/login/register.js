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
            case "radioAnalyst":
                roles[0] = "analyst";
                name = "分析用户";
                avatar = "/img/profile_small_analyst.jpg";
                break;

            case "radioIndustry":
                roles[0] = "industry";
                name = "工控用户";
                avatar = "/img/profile_small_industry.jpg";
                break;
                
            default:
                roles[0] = "guest";
                name = "临时游客";
                avatar = "/img/profile_small_guest.jpg";        
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
                    return $("#registerTip")[0].innerHTML = error.reason;
                }
                else
                {                                    
                    return Router.go('/');
                }
            }
        );
    }
});
