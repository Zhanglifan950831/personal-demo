<?php  
    header('Content-type:application;charset=utf-8');

    /*加载连接数据库文件*/
    require_once('conn.php');

    $output=[];     //输出内容

    if (isset($_GET['id'])) {
        $id=$_GET['id'];
        $sql="SELECT desName,headImg,position,profession,concept,WorkingTime,company FROM designers WHERE desId=$id";
    } elseif(isset($_GET['name'])) {
        $desName=$_GET['name'];
        $sql="SELECT desId,desName,headImg,position,profession,concept,WorkingTime,company FROM designers WHERE desName LIKE '%$desName%'";
    } else {
        $sql="SELECT desId,desName,headImg,position,profession,concept,WorkingTime,company FROM designers";
    }

    $result=$mysqli->query($sql);

    if ($result->num_rows) {
        $output['errCode']=0;
        if (isset($_GET['id'])) {
            $output['data']=$result->fetch_assoc();
            /*查询设计师相关的获奖情况*/
            $sql="SELECT aName FROM awards WHERE desid=$id";
            $result=$mysqli->query($sql);
            $output['data']['awards']=$result->fetch_all(MYSQLI_ASSOC);
            /*查询设计师相关的作品*/
        }
        else{
            $output['data']=$result->fetch_all(MYSQLI_ASSOC);
        }
    } else {
        $output['errCode']=$mysqli->errno;
    }
    
    

    echo json_encode($output);

    $mysqli->close();
?>