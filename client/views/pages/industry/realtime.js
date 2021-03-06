Template.industryRealtime.onRendered(function(){
  Session['monitor'] = {
    0: ['117.117.100.166', '117.117.100.2', '58.130.81.15', '58.131.170.101', '58.131.170.102', '58.133.243.172'], 
    1: ['111.207.23.82(2)', '111.207.23.82(3)', '111.207.23.82', '112.192.184.15', '112.5.123.80', '61.164.83.146'], 
    2: ['112.5.105.43', '183.233.248.234', '218.104.88.5', '218.7.241.176', '218.9.65.19', '222.187.101.12'], 
    3: ['183.250.57.94', '183.64.244.52', '218.2.46.88', '60.170.58.68', '61.164.204.102', '61.178.41.176'], 
    4: ['112.194.143.40', '112.194.143.41', '121.28.56.126', '122.225.82.245', '182.247.101.23', '58.57.107.90'], 
    5: ['183.64.1.58', '218.70.163.198', '218.70.39.234', '222.178.121.115', '222.178.55.226', '61.128.254.81'], 
    6: ['1.85.58.166', '202.97.188.12', '218.207.106.43', '27.150.255.39', '27.150.255.40', '61.153.216.78'], 
    7: ['117.117.218.34', '117.117.80.76', '121.251.16.21', '211.71.29.233', '219.242.20.40', '222.26.127.66'], 
    8: ['31.28.247.126', '37.139.111.127', '37.193.131.13', '37.200.123.43', '78.10.199.107', '94.158.153.214'], 
    9: ['31.42.168.108', '5.32.179.5', '91.191.213.59', '91.234.197.67', '93.157.46.8', '93.99.166.167']
  }
  var imgs = $('.my-thumb');
  for (var i = 0; i < imgs.length; ++i) {
    imgs.eq(i).attr('src', '/industry/attack/thumb/' + Session['monitor'][0][i] + '.jpg');
  }
});

Template.industryRealtime.events({
  'click .content-nav>li'(event) {
    const target = event.target;
    $('.content-nav>li').removeClass('active');
    $(target).addClass('active');
    var id = $(target).data('id');
    var imgs = $('.my-thumb');
    for (var i = 0; i < imgs.length; ++i) {
      imgs.eq(i).attr('src', '/industry/attack/thumb/' + Session['monitor'][id][i] + '.jpg');
    }
  },
  'click .my-thumb'(event) {
    var ip = $(event.target).attr('src');
    ip = ip.substring(ip.lastIndexOf('/') + 1, ip.lastIndexOf('.'));
    if (ip.indexOf('(') > 0) {
      ip = ip.substring(0, ip.indexOf('('));
    }

    Router.go('industry.attack', {}, {hash: ip});
  }
})