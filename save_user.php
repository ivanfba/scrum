<?php
$file = 'users.json';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $estimation = $_POST['estimation'];
    $visualize = $_POST['visualize'];

    // Read the JSON file and convert it to a PHP object
    $users = json_decode(file_get_contents($file), true);

    // Check if the user already exists and delete it if necessary
    foreach ($users['users'] as $key => $user) {
        if ($user['name'] == $name) {
            unset($users['users'][$key]);
        }
    }

    if ($visualize != 'K') {    
        // Add the new user to the object
        $users['users'][] = array('name' => $name, 'estimation' => $estimation);
    }else{

      // If the user is Kicked (K) then remove the avatar file:
      $filename = 'avatar/' . $name;
            
      if (file_exists($filename)) {
        if (unlink($filename)) {
            echo "Avatar removed.";
        } else {
            echo "Failed to remove $filename.";
        }
      } else {
        echo "Avatar $filename does not exist.";
      }

    }

    if ($visualize == "true" && ($users['visualize'] == "true" || $users['visualize'] == "" || $users['visualize'] == "false" || $users['visualize'] == "new")) {
        $users['visualize'] = "true";
    }

    if ($visualize == "clear" && ($users['visualize'] == "true" || $users['visualize'] == "" )) {
        foreach ($users['users'] as $key => $user) {
            $users['users'][$key]['estimation'] = '';
        }
        $users['visualize'] = "clear";
    }  

    if ($visualize == "new" && ($users['visualize'] == "true" || $users['visualize'] == "" || $users['visualize'] == "false" || $users['visualize'] == "clear")) {
        foreach ($users['users'] as $key => $user) {        
            $users['users'][$key]['estimation'] = '';        
        }
        $users['visualize'] = "false";
    }    
  
    // Write the object back to the JSON file
    file_put_contents($file, json_encode($users));

    if ($visualize != 'K') {    
      // Create avatar if not exists
      $filename = 'avatar/' . $name;
      if (!file_exists($filename)) {
          $random_number = rand(1, 10);
          $source = 'avatar/images' . $random_number . '.png';
          copy($source, $filename);
      }
    }

    // Return a response for the AJAX request
    echo 'ok';
}
?>
