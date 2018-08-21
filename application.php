<?php 
 
$sendto   = "kulbachenko@gmail.com"; // почта, на которую будет приходить письмо
$username = $_POST['form_name'];   // сохраняем в переменную данные полученные из поля c именем
$usermail = $_POST['form_email']; // сохраняем в переменную данные полученные из поля c адресом электронной почты
$usercomment = $_POST['form_textarea']; // сохраняем в переменную данные полученные из поля c адресом электронной почты
 
// Формирование заголовка письма
$subject  = "Новое сообщение";
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
 
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Cообщение с сайта АВ Бистро</h2>\r\n";
$msg .= "<p><strong>От кого:</strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
$msg .= "<p><strong>Сайт:</strong> ".$usercomment."</p>\r\n";
$msg .= "</body></html>";
 
// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
    echo "<center><img src='img/spasibo.png'></center>";
} else {
    echo "<center><p><strong>Не отправлено</strong></p></center>";
}
 
?>