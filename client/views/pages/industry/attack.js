Template.industryAttack.onRendered(function(){

var currentIp = location.hash;
if (currentIp) {
	$('input[name="ip"]').val(currentIp.substring(1));
}

//attack-right for the 3D
var Kort = (function(){

	var OFFSET_MARGIN = 2;

	var supports3DTransforms =  'WebkitPerspective' in document.body.style ||
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
		if( supports3DTransforms ) {

			[].slice.call( document.querySelectorAll( '.kort' ) ).forEach( function( element, i ) {

				// Make sure we don't bind to the same element twice
				if( element.classList.contains( 'kort-activated' ) === false ) {
					element.classList.add( 'kort-activated' );

					function onMouseOver( event ) {
						updateState();
						addMargin();
					}

					function onMouseMove( event ) {
						update( event.clientX );
					}

					function onMouseOut( event ) {
						removeMargin();
					}

					function onTouchStart( event ) {
						updateState();
						addMargin();

						update( event.touches[0].clientX );

						element.classList.add( 'touching' );

						document.addEventListener( 'touchmove', onTouchMove, false );
						document.addEventListener( 'touchend', onTouchEnd, false );
					}

					function onTouchMove( event ) {
						update( event.touches[0].clientX );

						event.preventDefault();
					}

					function onTouchEnd( event ) {
						removeMargin();

						element.classList.remove( 'touching' );

						document.removeEventListener( 'touchmove', onTouchMove, false );
						document.removeEventListener( 'touchend', onTouchEnd, false );
					}

					function updateState() {
						elementLeft = element.offsetLeft;
						elementWidth = element.offsetWidth;
						elementChildren = [].slice.call( element.children );
					}

					function update( x ) {
						// Find the present element based on the x position
						var present = Math.floor( ( x - elementLeft ) / elementWidth * elementChildren.length );

						// Cap to 0 - number_of_elements
						present = Math.max( Math.min( present, elementChildren.length - 1 ), 0 );

						elementChildren.forEach( function( child, i ) {

							if( i === present ) {
								child.classList.add( 'present' );
							}
							else {
								child.classList.remove( 'present' );
							}

						} );
					}

					function addMargin() {
						elementChildren.forEach( function( child, i ) {

							child.style.marginLeft = ( i * OFFSET_MARGIN ) + 'px';

						} );
					}

					function removeMargin() {
						elementChildren.forEach( function( child, i ) {

							child.style.marginLeft = 0;

						} );
					}

					if( 'ontouchstart' in window ) {
						element.addEventListener( 'touchstart', onTouchStart, false );
					}
					else {
						element.addEventListener( 'mouseover', onMouseOver, false );
						element.addEventListener( 'mouseout', onMouseOut, false );
						element.addEventListener( 'mousemove', onMouseMove, false );
					}

				}

			} );

		}

	}

	// Bind elments that are currently in the DOM
	bind();

	return {
		bind: bind
	};

})();
//attack-left for the picture
 	//var fso = new ActiveXObject("Scripting.FileSystemObject");
 	var load_img;
	var delta = 240;
	var min_delta=8;
	var last_picData=0;
	var cases=0;
	var notRequestIp = ["37.193.131.13","31.28.247.126","37.139.111.127",
			        "31.42.168.108","5.32.179.5","218.7.241.176",
			        "183.233.248.234","117.117.80.76","94.158.153.214",
			        "183.64.1.58","118.122.67.19","117.117.100.2",
			        "117.117.218.34","114.247.108.104","211.71.29.233",
			        "117.117.100.166","58.133.243.172","1.56.7.24", 
			        "1.85.58.166", "111.207.61.181", "110.252.70.236", 
			        '112.192.184.15', '111.207.23.82(2)', '111.207.23.82(3)', 
			        '111.207.23.82','188.122.67.19'];
	var rec=0;
	var recname=0;
	var recdate=null;
	var start=0;
	var scrollHeight = $("textarea[name='result']");
	$("input[name='start']").click(function (e) {
		clearInterval(load_img);
		if (scrollHeight[0].scrollHeight > 1000)
			$("textarea[name='result']").val("........");
		scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
		$("textarea[name='result']").val("Start!");
		scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
		$("textarea[name='result']").append("\n正在执行漏洞攻击......");
		var ip = $("input[name='ip']").val();
		//获取目录
		var imgFdr = fso.GetFolder("/home/pb/HikvisionPocCert" + ip);
		//遍历目录文件
		url = "http://" + ip + "/onvif/snapshot?";
		if ($.inArray(ip, notRequestIp) != -1)
			url = "http://" + ip + ":9989";
		if (ip == "")
			alert("ip不能为空!");
		else {
			load_img = setInterval(
					function () {
					var fc = new Enumerator(imgFdr.files);
					var picArr = [];
					var curPicDate = null;
					var nextPicDate = null;
					var curRecDate =null;
					var curDate=null;
					for (var i = 0; !fc.atEnd(); fc.moveNext()) {
						picArr[i++] = fc.item().Name.substring(0, fc.item().Name.length - 4);
					}
		////===========================================================================================================////
					/* //扫描当前目录，存储目录文件名到picArr。
					if(start==0)
					{
						for (var i = 0; i < picArr.length - 1; i++) {
							curDate = new Date();
							curPicDate = new Date(strToDateStr(picArr[i]));
							nextPicDate = new Date(strToDateStr(picArr[i + 1]));
							if ((curDate - curPicDate) / 1000 >= delta && (curDate - nextPicDate) / 1000 < delta) {								
								//alert(curPicDate);
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								$("textarea[name='result']").append("\n攻击成功");
								$("#load_img").attr("src", "C:\\HikvisionPocCert\\" + ip +"\\"+ picArr[i] + ".jpg");
								$("textarea[name='result']").append("\n正在获取视频画面......");
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								$("textarea[name='result']").append("\n获取成功");
								recdate=curPicDate;
								last_picData=curDate;
								start=1;
								//rec=i;
								recname=picArr[i];
								//recname=curPicDate;
							}
						}
					}
					//找到开始文件
					else
					{
						for (var i = 0; i < picArr.length - 1; i++) {
							curDate = new Date();
							curPicDate = new Date(strToDateStr(picArr[i]));
							nextPicDate = new Date(strToDateStr(picArr[i + 1]));
							alert(curDate);
							alert(recdate);
							
							if(recname==picArr[i])//找到当前文件
							{	
								//alert(curPicDate);
								alert(picArr.length);
								alert(curPicDate);
								if((curDate - last_picData) / 1000 >= min_delta)//判断是否超时
								{	
									alert(1);
									scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
									scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
									$("textarea[name='result']").append("\n攻击成功");
									$("#load_img").attr("src", "C:\\HikvisionPocCert\\" + ip +"\\"+ picArr[i+1] + ".jpg");
									$("textarea[name='result']").append("\n正在获取视频画面......");
									scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
									$("textarea[name='result']").append("\n获取成功");
									recdate=nextPicDate;
									last_picData=curDate;
								}
								else if((curDate - curPicDate) / 1000 >= delta && (curDate - nextPicDate) / 1000 < delta)//未超时判断是否超时
								{
									alert(2);
									scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
									scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
									$("textarea[name='result']").append("\n攻击成功");
									$("#load_img").attr("src", "C:\\HikvisionPocCert\\" + ip +"\\"+ picArr[i+1] + ".jpg");
									$("textarea[name='result']").append("\n正在获取视频画面......");
									scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
									$("textarea[name='result']").append("\n获取成功");
									recdate=nextPicDate;
									last_picData=curDate;
								}	
								//recdate=nextPicDate;
							}
						}
					}	 */

		////========================================================================================================================////					
					//alert(recdate);
					for (var i = 0; i < picArr.length - 1; i++) {
						curDate = new Date();
						curPicDate = new Date(strToDateStr(picArr[i]));
						nextPicDate = new Date(strToDateStr(picArr[i + 1]));
						if (cases==0 && (curDate - curPicDate) / 1000 >= delta && (curDate - nextPicDate) / 1000 < delta) {								
							if(rec!=i)
							{
		 					scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
							scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
			 				$("textarea[name='result']").append("\n攻击成功");
							$("#load_img").attr("src", "/home/pb/HikvisionPocCert" + ip +"\\"+ picArr[i] + ".jpg");
							$("textarea[name='result']").append("\n正在获取视频画面......");
							scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
							$("textarea[name='result']").append("\n获取成功");
							rec=i;
							recname=curPicDate;
							last_picData=curDate;
							}
						}
					}
					
					if(rec!=0 && rec < picArr.length - 1)
						{	
							curRecDate = new Date(strToDateStr(picArr[rec+1]));
							if ((curDate - curRecDate) / 1000 > delta){
								rec++;
								cases=0;
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								$("textarea[name='result']").append("\n攻击成功");
								$("#load_img").attr("src", "/home/pb/HikvisionPocCert" + ip +"\\"+ picArr[rec] + ".jpg");
								$("textarea[name='result']").append("\n正在获取视频画面......");
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								$("textarea[name='result']").append("\n获取成功");
								last_picData=curDate;
							}
							if ((curDate - last_picData) / 1000 >= min_delta){
							//for (recname; recname < picArr.length - 1; i++) {
								// if (picArr[i]==recname)
								// recname=picArr[i];
							// }
								rec++;
								cases=1;
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								$("textarea[name='result']").append("\n攻击成功");
								$("#load_img").attr("src", "/home/pb/HikvisionPocCert" + ip +"\\"+ picArr[rec] + ".jpg");
								$("textarea[name='result']").append("\n正在获取视频画面......");
								scrollHeight.scrollTop(scrollHeight[0].scrollHeight);
								$("textarea[name='result']").append("\n获取成功");
								last_picData=curDate;
							}
						}
					//alert(recdate)
					//alert(rec);
					//alert(cases);
				}, 1000);
		}
	});
	$("input[name='stop']").click(function (e) {
		clearInterval(load_img);
		$("textarea[name='result']").val("Finished!");
	});
});


