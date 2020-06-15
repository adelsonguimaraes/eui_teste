<?php

    $contatos = array(
        array("id" => "1",
        "contato" => "(99) 99999-9999"),
        array("id" => "2",
        "contato" => "(99) 88888-8888"),
        array("id" => "1",
        "contato" => "(99) 77777-7777")
    );

    echo json_encode($contatos);

?>