# HeiHelp
In this Repo, we create a website called Rental Spot. Rental Spot is an apartment rental website designed specifically for students. Students can find an affordable living near their school by using our user-friendly site.

# Instruction
## How to configure and access our website!

### php
* Download and run xmapp
* Enter xampp/htdocs, `git clone https://github.com/IvySYChen/HeiHelp.git`
* From control panel open Apache config - httpd.conf
* Find `DocumentRoot "/xampp/htdocs"`, change it to `DocumentRoot "/xampp/htdocs/Heihelp/RentalSpot"`
* Find `DirectoryIndex`, Add `Homepage.html`, put it in the first entry

### Sqlite3 (Windows user needs to do this step, macOS user can ignore it)
* Open xampp/php/php
* Find `extension=sqlite3`, Remove `;`

### View the website

* from control panel Start Apache
* Enter `localhost` in the browser

