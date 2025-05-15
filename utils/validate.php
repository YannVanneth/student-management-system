<?php

trait Validate
{
    private array $data;
    private array $error = [];

    public function validateFields(array $fields)
    {
        $this->error = [];

        if (empty($fields)) {
            throw new Exception("No fields to validate.");
        }

        foreach ($fields as $field => $rules) {
            if (!isset($this->data[$field])) {
                $this->error[$field] = "is missing.";
            } else {
                $rules = explode('|', $rules);
                foreach ($rules as $rule) {
                    try {
                        $this->__rule($rule, $field, $this->data[$field]);
                    } catch (Exception $e) {

                        $this->error[$field] = $e->getMessage();
                    }
                }
            }
        }
        if (!empty($this->error)) {
            throw new Exception(json_encode($this->error, JSON_PRETTY_PRINT));
        }
    }

    private function __rule(string $rule, string $key, string $value)
    {
        switch ($rule) {

            case 'nullable':
                break;

            case 'required':

                if (!isset($value)) {
                    echo "Field `$value` is required.";
                    throw new Exception("Field `$value` is required.");
                }

                break;

            case 'string':

                if (intval($value)) {
                    throw new Exception("Field `$key` must be a string.");
                }

                if (!is_string($value)) {
                    throw new Exception("Field `$value` must be a string.");
                }

                break;

            case 'number':

                if (!is_numeric($value)) {
                    throw new Exception("Field `$value` must be a number.");
                }

                break;

            case 'email':

                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Field `$value` must be a valid email.");
                }
                break;

            case 'phone':

                if (!preg_match('/^[0-9]{9,15}$/', $value)) {
                    throw new Exception("Field `$value` must be a valid phone number.");
                }
                break;

            case 'date':

                if (!DateTime::createFromFormat('Y-m-d', $value)) {
                    throw new Exception("Field `$value` must be a valid date.");
                }
                break;
            default:
                throw new Exception("Unknown validation rule: $rule");
        }
    }
}
