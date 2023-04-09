<?php
$file = 'users.json';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['name'];
  $estimation = $_POST['estimation'];
  $visualize = $_POST['visualize'];

  // Leer el archivo JSON y convertirlo en un objeto PHP
  $users = json_decode(file_get_contents($file), true);

  // Verificar si el user ya existe y eliminarlo si es necesario
  foreach ($users['users'] as $key => $user) {
    if ($user['name'] == $name) {
      unset($users['users'][$key]);
    }
  }

  // Agregar el nuevo user al objeto
  $users['users'][] = array('name' => $name, 'estimacion' => $estimation);
  
  
  if ($visualize=="true" && ($users['visualize']=="true" || $users['visualize']=="" || $users['visualize']=="false" || $users['visualize']=="new"  )){
    $users['visualize'] = "true";
  }
  if ($visualize=="clear" && ($users['visualize']=="true" || $users['visualize']=="" ) ) {
    foreach ($users['users'] as $key => $user) {
        
            $users['users'][$key]['estimacion']='';
        
    }
    $users['visualize'] = "clear";
  }  

  if ($visualize=="new" && ($users['visualize']=="true" || $users['visualize']=="" || $users['visualize']=="false" || $users['visualize']=="clear"  )) {
    foreach ($users['users'] as $key => $user) {        
            $users['users'][$key]['estimacion']='';        
    }
    $users['visualize'] = "false";
  }    
  
  
  // Escribir el objeto de vuelta al archivo JSON
  file_put_contents($file, json_encode($users));
  
      
    $filename = 'avatar/' . $name;
    if (!file_exists($filename)) {
        
    $numero_aleatorio = rand(1, 10);

      $origen = 'avatar/images' . $numero_aleatorio . '.png';
      copy($origen, $filename);
    }
  

  // Devolver una respuesta para la solicitud AJAX
  echo 'ok';
}
?>
