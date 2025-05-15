<?php
class Database
{
    private $host = "dpg-d0j0ilt6ubrc73ckdfug-a.singapore-postgres.render.com";
    private $db_name = "school_ms_l23z";
    private $username = "school_ms_l23z_user";
    private $password = "Y3gJTmBspmF76wwoqUVKeXAsObhkGWhg";
    private $databaseType = "pgsql";

    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        try {
            $dsn = ($this->databaseType === "pgsql")
                ? "pgsql:host={$this->host};port=5432;dbname={$this->db_name}"
                : "{$this->databaseType}:host={$this->host};dbname={$this->db_name}";

            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection error: " . $e->getMessage();
            throw new Exception("Connection Error: " . $e->getMessage());
        }

        return $this->conn;
    }
}
