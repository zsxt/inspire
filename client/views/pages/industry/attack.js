Template.industryAttack.onRendered(function(){

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var load_img;
	var delta = 240;
	var min_delta=8;
	var last_picData=0;
	var cases=0;
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
		var imgFdr = fso.GetFolder("/media/pb/000DA24500014CFC/HikvisionPocCert" + ip);
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
							$("#load_img").attr("src", "C:\\HikvisionPocCert\\" + ip +"\\"+ picArr[i] + ".jpg");
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
								$("#load_img").attr("src", "C:\\HikvisionPocCert\\" + ip +"\\"+ picArr[rec] + ".jpg");
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
								$("#load_img").attr("src", "C:\\HikvisionPocCert\\" + ip +"\\"+ picArr[rec] + ".jpg");
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

