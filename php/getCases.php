<?php  
    header('Content-type:application/json;charset=utf-8');
    
    require_once('conn.php');

    $output=[];

    $sql="SELECT cases.caseId,designers.desName,cases.caseName,cases.caseImg FROM cases INNER JOIN designers ON cases.casedes = designers.desId";
    if (isset($_GET['id'])) {
        $id=$_GET['id'];
        $sql="SELECT cases.caseId,designers.desName,cases.caseName,cases.caseImg FROM cases INNER JOIN designers ON cases.casedes = designers.desId WHERE cases.casedes=$id";
    }
    $result=$mysqli->query($sql);

    if ($mysqli->error) {
        $output['errCode']=$mysqli->errno;
        $output['msg']="服务异常";
    } else {
        $output['errCode']=0;
        $output['size']=$result->num_rows;
        $output['pages']=ceil($output['size']/9);
        if (isset($_GET['page'])) {
            $page=$_GET['page'];
            $start=($page-1)*9;
            $sql="SELECT cases.caseId,designers.desName,cases.caseName,cases.caseImg FROM cases INNER JOIN designers ON cases.casedes = designers.desId LIMIT $start,9";
            if (isset($_GET['id'])) {
                $id=$_GET['id'];
                $sql="SELECT cases.caseId,designers.desName,cases.caseName,cases.caseImg FROM cases INNER JOIN designers ON cases.casedes = designers.desId WHERE cases.casedes=$id LIMIT $start,9";
            }
        }
        $result=$mysqli->query($sql);
        $output['data']=$result->fetch_all(MYSQLI_ASSOC);
    }
    
    echo json_encode($output);

    $mysqli->close();

?>