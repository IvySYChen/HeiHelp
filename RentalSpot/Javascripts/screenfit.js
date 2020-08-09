//To apply proper changes to the elements to fit into different devices and screen sizes


//screen window size
var width = $(window). width(); 
var height = $(window). height();

//width>1000  (Ipad/Ipad Pro/PC...)
if(width>=1000){
	/*Main*/
	if($('.box').length){
		var sidebarh=$('.main').height();
		const cssName=$("link:eq(1)").attr("href");
		var w=($('.box').width()-$('#box2').width())/2;
		$('.box').css({'margin-right':w,'margin-top':'15px','padding':'0'});
		if(cssName=="CSS\\stylesheet2.css"){
			$('.sidebar_inner').replaceWith("<div class='sidebar_inner'><a class='twitter-timeline' data-width='85%' data-height="+sidebarh+" data-theme='light' href='https://twitter.com/DrEsGarden1?ref_src=twsrc%5Etfw'> Tweets by DrEsGarden1</a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>");
		}
		else{
			$('.sidebar_inner').replaceWith("<div class='sidebar_inner'><a class='twitter-timeline' data-width='85%' data-theme='dark' data-height="+sidebarh+" href='https://twitter.com/DrEsGarden1?ref_src=twsrc%5Etfw'> Tweets by DrEsGarden1</a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div>");
		}
	}
	var heightlef=$('.leftside img').width()/3*4;
	$('.leftside img').css({'height':heightlef,'margin':'0 auto'});
	$('.rightside').css({'height':'auto','padding':'0','padding-bottom':'20px'});
	var heiright;
	for (i = 0; i < 4; i++) {
		if($('.rightside:eq('+i+')').length){
			console.log(i);
			heiright=$('.rightside:eq('+i+')').height()+10;
			if(heiright<heightlef){
				heiright=heightlef;
			}
			$('.rightside:eq('+i+')').css('height',heiright);;
			$('.leftside:eq('+i+')').css({'padding':'0','padding-bottom':'20px','height':heiright});
		}
	}
//1000=<width<1200
	if(width<1200){
		$('#nav li:nth-child(4) a').text('AnimeRecom');
		$('#nav li:nth-child(3) a').text('JapanLov');
		$('#nav li').css('width','15%');
		$('#nav').css({'padding-right':'1%','padding-left':'1%'});
		$('#nav li:nth-child(6)').css('padding','0');
	}
}
//width<1000
else{
	/*Main*/
	if($('.box').length){
		$('.main').css({'width':'100%','margin':'0'});
		$('.mainbar').css({'margin':'auto','padding':'0'});
		$('.sidebar').css('width','100%');
		var w=($('.box').width()-$('#box2').width())/2;
		$('.box').css({'margin-right':w,'margin-top':'15px','padding':'0'});
	}
	
	/*General inside the header*/
	var hei=$('.leftheader').height();
	$('.Title1').css('height',hei);
	if(!$('#nolink a').attr('href')){
			$('#nolink').replaceWith('');
	}
	$('.leftheader').css({'width':'100%','text-align':'center'});
	$('.Language1').css({'width':'100%','margin-top':'0','left':'0','text-align':'center','margin-left':'2.5%'});
	$('.button1').css('width','100%');
	$('#chosenbutton').css('width','100%');
	$('#language1 li').css({'margin':'0 auto','width':'30%','display':'inline-block','padding':'0 2.5% 0 0'});
	var $rightheader = $('.Title1 > .rightheader');
	$rightheader.parent().after($rightheader);
	$('.rightheader').css({'height':'30px','width':'100%','text-align':'center'});
	$('#Cnone li:nth-child(1)').css('width','25%');
	$('#Cnone li:nth-child(2)').css('width','50%');
	$('#Cnone li').css('display','inline-block');
	$('#Cnone li:nth-child(2)').replaceWith("<li><a href='https://twitter.com/DrEsGarden1' class='twitter-follow-button' data-show-count='false' data-lang='en-US' data-size='large'>Follow @DrEsGarden1</a></li>");
	$('#Cnone li:nth-child(1)').css('margin-left','10px');
	$('#Cnone li:nth-child(3)').css('width','5%');
	var widtht = $('#Cnone li:nth-child(1)').width()+$('#Cnone li:nth-child(2)').width()+$('#Cnone li:nth-child(3)').width()+100;
	var leftwidth=($('.rightheader').width()-widtht)/2
	$('#Cnone').css({'text-align':'center','width':widtht,'margin-left':leftwidth,'margin-right':leftwidth,'padding':'0','margin-top':'0','right':'initial','display':'inline-block','position':'initial'});
	$('.leftside').css({'text-align':'center','width':'100%','margin':'10px auto','min-width':'0','height':'auto'});
	$('.rightside').css({'width':'98%','margin':'20px auto','height':'auto'});
	//body
	$('.main-inner h3').css('text-align','center');
	$('.main2').css({'width':'100%','margin':'0 auto'});
	$('.main_centerinner2').css({'width':'96%','margin':'0 auto'});
	$('.main').css({'width':'100%','margin':'0 auto'});
	$('.side').css({'width':'100%','margin':'0 auto'});
	$('.main-inner').css({'width':'96%','margin':'0 auto','padding':'0'});
	//musicplayer
	$('#musicplayer').css({'width':'95%','margin-left':'2.5%','height':'30px','margin-bottom':'10px'});
	//Mode
	$('.Mode1').css({'right':'auto','position':'relative','width':'100%','float':'left','min-width':'auto'});
	$('.Mode1 h5').css({'width':'100%','text-align':'center','height':'28px','padding':'0'});
	$('.Mode1 button').css({'width':'100%','text-align':'center','height':'28px','padding':'0'});
	
	//search bar
	var wid=$('.search-container').width()-55;
	$('.search-container').css('display','block');
	$('.search-container').css({'text-align':'center','padding-left':'0'});
	$('.search-container input[type=text]').css('width',wid);
	//width<=800 (most of the mobile devices)
	if(width<=800){
		//width<=500
		if(width<=500){
				$('#body').css('line-height','1.6');
				$('#container').css({'width':'87%','padding-right':'5px','padding-left':'5px'});
				$('.Mode1 button').css('margin','0 auto');
				$('#table2').css({'font-size':'9.5px','margin':'auto'});
				$('.two').css({'font-size':'9.5px','margin':'auto'});
				$('#imageja').css({'width':'120px','height':'120px'});
				$('#Cnone li').css({'width':'100%','text-align':'center'});
				$('.Title1').css('margin-left','0');
				var ntwidt=$('#Cnone li:nth-child(1)').width();
				var marwidt=(ntwidt-230)/2;
				$('#txt').css({'font-size':'150%','height':'35px','width':'91.65px','margin-right':marwidt,'display':'inline-block'});
				$('#Cnone li').css({'padding':'0','margin':'0 auto'});
				var ntwidth=$('#Cnone li:nth-child(2)').width();
				var marwidth=(ntwidth-175)/2+0.04*width;
				$('#Cnone li:nth-child(2)').css({'margin-right':marwidth,'right':'initial','width':'175px'});
				$('#Cnone').css('margin-top','0');
				$('#Cnone li:nth-child(3)').replaceWith("");
				$('.rightheader').css('height','60px');
			}
			else{
				$('#Menuimage').css('margin-right','-50px');
				$('#imageja').css({'width':'200px','height':'200px'});
			}
	}
	//width<400
	if(width<400){
		/*The live chat*/
		var heightlivechat=height*0.7-18;
		$('.livechat h3').css('font-size','8px');
		$('.livechat h2').css('font-size','10px');
		if($('link:eq(1)').attr('href')=="CSS\\stylesheet2.css"){
			$('.livechat iframe').replaceWith("<iframe src='https://www6.cbox.ws/box/?boxid=845210&boxtag=DSfdzs' width='100%' height="+heightlivechat+" allowtransparency='yes' allow='autoplay' frameborder='0' marginheight='0' marginwidth='0' scrolling='auto'></iframe>");
		}
		else{
			$('.livechat iframe').replaceWith("<iframe src='https://www6.cbox.ws/box/?boxid=845239&boxtag=Q2NNwf' width='100%' height="+heightlivechat+" allowtransparency='yes' allow='autoplay' frameborder='0' marginheight='0' marginwidth='0' scrolling='auto'></iframe>");
		}
		$('.livechat').css({'width':'80%'});
		var lvw=$('body').width()*0.8+40;
		$('#lcbutton').text("Live Chat");
		$('#lcbutton').css('width',lvw);
					
		/*AnimeRecommendation*/
		var imgw=$('.leftside').width()-10;
		var imgh=imgw/3*4;
		$('.leftside img').css({'height':imgh,'width':imgw});
		$('.rightside').css({'height':'auto','margin-bottom':'20px'});
	}	
// 400=<width<1000
	else{
		$('.leftside img').css('width','300px');
	}
}

//ajust the position of the language buttons for different languages
if(document.getElementsByTagName('html').item(0).lang=="zh"){
	document.getElementById('chosenbutton').style.marginTop="-2px";
}

if(document.getElementsByTagName('html').item(0).lang=="ja"){
	if($('#box2').length){
		document.getElementById('box2').style.width="80%";
		document.getElementById('box2').style.marginLeft="10%";
		document.getElementById('box2').style.marginRight="10%";
	}
}

if(document.getElementsByTagName('html').item(0).lang=="en-US"){
	if($('#box2').length){
		document.getElementById('box2').style.width="80%";
		document.getElementById('box2').style.marginLeft="10%";
		document.getElementById('box2').style.marginRight="10%";
	}
	
}

$('body').css('margin','0');
var contw=$('#container').width();
var pad='-'+$('#container').css('padding-right');
contw=pad+contw;
//footer
$('#footer').css({'margin-left':pad,'margin-right':pad,'width':contw,'padding':'20px'});