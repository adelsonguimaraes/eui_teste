<?php
/*
	Projeto: VWA - Vigo Web Admin.
	Project Owner: Giovanni Russo.
	Desenvolvedor: Adelson Guimarães Monteiro.
	Data de início: 2019-09-10T15:20:27.995Z.
	Data Atual: 10/09/2019.
*/

Class Conexao {
	private $con;

	protected function __construct () {
		$this->con = mysqli_connect("10.51.7.1","nuvio","nuvi0@dm_1343", "vigo_erp");
		
		if (mysqli_connect_error()) {
			echo "Falha na conexão com MySQL: " . mysqli_connect_error();
		}
	}
	public static function getInstance () {
		static $instance = null;
		if (null === $instance){
			$instance = new static();
		}
		return $instance;
	}
	public function getConexao () {
		mysqli_query($this->con, "SET lc_time_names = 'pt_BR'");
		mysqli_query($this->con, "SET NAMES 'utf8'");
		mysqli_query($this->con, 'SET character_set_connection=utf8');
		mysqli_query($this->con, 'SET character_set_client=utf8');
		mysqli_query($this->con, 'SET character_set_result=utf8');
		return $this->con;
	}
}

// Classe gerada com BlackCoffeePHP 2.0 - by Adelson Guimarães
?>