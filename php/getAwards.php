<?php  
    header('Content-type:application/json;charset=utf-8');

    /*加载连接数据库文件*/
    require_once('conn.php');

    $id=$_GET['id'];
    $sql="SELECT aName FROM awards WHERE desId=$id";

    $result=$mysqli->query($sql);

    if ($mysqli->error) {
        $output['errCode']=$mysqli->errno;
    } else {
        $output['data']=$result->fetch_all(MYSQLI_ASSOC);
        $output['errCode']=0;
    }

    echo json_encode($output);

    $mysqli->close();
?>