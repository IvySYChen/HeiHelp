# How to configure

## php
* Download and run xmapp
* Enter xampp/htdocs，`git clone https://github.com/IvySYChen/heihei.git`
* 从control panel打开Apache的config - httpd.conf
* 找到DocumentRoot "/xampp/htdocs"，更改为DocumentRoot "/xampp/htdocs/heihei/RentalSpot"
* 找到DirectoryIndex那行，加入Homepage.html，放在第一个位置

## Sqlite3
* 打开xampp/php/php
* 找到extension=sqlite3，把前面的;去掉

# 访问网站

* 从control panel Start Apache
* 在浏览器访问localhost
