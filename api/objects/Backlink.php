<?php
class Backlink {
    private $conn;
    private $table_name = "backlinks";

    public $id;
    public $user_id;
    public $url;
    public $target_url;
    public $keyword;
    public $title;
    public $status;
    public $da;
    public $pa;
    public $spam_score;
    public $created;
    public $expires;
    public $last_checked;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    user_id = :user_id,
                    url = :url,
                    target_url = :target_url,
                    keyword = :keyword,
                    title = :title,
                    status = :status,
                    created = :created";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':target_url', $this->target_url);
        $stmt->bindParam(':keyword', $this->keyword);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':created', $this->created);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . "
                SET
                    url = :url,
                    target_url = :target_url,
                    keyword = :keyword,
                    title = :title,
                    status = :status,
                    da = :da,
                    pa = :pa,
                    spam_score = :spam_score,
                    expires = :expires,
                    last_checked = :last_checked
                WHERE id = :id AND user_id = :user_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':target_url', $this->target_url);
        $stmt->bindParam(':keyword', $this->keyword);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':da', $this->da);
        $stmt->bindParam(':pa', $this->pa);
        $stmt->bindParam(':spam_score', $this->spam_score);
        $stmt->bindParam(':expires', $this->expires);
        $stmt->bindParam(':last_checked', $this->last_checked);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':user_id', $this->user_id);

        return $stmt->execute();
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . "
                WHERE id = :id AND user_id = :user_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':user_id', $this->user_id);

        return $stmt->execute();
    }

    public function getAll($user_id) {
        $query = "SELECT *
                FROM " . $this->table_name . "
                WHERE user_id = ?
                ORDER BY created DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $user_id);
        $stmt->execute();

        return $stmt;
    }

    public function getOne() {
        $query = "SELECT *
                FROM " . $this->table_name . "
                WHERE id = ? AND user_id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $this->user_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->url = $row['url'];
            $this->target_url = $row['target_url'];
            $this->keyword = $row['keyword'];
            $this->title = $row['title'];
            $this->status = $row['status'];
            $this->da = $row['da'];
            $this->pa = $row['pa'];
            $this->spam_score = $row['spam_score'];
            $this->created = $row['created'];
            $this->expires = $row['expires'];
            $this->last_checked = $row['last_checked'];
            return true;
        }
        return false;
    }
}
