

function PageButton(pagetotal,array){
    document.getElementById("pagebutton").addEventListener("change", function(evt){ 
            changepage(evt.target.value,array);
            if(evt.target.value==pagetotal){
                pagedownhover1();
            }
            else{
                pagedownhover2();
            }
            if(evt.target.value==1){
                pageuphover1();
            }
            else{
                pageuphover2();
            }
    }) 
    pageupcheck(array);
    pagedowncheck(pagetotal,array);
}


function pagedowncheck(pagetotal,array){
    if(pagetotal==1){
        pagedownhover1();
    }
    else{
        pagedownhover2();    
    }
     $('#Nextpage').click(function(){
                if($('#pagebutton').val()!=pagetotal){
                    pagedownhover2();
                    $('#pagebutton').val(String(Number($('#pagebutton').val())+1));
                    changepage($('#pagebutton').val(),array);

                    if($('#pagebutton').val()=='2'){
                        pageuphover2();
                    }
                    if($('#pagebutton').val()==pagetotal){
                        pagedownhover1();
                    }
                }
                else{
                    pagedownhover1();
                }
                
                //$("html,body").scrollTop(0);
        });
}


function pageupcheck(array){
    pageuphover1();
    $('#Prepage').click(function(){
        if($('#pagebutton').val()!='1'){
            pageuphover2();
            $('#pagebutton').val(String(Number($('#pagebutton').val())-1));
            changepage($('#pagebutton').val(),array);
            pagedownhover2();
            if($('#pagebutton').val()=='1'){
               pageuphover1();
            }
            
        }
        else{
            pageuphover1();
        }
    });
}

function pageuphover1(){
    $('#Prepage').mouseover(function(){
        $('#Prepage').css({'background-color':'#e3e3e3', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});
    })
    $('#Prepage').css({'background-color':'#e3e3e3', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});
    $('#Prepage').mouseout(function(){
        $('#Prepage').css({'background-color':'#e3e3e3', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});  
    })
}

function pageuphover2(){
    $('#Prepage').css({'background-color':'#f9f9f9', 'color':'black', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});      
    $('#Prepage').mouseover(function(){
                $('#Prepage').css({'background-color':'#87adb5', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.8)'});
    })
    $('#Prepage').mouseout(function(){
                $('#Prepage').css({'background-color':'#f9f9f9', 'color':'black', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});      
    })
}

function pagedownhover1(){
    $('#Nextpage').css({'background-color':'#e3e3e3', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});
    $('#Nextpage').mouseover(function(){
        $('#Nextpage').css({'background-color':'#e3e3e3', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});
     })
    $('#Nextpage').mouseout(function(){
        $('#Nextpage').css({'background-color':'#e3e3e3', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});      
    })
}

function pagedownhover2(){
    $('#Nextpage').css({'background-color':'#f9f9f9', 'color':'black', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});      
    $('#Nextpage').mouseover(function(){
        $('#Nextpage').css({'background-color':'#87adb5', 'color':'white', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.8)'});
     })
    $('#Nextpage').mouseout(function(){
        $('#Nextpage').css({'background-color':'#f9f9f9', 'color':'black', 'box-shadow':'5px 5px 5px 0px rgba(0,0,0,0.2)'});      
    })
}

function changepage(pageindex,array){
    let htmltxt = "<h1> Housing List </h1>";
    var id=0;
    //$('.HousingList').html("Success");
    for (var i =(pageindex-1)*6; i < (pageindex*6) && i < array.length; i++) {
        htmltxt+="<li class='Listing' id='li"+id+"' title = '"+array[i]['name']+"'><div class='Gallery'>"+
                        "<img src='"+array[i]['image_url']+"' class='imgleft' title='The image of the house' width='80%' height='80%'></img></div>"+
                        "<div class='description'>"+
                            "<h4>"+array[i]['name']+"</h4>"+
                            "<h3>"+array[i]['address']+"</h3>"+
                            "<p>$"+array[i]['price']+"/month</p>"+
                            "<p>E-mail: "+array[i]['email']+"</p></div></li></a>";
        id++;
    }
    $('.HousingList ul').html(htmltxt);
    $("html,body").scrollTop(0);
}

