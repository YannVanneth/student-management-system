<?php
require_once __DIR__ . '/../repositories/StudentRepository.php';
require_once __DIR__ . '/../utils/validate.php';

class StudentService
{
    use Validate;

    private $repository;

    public function __construct()
    {
        $this->repository = new StudentRepository();
    }

    public function createStudent($data)
    {
        try {
            $this->data = $data;

            $this->validateFields([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'gender' => 'required|string',
                // 'date_of_birth' => 'required|date',
                'email' => 'required|email',
                'contact_number' => 'required|phone',
                'grade' => 'required|number',
                'section' => 'required|string',
                'address' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zip_code' => 'required|number',
                // 'country' => 'required|string',
                'parent_name' => 'required|string',
                'parent_email' => 'required|email',
                'parent_contact_number' => 'required|phone',
                // 'additional_info' => 'string',
                // 'status' => 'number'
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        $student = new Student($data);

        $id = $this->repository->create($student);
        if (!$id) {
            throw new Exception("Failed to create student");
        }

        return $id;
    }

    public function getAllStudents(int $page = null, int $limit = 10)
    {
        return $this->repository->findAll($page, $limit);
    }

    public function getAllStudentsCount()
    {
        return $this->repository->countAll();
    }

    public function getStudentById($id)
    {
        $student = $this->repository->findById($id);

        if (!$student) {
            throw new Exception("Student not found");
        }

        return $student;
    }

    public function updateStudent($data)
    {
        $this->data = $data;

        try {
            $this->validateFields([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'gender' => 'required|string',
                // 'date_of_birth' => 'required|date',
                'email' => 'required|email',
                'contact_number' => 'required|phone',
                'grade' => 'required|number',
                'section' => 'required|string',
                'address' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zip_code' => 'required|number',
                // 'country' => 'required|string',
                'parent_name' => 'required|string',
                'parent_email' => 'required|email',
                'parent_contact_number' => 'required|phone',
                // 'additional_info' => 'string',
                // 'status' => 'number'
            ]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        $student = new Student($data);

        if (!$this->repository->update($student)) {
            throw new Exception("Failed to update student");
        }

        return true;
    }

    public function deleteStudent($id)
    {
        if (empty($id)) {
            throw new Exception("Student ID is required");
        }

        $student = $this->repository->findById($id);
        if (!$student) {
            throw new Exception("Student not found");
        }

        if (!$this->repository->delete($id)) {
            throw new Exception("Failed to delete student");
        }

        return true;
    }
}
