<?php
// Verifica si se ha enviado un archivo y un nombre
if (isset($_FILES['imagen']) && isset($_POST['nameAvatar'])) {
  $file = $_FILES['imagen'];
  $nameAvatar = $_POST['nameAvatar'];

  // Verifica si el archivo es una imagen válida
  if ($file['error'] == UPLOAD_ERR_OK && getimagesize($file['tmp_name'])) {
    // Mueve el archivo a la carpeta deseada en el servidor con el nombre deseado
    $filename = $nameAvatar;
    move_uploaded_file($file['tmp_name'], 'avatar/' . $filename);

    // Si se quiere, se puede guardar el nombre del archivo en una base de datos
    // o mostrar un mensaje de éxito
    echo "La imagen se ha guardado correctamente.";
  } else {
    echo "El archivo no es una imagen válida.";
  }
}
?>
