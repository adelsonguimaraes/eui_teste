<?php

    // adicionando a conexão
    require_once('../../util/conexao.php');
    // estancinado a conexao
    $con = Conexao::getInstance()->getConexao();


    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
    $offset = $page*intval($_POST['rows']) - intval($_POST['rows']);

    // echo $offset;exit;

    $sqlTotal = "SELECT *
    FROM cadastro_clientes cc";

    // echo $sql;exit;

    // verificando se existem filtros na consulta
    $where = "";
    if (!empty($_REQUEST['filterRules'])) {
        $campos = json_decode($_REQUEST['filterRules'], true);
        foreach($campos as $key) {
            $where .= $key["field"] . " LIKE '%" . $key["value"] . "%' AND ";
        }
        $where = substr($where, 0, -4);
    }
    if (!empty($where)) $where = " WHERE " . $where;

    // verificando se existe order by
    $orderby = "";
    if (!empty($_REQUEST['sort']) && !empty($_REQUEST['order'])) {
        $sorts = explode(",", $_REQUEST['sort']);
        $orders = explode(",", $_REQUEST['order']);

        $orderby = " ORDER BY ";
        for ($i=0; $i<count($sorts); $i++) {
            $orderby .= $sorts[$i] . " " . $orders[$i] . ", ";
        }
        $orderby = substr($orderby, 0, -2);
    }

    $sql = "SELECT * 
    FROM cadastro_clientes cc
    $where
    $orderby
    LIMIT $offset, $rows";

    // total
    $rs = mysqli_query($con, $sqlTotal);
    if ($rs) {
        $total = mysqli_num_rows($rs);
    }

    $result = array(
        "total" => 0,
        "rows" => array()
    );

    $rs = mysqli_query($con, $sql);
    if ($rs) {
        $itens = array();
        while ($row = mysqli_fetch_assoc($rs)) {
            array_push($itens, $row);
        }
    }else{
        die (mysqli_error($con));
    }
    $result['rows'] = $itens;
    $result['total'] = $total;

    echo json_encode($result);

?>