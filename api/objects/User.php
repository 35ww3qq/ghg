<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $name;
    public $email;
    public $password;
    public $role;
    public $credits;
    public $status;
    public $created;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name,
                    email = :email,
                    password = :password,
                    role = :role,
                    credits = :credits,
                    status = :status,
                    created = :created";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':credits', $this->credits);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':created', $this->created);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function emailExists() {
        $query = "SELECT id, name, password, role, credits, status
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->name = $row['name'];
            $this->password = $row['password'];
            $this->role = $row['role'];
            $this->credits = $row['credits'];
            $this->status = $row['status'];
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    name = :name,
                    email = :email,
                    role = :role,
                    credits = :credits,
                    status = :status
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':credits', $this->credits);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    public function updatePassword($new_password) {
        $query = "UPDATE " . $this->table_name . "
                SET password = :password
                WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $password_hash = password_hash($new_password, PASSWORD_BCRYPT);

        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }
}
