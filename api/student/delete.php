<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../../controllers/StudentController.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if (!$id) {
        throw new Exception("Student ID is required");
    }

    $controller = new StudentController();
    $controller->delete($id);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Server error occurred.",
        "error" => $e->getMessage()
    ]);
}
