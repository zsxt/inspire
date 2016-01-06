环境配置方法：
1、安装Linux系统
2、在线安装meteor环境，参考https://www.meteor.com/install
3、使用git工具clone代码至本地
4、终端进入代码目录，执行meteor运行
5、本地chrome或firefox浏览器中打开http://localhost:3000

更改链接数据库命令：
1、export MONGO_URL=mongodb://localhost:27017/your_db
2、host、port和db名称，改为目标配置即可
3、注意该链接语句的生存周期，仅在当前终端有效，关闭重启后数据库恢复为meteor自带的mongodb

学习知识：
1、推荐使用WebStorm
2、代码构成：JS/CSS3/HTML5/MongoDB
3、Meteor官方教程（BLAZE框架）：https://www.meteor.com/tutorials/blaze/creating-an-app
4、必学材料：https://github.com/wmzhai/learning-meteor
