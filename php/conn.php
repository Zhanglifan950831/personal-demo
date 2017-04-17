<?php  
    $dbHost="localhost";         //数据库地址
    $dbUser="root";              //数据库用户
    $dbPwd="";                   //数据库密码
    $dbName="xishu";        //数据库名

    $mysqli=new mysqli($dbHost,$dbUser,$dbPwd,$dbName); //连接数据库

    if ($mysqli->connect_error) {
        die('数据库连接错误'.$mysqli->connect_error);
    }

    $mysqli->query('set names utf8');      //设置字符编码
?>