<?php  
    header('Content-type:application/json;charset=utf-8');

    /*加载连接数据库文件*/
    require_once('conn.php');

    $output=[];     //输出内容

    $Name=$_GET['name'];    //用户名
    $userPwd=md5($_GET['pwd']);  //用户密码

    
    /*定义sql查询语句*/
    $sql="SELECT userName FROM user WHERE userName=? AND userPwd=?";
    /*echo $sql;
    exit;*/
    /*定义预处理语句*/
    $stmt=$mysqli->prepare($sql);
    $stmt->bind_param('ss',$Name,$userPwd);       //绑定参数
    $stmt->execute();

    $stmt->bind_result($userName);      //绑定结果用户名

    if ($stmt->fetch()) {
        $output['errCode']=0;
        $output['userName']=$userName;
    } else {
        $output['errCode']=1001;
        $output['msg']='用户名或密码输入错误,请重输!';
    }
    
    echo json_encode($output);      //输出json格式的结果集

    $stmt->close();
    $mysqli->close();   //关闭数据库连接
?>