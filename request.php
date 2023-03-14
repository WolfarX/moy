<?php
include('conn.php');

$niveau = $_POST['nv'];
$test = array();
  $sql = "select * from `" . $niveau . "`";
  $result = mysqli_query($conn, $sql) or die(mysql_error($conn));
  while ($row = mysqli_fetch_array($result)){
    $matiere =  $row['matiere'];
    $coeff = $row['coeff'];
    $controle = $row['controle'];
    $orale = $row['orale'];
    $tp = $row['TP'];
  // The JSON standard MIME header.
  header('Content-type: application/json');
  $array = array(
  	'matiere'=>$matiere,
  	'coeff'=>$coeff,
  	'controle'=>$controle,
    'orale'=>$orale,
    'tp'=>$tp
  );
  array_push($test,$array);
}
   echo json_encode($test);

?>