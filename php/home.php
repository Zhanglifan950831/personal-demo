<?php  
    header('Content-type:application;charset=utf-8');

    /*加载连接数据库文件*/
    require_once('conn.php');

    $output=[];     //输出内容

    // 获取4条设计师相关信息
    $sql="SELECT desId,desName,headImg,position FROM designers LIMIT 0,4";

    $result=$mysqli->query($sql);

    if ($result->num_rows) {
        $output['errCode']=0;
        $output['data']['designer']=$result->fetch_all(MYSQLI_ASSOC);
        $sql="SELECT cases.caseId,designers.desName,cases.caseName,cases.caseImg FROM cases INNER JOIN designers ON cases.casedes = designers.desId LIMIT 0,4";
        $result=$mysqli->query($sql);
        $output['data']['cases']=$result->fetch_all(MYSQLI_ASSOC);
    } else {
        $output['errCode']=$mysqli->errno;
    }
    

    

    echo json_encode($output);

    $mysqli->close();
?>