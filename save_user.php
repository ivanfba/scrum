<?php
$file = 'users.json';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['name'];
  $estimation = $_POST['estimation'];
  $visualize = $_POST['visualize'];

  // Leer el archivo JSON y convertirlo en un objeto PHP
  $users = json_decode(file_get_contents($file), true);

  // Verificar si el usuario ya existe y eliminarlo si es necesario
  foreach ($users['usuarios'] as $key => $user) {
    if ($user['nombre'] == $name) {
      unset($users['usuarios'][$key]);
    }
  }

  // Agregar el nuevo usuario al objeto
  $users['usuarios'][] = array('nombre' => $name, 'estimacion' => $estimation);
  
  
  if ($visualize=="true" && ($users['visualize']=="true" || $users['visualize']=="" || $users['visualize']=="false" || $users['visualize']=="new"  )){
    $users['visualize'] = "true";
  }
  if ($visualize=="clear" && ($users['visualize']=="true" || $users['visualize']=="" ) ) {
    foreach ($users['usuarios'] as $key => $user) {
        
            $users['usuarios'][$key]['estimacion']='';
        
    }
    $users['visualize'] = "clear";
  }  

  if ($visualize=="new" && ($users['visualize']=="true" || $users['visualize']=="" || $users['visualize']=="false" || $users['visualize']=="clear"  )) {
    foreach ($users['usuarios'] as $key => $user) {        
            $users['usuarios'][$key]['estimacion']='';        
    }
    $users['visualize'] = "false";
  }    
  
  
  // Escribir el objeto de vuelta al archivo JSON
  file_put_contents($file, json_encode($users));

  // Devolver una respuesta para la solicitud AJAX
  echo 'ok';
}
?>
