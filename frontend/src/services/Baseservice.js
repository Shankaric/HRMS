import {
    BASE_URL
} from './Authservice';

export const SERVICE = {

    // Companies
    COMPANY : `${BASE_URL}/api/companies`,
    COMPANY_CREATE : `${BASE_URL}/api/company/new`,
    COMPANY_SINGLE:`${BASE_URL}/api/company`,
    // Branch
    BRANCH : `${BASE_URL}/api/branches`,
    BRANCH_CREATE : `${BASE_URL}/api/branch/new`,
    BRANCH_SINGLE:`${BASE_URL}/api/branch`,
    // Unit
    UNIT : `${BASE_URL}/api/units`,
    UNIT_CREATE : `${BASE_URL}/api/unit/new`,
    UNIT_SINGLE:`${BASE_URL}/api/unit`,
    // Manage unit branch
    MANAGE : `${BASE_URL}/api/manages`,
    MANAGE_CREATE : `${BASE_URL}/api/manage/new`,
    MANAGE_SINGLE:`${BASE_URL}/api/manage`,
    // Manage unit branch
    MANAGECOMPANY : `${BASE_URL}/api/managecompany`,
    MANAGECOMPANY_CREATE : `${BASE_URL}/api/managecompany/new`,
    MANAGECOMPANY_SINGLE:`${BASE_URL}/api/managecompany`,
    // Area
    AREAS : `${BASE_URL}/api/areas`,
    AREA_CREATE : `${BASE_URL}/api/area/new`,
    AREA_SINGLE:`${BASE_URL}/api/area`,
    // Location
    LOCATION : `${BASE_URL}/api/locations`,
    LOCATION_CREATE : `${BASE_URL}/api/location/new`,
    LOCATION_SINGLE:`${BASE_URL}/api/location`,
    // Floor
    FLOOR : `${BASE_URL}/api/floors`,
    FLOOR_CREATE : `${BASE_URL}/api/floor/new`,
    FLOOR_SINGLE:`${BASE_URL}/api/floor`,
    //Department
    DEPARTMENT : `${BASE_URL}/api/departments`,
    DEPARTMENT_CREATE : `${BASE_URL}/api/department/new`,
    DEPARTMENT_SINGLE:`${BASE_URL}/api/department`,
    //Department
    DESIGNATIONGRP : `${BASE_URL}/api/designationgroup`,
    DESIGNATIONGRP_CREATE : `${BASE_URL}/api/designationgroup/new`,
    DESIGNATIONGRP_SINGLE:`${BASE_URL}/api/designationgroup`,
    //Department
    DESIGNATION : `${BASE_URL}/api/designation`,
    DESIGNATION_CREATE : `${BASE_URL}/api/designation/new`,
    DESIGNATION_SINGLE:`${BASE_URL}/api/designation`,
    // Qualification
    QUALIFICATIONS : `${BASE_URL}/api/qualifications`,
    QUALIFICATION_CREATE : `${BASE_URL}/api/qualification/new`,
    QUALIFICATION_SINGLE:`${BASE_URL}/api/qualification`,
    //Teams
    TEAMS : `${BASE_URL}/api/teams`,
    TEAMS_CREATE : `${BASE_URL}/api/team/new`,
    TEAMS_SINGLE:`${BASE_URL}/api/team`,
    //Shifts
    SHIFT : `${BASE_URL}/api/shifts`,
    SHIFT_CREATE : `${BASE_URL}/api/shift/new`,
    SHIFT_SINGLE:`${BASE_URL}/api/shift`,
    //Certification
    CERTIFICATION : `${BASE_URL}/api/certifications`,
    CERTIFICATION_CREATE : `${BASE_URL}/api/certification/new`,
    CERTIFICATION_SINGLE:`${BASE_URL}/api/certification`,
    //Educations
    EDUCATION : `${BASE_URL}/api/educations`,
    EDUCATION_CREATE : `${BASE_URL}/api/education/new`,
    EDUCATION_SINGLE:`${BASE_URL}/api/education`,
    //Skill set
    SKILLSET : `${BASE_URL}/api/skillsets`,
    SKILLSET_CREATE : `${BASE_URL}/api/skillset/new`,
    SKILLSET_SINGLE:`${BASE_URL}/api/skillset`,
    //USER
    USER : `${BASE_URL}/api/users`,
    USER_CREATE : `${BASE_URL}/api/auth/new`,
    USER_SINGLE:`${BASE_URL}/api/auth`,
    USER_SINGLE_PWD:`${BASE_URL}/api/userpw`,
    //DRAFTS
    DRAFT : `${BASE_URL}/api/drafts`,
    DRAFT_CREATE : `${BASE_URL}/api/draft/new`,
    DRAFT_SINGLE:`${BASE_URL}/api/draft`,

    //projects 
    //PROJECT
    PROJECT : `${BASE_URL}/api/projects`,
    PROJECT_CREATE : `${BASE_URL}/api/project/new`,
    PROJECT_SINGLE:`${BASE_URL}/api/project`,

    // //PROJECT CATEGORY
    // PROJECT_CATEGORY : `${BASE_URL}/api/projectcategories`,
    // PROJECT_CATEGORY_CREATE : `${BASE_URL}/api/projectcategory/new`,
    // PROJECT_CATEGORY_SINGLE : `${BASE_URL}/api/projectcategory`,

    //SUB PROJECT
    SUBPROJECT : `${BASE_URL}/api/subprojects`,
    SUBPROJECT_CREATE : `${BASE_URL}/api/subproject/new`,
    SUBPROJECT_SINGLE:`${BASE_URL}/api/subproject`,

    //MODULE
    MODULE : `${BASE_URL}/api/modules`,
    MODULE_CREATE : `${BASE_URL}/api/module/new`,
    MODULE_SINGLE:`${BASE_URL}/api/module`,

    //SUBMODULE
    SUBMODULE : `${BASE_URL}/api/submodules`,
    SUBMODULE_CREATE : `${BASE_URL}/api/submodule/new`,
    SUBMODULE_SINGLE:`${BASE_URL}/api/submodule`,

    //MAINPAGE
    MAINPAGE : `${BASE_URL}/api/mainpages`,
    MAINPAGE_CREATE : `${BASE_URL}/api/mainpage/new`,
    MAINPAGE_SINGLE:`${BASE_URL}/api/mainpage`,

    //SUBPAGE ONE
    SUBPAGESONE : `${BASE_URL}/api/subpagesone`,
    SUBPAGEONE_CREATE : `${BASE_URL}/api/subpageone/new`,
    SUBPAGEONE_SINGLE:`${BASE_URL}/api/subpageone`,

    //SUBPAGE TWO
    SUBPAGESTWO : `${BASE_URL}/api/subpagestwo`,
    SUBPAGETWO_CREATE : `${BASE_URL}/api/subpagetwo/new`,
    SUBPAGETWO_SINGLE:`${BASE_URL}/api/subpagetwo`,
    
    //SUBPAGE THREE
    SUBPAGESTHREE : `${BASE_URL}/api/subpagesthree`,
    SUBPAGETHREE_CREATE : `${BASE_URL}/api/subpagethree/new`,
    SUBPAGETHREE_SINGLE:`${BASE_URL}/api/subpagethree`,

    //SUBPAGE FOUR
    SUBPAGESFOUR : `${BASE_URL}/api/subpagesfour`,
    SUBPAGEFOUR_CREATE : `${BASE_URL}/api/subpagefour/new`,
    SUBPAGEFOUR_SINGLE:`${BASE_URL}/api/subpagefour`,
    
    //SUBPAGE FIVE
    SUBPAGESFIVE : `${BASE_URL}/api/subpagesfive`,
    SUBPAGEFIVE_CREATE : `${BASE_URL}/api/subpagefive/new`,
    SUBPAGEFIVE_SINGLE:`${BASE_URL}/api/subpagefive`,

    //PRIORITY TWO
    PRIORITY : `${BASE_URL}/api/prorities`,
    PRIORITY_CREATE : `${BASE_URL}/api/priority/new`,
    PRIORITY_SINGLE:`${BASE_URL}/api/priority`,

    //PROJECTDETAILS
    PROJECTDETAILS : `${BASE_URL}/api/projectdetails`,
    PROJECTDETAILS_CREATE : `${BASE_URL}/api/projectdetail/new`,
    PROJECTDETAILS_SINGLE:`${BASE_URL}/api/projectdetail`,

    //PROJECTESTIMATION
    PROJECTESTIMATION : `${BASE_URL}/api/projectestimations`,
    PROJECTESTIMATION_CREATE : `${BASE_URL}/api/projectestimation/new`,
    PROJECTESTIMATION_SINGLE:`${BASE_URL}/api/projectestimation`,

    //PROJECTALLOCATION
    PROJECTALLOCATION : `${BASE_URL}/api/projectallocations`,
    PROJECTALLOCATION_CREATE : `${BASE_URL}/api/projectallocation/new`,
    PROJECTALLOCATION_SINGLE:`${BASE_URL}/api/projectallocation`,
};
