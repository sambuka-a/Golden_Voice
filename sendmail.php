<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('en', 'phpmailer/language/');
    $mail->IsHTML(true);

    //Sender 
    $mail->setFrom('konkurs@slowiany.org', 'Konkurs wokalny');
    //Recepient
    $mail->addAddress('slowiany@gmail.com');
    //Mail Subject
    $mail->Subject = 'Konkurs Wokalny Zgloszenie';

    //Category
    $category = "I (6-9 Lat)";
    if ($_POST['category'] == "II (10-12 Lat)") {
        $category = "II (10-12 Lat)";
    } else if ($_POST['category'] == "III (13-15 Lat)") {
        $category = "III (13-15 Lat)";
    } else if ($_POST['category'] == "IV (16-18 Lat)") {
        $category = "IV (16-18 Lat)";
    } else {
        $category = "V (19 + Lat)";
    }

    //Mail Body
    $body = '<h1>Nowe zgloszenie</h1>';

    if(trim(!empty($_POST['name']))) {
        $body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['surname']))) {
        $body.='<p><strong>Surname:</strong> '.$_POST['surname'].'</p>';
    }
    if(trim(!empty($_POST['email']))) {
        $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['phone']))) {
        $body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['category']))) {
        $body.='<p><strong>Category:</strong> '.$category.'</p>';
    }
    if(trim(!empty($_POST['address']))) {
        $body.='<p><strong>Address:</strong> '.$_POST['address'].'</p>';
    }
    if(trim(!empty($_POST['link']))) {
        $body.='<p><strong>Link:</strong> '.$_POST['link'].'</p>';
    }

    //Message send
    if (!$mail->send()){
        $message = 'Message sent!';
    }
    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>