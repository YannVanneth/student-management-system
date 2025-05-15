<?php
class Student
{
    private $id;
    # personal info
    private $first_name;
    private $last_name;
    private $gender;
    private $date_of_birth;
    private $email;
    private $contact_number;
    private $profile_picture;

    # academic info
    private $grade;
    private $section;

    # address info 
    private $address;
    private $city;
    private $state;
    private $zip_code;
    private $country;

    # parent info 
    private $parent_name;
    private $parent_email;
    private $parent_contact_number;
    private $additional_info;

    private $status;

    public function __construct($data = [])
    {
        $this->id = $data['id'] ?? null;

        $this->first_name = $data['first_name'] ?? null;
        $this->last_name = $data['last_name'] ?? null;
        $this->gender = $data['gender'] ?? null;
        $this->date_of_birth = $data['date_of_birth'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->contact_number = $data['contact_number'] ?? null;
        $this->profile_picture = $data['avatar'] ?? null;

        # academic info
        $this->grade = $data['grade'] ?? null;
        $this->section = $data['section'] ?? null;

        # address info
        $this->address = $data['address'] ?? null;
        $this->city = $data['city'] ?? null;
        $this->state = $data['state'] ?? null;
        $this->zip_code = $data['zip_code'] ?? null;
        $this->country = $data['country'] ?? null;

        # parent info
        $this->parent_name = $data['parent_name'] ?? null;
        $this->parent_email = $data['parent_email'] ?? null;
        $this->parent_contact_number = $data['parent_contact_number'] ?? null;
        $this->additional_info = $data['additional_note'] ?? null;

        $this->status = $data['status'] ?? null;
    }

    # setters
    public function setId($id)
    {
        $this->id = $id;
    }

    public function setFirstName($first_name)
    {
        $this->first_name = $first_name;
    }

    public function setLastName($last_name)
    {
        $this->last_name = $last_name;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function setDateOfBirth($date_of_birth)
    {
        $this->date_of_birth = $date_of_birth;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function setContactNumber($contact_number)
    {
        $this->contact_number = $contact_number;
    }

    public function setProfilePicture($profile_picture)
    {
        $this->profile_picture = $profile_picture;
    }

    public function setGrade($grade)
    {
        $this->grade = $grade;
    }

    public function setSection($section)
    {
        $this->section = $section;
    }

    public function setAddress($address)
    {
        $this->address = $address;
    }

    public function setCity($city)
    {
        $this->city = $city;
    }

    public function setState($state)
    {
        $this->state = $state;
    }

    public function setZipCode($zip_code)
    {
        $this->zip_code = $zip_code;
    }

    public function setCountry($country)
    {
        $this->country = $country;
    }

    public function setParentName($parent_name)
    {
        $this->parent_name = $parent_name;
    }

    public function setParentEmail($parent_email)
    {
        $this->parent_email = $parent_email;
    }

    public function setParentContactNumber($parent_contact_number)
    {
        $this->parent_contact_number = $parent_contact_number;
    }

    public function setAdditionalInfo($additional_info)
    {
        $this->additional_info = $additional_info;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    # getters
    public function getId()
    {
        return $this->id;
    }

    public function getFirstName()
    {
        return $this->first_name;
    }

    public function getLastName()
    {
        return $this->last_name;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function getDateOfBirth()
    {
        return $this->date_of_birth;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getContactNumber()
    {
        return $this->contact_number;
    }

    public function getProfilePicture()
    {
        return $this->profile_picture;
    }

    public function getGrade()
    {
        return $this->grade;
    }

    public function getSection()
    {
        return $this->section;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function getCity()
    {
        return $this->city;
    }

    public function getState()
    {
        return $this->state;
    }

    public function getZipCode()
    {
        return $this->zip_code;
    }

    public function getCountry()
    {
        return $this->country;
    }

    public function getParentName()
    {
        return $this->parent_name;
    }

    public function getParentEmail()
    {
        return $this->parent_email;
    }

    public function getParentContactNumber()
    {
        return $this->parent_contact_number;
    }

    public function getAdditionalInfo()
    {
        return $this->additional_info;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function toArray()
    {
        return [
            # student array json

            "id" => $this->id,

            # personal info
            "personal_info" => [
                "first_name" => $this->first_name,
                "last_name" => $this->last_name,
                "email" => $this->email,
                "contact_number" => $this->contact_number,
                "gender" => $this->gender,
                "date_of_birth" => $this->date_of_birth,
                "avatar" => $this->profile_picture,
            ],

            # academic info
            "academic_info" => [
                "grade" => $this->grade,
                "section" => $this->section,
            ],
            # address info
            "address_info" => [
                "address" => $this->address,
                "city" => $this->city,
                "state" => $this->state,
                "zip_code" => $this->zip_code,
                "country" => $this->country,
            ],
            # parent info
            "parent_info" => [
                "name" => $this->parent_name,
                "email" => $this->parent_email,
                "contact_number" => $this->parent_contact_number,
                "additional_info" => $this->additional_info,
            ],
            # status
            "status" => $this->status,
        ];
    }
}
