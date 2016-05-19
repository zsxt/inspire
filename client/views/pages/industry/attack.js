Template.industryAttack.onRendered(function () {
  var currentIp = location.hash;
  if (currentIp) {
    $('input[name="ip"]').val(currentIp.substring(1));
  }

  var Kort = (function () {

    var OFFSET_MARGIN = 2;

    var supports3DTransforms = 'WebkitPerspective' in document.body.style ||
      'MozPerspective' in document.body.style ||
      'msPerspective' in document.body.style ||
      'OPerspective' in document.body.style ||
      'perspective' in document.body.style;

    function bind() {

      // Properties that are read from the DOM when the user hovers
      // and then cached to avoid needless DOM interaction
      var elementLeft = 0,
        elementWidth = 0,
        elementChildren = [];

      // Gotta have 3D transform support
      if (supports3DTransforms) {

        [].slice.call(document.querySelectorAll('.kort')).forEach(function (element, i) {

          // Make sure we don't bind to the same element twice
          if (element.classList.contains('kort-activated') === false) {
            element.classList.add('kort-activated');

            function onMouseOver(event) {
              updateState();
              addMargin();
            }

            function onMouseMove(event) {
              update(event.clientX);
            }

            function onMouseOut(event) {
              removeMargin();
            }

            function onTouchStart(event) {
              updateState();
              addMargin();

              update(event.touches[0].clientX);

              element.classList.add('touching');

              document.addEventListener('touchmove', onTouchMove, false);
              document.addEventListener('touchend', onTouchEnd, false);
            }

            function onTouchMove(event) {
              update(event.touches[0].clientX);

              event.preventDefault();
            }

            function onTouchEnd(event) {
              removeMargin();

              element.classList.remove('touching');

              document.removeEventListener('touchmove', onTouchMove, false);
              document.removeEventListener('touchend', onTouchEnd, false);
            }

            function updateState() {
              elementLeft = element.offsetLeft;
              elementWidth = element.offsetWidth;
              elementChildren = [].slice.call(element.children);
            }

            function update(x) {
              // Find the present element based on the x position
              var present = Math.floor((x - elementLeft) / elementWidth * elementChildren.length);

              // Cap to 0 - number_of_elements
              present = Math.max(Math.min(present, elementChildren.length - 1), 0);

              elementChildren.forEach(function (child, i) {

                if (i === present) {
                  child.classList.add('present');
                }
                else {
                  child.classList.remove('present');
                }

              });
            }

            function addMargin() {
              elementChildren.forEach(function (child, i) {

                child.style.marginLeft = (i * OFFSET_MARGIN) + 'px';

              });
            }

            function removeMargin() {
              elementChildren.forEach(function (child, i) {

                child.style.marginLeft = 0;

              });
            }

            if ('ontouchstart' in window) {
              element.addEventListener('touchstart', onTouchStart, false);
            }
            else {
              element.addEventListener('mouseover', onMouseOver, false);
              element.addEventListener('mouseout', onMouseOut, false);
              element.addEventListener('mousemove', onMouseMove, false);
            }

          }

        });

      }

    }

    // Bind elments that are currently in the DOM
    bind();

    return {
      bind: bind
    };

  })();

  var interval;
  var index = 0;
  var resultArea = $('textarea[name="result"]');
  var startBtn = $('input[name="start"]');
  var stopBtn = $('input[name="stop"]');

  function clear() {
    if (interval) {
      clearInterval(interval);
      inerval = null;
    }
    index = 0;
  }

  function fetchImages(ip) {
    var last = null;
    if (Session['image'].length > 0) {
      last = Session['image'][Session['image'].length - 1];
    }
    Meteor.call('traverse', ip, last, function (error, result) {
      if (error) {

      } else {
        result.forEach(function (r) {
          Session['image'].push(r);
        });
      }
    });
  }
  Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  function start(ip) {
    Session['image'] = [];
    clear();
    interval = setInterval(function () {
      if (index == Session['image'].length || Session['image'].length == 0) {
        fetchImages(ip);
      }

      while (index < Session['image'].length) {
        var d = new Date() - 60000;
        var fname = new Date(d).format('yyyy-MM-dd hh_mm_ss');
        console.log(fname);
        fname = fname + '.jpg';
        if (fname >= Session['image'][index]) {
          if (index + 1 == Session['image'].length || fname < Session['image'][index + 1]) {
            $('#load_img').attr('src', '/industry/attackimg/' + ip + '/' + Session['image'][index]);
            index++;
            break;
          } else {
            index++;
          }
        } else {
          break;
        }
      }
    }, 1000);
  }

  startBtn.click(function (e) {
    console.log('click start');
    clear()
    if (resultArea[0].scrollHeigth > 1000) {
      resultArea.val('............');
    }
    resultArea.scrollTop(resultArea[0].scrollHeight);
    resultArea.val('开始攻击');
    resultArea.scrollTop(resultArea[0].scrollHeight);

    var ip = $('input[name="ip"]').val();
    start(ip);
  });
  stopBtn.click(function (e) {
    resultArea.val('停止攻击');
    clear();
  });
});
