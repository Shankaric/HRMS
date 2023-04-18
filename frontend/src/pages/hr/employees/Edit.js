import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, InputLabel, Dialog, DialogContent, Select, DialogActions, FormControl, Grid, TextareaAutosize, Paper, Table, TableHead, TableContainer, Button, TableBody, MenuItem, TextField } from "@mui/material";
import { userStyle } from "../../../pageStyle";
import { StyledTableRow, StyledTableCell } from "../../../components/Table";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SERVICE } from '../../../services/Baseservice';
import { Link, useNavigate,useParams } from 'react-router-dom';
import Webcamimage from "./Webcamprofile";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from "axios";
import Selects from 'react-select';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import 'jspdf-autotable';
import { Country, State, City } from "country-state-city";
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import "react-image-crop/dist/ReactCrop.css";
import './MultistepForm.css';
import {  FaArrowAltCircleRight } from 'react-icons/fa';
import { Stepper, Step, StepLabel } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';



function MultistepForm() {
const [step, setStep] = useState(1);

// SELECT DROPDOWN STYLES
const colourStyles = {
    menuList: styles => ({
    ...styles,
    background: 'white'
    }),
    option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    // color:'black',
    color: isFocused
        ? 'rgb(255 255 255, 0.5)'
        : isSelected
        ? 'white'
        : 'black',
    background: isFocused
        ? 'rgb(25 118 210, 0.7)'
        : isSelected
        ? 'rgb(25 118 210, 0.5)'
        : null,
    zIndex: 1
    }),
    menu: base => ({
    ...base,
    zIndex: 100
    })

}

let skno = 1;
let eduno = 1;

const id = useParams().id

const [files, setFiles] = useState([]);

const handleFileUpload = (event) => {
    const files = event.target.files;
    const reader = new FileReader();

    for (let i = 0; i < files.length; i++) {
    const file = files[i];
    reader.readAsDataURL(file);
    reader.onload = () => {
        setFiles((prevFiles) => [
        ...prevFiles,
        { name: file.name, data: reader.result.split(',')[1], remark: '' },
        ]);
    };
    }
};

const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};

const handleRemarkChange = (index, remark) => {
    setFiles((prevFiles) =>
    prevFiles.map((file, i) => (i === index ? { ...file, remark } : file))
    );
};

const [errmsg, setErrmsg] = useState("")

const [employee, setEmployee] = useState({
    prefix: "Mr", firstname: "", lastname: "", legalname: "", fathername: "", mothername: "", gender: "", maritalstatus: "", dob: "",
    bloodgroup: "", profileimage: "", location: "", email: "", contactpersonal: "", contactfamily: "", emergencyno: "", doj: "", dot: "", name: "", contactno: "", details: "", username: "",
    password: "", companyname: "", pdoorno: "", pstreet: "", parea: "", plandmark: "", ptaluk: "", ppost: "", ppincode: "", pcountry: "", pstate: "", pcity: "",
    cdoorno: "", cstreet: "", carea: "", clandmark: "", ctaluk: "", cpost: "", cpincode: "", ccountry: "", cstate: "", ccity: "", branch: "",unit:"", floor: "", department: "",
    team: "", designation: "", shifttiming: "", reportingto: "", empcode: "", remark: "", aadhar: "", panno: "",draft:""
});
const [errors, setErrors] = useState({});
const [errorsLog, setErrorsLog] = useState({});
const [errorsBranch, setErrorsBranch] = useState({});
const [setselectedbranch] = useState([]);
const [isValidEmail, setIsValidEmail] = useState(false);
const [isPasswordChange, setIsPasswordChange] = useState(false);

const validateEmail = (email) => {

    const regex = /\S+@\S+\.\S+/;
    let emailvalue = email ? email : employee.email;
    return regex.test(emailvalue);
}
useEffect(() =>{
    setIsValidEmail(validateEmail(employee.email));
})


// Country city state datas
const [selectedCountryp, setSelectedCountryp] = useState({ label: "India", name: 'India' });
const [selectedStatep, setSelectedStatep] = useState({ label: "Tamil Nadu", name: 'Tamil Nadu' });
const [selectedCityp, setSelectedCityp] = useState({ label: "Tiruchirapalli", name: 'Tiruchirapalli' });

const [selectedCountryc, setSelectedCountryc] = useState({ label: "India", name: 'India' });
const [selectedStatec, setSelectedStatec] = useState({ label: "Tamil Nadu", name: 'Tamil Nadu' });
const [selectedCityc, setSelectedCityc] = useState({ label: "Tiruchirapalli", name: 'Tiruchirapalli' });
const [companies, setCompanies] = useState([]);
const [selectedValue, setSelectedValue] = useState([]);
const [branchNames, setBranchNames] = useState();
const [floorNames, setFloorNames] = useState();
const [department, setDepartment] = useState();
const [team, setTeam] = useState();
const [unitNames, setUnitNames] = useState();
const [designation, setDesignation] = useState();
const [shifttiming, setShiftTiming] = useState();
const [reporting, setReporting] = useState();
const [errorMessage, setErrorMessage] = useState("");
const[month , setMonth] = useState("");

const [userName, setUserName] = useState({
    fname: "", length: ""
});
const [empCode, setEmpCode] = useState([]);
const [branchCodeGen, setBranchCodeGen] = useState("");
const [file, setFile] = useState("");
const [webfile, setwebFile] = useState("")


let sno = 1;

//ADDICTIONAL QUALIFICATION SECTION FUNCTIONALITY
const [qualification, setQualification] = useState("");
const [institution, setInstitution] = useState("");
const [passedyear, setPassedyear] = useState("");
const [cgpa, setCgpa] = useState("");
const [eduTodo, setEduTodo] = useState([]);

const [addQual, setAddQual] = useState("")
const [addInst, setAddInst] = useState("")
const [duration, setDuration] = useState("")
const [remarks, setRemarks] = useState("")
const [addAddQuaTodo, setAddQuaTodo] = useState("")

const [empNameTodo, setEmpNameTodo] = useState("")
const [desigTodo, setDesigTodo] = useState("")
const [joindateTodo, setJoindateTodo] = useState("")
const [leavedateTodo, setLeavedateTodo] = useState("")
const [dutiesTodo, setDutiesTodo] = useState("")
const [reasonTodo, setReasonTodo] = useState("")
const [workhistTodo, setWorkhistTodo] = useState("")
const [first, setFirst] = useState("")
const [second, setSecond] = useState("")


//crop image
const [selectedFile, setSelectedFile] = useState(null);
const [croppedImage, setCroppedImage] = useState('');
const cropperRef = useRef(null);
const[draft , setDraft] = useState(false);

const [qualinames, setQualinames] = useState("");
const [skillSet, setSkillSet] = useState("")


//Submit function for TODO Education
const handleSubmittodo = (e) => {
    e.preventDefault();
    setEduTodo([...eduTodo, { qualification, institution, passedyear, cgpa }]);
    setQualification("");
    setInstitution("");
    setPassedyear("");
    setCgpa("");

};
//Delete for Education 
const handleDelete = (index) => {
    const newTodos = [...eduTodo];
    newTodos.splice(index, 1);
    setEduTodo(newTodos);
};


//Submit function for Additional Qualification
const handleSubmitAddtodo = (e) => {
    e.preventDefault();
    setAddQuaTodo([...addAddQuaTodo, { addQual, addInst, duration, remarks }]);
    setAddQual("");
    setAddInst("");
    setDuration("");
    setRemarks("");

};
//Delete for Additional Qualification
const handleAddDelete = (index) => {
    const newTodosed = [...addAddQuaTodo];
    newTodosed.splice(index, 1);
    setAddQuaTodo(newTodosed);
};

//Submit function for Work History
const handleSubmitWorkSubmit = (e) => {
    e.preventDefault();
    setWorkhistTodo([...workhistTodo, { empNameTodo, desigTodo, joindateTodo, leavedateTodo, dutiesTodo, reasonTodo }]);
    setEmpNameTodo("");
    setDesigTodo("");
    setJoindateTodo("");
    setLeavedateTodo("");
    setDutiesTodo("");
    setReasonTodo("");

};
//Delete for Work History
const handleWorkHisDelete = (index) => {
    const newWorkHisTodo = [...workhistTodo];
    newWorkHisTodo.splice(index, 1);
    setWorkhistTodo(newWorkHisTodo);
};

