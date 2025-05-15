<?php
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../../controllers/StudentController.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


try {

    $controller = new StudentController();

    $controller->create();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Server error occurred.",
        "error" => $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
