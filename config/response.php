<?php

class Response
{

    public static function ok($data)
    {
        http_response_code(200);
        echo json_encode([
            "message" => "OK",
            "data" => $data
        ], JSON_PRETTY_PRINT);
    }

    public static function notFound($message)
    {
        http_response_code(404);
        echo json_encode([
            "message" => "Not found",
            "error" => $message
        ], JSON_PRETTY_PRINT);
    }

    public static function badRequest($message)
    {
        http_response_code(400);
        echo json_encode([
            "message" => "Bad request",
            $message
        ], JSON_PRETTY_PRINT);
    }

    public static function customResponse($code, $message)
    {
        http_response_code($code);
        echo json_encode(
            $message,
            JSON_PRETTY_PRINT
        );
    }

    public static function internalServerError($message)
    {
        http_response_code(500);
        echo json_encode([
            "message" => "Internal server error",
            "error" => $message
        ], JSON_PRETTY_PRINT);
    }
}
