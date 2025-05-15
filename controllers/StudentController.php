<?php

require_once __DIR__ . '/../services/StudentService.php';
require_once __DIR__ . '/../config/response.php';

class StudentController
{
    private $service;

    public function __construct()
    {
        $this->service = new StudentService();
    }

    public function create()
    {
        try {
            $data = [];

            if (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'multipart/form-data') !== false) {
                $data = $_POST;
            } else {

                $jsonData = json_decode(file_get_contents("php://input"), true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception("Invalid JSON data");
                }
                $data = $jsonData;
            }

            $id = $this->service->createStudent($data);

            Response::ok([
                "message" => "Student was created successfully.",
                "id" => $id
            ]);
        } catch (Exception $e) {
            Response::badRequest([
                "message" => "Unable to create student.",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function read()
    {
        try {
            if (isset($_GET['page'])) {
                $page = isset($_GET['page']) ? (int)$_GET['page'] : null;
                $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
                $students = $this->service->getAllStudents($page, $limit);
            } else {
                $students = $this->service->getAllStudents();
            }

            if (empty($students)) {

                Response::notFound("No students found.");
                return;
            }

            $students_arr = array_map(function ($student) {
                return $student->toArray();
            }, $students);


            Response::ok([
                "students" => $students_arr,
                "total" => $this->service->getAllStudentsCount(),
                "page" => isset($page) ? $page : 1,
                "showing_count" => isset($page) && $page > 1 ? count($students) + 10 : count($students),
            ]);
        } catch (Exception $e) {
            Response::badRequest([
                "message" => "Unable to read students.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function readOne($id)
    {
        try {
            $student = $this->service->getStudentById($id);

            Response::ok($student->toArray());
        } catch (Exception $e) {

            Response::notFound([
                "message" => "Student not found.",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function update()
    {
        try {
            $data = [];

            if (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'multipart/form-data') !== false) {
                $data = $_POST;
            } else {
                $jsonData = json_decode(file_get_contents("php://input"), true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new Exception("Invalid JSON data");
                }
                $data = $jsonData;
            }

            if (!isset($data['id'])) {
                throw new Exception("Student ID is required");
            }

            $this->service->updateStudent($data);

            Response::ok([
                "updated_student" => $this->service->getStudentById($data['id'])->toArray(),
                "message" => "Student was updated successfully."
            ]);
        } catch (Exception $e) {
            Response::internalServerError($e->getMessage());
        }
    }

    public function delete($id)
    {
        try {

            $this->service->deleteStudent($id);

            Response::ok([
                "message" => "Student was deleted successfully."
            ]);
        } catch (Exception $e) {
            Response::badRequest($e->getMessage());
        }
    }
}
