<?php
    $db = new SQLite3('Listing.db');
	
	
    if(!empty($_POST['keysearch']))
    {
        
        list($startDate, $endDate) = explode(' - ', $_POST['daterange']);

        /*list($startDate, $endDate) = explode(' - ', $_POST['daterange']);
        $ava_date=strtotime($startDate);
        $end_date=strtotime($end_date);*/
        /*
        // Formulate the Difference between two dates 
        $diff = abs($end_date - $ava_date);  
        // To get the year divide the resultant date into 
        // total seconds in a year (365*60*60*24) 
        $years = floor($diff/(365*60*60*24));  
        // To get the month, subtract it with years and 
        // divide the resultant date into 
        // total seconds in a month (30*60*60*24) 
        $months = floor(($diff - $years * 365*60*60*24)/(30*60*60*24)+$years*12);
        $lease_type=$months;*/
        $sql = $db->query("
        SELECT * FROM listinginfo
        WHERE school LIKE '%" .$_POST['keysearch']."%'
        AND ac LIKE '%" . $_POST['AC'] ."%'
        AND furnished LIKE '%" . $_POST['Furnished'] ."%'
        AND laundry LIKE '%" . $_POST['LF'] ."%'
        AND parking LIKE '%" . $_POST['Parking'] ."%'
        AND price >= ".$_POST['lp']."
        AND price <= ".$_POST['mp']."
        AND end_date>=" .$endDate."
        AND (type_accom LIKE '%" . $_POST['Apartment'] ."%'
        OR type_accom LIKE '%" . $_POST['House'] . "%'
        OR type_accom LIKE '%" . $_POST['Other'] . "%')
        ORDER BY price ASC 
        ");
        $text = array();
        $card = array();
        $htmltxt = "<ul>
                        <h1> Housing List </h1>";
        $i = 0;
        $pagearray = array();
        
        while($row = $sql->fetchArray()){
            
            if($i<=5){
                $htmltxt .="<li class='Listing' id='li".$i."' title = '" .$row['name']. "'>
                <div class='Gallery'>
                    <img src='" . $row['image_url'] . "' class='imgleft' title='The image of the house'
                        width='80%' height='80%'></img>
                </div>
                <div class='description'>
                    <h4>" . $row['name']. "</h4>
                    <h3>" . $row['address']. "</h3>
                    <p>$" . $row['price']. "/month</p>
                    <p>E-mail: " . $row['email']. "</p>
                </div>
            </li>
            ";
            }
                $house = array();
                $house['latitude'] = $row['latitude'];
                $house['longitude'] = $row['longitude'];
                $house['price'] = $row['price'];
                $house['distance'] = $row['distance'];
                $house['image_url'] = $row['image_url'];
                $house['address'] = $row['address'];
                $house['pagenum'] = floor($i/6);
                $house['index'] = $i;
                $house['name'] = $row['name'];
		$house['email'] = $row['email'];
                array_push($text, $house);
                $pagehouse = array();
                $pagehouse['name']=$row['name'];
                $pagehouse['address']=$row['address'];
                $pagehouse['price']=$row['price'];
                $pagehouse['index']=$i;
                $pagehouse['email']=$row['email'];
                $pagehouse['image_url']=$row['image_url'];
                $pagehouse['pagenum']=floor($i/6); 
                array_push($pagearray,$pagehouse);
                $i=$i+1;
            }
            $htmltxt.="</ul></div></div>
            ";
            $pagetotal = ceil($i/6);
            $htmltxt .="<div id='pageflip'><div id='Prepage'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-chevron-left' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/>
            </svg></div>";
            $htmltxt .="<div class='pageblock'>
            <select id='pagebutton' name='pagebutton'>
                            <option id='page1' value=1 selected> Page 1 </option>
                            ";
            for ($x = 2; $x <= $pagetotal; $x++) {
                $htmltxt .="<option id='page".$x."' value=".$x."> Page ".$x." </option>
                ";
            }
            $htmltxt .="</select></div>";
            $htmltxt .="<div id='Nextpage'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-chevron-right' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
            <path fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/>
            </svg></div></div>";
            $all = array();
            array_push($card, $htmltxt);
            array_push($card, $pagetotal);
            array_push($all, $text);
            array_push($all, $card); 
            array_push($all, $pagearray);         
            array_push($all, $_POST['keysearch']);
            echo json_encode($all);
    }

?>