const fetchHandlerEdit = async () => {
    try {
        let response = await axios.get(`${SERVICE.USER_SINGLE}/${id}`, {
            // headers: {
            //     'Authorization': `Bearer ${auth.APIToken}`
            // }
        });
        setEmployee(response.data.suser);
        setFiles(response.data.suser.files);
        setEduTodo(response.data.suser.eduTodo);
        setAddQuaTodo(response.data.suser.addAddQuaTodo);
        setWorkhistTodo(response.data.suser.workhistTodo);
      

        setselectedbranch(
            Array.isArray(response.data.suser.accesslocation) ?
                response.data.suser.accesslocation?.map((x) => ({
                    ...x,
                    label: x,
                    value: x,
                }))
                : []
        );
    } catch (err) {
        const messages = err.response.data.message;
        console.log(messages);
    }
}

//Qulalification Dropdowns 
const fetchqualification = async () => {
    try {
    let req = await axios.get(SERVICE.QUALIFICATIONS);
    setQualinames(
        req?.data?.qualificationdetails?.map((d) => ({
        ...d,
        label: d.qualiname,
        value: d.qualiname,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};

const[getunitname , setgetunitname] = useState("");

// Unit Dropdowns
const fetchUnitNames = async () => {
    let branch = getunitname ? getunitname : employee.branch;
    try {
    let req = await axios.get(SERVICE.UNIT);
    let req_data = req.data.units.filter((item) => {
        if (branch == item.branch)
        return item
    })
    setUnitNames(req_data);
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages);
    }
};
console.log(unitNames,'uni');
//SkillSet DropDowns

const fetchSkillSet = async () => {
    try {
    let req = await axios.get(SERVICE.SKILLSET);
    setSkillSet(
        req?.data?.skillsets?.map((d) => ({
        ...d,
        label: d.name,
        value: d.name,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};

// Image Upload
function handleChangeImage(e) {
    let profileimage = document.getElementById("profileimage")
    var path = (window.URL || window.webkitURL).createObjectURL(profileimage.files[0]);
    toDataURL(path, function (dataUrl) {
    profileimage.setAttribute('value', String(dataUrl));
    setEmployee({ ...employee, profileimage: String(dataUrl) })
    return dataUrl;
    })
    setFile(URL.createObjectURL(e.target.files[0]));
    function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
        callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    }

}

//image cropping
const handleFileSelect = (acceptedFiles) => {

    setSelectedFile(URL.createObjectURL(acceptedFiles[0]));
};

const handleCrop = () => {
    if (typeof cropperRef.current.cropper.getCroppedCanvas() === 'undefined') {
    return;
    }
    setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    setSelectedFile(null)
    getImg()
    handleChangeImage()
};


const handleClearImage = () => {
    setFile(null);
    setGetImg(null);
    setSelectedFile(null)
    setCroppedImage(null);

};
const handleWebcamImage = () => {
    setwebFile(null);
}

// get settings data
const fetchUserDatas = async () => {
    try {
    var response = await axios.get(SERVICE.USER);

    setEmpCode(response.data.users);
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages);
    }
}
//getting branch code autogenarate function prefix
const fetchBranchCode = async () => {
    try {
    var response = await axios.get(SERVICE.BRANCH);
    let branchcode = response.data.branch.filter((data) => {
        if (employee.branch === data.name) {
            setBranchCodeGen(data.code)
        return data.code
        }
    })
    
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages);
    }
}

// auto id for employee code
let date = ((employee.doj).split("-"))
let dateJoin = date.reduce((data, index) => data + index)
let newval = branchCodeGen + dateJoin + "0001";


// Error Popup model
const [isErrorOpen, setIsErrorOpen] = useState(false);
const [setShowAlert] = useState()
const handleClickOpenerr = () => {
    setIsErrorOpen(true);
};
const handleCloseerr = () => {
    setIsErrorOpen(false);
};

const[getbranchname , setgetbranchname] = useState("");
// Branch Dropdowns
const fetchbranchNames = async () => {
    let branchname = getbranchname ? setgetbranchname : employee.company;
    try {
    let req = await axios.get(SERVICE.BRANCH);
    let req_data = req.data.branch.filter((item) => {
        if (branchname == item.company)
        return item
    })
    setBranchNames( req_data );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};


// Floor Dropdowns
const fetchfloorNames = async () => {
    try {
    let req = await axios.get(SERVICE.FLOOR);
    setFloorNames(
        req?.data?.floors?.map((d) => ({
        ...d,
        label: d.name,
        value: d.name,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages);
    }
};

// Departments Dropdowns
const fetchDepartments = async () => {
    try {
    let req = await axios.get(SERVICE.DEPARTMENT);
    setDepartment(
        req?.data?.departmentdetails?.map((d) => ({
        ...d,
        label: d.deptname,
        value: d.deptname,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages);
    }
};

// Team Dropdowns
const fetchteamdropdowns = async () => {
    try {
    let req = await axios.get(SERVICE.TEAMS);
    setTeam(
        req?.data?.teamsdetails?.map((d) => ({
        ...d,
        label: d.teamname,
        value: d.teamname,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};

// Designation Dropdowns
const fetchDesignation = async () => {
    try {
    let req = await axios.get(SERVICE.DESIGNATION);
    setDesignation(
        req?.data?.designation?.map((d) => ({
        ...d,
        label: d.name,
        value: d.name,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};

// Reporting Dropdowns
const fetchReportingUser = async () => {
    try {
    let req = await axios.get(SERVICE.USER);
    setReporting(
        req?.data?.users?.map((d) => ({
        ...d,
        label: d.username,
        value: d.username,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};

// Shift Dropdowns
const fetchShiftDropdowns = async () => {
    try {
    let req = await axios.get(SERVICE.SHIFT);
    setShiftTiming(
        req?.data?.shifts?.map((d) => ({
        ...d,
        label: d.name,
        value: d.name,
        }))
    );
    } catch (err) {
    const messages = err.response.data.message;
    console.log(messages)
    }
};



//fetching companies 
const fetchCompanies = async () => {
    try {
    let productlist = await axios.get(
        SERVICE.COMPANY,
        {}
    );
    setCompanies(
        productlist?.data?.companies?.map((d) => ({
        ...d,
        label: d.name,
        value: d.name,
        }))
    );
    } catch (err) {
    const messages = err.response.data.errorMessage;
    console.log(messages);
    }
};
// FETCH COMPANIES
// handle onChange event of the dropdown
const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
};

const backPage = useNavigate();

//webcam

const [isWebcamOpen, setIsWebcamOpen] = useState(false);
const [getImg, setGetImg] = useState(null)
const [isWebcamCapture, setIsWebcamCapture] = useState(false)
const webcamOpen = () => {
    setIsWebcamOpen(true);
};
const webcamClose = () => {
    setIsWebcamOpen(false);
};

const webcamDataStore = () => {
    setIsWebcamCapture(true)
    //popup close
    webcamClose();
}

//add webcamera popup
const showWebcam = () => {
    webcamOpen();
}
let capture = isWebcamCapture == true ? getImg : croppedImage;

let final = capture ? capture : employee.profileimage;

useEffect(
    () => {
    fetchCompanies();
    fetchfloorNames();
    fetchDepartments();
    fetchteamdropdowns();
    fetchDesignation();
    fetchReportingUser();
    fetchShiftDropdowns();
    fetchqualification();
    fetchSkillSet();
    fetchHandlerEdit();

    }, []
);

useEffect(
    () => {
    fetchBranchCode();
    fetchUserDatas();
    fetchbranchNames();
    fetchUnitNames();

    }
);


//Add employee details to the database
const sendRequest = async () => {
    try {
    let employees_data =  await axios.put(`${SERVICE.USER_SINGLE}/${id}`, {
        firstname: String(employee.firstname),
        lastname: String(employee.lastname),
        legalname: String(employee.legalname),
        prefix: String(employee.prefix),
        fathername: String(employee.fathername),
        mothername: String(employee.mothername),
        gender: String(employee.gender),
        maritalstatus: String(employee.maritalstatus),
        dob: String(employee.dob),
        bloodgroup: String(employee.bloodgroup),
        profileimage: String(final),
        location: String(employee.location),
        email: String(employee.email),
        contactpersonal: String(employee.contactpersonal),
        contactfamily: String(employee.contactfamily),
        emergencyno: String(employee.emergencyno),
        aadhar: String(employee.aadhar),
        panno: String(employee.panno),
        doj: String(employee.doj),
        dot: String(employee.dot),
        referencename: String(employee.referencename),
        contactno: String(employee.contactno),
        details: String(employee.details),
        // username: String(employee.username),
        password: String(employee.password),
        companyname: String(employee.firstname).toUpperCase() + "." + String(employee.lastname).toUpperCase(),
        pdoorno: String(employee.pdoorno),
        pstreet: String(employee.pstreet),
        parea: String(employee.parea),
        plandmark: String(employee.plandmark),
        ptaluk: String(employee.ptaluk),
        ppost: String(employee.ppost),
        ppincode: String(employee.ppincode),
        pcountry: String(employee.pcountry),
        pstate: String(employee.pstate),
        pcity: String(employee.pcity),
        cdoorno: String(!employee.samesprmnt ? employee.cdoorno : employee.pdoorno),
        cstreet: String(!employee.samesprmnt ? employee.cstreet : employee.pstreet),
        carea: String(!employee.samesprmnt ? employee.carea : employee.parea),
        clandmark: String(!employee.samesprmnt ? employee.clandmark : employee.plandmark),
        ctaluk: String(!employee.samesprmnt ? employee.ctaluk : employee.ptaluk),
        cpost: String(!employee.samesprmnt ? employee.cpost : employee.ppost),
        cpincode: String(!employee.samesprmnt ? employee.cpincode : employee.ppincode),
        ccountry: String(!employee.samesprmnt ? selectedCountryc.name : selectedCountryp.name),
        cstate: String(!employee.samesprmnt ? selectedStatec.name : selectedStatep.name),
        ccity: String(!employee.samesprmnt ? selectedCityp.name : selectedCityc.name),
        branch: String(employee.branch),
        unit: String(employee.unit),
        floor: String(employee.floor),
        company: String(employee.company),
        department: String(employee.department),
        team: String(employee.team),
        designation: String(employee.designation),
        shifttiming: String(employee.shifttiming),
        reportingto: String(employee.reportingto),
        accesslocation: [...selectedValue],
        files: [...files],
        empcode: String(newval),
        eduTodo: [...eduTodo],
        addAddQuaTodo: [...addAddQuaTodo],
        workhistTodo: [...workhistTodo],
        
    
    })
    setEmployee(employees_data.data);
    backPage('/list');
    } catch (error) {
    console.log(error.response.data.errorMessage)
    }
}

const sendRequestpwd = async () => {
    try {
    let employees_data =  await axios.put(`${SERVICE.USER_SINGLE_PWD}/${id}`, {
        firstname: String(employee.firstname),
        lastname: String(employee.lastname),
        legalname: String(employee.legalname),
        prefix: String(employee.prefix),
        fathername: String(employee.fathername),
        mothername: String(employee.mothername),
        gender: String(employee.gender),
        maritalstatus: String(employee.maritalstatus),
        dob: String(employee.dob),
        bloodgroup: String(employee.bloodgroup),
        profileimage: String(final),
        location: String(employee.location),
        email: String(employee.email),
        contactpersonal: String(employee.contactpersonal),
        contactfamily: String(employee.contactfamily),
        emergencyno: String(employee.emergencyno),
        aadhar: String(employee.aadhar),
        panno: String(employee.panno),
        doj: String(employee.doj),
        dot: String(employee.dot),
        referencename: String(employee.referencename),
        contactno: String(employee.contactno),
        details: String(employee.details),
        companyname: String(employee.firstname).toUpperCase() + "." + String(employee.lastname).toUpperCase(),
        pdoorno: String(employee.pdoorno),
        pstreet: String(employee.pstreet),
        parea: String(employee.parea),
        plandmark: String(employee.plandmark),
        ptaluk: String(employee.ptaluk),
        ppost: String(employee.ppost),
        ppincode: String(employee.ppincode),
        pcountry: String(employee.pcountry),
        pstate: String(employee.pstate),
        pcity: String(employee.pcity),
        cdoorno: String(!employee.samesprmnt ? employee.cdoorno : employee.pdoorno),
        cstreet: String(!employee.samesprmnt ? employee.cstreet : employee.pstreet),
        carea: String(!employee.samesprmnt ? employee.carea : employee.parea),
        clandmark: String(!employee.samesprmnt ? employee.clandmark : employee.plandmark),
        ctaluk: String(!employee.samesprmnt ? employee.ctaluk : employee.ptaluk),
        cpost: String(!employee.samesprmnt ? employee.cpost : employee.ppost),
        cpincode: String(!employee.samesprmnt ? employee.cpincode : employee.ppincode),
        ccountry: String(!employee.samesprmnt ? selectedCountryc : selectedCountryp),
        cstate: String(!employee.samesprmnt ? selectedStatec : selectedStatep),
        ccity: String(!employee.samesprmnt ? selectedCityp : selectedCityc),
        branch: String(employee.branch),
        unit: String(employee.unit),
        floor: String(employee.floor),
        company: String(employee.company),
        department: String(employee.department),
        team: String(employee.team),
        designation: String(employee.designation),
        shifttiming: String(employee.shifttiming),
        reportingto: String(employee.reportingto),
        accesslocation: [...selectedValue],
        files: [...files],
        empcode: String(newval),
        eduTodo: [...eduTodo],
        addAddQuaTodo: [...addAddQuaTodo],
        workhistTodo: [...workhistTodo],
        
    
    })
    setEmployee(employees_data.data);
    backPage('/list');
    } catch (error) {
    console.log(error.response.data.errorMessage)
    }
}


//Add employee details to the the Draft database
const SendDraftRequest = async () => {
    try {
        let employees_draft = await axios.post(SERVICE.USER_CREATE, {
        firstname: String(employee.firstname),
        lastname: String(employee.lastname),
        legalname: String(employee.legalname),
        prefix: String(employee.prefix),
        fathername: String(employee.fathername),
        mothername: String(employee.mothername),
        gender: String(employee.gender),
        maritalstatus: String(employee.maritalstatus),
        dob: String(employee.dob),
        bloodgroup: String(employee.bloodgroup),
        profileimage: String(capture),
        location: String(employee.location),
        email: String(employee.email),
        contactpersonal: String(employee.contactpersonal),
        contactfamily: String(employee.contactfamily),
        emergencyno: String(employee.emergencyno),
        aadhar: String(employee.aadhar),
        panno: String(employee.panno),
        doj: String(employee.doj),
        dot: String(employee.dot),
        referencename: String(employee.referencename),
        contactno: String(employee.contactno),
        details: String(employee.details),
        username: String(userName.fname),
        password: String(employee.password),
        companyname: String(employee.firstname).toUpperCase() + "." + String(employee.lastname).toUpperCase(),
        pdoorno: String(employee.pdoorno),
        pstreet: String(employee.pstreet),
        parea: String(employee.parea),
        plandmark: String(employee.plandmark),
        ptaluk: String(employee.ptaluk),
        ppost: String(employee.ppost),
        ppincode: String(employee.ppincode),
        pcountry: String(employee.pcountry),
        pstate: String(employee.pstate),
        pcity: String(employee.pcity),
        cdoorno: String(!employee.samesprmnt ? employee.cdoorno : employee.pdoorno),
        cstreet: String(!employee.samesprmnt ? employee.cstreet : employee.pstreet),
        carea: String(!employee.samesprmnt ? employee.carea : employee.parea),
        clandmark: String(!employee.samesprmnt ? employee.clandmark : employee.plandmark),
        ctaluk: String(!employee.samesprmnt ? employee.ctaluk : employee.ptaluk),
        cpost: String(!employee.samesprmnt ? employee.cpost : employee.ppost),
        cpincode: String(!employee.samesprmnt ? employee.cpincode : employee.ppincode),
        ccountry: String(!employee.samesprmnt ? selectedCountryc : selectedCountryp),
        cstate: String(!employee.samesprmnt ? selectedStatec : selectedStatep),
        ccity: String(!employee.samesprmnt ? selectedCityp : selectedCityc),
        branch: String(employee.branch),
        unit: String(employee.unit),
        floor: String(employee.floor),
        company: String(employee.company),
        department: String(employee.department),
        team: String(employee.team),
        designation: String(employee.designation),
        shifttiming: String(employee.shifttiming),
        reportingto: String(employee.reportingto),
        accesslocation: [...selectedValue],
        files: [...files],
        empcode: String(newval),
        eduTodo: [...eduTodo],
        addAddQuaTodo: [...addAddQuaTodo],
        workhistTodo: [...workhistTodo],
        draft:String("incomplete")
        // experience : String(month)
        
            // remark: String(employee.remark),
        })
        setEmployee(employees_draft.data);
        backPage('/list');
    } catch (error) {
            (
            <>
            {console.log(error.response.data.errorMessage)}
                <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                <p style={{fontSize:'20px', fontWeight:900}}>{error.response.data.errorMessage}</p>
            </>
        );
        handleClickOpenerr();
    }
}
const nextStep = () => {

    const newErrors = {};

    // Check the validity of field1

    if (!employee.firstname) {
    newErrors.firstname = <Typography style={{ color: 'red' }}>First name must be required</Typography>;
    }

    if (!employee.lastname) {
    newErrors.lastname = <Typography style={{ color: 'red' }}>Last name must be required</Typography>;
    }

    if (!employee.legalname) {
    newErrors.legalname = <Typography style={{ color: 'red' }}>Legal name must be required</Typography>;

    }
    if (!employee.email) {
    newErrors.email = <Typography style={{ color: 'red' }}>Email must be required</Typography>;
    }
    else if (!isValidEmail) {
    newErrors.email = <Typography style={{ color: 'red' }}>Please enter valid email</Typography>;

    }

    if (!employee.emergencyno) {
    newErrors.emergencyno = <Typography style={{ color: 'red' }}>Emergency no must be required</Typography>;
    }
    if (!employee.dob) {
    newErrors.dob = <Typography style={{ color: 'red' }}>DOB must be required</Typography>;
    }

    if (!employee.doj) {
    newErrors.doj = <Typography style={{ color: 'red' }}>DOJ must be required</Typography>;
    }
    if (!employee.aadhar) {
    newErrors.aadhar = <Typography style={{ color: 'red' }}>Aadhar must be required</Typography>;
    }

    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
    setStep(step + 1);
    }
};

//login detail validation
const nextStepLog = () => {

    const newErrorsLog = {};

    // Check the validity of field1
    if (!employee.password) {
    newErrorsLog.password = <Typography style={{ color: 'red' }}>Password name must be required</Typography>;
    }

    if (!employee.company) {
        newErrorsLog.company = <Typography style={{ color: 'red' }}>Company  must be required</Typography>;
    }

    if (!employee.branch) {
        newErrorsLog.branch = <Typography style={{ color: 'red' }}>Branch  must be required</Typography>;
    }

    setErrorsLog(newErrorsLog);

    // If there are no errors, submit the form
    if (Object.keys(newErrorsLog).length === 0) {
    setStep(step + 1);
    }
};

const prevStep = () => {
    setStep(step - 1);
};

const handleSubmitMulti = (e) => {
    e.preventDefault();
    if(isPasswordChange){
        sendRequest();
    }else{
        sendRequestpwd();
    }
}
        //Submit Button For Add Employee draft section 
        const handleDraftSubmit = (e) => {
            e.preventDefault();
            SendDraftRequest();
        }


const renderStepOne = () => {
    return (
    <>
        <Box sx={userStyle.selectcontainer}>
        <Typography sx={userStyle.SubHeaderText}>Personal Information </Typography>
        <br /><br />
        <>
            <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
                <Typography>First Name<b style={{ color: "red" }}>*</b></Typography>
                <Grid container sx={{ display: 'flex' }} >
                <Grid item md={3} sm={3} xs={3}>
                    <FormControl size="small" fullWidth>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        placeholder="Mr."
                        value={employee.prefix}
                        onChange={(e) => { setEmployee({ ...employee, prefix: e.target.value }) }}
                    >
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                    </Select>
                    </FormControl>
                    {errors.prefix && <div>{errors.prefix}</div>}

                </Grid>
                <Grid item md={9} sm={9} xs={9}>
                    <FormControl size="small" fullWidth>
                    <OutlinedInput
                        id="component-outlined"
                        type="text"
                        placeholder="Name"
                        value={(employee.firstname)}
                        onChange={(e) => {
                            setEmployee({
                                ...employee, firstname: e.target.value
                            })
                        }}
                    />
                    </FormControl>
                    {errors.firstname && <div>{errors.firstname}</div>}

                </Grid>
                </Grid>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Last Name<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    value={(employee.lastname)}
                    onChange={(e) => {
                        setEmployee({
                            ...employee, lastname: e.target.value
                        })
                    }}
                />
                </FormControl>
                {errors.lastname && <div>{errors.lastname}</div>}

            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Legal Name<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    value={employee.legalname}
                    onChange={(e) => {
                    setEmployee({
                        ...employee, legalname: e.target.value
                    })
                    }}
                />
                </FormControl>
                {errors.legalname && <div>{errors.legalname}</div>}

            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Father Name</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Father Name"
                    value={employee.fathername}
                    onChange={(e) => { setEmployee({ ...employee, fathername: e.target.value }) }}

                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Mother Name</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Mother Name"
                    value={employee.mothername}
                    onChange={(e) => { setEmployee({ ...employee, mothername: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Gender</Typography>
                <Select
                    labelId="shift Timimg"
                    id="shift Timimg"
                    placeholder="Female"
                    value={employee.gender}
                    onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }}

                >
                    <MenuItem value="Others">Other</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12} rowSpacing={2} >                
                <FormControl fullWidth size="small">
                <Typography>Marital Status</Typography>
                <Select
                    labelId="shift Timimg"
                    id="shift Timimg"
                    placeholder="Marital status"
                    value={employee.maritalstatus}
                    onChange={(e) => { setEmployee({ ...employee, maritalstatus: e.target.value }) }}
                >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                <Typography>Location</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Location"
                    value={employee.location}
                    onChange={(e) => { setEmployee({ ...employee, location: e.target.value }) }}
                />
                </FormControl>
                <FormControl fullWidth size="small">
                <Typography>Contact(Family)</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="Number"
                    placeholder="contact no(Family)"
                    value={(employee.contactfamily).slice(0, 10)}
                    onChange={(e) => { setEmployee({ ...employee, contactfamily: e.target.value }) }}
                />
                </FormControl>
                <FormControl fullWidth size="small">
                <Typography>DOJ<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="date"
                    placeholder="DOP"
                    value={employee.doj}
                    onChange={(e) => { setEmployee({ ...employee, doj: e.target.value }) }}
                />
                </FormControl>
                {errors.doj && <div>{errors.doj}</div>}
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Date Of Birth<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                    id="component-outlined"
                    value={employee.dob}
                    onChange={(e) => { setEmployee({ ...employee, dob: e.target.value }) }}
                    type="date"
                    size="small"
                    name="dob"
                />
                </FormControl>
                {errors.dob && <div>{errors.dob}</div>}
                <FormControl fullWidth size="small">
                <Typography>Email<b style={{ color: "red" }}>*</b></Typography>
                <TextField
                    id="email"
                    type="email"
                    value={employee.email}
                    onChange={(e) => { setEmployee({ ...employee, email: e.target.value });
                //    <> employee.email ?  "": setIsValidEmail(validateEmail(e.target.value)); 
                //    </>
                    }}
                  
                />
                </FormControl>
                {errors.email && <div>{errors.email}</div>}

                <FormControl fullWidth size="small">
                <Typography>Emergency No<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="Number"
                    placeholder="contact no(Emergency)"
                    value={(employee.emergencyno).slice(0, 10)}
                    onChange={(e) => { setEmployee({ ...employee, emergencyno: e.target.value }) }}
                />
                </FormControl>
                {errors.emergencyno && <div>{errors.emergencyno}</div>}
                <FormControl fullWidth size="small">
                <Typography>Aadhar No<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="Number"
                    placeholder="Aadhar"
                    value={(employee.aadhar).slice(0, 12)}
                    onChange={(e) => { setEmployee({ ...employee, aadhar: e.target.value }) }}
                />
                </FormControl>
                {errors.aadhar && <div>{errors.aadhar}</div>}
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small">
                <Typography>Blood Group</Typography>
                <Select
                    placeholder="O+ve"
                    value={employee.bloodgroup}
                    onChange={(e) => { setEmployee({ ...employee, bloodgroup: e.target.value }) }}
                >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O-">A1+</MenuItem>
                </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                <Typography>Contact(personal)</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="Number"
                    placeholder="Contact no(personal)"
                    value={(employee.contactpersonal).slice(0, 10)}
                    onChange={(e) => { setEmployee({ ...employee, contactpersonal: e.target.value }) }}
                />
                </FormControl>
                <FormControl fullWidth size="small">
                <Typography>DOT</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="date"
                    placeholder="DOJ"
                    value={employee.dot}
                    onChange={(e) => { setEmployee({ ...employee, dot: e.target.value }) }}
                />
                </FormControl>
                <FormControl fullWidth size="small">
                <Typography>Pan No</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Pan no"
                    value={employee.panno}
                    onChange={(e) => { setEmployee({ ...employee, panno: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={12}>
                                    <InputLabel sx={{ m: 1 }}>Profile Image</InputLabel>
                                  
                                      {/* {croppedImage && (
                                        <> */}
                                            <img style={{ height: 120 }} src={croppedImage === "" ? employee.profileimage : croppedImage} alt="Cropped" />

                                        {/* </>
                                    )} */}
                                    <div>
                                        {selectedFile ? (
                                            <>
                                                <Cropper
                                                    style={{ height: 120, width: '100%' }}
                                                    aspectRatio={1 / 1}
                                                    src={selectedFile}
                                                    ref={cropperRef}
                                                />
                                                <Box sx={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
                                                    <Box>
                                                        <Typography sx={userStyle.uploadbtn} onClick={handleCrop}>Crop Image</Typography>
                                                    </Box>
                                                    <Box >
                                                        <Button variant="outlined" sx={userStyle.btncancel} onClick={handleClearImage}>Clear</Button>
                                                    </Box>
                                                </Box>
                                            </>
                                        ) : (
                                        <Grid container sx={{display:'flex'}}>
                                      
                                        <Grid item md={4} sm={4}>
                                            <Dropzone onDrop={handleFileSelect}>
                                                {({ getRootProps, getInputProps }) => (
                                                 
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} id="profileimage" />
                                                            
                                                            <Typography sx={userStyle.uploadbtn}>Upload</Typography><br />
                                                            

                                                        </div>
                                                    </section>
                                                
                                                )}
                                            </Dropzone>
                                        </Grid>
                                        <Grid item md={4} sm={4}>
                                             <Button onClick={showWebcam} variant="contained" sx={userStyle.uploadBtn}>< CameraAltIcon /></Button>                                            
                                         </Grid>  
                                         
                                      
                                         {croppedImage && (
                                        <>
                                         <Grid item md={4} sm={4}>
                                                 <Button variant="outlined" sx={userStyle.btncancel} onClick={handleClearImage}>Clear</Button>
                                         </Grid> 
                                         
                                            </>
                                        )}
                                            </Grid>
                                        )}

                                        </div>
                                </Grid>
                            </Grid>
        </>
        <br />
        </Box>
        <Grid sx={{ display: 'flex', justifyContent: 'right', margin: '20px 0px' }}>
        <Button className="next" variant="contained" onClick={nextStep}>Next</Button>
        </Grid>
    </>
    );
};

const renderStepTwo = () => {
    return (
    <>
        <Box sx={userStyle.selectcontainer}>
        <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>Reference Details </Typography><br />
        </Grid>
        <Grid container spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl size="small" fullWidth>
                <Typography>Name</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                placeholder="Reference Name"
                value={employee.referencename}
                onChange={(e) => { setEmployee({ ...employee, referencename: e.target.value }) }}
                />
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl size="small" fullWidth>
                <Typography>Contact</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                placeholder="Contact No"
                value={employee.contactno}
                onChange={(e) => { setEmployee({ ...employee, contactno: e.target.value }) }}
                />
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth>
                <Typography>Details</Typography>
                <TextareaAutosize aria-label="minimum height" minRows={5}
                value={employee.details}
                onChange={(e) => { setEmployee({ ...employee, details: e.target.value }) }}
                placeholder="Reference Details"
                />
            </FormControl>
            </Grid>
        </Grid> <br />
        </Box><br />
        <Box sx={userStyle.selectcontainer}>
        <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>Login Details </Typography><br />
        </Grid>
        <Grid container spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl size="small" fullWidth>
                <Typography>Login Name<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                placeholder="login Name"
                disabled
                value={employee.username}
                />
            </FormControl>
            {errmsg && <div className="alert alert-danger" style={{ color: 'green' }}>
                <Typography color={errmsg == "Unavailable" ? "error" : "success"} sx={{ margin: '5px' }}><em>{errmsg}</em></Typography></div>}
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl size="small" fullWidth>
                <Typography>Password <b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                placeholder="Passsword"
                // value={employee.password}
                onChange={(e) => { setEmployee({ ...employee, password: e.target.value });setIsPasswordChange(true); }}
                />
            </FormControl>
            {errorsLog.password && <div>{errorsLog.password}</div>}

            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl size="small" fullWidth>
                <Typography>company Name<b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                placeholder="company name"
                value={((employee.firstname).toUpperCase() + '.' + (employee.lastname).toUpperCase())}
                />
            </FormControl>
            </Grid>

        </Grid> <br />
        </Box><br />
        <Box sx={userStyle.container}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>Boarding Information</Typography>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth size="small" >
                <Typography>Company <b style={{ color: "red" }}>*</b></Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.company}
                onChange={(e) => {
                    setEmployee({
                    ...employee,
                    company: e.target.value,
                    }); setgetbranchname(e.target.value);
                }}
                >
                {companies &&
                    companies.map((row, index) => (
                    <MenuItem value={row.name} key={index}>
                        {row.name}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {errorsLog.company && <div>{errorsLog.company}</div>}

            </Grid> <br />
        </Grid> <br />

        <Grid container spacing={2}>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Branch <b style={{ color: "red" }}>*</b></Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.branch}
                onChange={(e, i) => {
                    setEmployee({ ...employee, branch: e.target.value }); 
                    setgetunitname(e.target.value);
                }}
                >
                {branchNames &&
                    branchNames.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {errorsLog.branch && <div>{errorsLog.branch}</div>}

            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Unit</Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.unit}
                onChange={(e, i) => {
                    setEmployee({ ...employee, unit: e.target.value });
                }}
                >
                {unitNames &&
                    unitNames.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Floor</Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.floor}
                onChange={(e, i) => {
                    setEmployee({ ...employee, floor: e.target.value });
                }}
                >
                {floorNames &&
                    floorNames.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Department</Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.department}
                onChange={(e, i) => {
                    setEmployee({ ...employee, department: e.target.value });
                }}
                >
                {department &&
                    department.map((row) => (
                    <MenuItem value={row.deptname}>{row.deptname}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Team</Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.team}
                onChange={(e, i) => {
                    setEmployee({ ...employee, team: e.target.value });
                }}
                >
                {team &&
                    team?.map((row) => (
                    <MenuItem value={row.teamname}>{row.teamname}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Designation</Typography>

                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.designation}
                onChange={(e, i) => {
                    setEmployee({ ...employee, designation: e.target.value });
                }}
                >
                {designation &&
                    designation.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Shift Timing</Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.shifttiming}
                onChange={(e, i) => {
                    setEmployee({ ...employee, shifttiming: e.target.value });
                }}
                >
                {shifttiming &&
                    shifttiming.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Reporting To </Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={employee.reportingto}
                onChange={(e, i) => {
                    setEmployee({ ...employee, reportingto: e.target.value });
                }}
                >
                {reporting &&
                    reporting.map((row) => (
                    <MenuItem value={row.companyname}>{row.companyname}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            {
            empCode && (
                empCode?.map(
                () => {
                    let strings = branchCodeGen + dateJoin;
                    let refNo = empCode[empCode.length - 1].empcode;
                    let digits = (empCode.length + 1).toString();
                    const stringLength = refNo.length;
                    let lastChar = refNo.charAt(stringLength - 1);
                    let getlastBeforeChar = refNo.charAt(stringLength - 2);
                    let getlastThreeChar = refNo.charAt(stringLength - 3);
                    let lastBeforeChar = refNo.slice(-2);
                    let lastThreeChar = refNo.slice(-3);
                    let lastDigit = refNo.slice(-4);
                    let refNOINC = parseInt(lastChar) + 1
                    let refLstTwo = parseInt(lastBeforeChar) + 1;
                    let refLstThree = parseInt(lastThreeChar) + 1;
                    let refLstDigit = parseInt(lastDigit) + 1;
                    if (digits.length < 4 && getlastBeforeChar === 0 && getlastThreeChar === 0) {
                    refNOINC = ("000" + refNOINC);
                    newval = strings + refNOINC;
                    } else if (digits.length < 4 && getlastBeforeChar > 0 && getlastThreeChar === 0) {
                    refNOINC = ("00" + refLstTwo);
                    newval = strings + refNOINC;
                    } else if (digits.length < 4 && getlastThreeChar > 0) {
                    refNOINC = ("0" + refLstThree);
                    newval = strings + refNOINC;
                    } else {
                    refNOINC = (refLstDigit);
                    newval = strings + refNOINC;
                    }

                }))
            }

            {/* </Grid> */}
            <Grid item md={4} sm={12} xs={12}>
            <FormControl size="small" fullWidth>
                <Typography>EmpCode <b style={{ color: "red" }}>*</b></Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                placeholder="EmpCode"
                value={newval}
                onChange={(e) => { setEmployee({ ...employee, empcode: newval }) }}
                />
            </FormControl>
            </Grid>
        </Grid>
        </Box><br />
        <Grid sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
        <Button className="prev" variant="contained" onClick={prevStep}>Previous</Button>
        <Button className="next" variant="contained" onClick={nextStepLog}>Next</Button>

        </Grid>
    </>
    );
};

const renderStepThree = () => {
    return (
    <>
        <Box sx={userStyle.selectcontainer}>
        <Typography sx={userStyle.SubHeaderText}> Permanent Address <b style={{ color: "red" }}>*</b></Typography>
        <br /><br />

        <>
            <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>Door/Flat No</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Door/Flat No"
                    value={employee.pdoorno}
                    onChange={(e) => { setEmployee({ ...employee, pdoorno: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>Street/Block</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Street/Block"
                    value={employee.pstreet}
                    onChange={(e) => { setEmployee({ ...employee, pstreet: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>Area/village</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Area/Village"
                    value={employee.parea}
                    onChange={(e) => { setEmployee({ ...employee, parea: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>Landmark</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Landmark"
                    value={employee.plandmark}
                    onChange={(e) => { setEmployee({ ...employee, plandmark: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <br />
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>Taluk</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Taluk"
                    value={employee.ptaluk}
                    onChange={(e) => { setEmployee({ ...employee, ptaluk: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth>
                <Typography>Post</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Post"
                    value={employee.ppost}
                    onChange={(e) => { setEmployee({ ...employee, ppost: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth>
                <Typography>Pincode</Typography>
                <OutlinedInput
                    id="component-outlined"
                    type="number"
                    placeholder="Pincode"
                    value={(employee.ppincode).slice(0, 6)}
                    onChange={(e) => { setEmployee({ ...employee, ppincode: e.target.value }) }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth >
                <Typography>Country</Typography>
                <Selects
                    options={Country.getAllCountries()}
                    getOptionLabel={(options) => {
                    return options["name"];
                    }}
                    getOptionValue={(options) => {
                    return options["name"];
                    }}

                    styles={colourStyles}
                    onChange={(item) => {
                    setSelectedCountryp(item);
                    }}
                    value={selectedCountryp}
                />

                </FormControl>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>State</Typography>
                <Selects
                    options={State?.getStatesOfCountry(selectedCountryp?.isoCode)}
                    getOptionLabel={(options) => {
                    return options["name"];
                    }}
                    getOptionValue={(options) => {
                    return options["name"];
                    }}
                    value={selectedStatep}
                    styles={colourStyles}
                    onChange={(item) => {
                    setSelectedStatep(item);
                    }}
                />
                </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                <Typography>City</Typography>
                <Selects
                    options={City.getCitiesOfState(
                    selectedStatep?.countryCode,
                    selectedStatep?.isoCode
                    )}
                    getOptionLabel={(options) => {
                    return options["name"];
                    }}
                    getOptionValue={(options) => {
                    return options["name"];
                    }}
                    value={selectedCityp}
                    styles={colourStyles}
                    onChange={(item) => {
                    setSelectedCityp(item);
                    }}
                />
                </FormControl>
            </Grid>
            </Grid>
        </>
        <br /><br />
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <Typography sx={userStyle.SubHeaderText}> Current Address<b style={{ color: "red" }}>*</b> </Typography>
            </Grid>
            <Grid item xs={4}>
            <FormControlLabel control={<Checkbox checked={employee.samesprmnt} onChange={(e) => setEmployee({ ...employee, samesprmnt: !employee.samesprmnt })} />} label="Same as permanent Address" />
            </Grid>
        </Grid>
        <br /><br />
        {!employee.samesprmnt ?
            <>
            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Door/Flat No</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Door/Flat No"
                    value={employee.cdoorno}
                    onChange={(e) => { setEmployee({ ...employee, cpincode: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Street/Block</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Street/Block"
                    value={employee.cstreet}
                    onChange={(e) => { setEmployee({ ...employee, cstreet: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Area/village</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Area/Village"
                    value={employee.carea}
                    onChange={(e) => { setEmployee({ ...employee, carea: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Landmark</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Landmark"
                    value={employee.clandmark}
                    onChange={(e) => { setEmployee({ ...employee, clandmark: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <br />
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Taluk</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Taluk"
                    value={employee.cthaluka}
                    onChange={(e) => { setEmployee({ ...employee, ctaluk: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth>
                    <Typography>Post</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Post"
                    value={employee.cpost}
                    onChange={(e) => { setEmployee({ ...employee, cpost: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth>
                    <Typography>Pincode</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="number"
                    placeholder="Pincode"
                    value={(employee.cpincode).slice(0, 6)}
                    onChange={(e) => { setEmployee({ ...employee, cpincode: e.target.value }) }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Country</Typography>
                    <Selects
                    options={Country.getAllCountries()}
                    getOptionLabel={(options) => {
                        return options["name"];
                    }}
                    getOptionValue={(options) => {
                        return options["name"];
                    }}
                    value={selectedCountryc}
                    styles={colourStyles}
                    onChange={(item) => {
                        setSelectedCountryc(item);
                    }}
                    />
                </FormControl>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>State</Typography>
                    <Selects
                    options={State?.getStatesOfCountry(selectedCountryc?.isoCode)}
                    getOptionLabel={(options) => {
                        return options["name"];
                    }}
                    getOptionValue={(options) => {
                        return options["name"];
                    }}
                    value={selectedStatec}
                    styles={colourStyles}
                    onChange={(item) => {
                        setSelectedStatec(item);
                    }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>City</Typography>
                    <Selects
                    options={City.getCitiesOfState(
                        selectedStatec?.countryCode,
                        selectedStatec?.isoCode
                    )}
                    getOptionLabel={(options) => {
                        return options["name"];
                    }}
                    getOptionValue={(options) => {
                        return options["name"];
                    }}
                    value={selectedCityc}
                    styles={colourStyles}
                    onChange={(item) => {
                        setSelectedCityc(item);
                    }}
                    />
                </FormControl>
                </Grid>
            </Grid>
            </>
            // else condition starts here
            :
            <>
            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Door/Flat No</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Door/Flat No"
                    value={employee.pdoorno}

                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Street/Block</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Street/Block"
                    value={employee.pstreet}

                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Area/village</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Area/Village"
                    value={employee.parea}

                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Landmark</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Landmark"
                    value={employee.plandmark}

                    />
                </FormControl>
                </Grid>
                <br />
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>Taluk</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Taluk"
                    value={employee.ptaluk}

                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth>
                    <Typography>Post</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Post"
                    value={employee.ppost}

                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth>
                    <Typography>Pincode</Typography>
                    <OutlinedInput
                    id="component-outlined"
                    type="text"
                    placeholder="Pincode"
                    value={(employee.ppincode).slice(0, 6)}

                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl size="small" fullWidth >
                    <Typography>Country</Typography>
                    <Selects
                    options={Country.getAllCountries()}
                    getOptionLabel={(options) => {
                        return options["name"];
                    }}
                    getOptionValue={(options) => {
                        return options["name"];
                    }}
                    value={selectedCountryp}
                    styles={colourStyles}
                    onChange={(item) => {
                        setSelectedCountryp(item);
                    }}
                    />
                </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>State</Typography>
                    <Selects
                    options={State?.getStatesOfCountry(selectedCountryp?.isoCode)}
                    getOptionLabel={(options) => {
                        return options["name"];
                    }}
                    getOptionValue={(options) => {
                        return options["name"];
                    }}
                    value={selectedStatep}
                    styles={colourStyles}
                    onChange={(item) => {
                        setSelectedStatep(item);
                    }}
                    />
                </FormControl>
                </Grid>
                <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth size="small" >
                    <Typography>City</Typography>
                    <Selects
                    options={City.getCitiesOfState(
                        selectedStatep?.countryCode,
                        selectedStatep?.isoCode
                    )}
                    getOptionLabel={(options) => {
                        return options["name"];
                    }}
                    getOptionValue={(options) => {
                        return options["name"];
                    }}
                    value={selectedCityp}
                    styles={colourStyles}
                    onChange={(item) => {
                        setSelectedCityp(item);
                    }}
                    />
                </FormControl>
                </Grid>
            </Grid>
            </>}
        </Box>
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'space-between',margin: '20px 0px' }}>
                <Box>
                    <Button className="prev" variant="contained" onClick={prevStep}>Previous</Button>
                </Box>
                <Box sx={{display:"flex",gap:"10px"}}>
                    <Button sx={userStyle.btncancel} onClick={(e) => {
                        handleDraftSubmit(e);
                    }} > Draft </Button>
                    <Button className="next" variant="contained" onClick={nextStep}>Next</Button>
                </Box>
            </Box>
        
    </>
    );
};

const renderStepFour = () => {
    return (
        <>
        <Box sx={userStyle.container} >
        <Grid item xs={8}>
            <Typography sx={userStyle.SubHeaderText}>Document</Typography>
        </Grid>
        <>
            <Grid container sx={{ justifyContent: "center" }} spacing={1}>
            <Button variant="outlined" component="label">
                <CloudUploadIcon sx={{ fontSize: "21px" }} /> &ensp;Upload Documents
                <input hidden type="file" multiple onChange={handleFileUpload} />
            </Button>
            </Grid>
        </>
        <Typography sx={userStyle.SubHeaderText}>  Document List </Typography>
        <br /><br /><br />
        <TableContainer component={Paper} >
            <Table
            aria-label="simple table"
            id="branch"
            >
            <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                <StyledTableCell align="center">SI.NO</StyledTableCell>
                <StyledTableCell align="center">Document</StyledTableCell>
                <StyledTableCell align="center">Remarks</StyledTableCell>
                <StyledTableCell align="center">View</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {files &&
                (files.map((file, index) => (
                    <StyledTableRow key={index}>
                    <StyledTableCell align="center">{sno++}</StyledTableCell>
                    <StyledTableCell align="left">{file.name}</StyledTableCell>
                    <StyledTableCell align="center">
                        <FormControl >
                        <OutlinedInput
                            sx={{ height: '30px !important', background: 'white', border: '1px solid rgb(0 0 0 / 48%)' }}
                            size="small"
                            type="text"
                            value={file.remark}
                            onChange={(event) =>
                            handleRemarkChange(index, event.target.value)
                            } />
                        </FormControl>
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row" align="center" >

                        <a style={{ color: "#357ae8" }}
                        href={`data:application/octet-stream;base64,${file.data}`}
                        download={file.name}
                        >
                        Download
                        </a>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        <Button onClick={() => handleFileDelete(index)} variant="contained" size="small" sx={{ textTransform: "capitalize", minWidth: '0px' }}><DeleteIcon style={{ fontSize: '20px' }} /></Button>
                    </StyledTableCell>
                    </StyledTableRow>
                )))}
            </TableBody>
            </Table>
        </TableContainer>

        </Box><br />
        <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Educational qualification <b style={{ color: "red" }}>*</b></Typography>
        <br /><br />
        <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Qualification </Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={qualification}
                onChange={(e, i) => {
                    setQualification(e.target.value);
                }}
                >
                {qualinames &&
                    qualinames.map((row) => (
                    <MenuItem value={row.qualiname}>{row.qualiname}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Institution </Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Passed Year </Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={passedyear}
                onChange={(e) => setPassedyear(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> CGPA</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={1} sm={12} xs={12}>
            <FormControl size="small" >
                <Button variant="contained" color="success" type="button" onClick={handleSubmittodo} sx={userStyle.Todoadd}><FaPlus /></Button>&nbsp;
            </FormControl>
            </Grid>
        </Grid>
        <br /> <br />
        <Typography sx={userStyle.SubHeaderText}>  Educational Details </Typography>
        <br /><br /><br />
        {/* ****** Table start ****** */}
        <TableContainer component={Paper} >
            <Table
            aria-label="simple table"
            id="branch"
            >
            <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                <StyledTableCell align="center">SI.NO</StyledTableCell>
                <StyledTableCell align="center">Qualification</StyledTableCell>
                <StyledTableCell align="center">Institution</StyledTableCell>
                <StyledTableCell align="center">Passed Year</StyledTableCell>
                <StyledTableCell align="center">% or cgpa</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {(eduTodo && eduTodo.map((todo, index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell align="center">{eduno++}</StyledTableCell>
                    <StyledTableCell align="left">{todo.qualification}</StyledTableCell>
                    <StyledTableCell align="center">{todo.institution}</StyledTableCell>
                    <StyledTableCell align="center">{todo.passedyear}</StyledTableCell>
                    <StyledTableCell align="center">{todo.cgpa}</StyledTableCell>
                    <StyledTableCell align="center">{

                    <Button variant="contained" color="error" type="button" onClick={() => handleDelete(index)} sx={userStyle.Todoadd}><AiOutlineClose /></Button>
                    }</StyledTableCell>
                </StyledTableRow>
                )))}
            </TableBody>
            </Table>
        </TableContainer>
        </Box><br />
        <br />
        <Box sx={{ display: 'flex', justifyContent: 'space-between',margin: '20px 0px' }}>
                <Box>
                    <Button className="prev" variant="contained" onClick={prevStep}>Previous</Button>
                </Box>
                <Box sx={{display:"flex",gap:"10px"}}>
                    <Button sx={userStyle.btncancel} onClick={(e) => { handleDraftSubmit(e); }} > Draft </Button>
                    <Button className="next" variant="contained" onClick={nextStep}>Next</Button>
                </Box>
            </Box>
    </>
    );
};

const renderStepFive = () => {
    return (
        <>
        <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Additional qualification </Typography>
        <br /><br />
        <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Addtl. Qualification </Typography>
                <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={addQual}
                onChange={(e, i) => {
                    setAddQual(e.target.value);
                }}
                >
                {skillSet &&
                    skillSet.map((row) => (
                    <MenuItem value={row.name}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            </Grid>
            <Grid item md={3} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Institution </Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={addInst}
                onChange={(e) => setAddInst(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={3} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography>Durartion</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Remarks</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={1} sm={12} xs={12}>
            <FormControl size="small" >
                <Button variant="contained" color="success" type="button" onClick={handleSubmitAddtodo} sx={userStyle.Todoadd}><FaPlus /></Button>&nbsp;
            </FormControl>
            </Grid>
            <br />
        </Grid>
        <br /><br />
        <Typography sx={userStyle.SubHeaderText}>  Additional Qualification Details </Typography>

        {/* ****** Table start ****** */}
        <TableContainer component={Paper} >
            <Table
            aria-label="simple table"
            id="branch"
            // ref={tableRef}
            >
            <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                <StyledTableCell align="center">SI.NO</StyledTableCell>
                <StyledTableCell align="center">Addl. Qualification</StyledTableCell>
                <StyledTableCell align="center">Institution</StyledTableCell>
                <StyledTableCell align="center">Duration</StyledTableCell>
                <StyledTableCell align="center">Remarks</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>

                {(addAddQuaTodo && addAddQuaTodo.map((addtodo, index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell align="center">{skno++}</StyledTableCell>
                    <StyledTableCell align="center">{addtodo.addQual}</StyledTableCell>
                    <StyledTableCell align="center">{addtodo.addInst}</StyledTableCell>
                    <StyledTableCell align="center">{addtodo.duration}</StyledTableCell>
                    <StyledTableCell align="center">{addtodo.remarks}</StyledTableCell>
                    <StyledTableCell align="center">{
                    <Button variant="contained" color="error" type="button" onClick={() => handleAddDelete(index)} sx={userStyle.Todoadd}><AiOutlineClose /></Button>
                    }</StyledTableCell>
                </StyledTableRow>
                )))}
            </TableBody>
            </Table>
        </TableContainer>
        </Box><br />
        <Box sx={userStyle.container}>
        <Typography sx={userStyle.SubHeaderText}>Work History</Typography><br /><br />
        <Grid container spacing={2}>
            <Grid item md={2} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Employee Name</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={empNameTodo}
                onChange={(e) => setEmpNameTodo(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Designation </Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={desigTodo}
                onChange={(e) => { setDesigTodo(e.target.value); console.log(desigTodo) }}
                />
            </FormControl>
            </Grid>
            <Grid item md={1.5} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Joined On </Typography>
                <OutlinedInput
                id="component-outlined"
                type="date"
                value={joindateTodo}
                onChange={(e) => { setJoindateTodo(e.target.value); console.log(joindateTodo) }}
                />
            </FormControl>
            </Grid>
            <Grid item md={1.5} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Leave On</Typography>
                <OutlinedInput
                id="component-outlined"
                type="date"
                value={leavedateTodo}
                onChange={(e) => setLeavedateTodo(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Duties</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={dutiesTodo}
                onChange={(e) => setDutiesTodo(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={2} sm={12} xs={12}>
            <FormControl fullWidth size="small" >
                <Typography> Reason for Leaving</Typography>
                <OutlinedInput
                id="component-outlined"
                type="text"
                value={reasonTodo}
                onChange={(e) => setReasonTodo(e.target.value)}
                />
            </FormControl>
            </Grid>
            <Grid item md={1} sm={12} xs={12}>
            <FormControl size="small" >
                <Button variant="contained" color="success" type="button" onClick={handleSubmitWorkSubmit} sx={userStyle.Todoadd}><FaPlus /></Button>&nbsp;
            </FormControl>
            </Grid>
            <br />
        </Grid>
        <Typography sx={userStyle.SubHeaderText}>  Work History Details </Typography>
        <br /><br /><br />
        {/* ****** Table start ****** */}
        <TableContainer component={Paper} >
            <Table
            aria-label="simple table"
            id="branch"
            // ref={tableRef}
            >
            <TableHead sx={{ fontWeight: "600" }}>
                <StyledTableRow>
                <StyledTableCell align="center">SI.NO</StyledTableCell>
                <StyledTableCell align="center">Employee Name</StyledTableCell>
                <StyledTableCell align="center">Designation</StyledTableCell>
                <StyledTableCell align="center">Joined On</StyledTableCell>
                <StyledTableCell align="center">Leave On</StyledTableCell>
                <StyledTableCell align="center">Duties</StyledTableCell>
                <StyledTableCell align="center">Reason for Leaving</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {(workhistTodo && workhistTodo.map((todo, index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell align="center">{sno++}</StyledTableCell>
                    <StyledTableCell align="left">{todo.empNameTodo}</StyledTableCell>
                    <StyledTableCell align="center">{todo.desigTodo}</StyledTableCell>
                    <StyledTableCell align="center">{todo.joindateTodo}</StyledTableCell>
                    <StyledTableCell align="center">{todo.leavedateTodo}</StyledTableCell>
                    <StyledTableCell align="center">{todo.dutiesTodo}</StyledTableCell>
                    <StyledTableCell align="center">{todo.reasonTodo}</StyledTableCell>
                    <StyledTableCell align="center">{
                    <Button variant="contained" color="error" type="button" onClick={() => handleWorkHisDelete(index)} sx={userStyle.Todoadd}><AiOutlineClose /></Button>
                    }</StyledTableCell>

                </StyledTableRow>
                )))}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
        <br />
        {/* </Box><br /> */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between',margin: '20px 0px' }}>
            <Box>
               <Button className="prev" variant="contained" onClick={prevStep}>Previous</Button>
            </Box>
            <Box sx={{display:'flex',gap:'10px'}}>
                <Button sx={userStyle.btncancel} onClick={(e)=>{handleDraftSubmit(e);}} > Draft </Button>
                <Button className="next" variant="contained"  onClick={handleSubmitMulti}>Submit</Button>
            </Box>
        </Box>
    </>
    );
};
{/* ALERT DIALOG */ }
<Box>
    <Dialog
    open={isErrorOpen}
    onClose={handleCloseerr}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h6" >{errorMessage}</Typography>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="error" onClick={handleCloseerr}>ok</Button>
    </DialogActions>
    </Dialog>
    <Dialog
    open={isWebcamOpen}
    onClose={webcamClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Webcamimage getImg={getImg} setGetImg={setGetImg} />
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="success" onClick={webcamDataStore}>OK</Button>
        <Button variant="contained" color="error" onClick={webcamClose}>CANCEL</Button>
    </DialogActions>
    </Dialog>
</Box>

const renderIndicator = () => {
    return (
    <ul className="indicator">
        <li className={step === 1 ? 'active' : null}><FaArrowAltCircleRight />&ensp;Personal Info</li>
        <li className={step === 2 ? 'active' : null}><FaArrowAltCircleRight />&ensp;Login & Boarding Details</li>
        <li className={step === 3 ? 'active' : null}><FaArrowAltCircleRight />&ensp;Address</li>
        <li className={step === 4 ? 'active' : null}><FaArrowAltCircleRight />&ensp;Document</li>
        <li className={step === 5 ? 'active' : null}><FaArrowAltCircleRight />&ensp;Work History</li>
    </ul>
    );
};

return (
    <div className="multistep-form">
    {renderIndicator()}
    {step === 1 ? renderStepOne() : null}
    {step === 2 ? renderStepTwo() : null}
    {step === 3 ? renderStepThree() : null}
    {step === 4 ? renderStepFour() : null}
    {step === 5 ? renderStepFive() : null}
    </div>
);
}

export default MultistepForm;