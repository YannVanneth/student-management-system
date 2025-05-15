<?php
require_once __DIR__ . '/../models/Student.php';
require_once __DIR__ . '/../config/Database.php';

class StudentRepository
{
    private $conn;
    private $table_name = "students";

    public function __construct()
    {
        $database = new Database();
        $db = $database->getConnection();
        $this->conn = $db;
    }

    public function create(Student $student)
    {
        $query = "INSERT INTO " . $this->table_name . " (
                first_name, last_name, gender, date_of_birth, email, contact_number, 
                grade, section, address, city, state, zip_code, country, 
                parent_name, parent_email, parent_contact_number, additional_info, status
            ) VALUES (
                :first_name, :last_name, :gender, :date_of_birth, :email, :contact_number, 
                :grade, :section, :address, :city, :state, :zip_code, :country, 
                :parent_name, :parent_email, :parent_contact_number, :additional_info, :status
            )";

        $stmt = $this->conn->prepare($query);

        # personal info
        $first_name = htmlspecialchars(strip_tags($student->getFirstName()));
        $last_name = htmlspecialchars(strip_tags($student->getLastName()));
        $gender = htmlspecialchars(strip_tags($student->getGender()));

        $gender = strtolower($gender);
        if ($gender === 'male') {
            $gender = 'M';
        } elseif ($gender === 'female') {
            $gender = 'F';
        } else {
            $gender = 'U';
        }

        $date_of_birth = htmlspecialchars(strip_tags($student->getDateOfBirth()));
        $email = htmlspecialchars(strip_tags($student->getEmail()));
        $contact_number = htmlspecialchars(strip_tags($student->getContactNumber()));

        # academic info
        $grade = htmlspecialchars(strip_tags($student->getGrade()));
        $section = htmlspecialchars(strip_tags($student->getSection()));

        # address info
        $country = htmlspecialchars(strip_tags($student->getCountry()));
        $address = htmlspecialchars(strip_tags($student->getAddress()));
        $city = htmlspecialchars(strip_tags($student->getCity()));
        $state = htmlspecialchars(strip_tags($student->getState()));
        $zip_code = htmlspecialchars(strip_tags($student->getZipCode()));

        # parent info
        $parent_name = htmlspecialchars(strip_tags($student->getParentName()));
        $parent_email = htmlspecialchars(strip_tags($student->getParentEmail()));
        $parent_contact_number = htmlspecialchars(strip_tags($student->getParentContactNumber()));
        $additional_info = htmlspecialchars(strip_tags($student->getAdditionalInfo()));

        # status info
        $status = htmlspecialchars(strip_tags($student->getStatus()));
        $status = is_numeric($status) ? (int)$status : 1;

        # personal info
        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":gender", $gender);
        $stmt->bindParam(":date_of_birth", $date_of_birth);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":contact_number", $contact_number);

        # academic info
        $stmt->bindParam(":grade", $grade);
        $stmt->bindParam(":section", $section);

        # parent info
        $stmt->bindParam(":parent_name", $parent_name);
        $stmt->bindParam(":parent_email", $parent_email);
        $stmt->bindParam(":parent_contact_number", $parent_contact_number);
        $stmt->bindParam(":additional_info", $additional_info);

        # address info
        $stmt->bindParam(":country", $country);
        $stmt->bindParam(":address", $address);
        $stmt->bindParam(":city", $city);
        $stmt->bindParam(":state", $state);
        $stmt->bindParam(":zip_code", $zip_code);
        $stmt->bindValue(":status", $status, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function findAll(int $page = null, int $limit = 10)
    {
        if (!is_null($page)) {
            $offset = ($page - 1) * $limit;
            $query = "SELECT * FROM " . $this->table_name . " ORDER BY id ASC LIMIT :limit OFFSET :offset";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        } else {
            $query = "SELECT * FROM " . $this->table_name . " ORDER BY id ASC";
            $stmt = $this->conn->prepare($query);
        }

        $stmt->execute();

        $students = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $students[] = new Student($row);
        }
        return $students;
    }



    public function findById($id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 1 OFFSET 0";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            return new Student($row);
        }
        return null;
    }

    public function update(Student $student)
    {
        $query = "UPDATE " . $this->table_name . "
                SET
                    first_name = :first_name,
                    last_name = :last_name,
                    gender = :gender,
                    date_of_birth = :date_of_birth,
                    email = :email,
                    contact_number = :contact_number,
                    grade = :grade,
                    section = :section,
                    address = :address,
                    city = :city,
                    state = :state,
                    zip_code = :zip_code,
                    country = :country,
                    parent_name = :parent_name,
                    parent_email = :parent_email,
                    parent_contact_number = :parent_contact_number,
                    additional_info = :additional_info,
                    status = :status
                WHERE
                    id = :id";

        $stmt = $this->conn->prepare($query);

        # personal info
        $first_name = htmlspecialchars(strip_tags($student->getFirstName()));
        $last_name = htmlspecialchars(strip_tags($student->getLastName()));
        $gender = htmlspecialchars(strip_tags($student->getGender()));
        $gender = strtolower($gender);

        if ($gender === 'male') {
            $gender = 'M';
        } elseif ($gender === 'female') {
            $gender = 'F';
        } else {
            $gender = 'U';
        }

        $date_of_birth = htmlspecialchars(strip_tags($student->getDateOfBirth()));
        $email = htmlspecialchars(strip_tags($student->getEmail()));
        $contact_number = htmlspecialchars(strip_tags($student->getContactNumber()));

        # academic info
        $grade = htmlspecialchars(strip_tags($student->getGrade()));
        $section = htmlspecialchars(strip_tags($student->getSection()));

        # address info
        $country = htmlspecialchars(strip_tags($student->getCountry()));
        $address = htmlspecialchars(strip_tags($student->getAddress()));
        $city = htmlspecialchars(strip_tags($student->getCity()));
        $state = htmlspecialchars(strip_tags($student->getState()));
        $zip_code = htmlspecialchars(strip_tags($student->getZipCode()));

        # parent info
        $parent_name = htmlspecialchars(strip_tags($student->getParentName()));
        $parent_email = htmlspecialchars(strip_tags($student->getParentEmail()));
        $parent_contact_number = htmlspecialchars(strip_tags($student->getParentContactNumber()));
        $additional_info = htmlspecialchars(strip_tags($student->getAdditionalInfo()));

        # status info
        $status = htmlspecialchars(strip_tags($student->getStatus()));

        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":gender", $gender);
        $stmt->bindParam(":date_of_birth", $date_of_birth);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":contact_number", $contact_number);

        # academic info
        $stmt->bindParam(":grade", $grade);
        $stmt->bindParam(":section", $section);

        # parent info
        $stmt->bindParam(":parent_name", $parent_name);
        $stmt->bindParam(":parent_email", $parent_email);
        $stmt->bindParam(":parent_contact_number", $parent_contact_number);
        $stmt->bindParam(":additional_info", $additional_info);

        # address info
        $stmt->bindParam(":country", $country);
        $stmt->bindParam(":address", $address);
        $stmt->bindParam(":city", $city);
        $stmt->bindParam(":state", $state);
        $stmt->bindParam(":zip_code", $zip_code);
        $stmt->bindParam(":status", $status);

        $id = htmlspecialchars(strip_tags($student->getId()));

        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $id = htmlspecialchars(strip_tags($id));
        $stmt->bindParam(1, $id);

        return $stmt->execute();
    }

    public function countAll()
    {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['total'];
    }
}
