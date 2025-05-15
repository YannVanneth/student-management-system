// export type Student = {
//     id: string;
//     avatar: string;
//     gender: string;
//     name: string;
//     grade: string;
//     section: string;
//     contact_number: string;
//     status : string
// }

export type Student = {
    id: string,
    personal_info: personalInfo;
    academic_info: academicInfo;
    address_info: addressInfo;
    parent_info: parentInfo;
    status: boolean,
}

type academicInfo = {
    grade: string;
    section: string;
}

type addressInfo ={
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
}

type parentInfo = {
    name: string;
    email: string;
    contact_number: string;
    additional_note: string;
}

type personalInfo ={
    first_name: string,
    last_name: string,
    email: string,
    gender: Gender,
    date_of_birth: string,
    avatar: string,
    contact_number: string,
}


enum status{
    Active,
    Inactive,
    Suspended,
}
enum Gender{
   Male = "male",
   Female = "female",
   Other = "other",
}