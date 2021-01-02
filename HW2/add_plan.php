<?php
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$NEW_USER = array(
"id" => test_input($_POST["id"]),
"date" => test_input($_POST["date"]),
"time" => test_input($_POST["time"]),
"title" => test_input($_POST["title"]),
"description" => test_input($_POST["description"]),
);

$NEW_PLAN = array(
"date" => $NEW_USER["date"],
"time" => $NEW_USER["time"],
"title" => $NEW_USER["title"],
"description" => $NEW_USER["description"],
);



// 날짜, 시간이 같은지 확인하고
//중복되지 않으면 파이렝 추가하는 것.
/*Load File*/
$userplanJSON;

$d = date("Ym",time());
$filename = "data/".$NEW_USER["id"]."_".$d.".json";


$existSametime = 1;
if(!file_exists($filename)){

}
else{
$userplanJSON = fopen($filename, "r");
while(!feof($userplanJSON)){
  if(strlen($line = fgets($userplanJSON)) == 0 ) break;
    $userPlan = json_decode(trim($line),true);
    if((strcmp($userPlan["date"],$NEW_USER["date"]) === 0) &&
      (strcmp($userPlan["time"],$NEW_USER["time"]) === 0)){
      $existSametime = 0;
      break;
    }
}
fclose($userplanJSON);
if($existSametime == 0){
  echo "동일한 시간에 일정이 존재합니다.";
}else{
  $filename = "data/".$NEW_USER["id"]."_".$d.".json";
  $userplanJSON = fopen($filename, "a");
  fwrite($userplanJSON,json_encode($NEW_PLAN)."\n");
  echo "success";
  fclose($userplanJSON);
}
}
?>
