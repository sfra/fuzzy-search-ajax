<?php
    include_once "/home/szymon/pass/02.php";


    $searchKey = json_decode(file_get_contents('config/main.json'),true)['searchKey'];



    $mysqli = new mysqli('localhost',$user,$password,'fuzzy');

    $template = file_get_contents('config/itemTemplate.html');
   
    $key = $mysqli->real_escape_string($_POST[$searchKey]);

    $output = '';

    
    $sql = $mysqli->prepare('SELECT *,LEVENSHTEIN(?,?) as distance, SOUNDEX(?) as s0, SOUNDEX(?) as s1  FROM people WHERE LEVENSHTEIN(surname,?)<4 ORDER BY DISTANCE') ;
    $sql->bind_param('sssss', $searchKey, $key,$searchKey,$searchKey, $key);
    $sql->execute();
    $i=0;
    $results = $sql->get_result();
    
    $fuzzy=false;
    $output='';
    while(($row=$results->fetch_assoc())){
       

        if($row['distance']===0 || $fuzzy) {
            $output.=$template;
        }
          else {
            
            $output.='<span class="fuzzy">Did you mean?:</span> '.$template;
            $fuzzy=true;
          }
        
      


       if($i===0) {
            $output=str_replace('{{class}}','class="highlighten"',$output);
            $i=$i+1;    
            
       }

        $output=str_replace('{{src}}',$row['src'],$output);
        $output=str_replace('{{surname}}',$row['surname'],$output);
        $output=str_replace('{{role}}',$row['role'],$output);
        
       
    }
    print_r($output);
?>