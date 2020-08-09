# HeiHelp
In this Repo, we create a website called Rental Spot. Rental Spot is an apartment rental website designed specifically for students. Students can find an affordable living near their school by using our user-friendly site.

# Instruction
## How to access our website!
How to configure
php
Download and run xmapp

Enter xampp/htdocs，git clone https://github.com/IvySYChen/heihei.git

From control panel open Apache -> config - httpd.conf

DocumentRoot "/xampp/htdocs"，更改为DocumentRoot "/xampp/htdocs/heihelp/RentalSpot"
找到DirectoryIndex那行，加入Homepage.html，放在第一个位置
Sqlite3
打开xampp/php/php
找到extension=sqlite3，把前面的;去掉
访问网站
从control panel Start Apache
在浏览器访问localhost
