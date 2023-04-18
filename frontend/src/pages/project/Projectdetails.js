import React, { useState, useEffect, useRef } from "react";
import {
    Box, Typography, OutlinedInput, FormControl, TableBody, TableRow, TableCell, Select, MenuItem, DialogContent, Grid, Dialog, DialogActions, Paper, Table, TableHead, TableContainer, Button,
} from "@mui/material";
import { userStyle } from "../../pageStyle";
import axios from "axios";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import { useReactToPrint } from "react-to-print";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment-timezone';
import { SERVICE } from "../../services/Baseservice";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { IconButton, makeStyles } from "@material-ui/core";
import pdfIcon from "./pdf-icon.png";
import wordIcon from "./word-icon.png";
import excelIcon from "./excel-icon.png";
import csvIcon from "./CSV.png";
import fileIcon from "./file-icons.png";
import { Delete } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    inputs: {
      display: "none",
    },
    preview: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: theme.spacing(2),
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

function ProjectDetails() {
 
    const [deleteProjDetail, setDeleteProjDetail] = useState(false);
    const [getrowid, setRowGetid] = useState("");
    const [projDetailsEdit, setProjDetailsEdit] = useState({
        projectid: "", project: "", subproject: "", module: "", submodule: "",
        mainpage: "", subpageone: "", subpagetwo: "", subpagethree: "", subpagefour: "",
        subpagefive: "", projectname: "", projectimages: "",
        projectdescrip: [], projectsummary: "", files: "",

    });
    const [projdetails, setProjDetails] = useState({
        projectid: "", project: "", subproject: "", module: "", submodule: "",
        mainpage: "", subpageone: "", subpagetwo: "", subpagethree: "", subpagefour: "",
        subpagefive: "", projectname: "", projectimages: "",
        projectdescrip: [], projectsummary: "", files: "",
    });
    const [projDetailsList, setProjDetailsList] = useState([]);
    const [project, setProject] = useState([]);
    const [subProject, setSubProject] = useState([]);
    const [module, setModule] = useState([]);
    const [submodule, setSubmodule] = useState([]);
    const [mainpage, setMainpage] = useState([]);
    const [subpage1, setSubpage1] = useState([]);
    const [subpage2, setSubpage2] = useState([]);
    const [subpage3, setSubpage3] = useState([]);
    const [subpage4, setSubpage4] = useState([]);
    const [subpage5, setSubpage5] = useState([]);
    const [projectEdit, setProjectEdit] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [moduleEdit, setModuleEdit] = useState([]);
    const [submoduleEdit, setSubmoduleEdit] = useState([]);
    const [mainpageEdit, setMainpageEdit] = useState([]);
    const [subpage1Edit, setSubpage1Edit] = useState([]);
    const [subpage2Edit, setSubpage2Edit] = useState([]);
    const [subpage3Edit, setSubpage3Edit] = useState([]);
    const [subpage4Edit, setSubpage4Edit] = useState([]);
    const [subpage5Edit, setSubpage5Edit] = useState([]);
    const [text, setText] = useState();
    const [textEdit, setTextEdit] = useState();
    const [textSumm, setTextSummary] = useState();
    const [textSummEdit, setTextSummaryEdit] = useState();
    const [empcode, setEmpCode] = useState([]);

    const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesedit, setSelectedFilesedit] = useState([]);

  const handleInputChange = (event) => {
    const files = event.target.files;
    let newSelectedFiles = [...selectedFiles];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        newSelectedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          preview: reader.result,
          base64: reader.result.split(",")[1],
        });
        setSelectedFiles(newSelectedFiles);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };


  const handleInputChangeedit = (event) => {
    const files = event.target.files;
    let newSelectedFilesedit = [...selectedFilesedit];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        newSelectedFilesedit.push({
          name: file.name,
          size: file.size,
          type: file.type,
          preview: reader.result,
          base64: reader.result.split(",")[1],
        });
        setSelectedFilesedit(newSelectedFilesedit);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFileedit = (index) => {
    const newSelectedFilesedit = [...selectedFilesedit];
    newSelectedFilesedit.splice(index, 1);
    setSelectedFilesedit(newSelectedFilesedit);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "pdf":
        return pdfIcon;
      case "doc":
      case "docx":
        return wordIcon;
      case "xls":
      case "xlsx":
        return excelIcon;
      case "csv":
        return csvIcon;
      default:
        return fileIcon;
    }
  };



    //its a username added details
    const [username, setUsername] = useState("");

    const handleChange = (value) => {
        setText(value);
      
    };
    const handleChangeSummary = (value) => {
        setTextSummary(value);
       
    };
    const handleChangeSummaryEdit = (value) => {
        setTextSummaryEdit(value);
    
    };

    const handleChangeEdit = (value) => {
        setTextEdit(value);
       
    };


    //Datatable
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);

    // view model
    const [openview, setOpenview] = useState(false);
    const handleClickOpenview = () => {
        setOpenview(true);
    };

    const handleCloseview = () => {
        setOpenview(false);
    };

    // info model
    const [openInfo, setOpeninfo] = useState(false);
    const handleClickOpeninfo = () => {
        setOpeninfo(true);
    };
    const handleCloseinfo = () => {
        setOpeninfo(false);
    };


    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState()
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
    };


    //fetching Project for Dropdowns
    const fetchProjectDropdowns = async () => {
        try {
            let projectDrop = await axios.get(SERVICE.PROJECT);
            setProject(projectDrop.data.projects);
            setProjectEdit(projectDrop.data.projects);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [subprojectnone, setsubprojectnone] = useState("")
    const [projectnameg, getprojectnameg] = useState("");


    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdowns = async (e) => {
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (e === data.project)
                    return data
            })
            setSubProject(subProDrop);

        } catch (error) {
            console.log(error.response.data);
        }
    };


    useEffect(() => {
        if (subProject.length === 0) {
            setsubprojectnone("None")
        } else {
            setsubprojectnone("Show")
        }

    })


    //fetching Module Dropdowns
    const fetchModuleDropdowns = async (e) => {
        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                if (subprojectnone === "None" ? projectnameg === data.project : e === data.subproject) {
                    return data
                }

            })
            setModule(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if (subprojectnone === "None") {
            fetchModuleDropdowns();
        }
    })

    const [submodulenone, setsubmodulenone] = useState("");

    //fetching Sub-Modules Dropdowns
    const fetchSubModuleDropdowns = async (modu) => {
        try {
            let drosubmod = await axios.get(SERVICE.SUBMODULE);
            let submodulelist = drosubmod.data.submodules.filter((data) => {
                if (modu === data.module) {
                    return data
                }

            })
            setSubmodule(submodulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    useEffect(() => {
        if (submodule.length === 0) {
            setsubmodulenone("None")
        } else {
            setsubmodulenone("Show")
        }

    })

    //fetching Main Page Dropdowns
    const fetchMainPageDropdowns = async (e) => {
        try {
            let mainPag = await axios.get(SERVICE.MAINPAGE);
            let mainPagdrop = mainPag.data.mains.filter((data) => {
                if (submodulenone === "None" ? projectnameg === data.project : e === data.submodule)
                    return data
            })
            setMainpage(mainPagdrop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if (submodulenone === "None") {
            fetchMainPageDropdowns();
        }
    })


    //fetching Sub-Page-1 Dropdowns
    const fetchSubPage1Dropdowns = async (mainPag) => {
        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESONE);
            let subPag1Drop = subpag1.data.subpagesone.filter((data) => {
                if (mainPag === data.mainpage)
                    return data
            })
            setSubpage1(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    //fetching Sub-Page-2 Dropdowns
    const fetchSubPage2Dropdowns = async (subPage1) => {
        try {
            let subpag2 = await axios.get(SERVICE.SUBPAGESTWO);
            let subPag1Drop = subpag2.data.subpagestwo.filter((data) => {
                if (subPage1 === data.subpageone)
                    return data
            })

            setSubpage2(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Sub-Page-2 Dropdowns
    const fetchSubPage3Dropdowns = async (subPage2) => {
        try {
            let subpag2 = await axios.get(SERVICE.SUBPAGESTHREE);
            let subPag1Drop = subpag2.data.subpagesthree.filter((data) => {
                if (subPage2 === data.subpagetwo)
                    return data
            })

            setSubpage3(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Sub-Page-4 Dropdowns
    const fetchSubPage4Dropdowns = async (subPage3) => {
        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESFOUR);
            let subPag1Drop = subpag1.data.subpagesfour.filter((data) => {
                if (subPage3 === data.subpagethree)
                    return data
            })
            setSubpage4(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Sub-Page-4 Dropdowns
    const fetchSubPage5Dropdowns = async (subPage3) => {
        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESFIVE);
            let subPag1Drop = subpag1.data.subpagesfive.filter((data) => {
                if (subPage3 === data.subpagefour)
                    return data
            })
            setSubpage5(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    const [getprojectname, setgetprojectname] = useState("")

    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdownsedit = async () => {
        let projectName = getprojectname ? getprojectname : projDetailsEdit.project;
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (projectName === data.project)
                    return data
            })
            setSubProjectEdit(subProDrop);

        } catch (error) {
            console.log(error.response.data);
        }
    };


    const [getsubprojectname, setgetsubprojectname] = useState("")

    //fetching Module Dropdowns
    const fetchModuleDropdownsedit = async () => {
        let subPro = getsubprojectname ? getsubprojectname : projDetailsEdit.subproject;

        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                if (subPro === data.subproject) {
                    return data
                }

            })
            setModuleEdit(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    const [getmodulename, setgetmodulename] = useState("")

    //fetching Sub-Modules Dropdowns
    const fetchSubModuleDropdownsedit = async () => {
        let modu = getmodulename ? getmodulename : projDetailsEdit.module;
        try {
            let drosubmod = await axios.get(SERVICE.SUBMODULE);
            let submodulelist = drosubmod.data.submodules.filter((data) => {
                if (modu === data.module) {
                    return data
                }

            })
            setSubmoduleEdit(submodulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    const [getsubmodulename, setgetsubmodulename] = useState("")

    //fetching Main Page Dropdowns
    const fetchMainPageDropdownsedit = async () => {
        let submod = getsubmodulename ? getsubmodulename : projDetailsEdit.submodule;

        try {
            let mainPag = await axios.get(SERVICE.MAINPAGE);
            let mainPagdrop = mainPag.data.mains.filter((data) => {
                if (submod === data.submodule)
                    return data
            })
            setMainpageEdit(mainPagdrop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [getmainpagename, setgetmainpagename] = useState("")

    //fetching Sub-Page-1 Dropdowns
    const fetchSubPage1Dropdownsedit = async () => {
        let mainPag = getmainpagename ? getmainpagename : projDetailsEdit.mainpage;

        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESONE);
            let subPag1Drop = subpag1.data.subpagesone.filter((data) => {
                if (mainPag === data.mainpage)
                    return data
            })
            setSubpage1Edit(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    const [getsubpage1name, setgetsubpage1name] = useState("")

    //fetching Sub-Page-2 Dropdowns
    const fetchSubPage2Dropdownsedit = async () => {
        let subpg1 = getsubpage1name ? getsubpage1name : projDetailsEdit.subpageone;

        try {
            let subpag2 = await axios.get(SERVICE.SUBPAGESTWO);
            let subPag1Drop = subpag2.data.subpagestwo.filter((data) => {
                if (subpg1 === data.subpageone)
                    return data
            })

            setSubpage2Edit(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //adding subpage3,4,5
    //fetching Sub-Page-3 Dropdowns....

    const [getsubpage2name, setgetsubpage2name] = useState("")

    const fetchSubPage3Dropdownsedit = async () => {
        let subPage2 = getsubpage2name ? getsubpage2name : projDetailsEdit.subpagetwo;
        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESTHREE);
            let subPag1Drop = subpag1.data.subpagesthree.filter((data) => {
                if (subPage2 === data.subpagetwo)
                    return data
            })
            setSubpage3Edit(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [getsubpage3name, setgetsubpage3name] = useState("")
    const fetchSubPage4Dropdownsedit = async () => {
        let subPage3 = getsubpage3name ? getsubpage3name : projDetailsEdit.subpagethree;

        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESFOUR);
            let subPag1Drop = subpag1.data.subpagesfour.filter((data) => {
                if (subPage3 === data.subpagethree)
                    return data
            })
            setSubpage4Edit(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [getsubpage4name, setgetsubpage4name] = useState("")

    //fetching Sub-Page-5 Dropdowns
    const fetchSubPage5Dropdownsedit = async () => {
        try {
            let subPage4 = getsubpage4name ? getsubpage4name : projDetailsEdit.subpagefour;
            let subpag1 = await axios.get(SERVICE.SUBPAGESFIVE);
            let subPag1Drop = subpag1.data.subpagesfive.filter((data) => {
                if (subPage4 === data.subpagefour)
                    return data
            })
            setSubpage5Edit(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //submitting the forms
    const handleSubmit = (e) => {
        e.preventDefault();
         if(projdetails.project === ""){
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose Project"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.subproject === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose subProject"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.module === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose module"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.submodule === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose submodule"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.mainpage === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose mainpage"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.subpage1 === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose subpage1"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.subpage2 === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Choose subpage2"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.subpage3 === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose subpage3"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.subpage4 === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose Subpage4"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.subpage5 === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose subpage5"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projdetails.taskname === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please Enter Taskname"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }

        else {
            sendRequest();
        }
    };



    //submitting the form
    const sendRequest = async () => {
        try {
            let req = await axios.post(
                SERVICE.PROJECTDETAILS_CREATE,
                {
                    expectcompdate: String(projdetails.expectcompdate),
                    projectid: String(newval),
                    project: String(projdetails.project),
                    subproject: String(subprojectnone === "None" ? "None" : projdetails.subproject),
                    module: String(projdetails.module),
                    submodule: String(submodulenone === "None" ? "None" : projdetails.submodule),
                    mainpage: String(projdetails.mainpage),
                    subpageone: String(projdetails.subpageone),
                    subpagetwo: String(projdetails.subpagetwo),
                    subpagethree: String(projdetails.subpagethree),
                    subpagefour: String(projdetails.subpagefour),
                    subpagefive: String(projdetails.subpagefive),
                    taskname: String(projdetails.taskname),
                    files: [...selectedFiles],
                    projectdescrip: String(text),
                    projectsummary: String(textSumm),
                    addedby: [
                        {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],
                }
            );
            setProjDetails(req.data);
            setProjDetails({
                expectcompdate: "",
                projectid: "", project: "", subproject: "", module: "", submodule: "",
                mainpage: "", subpageone: "", subpagetwo: "", subpagethree: "", subpagefour: "", subpagefive: "",
                taskname: "", 
            });
            setSelectedFiles([]);
            setText("");
            setTextSummary("");
        } catch (error) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: "100px", color: 'orange' }} />
                    <p style={{ fontSize: '20px', fontWeight: 900 }}>{error.response.data.errorMessage}</p>
                </>
            );
            handleClickOpenerr();
        }
    };

    //fetching Project Details for list Page
    const fetchProjDetailsList = async () => {
        try {
            let dep = await axios.get(SERVICE.PROJECTDETAILS);

            setProjDetailsList(dep.data.projectdetails);
            setEmpCode(dep.data.projectdetails);
        } catch (error) {
            console.log(error.response.data);
        }
    };
 
    
    let newval = projectnameg + "_" + "0001";
    let projectNameid = projectnameg;

    //get single row to edit Page
    const getCode = async (e) => {
        setRowGetid(e);
        let res = await axios.get(
            `${SERVICE.PROJECTDETAILS_SINGLE}/${e}`,
            {}
        );

        setProjDetailsEdit(res.data.sprojectdetails);
        setSelectedFilesedit(res.data.sprojectdetails.files)
        setRowGetid(res.data.sprojectdetails);
        setTextEdit(res.data.sprojectdetails.projectdescrip);
        setTextSummaryEdit(res.data.sprojectdetails.projectsummary);
    };
console.log(projDetailsEdit,'projDetailsEdit')
    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.PROJECTDETAILS_SINGLE}/${e}`, {});
        setProjDetailsEdit(res.data.sprojectdetails);
    };

    //Edit Button
    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    };


    //id for login...
    let loginid = localStorage.LoginUserId;

    //get user row  edit  function
    const getusername = async () => {
        try {
            let res = await axios.get(`${SERVICE.USER}`)
            let user = res.data.users.filter((data) => {
                if (loginid === data._id) {
                    setUsername(data.username)
                    return data
                }
            })
        }
        catch (err) {
            console.log(err.response.data.errormessage)
        }
    }

    //updated by data added
    let updateby = projDetailsEdit.updatedby;
    let addedby = projDetailsEdit.addedby;


    //editing the single data for Edit Page
    let prod_det_id = getrowid._id;
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.PROJECTDETAILS_SINGLE}/${prod_det_id}`,
                {
                    expectcompdate: String(projDetailsEdit.expectcompdate),
                    project: String(projDetailsEdit.project),
                    subproject: String(projDetailsEdit.subproject),
                    module: String(projDetailsEdit.module),
                    submodule: String(projDetailsEdit.submodule),
                    mainpage: String(projDetailsEdit.mainpage),
                    subpageone: String(projDetailsEdit.subpageone),
                    subpagetwo: String(projDetailsEdit.subpagetwo),
                    subpagethree: String(projDetailsEdit.subpagethree),
                    subpagefour: String(projDetailsEdit.subpagefour),
                    subpagefive: String(projDetailsEdit.subpagefive),
                    taskname: String(projDetailsEdit.taskname),
                    files: [...selectedFilesedit],
                    projectdescrip: String(textEdit),
                    projectsummary: String(textSummEdit),
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],
                }
            );
            setProjDetailsEdit(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data)
        }
    };

    // Delete model
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const handleClickOpen = () => {
        setIsDeleteOpen(true);
    };
    const handleCloseMod = () => {
        setIsDeleteOpen(false);
    };

    // Edit model
    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleClickOpenEdit = () => {
        setIsEditOpen(true);
    };
    const handleCloseModEdit = (e, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setIsEditOpen(false);
    };

    //set function to get particular row to Delete
    const rowData = async (id) => {
        try {
            let res = await axios.get(
                `${SERVICE.PROJECTDETAILS_SINGLE}/${id}`
            );
            setDeleteProjDetail(res.data.sprojectdetails);
        } catch (err) { }
    };

    // Alert delete popup
    let proj_detail_Id = deleteProjDetail._id;
    const deleteDetail = async () => {
        try {
            await axios.delete(`${SERVICE.PROJECTDETAILS_SINGLE}/${proj_detail_Id}`);
            handleCloseMod();
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };

    // get single row to view page....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.PROJECTDETAILS_SINGLE}/${e}`, {});
        setProjDetailsEdit(res.data.sprojectdetails);
    };



    // Print
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'ProjectDetails',
        pageStyle: 'print'
    });

    //    PDF
    const columns = [
        { title: "Project ID", field: "projectid" },
        { title: "Project", field: "project" },
        { title: "Sub-Project", field: "subproject" },
        { title: "Module", field: "module" },
        { title: "Sub-Module", field: "submodule" },
        { title: "Main Page", field: "mainpage" },
        { title: "Sub-Page 1", field: "subpageone" },
        { title: "Sub-Page 2", field: "subpagetwo" },
        { title: "Sub-Page 3", field: "subpagethree" },
        { title: "Sub-Page 4", field: "subpagefour" },
        { title: "Sub-Page 4", field: "subpagefive" },
        { title: "Task Name", field: "projectname" },
    ]
    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            styles: {
                fontSize: 6,
            },
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: projDetailsList
        })
        doc.save('ProjectDetails.pdf')
    }


    // Excel
    const fileName = "ProjectDetails";

    const [exceldata, setExceldata] = useState([]);

    // get perticular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.PROJECTDETAILS,{
        })
        var data = response.data.projectdetails.map((t, index) => ({
            "SNo": index+1,
            "ProjectId": t.projectid,
            "Project": t.project,
            "Subproject": t.subproject,
            "Module": t.module,
            "Submodule": t.submodule,
            "Mainpage": t.mainpage,
            "Subpage1": t.subpageone,
            "Subpage2": t.subpagetwo,
            "Subpage3": t.subpagethree,
            "Subpage4": t.subpagefour,
            "Subpage5": t.subpagefive,
            "ProjectName": t.taskname,

        }));
        setExceldata(data);
    }



  

    useEffect(() => {
        getexcelDatas();       
        getusername();

    }, []);

    useEffect(() => {
        fetchProjectDropdowns();
        fetchProjDetailsList();
        fetchModuleDropdownsedit();
        fetchSubProjectDropdownsedit();
        fetchSubModuleDropdownsedit();
        fetchMainPageDropdownsedit();
        fetchSubPage1Dropdownsedit();
        fetchSubPage2Dropdownsedit();
        fetchSubPage3Dropdownsedit();
        fetchSubPage4Dropdownsedit();
        fetchSubPage5Dropdownsedit();

    });


    const [items, setItems] = useState([]);

    const addSerialNumber = () => {
        const itemsWithSerialNumber = projDetailsList?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
        setItems(itemsWithSerialNumber);
    }

    useEffect(() => {
        addSerialNumber();
    })

    //table sorting
    const [sorting, setSorting] = useState({ column: '', direction: '' });

    const handleSorting = (column) => {
        const direction = sorting.column === column && sorting.direction === 'asc' ? 'desc' : 'asc';
        setSorting({ column, direction });
    };

    const sortedData = items.sort((a, b) => {
        if (sorting.direction === 'asc') {
            return a[sorting.column] > b[sorting.column] ? 1 : -1;
        } else if (sorting.direction === 'desc') {
            return a[sorting.column] < b[sorting.column] ? 1 : -1;
        }
        return 0;
    });

    const renderSortingIcon = (column) => {
        if (sorting.column !== column) {
            return <>
                <Box sx={{ color: '#bbb6b6' }}>
                    <Grid sx={{ height: '6px', fontSize: '1.6rem' }}>
                        <ArrowDropUpOutlinedIcon />
                    </Grid>
                    <Grid sx={{ height: '6px', fontSize: '1.6rem' }}>
                        <ArrowDropDownOutlinedIcon />
                    </Grid>
                </Box>
            </>;
        } else if (sorting.direction === 'asc') {
            return <>
                <Box >
                    <Grid sx={{ height: '6px' }}>
                        <ArrowDropUpOutlinedIcon style={{ color: 'black', fontSize: '1.6rem' }} />
                    </Grid>
                    <Grid sx={{ height: '6px' }}>
                        <ArrowDropDownOutlinedIcon style={{ color: '#bbb6b6', fontSize: '1.6rem' }} />
                    </Grid>
                </Box>
            </>;
        } else {
            return <>
                <Box >
                    <Grid sx={{ height: '6px' }}>
                        <ArrowDropUpOutlinedIcon style={{ color: '#bbb6b6', fontSize: '1.6rem' }} />
                    </Grid>
                    <Grid sx={{ height: '6px' }}>
                        <ArrowDropDownOutlinedIcon style={{ color: 'black', fontSize: '1.6rem' }} />
                    </Grid>
                </Box>
            </>;
        }
    };

    //Datatable
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(1);
    };

    //datatable....
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredDatas = items.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const filteredData = filteredDatas.slice((page - 1) * pageSize, page * pageSize);

    const totalPages = Math.ceil(projDetailsList.length / pageSize);

    const visiblePages = Math.min(totalPages, 3);

    const firstVisiblePage = Math.max(1, page - 1);
    const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);

    const pageNumbers = [];

    const indexOfLastItem = page * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;

    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
        pageNumbers.push(i);
    }



    return (
        <Box>
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Project Details</Typography>
            <form onSubmit={handleSubmit}>

                <Box sx={userStyle.container}>
                    <>
                     
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography>Project</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.project}
                                        onChange={(e, i) => {
                                            setProjDetails({ ...projdetails, project: e.target.value });
                                        }}
                                    >
                                        {project &&
                                            project.map((row, index) => (
                                                <MenuItem value={row.name} key={index} onClick={() => { fetchSubProjectDropdowns(row.name); getprojectnameg(row.name); }}>
                                                    {row.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {subprojectnone === "None" ? null :
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography>Sub-Project</Typography>

                                    <FormControl fullWidth size="small">
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={projdetails.subproject}
                                            onChange={(e, i) => {
                                                setProjDetails({ ...projdetails, subproject: e.target.value });
                                                fetchModuleDropdowns(e.target.value);
                                            }}
                                        >
                                            {
                                                subProject && subProject.map((row, index) => {
                                                    return <MenuItem value={row.name} key={index}>  {row.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Grid><br />
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography>Module</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.module}
                                        onChange={(e, i) => {
                                            setProjDetails({ ...projdetails, module: e.target.value });
                                            fetchSubModuleDropdowns(e.target.value);
                                        }}
                                    >
                                        {module &&
                                            module.map((row, index) => (
                                                <MenuItem value={row.name} key={index}>
                                                    {row.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {submodulenone === "None" ? null :
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography>Sub-Module</Typography>

                                    <FormControl fullWidth size="small">
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={projdetails.submodule}
                                            onChange={(e, i) => {
                                                setProjDetails({ ...projdetails, submodule: e.target.value });
                                                fetchMainPageDropdowns(e.target.value);

                                            }}
                                        >
                                            {submodule &&
                                                submodule.map((row, index) => (
                                                    <MenuItem value={row.name} key={index}>
                                                        {row.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }
                        </Grid><br />
                        <Grid container spacing={2}>
                            <Grid item md={4} xs={12} sm={12}>
                                <Typography>Main Page</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.mainpage}
                                        onChange={(e, i) => {
                                            setProjDetails({ ...projdetails, mainpage: e.target.value });
                                            fetchSubPage1Dropdowns(e.target.value);
                                        }}
                                    >
                                        {mainpage &&
                                            mainpage.map((row, index) => (
                                                <MenuItem value={row.name} key={index}>
                                                    {row.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12} sm={12}>
                                <Typography>Sub-Page 1</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.subpageone}
                                        onChange={(e) => {
                                            setProjDetails({ ...projdetails, subpageone: e.target.value });
                                            fetchSubPage2Dropdowns(e.target.value);
                                        }}
                                    >
                                        {
                                            subpage1.map((data) => {
                                                return <MenuItem value={data.name}>{data.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12} sm={12}>
                                <Typography>Sub-Page 2</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.subpagetwo}
                                        onChange={(e) => {
                                            setProjDetails({ ...projdetails, subpagetwo: e.target.value });
                                            fetchSubPage3Dropdowns(e.target.value);
                                        }}
                                    >
                                        {
                                            subpage2.map((data) => {
                                                return <MenuItem value={data.name}>{data.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid><br />
                        <Grid container spacing={2}>
                            <Grid item md={4} xs={12} sm={12}>
                                <Typography>Sub-Page 3</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.subpagethree}
                                        onChange={(e) => {
                                            setProjDetails({ ...projdetails, subpagethree: e.target.value });
                                            fetchSubPage4Dropdowns(e.target.value);
                                        }}
                                    >
                                        {
                                            subpage3.map((data) => {
                                                return <MenuItem value={data.name}>{data.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12} sm={12}>
                                <Typography>Sub-Page 4</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.subpagefour}
                                        onChange={(e) => {
                                            setProjDetails({ ...projdetails, subpagefour: e.target.value });
                                            fetchSubPage5Dropdowns(e.target.value);
                                        }}
                                    >
                                        {
                                            subpage4.map((data) => {
                                                return <MenuItem value={data.name}>{data.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12} sm={12}>
                                <Typography>Sub-Page 5</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projdetails.subpagefive}
                                        onChange={(e) => {
                                            setProjDetails({ ...projdetails, subpagefive: e.target.value });
                                        }}
                                    >
                                        {
                                            subpage5.map((data) => {
                                                return <MenuItem value={data.name}>{data.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid><br/>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography>Task Name</Typography>

                                <FormControl fullWidth size="small">
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        value={projdetails.taskname}
                                        onChange={(e) => {
                                            setProjDetails({ ...projdetails, taskname: e.target.value });
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                            {
                            empcode && (
                                empcode?.map(
                                    () => {
                                        let strings = projectNameid + "_";
                                        let refNo = empcode[empcode.length - 1].projectid;
                                        let digits = (empcode.length + 1).toString();
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
                                        if (digits.length < 4 && getlastBeforeChar == 0 && getlastThreeChar == 0) {
                                            refNOINC = ("000" + refNOINC);
                                            newval = strings + refNOINC;
                                        } else if (digits.length < 4 && getlastBeforeChar > 0 && getlastThreeChar == 0) {
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
                                <Typography>Task ID</Typography>

                                <FormControl fullWidth size="small">
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        value={newval}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid><br />

                        <Grid item xs={8}>
                            <Typography sx={userStyle.SubHeaderText}>Document</Typography>
                        </Grid>
                        <div>
            <input
              className={classes.inputs}
              type="file"
              id="file-inputupload"
              multiple
              onChange={handleInputChange}
            />
            <label htmlFor="file-inputupload" style={{ textAlign: "center" }}>
              <Button sx={userStyle.btncancel} component="span">
                <AddCircleOutlineIcon /> &ensp; Add Files
              </Button>
            </label>
         
            <Grid container>
              {selectedFiles.map((file, index) => (
                <>
                  <Grid item md={3} sm={11} xs={11}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      {file.type.includes("image/") ? (
                        <img src={file.preview} alt={file.name} height="100" style={{maxWidth:"-webkit-fill-available"}}/>
                      ) : (
                        <img className={classes.preview} src={getFileIcon(file.name)} height="100" alt="file icon" />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography variant="subtitle2">{file.name} </Typography>
                      {/* <Typography variant="subtitle2">{file.type} - {file.size} bytes </Typography> */}
                    </Box>
                  </Grid>
                  <Grid item md={1} sm={1} xs={1}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteFile(index)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </>
              ))}
            </Grid>
          </div>
                       
                        <Grid container spacing={2}>
                            <Grid item md={5} xs={12} sm={12}>
                                <Typography>Description</Typography>
                                <ReactQuill
                                    value={text}
                                    onChange={handleChange}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                            [{ size: [] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                            { 'indent': '-1' }, { 'indent': '+1' }],
                                            ['link', 'image', 'video'],
                                            ['clean']
                                        ]
                                    }}
                                    formats={[
                                        'header', 'font', 'size',
                                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                                        'list', 'bullet', 'indent',
                                        'link', 'image', 'video'
                                    ]}
                                />
                            </Grid>
                            <Grid item md={1} xs={12} sm={12}> </Grid>
                            <Grid item md={5} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography>Summary</Typography>
                                    <ReactQuill
                                        value={textSumm}
                                        onChange={handleChangeSummary}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                { 'indent': '-1' }, { 'indent': '+1' }],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                            ]
                                        }}
                                        formats={[
                                            'header', 'font', 'size',
                                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                                            'list', 'bullet', 'indent',
                                            'link', 'image', 'video'
                                        ]}
                                    />

                                </FormControl>
                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <Button variant="contained" type="Submit">Create</Button>
                        </Grid>

                        <br />
                        <br />
                    </>

                    <>
                        <Box>
                            {/* Edit model */}
                            <Dialog
                                open={isEditOpen}
                                onClose={handleCloseModEdit}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                maxWidth="md"
                            >
                                <Box sx={userStyle.dialogbox}>
                                    <Typography sx={userStyle.SubHeaderText}> Edit Project Details </Typography>
                                    <br /><br />
                                    <>
                                        <Box>

                                            <Grid container spacing={2}>
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography>Project</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.project}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, project: e.target.value,module:"",submodule: "",mainpage:"",subpageone:"",subpagetwo:"",subpagethree:"", subpagefour:"",subpagefive:"" });
                                                                setgetprojectname(e.target.value);
                                                            }}
                                                        >
                                                            {projectEdit &&
                                                                projectEdit.map((row, index) => (
                                                                    <MenuItem value={row.name} key={index}>{row.name}</MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography>Sub-Project</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.subproject}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, subproject: e.target.value });
                                                                setgetsubprojectname(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                subProjectEdit && subProjectEdit.map((data, index) => {
                                                                    return <MenuItem value={data.name} key={index}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                            </Grid><br />
                                            <Grid container spacing={2}>
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography>Module</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.module}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, module: e.target.value });
                                                                setgetmodulename(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                moduleEdit && moduleEdit.map((data) => {
                                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography>Sub-Module</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.submodule}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, submodule: e.target.value });
                                                                setgetsubmodulename(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                submoduleEdit && submoduleEdit.map((data) => {
                                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                            </Grid><br />
                                            <Grid container spacing={2}>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Typography>Main Page</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.mainpage}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, mainpage: e.target.value });
                                                                setgetmainpagename(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                mainpageEdit && mainpageEdit.map((data) => {
                                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Typography>Sub-Page 1</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.subpageone}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, subpageone: e.target.value });
                                                                setgetsubpage1name(e.target.value);
                                                            }}
                                                        >{
                                                                subpage1Edit && subpage1Edit.map((data) => {
                                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Typography>Sub-Page 2</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.subpagetwo}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, subpagetwo: e.target.value });
                                                                setgetsubpage2name(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                subpage2Edit && subpage2Edit.map((data) => {
                                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                            </Grid><br />
                                            <Grid container spacing={2}>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Typography>Sub-Page 3</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.subpagethree}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, subpagethree: e.target.value });
                                                                setgetsubpage3name(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                subpage3Edit && subpage3Edit.map((data) => {
                                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Typography>Sub-Page 4</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.subpagefour}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, subpagefour: e.target.value });
                                                                setgetsubpage4name(e.target.value);
                                                            }}
                                                        >
                                                            {
                                                                subpage4Edit && subpage4Edit.map((data, index) => {
                                                                    return <MenuItem value={data.name} key={index}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Typography>Sub-Page 5</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            value={projDetailsEdit.subpagefive}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, subpagefive: e.target.value });
                                                            }}
                                                        >
                                                            {
                                                                subpage5Edit && subpage5Edit.map((data, index) => {
                                                                    return <MenuItem value={data.name} key={index}>{data.name}</MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                            </Grid><br />
                                            <Grid container spacing={2}>
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Typography>Task Name</Typography>

                                                    <FormControl fullWidth size="small">
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            value={projDetailsEdit.taskname}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, taskname: e.target.value });
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                                <Grid item md={6} xs={12} sm={12}>
                                                <Typography>Project ID</Typography>
                                                    <FormControl fullWidth size="small">
                                                        <OutlinedInput
                                                            id="component-outlined"
                                                            type="text"
                                                            value={projDetailsEdit.projectid}
                                                            onChange={(e) => {
                                                                setProjDetailsEdit({ ...projDetailsEdit, projectid: e.target.value });
                                                            }}
                                                        />
                                                    </FormControl>
                                                </Grid>

                                            </Grid><br /><br />
                                            <Grid item xs={8}>
                                                <Typography sx={userStyle.SubHeaderText}>Document</Typography><br></br>
                                            </Grid>
                                            <div>
                  <input
                    className={classes.inputs}
                    type="file"
                    id="file-inputsedit"
                    multiple
                    onChange={handleInputChangeedit}
                  />
                  <label htmlFor="file-inputsedit" style={{ textAlign: "center" }}>
                    <Button sx={userStyle.btncancel} component="span">
                      <AddCircleOutlineIcon />
                      &ensp; Add Files
                    </Button>
                  </label>
                  <Grid container>
                    {selectedFilesedit.map((file, index) => (
                      <>
                        <Grid item md={3} sm={8} xs={8}>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {file.type.includes("image/") ? (
                              <img
                                src={file.preview}
                                alt={file.name}
                                height={100}
                                style={{maxWidth:"-webkit-fill-available"}}
                              />
                            ) : (
                              <img
                                className={classes.preview}
                                src={getFileIcon(file.name)}
                                height="100"
                                alt="file icon"
                              />
                            )}
                          </Box>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Typography variant="subtitle2">
                              {file.name}{" "}
                            </Typography>
                            {/* <Typography variant="subtitle2">{file.type} - {file.size} bytes </Typography> */}
                          </Box>
                        </Grid>
                        <Grid item md={1} sm={4} xs={4}>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteFileedit(index)}
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </div>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item md={5} xs={12} sm={12}>
                                                    <FormControl fullWidth size="small">
                                                        <Typography>Description</Typography>
                                                        <ReactQuill
                                                            value={textEdit}
                                                            onChange={handleChangeEdit}
                                                            modules={{
                                                                toolbar: [
                                                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                                    [{ size: [] }],
                                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                                    { 'indent': '-1' }, { 'indent': '+1' }],
                                                                    ['link', 'image', 'video'],
                                                                    ['clean']
                                                                ]
                                                            }}
                                                            formats={[
                                                                'header', 'font', 'size',
                                                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                                'list', 'bullet', 'indent',
                                                                'link', 'image', 'video'
                                                            ]}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={1} xs={12} sm={12}> </Grid>
                                                <Grid item md={5} xs={12} sm={12}>
                                                    <FormControl fullWidth size="small">
                                                        <Typography>Summary</Typography>
                                                        <ReactQuill
                                                            value={textSummEdit}
                                                            onChange={handleChangeSummaryEdit}
                                                            modules={{
                                                                toolbar: [
                                                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                                    [{ size: [] }],
                                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                                    { 'indent': '-1' }, { 'indent': '+1' }],
                                                                    ['link', 'image', 'video'],
                                                                    ['clean']
                                                                ]
                                                            }}
                                                            formats={[
                                                                'header', 'font', 'size',
                                                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                                'list', 'bullet', 'indent',
                                                                'link', 'image', 'video'
                                                            ]}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <br /><br />
                                        </Box>
                                    </>
                                    <br /><br />
                                    <Grid container>
                            
                                        <Grid item md={6} xs={6} sm={6}>
                                            <Button variant="contained" onClick={editSubmit}> Update </Button>
                                        </Grid>
                                        <Grid item md={6} xs={6} sm={6}>
                                            <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> cancel </Button>
                                        </Grid>
                                   
                                    </Grid>
                                </Box>
                            </Dialog>
                        </Box>
                    </>
                </Box>
            </form>

            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    { /* ****** Header Buttons ****** */}
                    <Grid container sx={{ justifyContent: "center" }} >
                        <Grid >
                          
                            <ExportCSV csvData={exceldata} fileName={fileName} />
                         
                            <ExportXL csvData={exceldata} fileName={fileName} />
                           
                            <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                           
                            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                          
                        </Grid>
                    </Grid><br />
                    {/* ****** Table Start ****** */}
                    <>

                        { /* ******************************************************EXPORT Buttons****************************************************** */}
                        {/* ****** Table Grid Container ****** */}
                        <Grid style={userStyle.dataTablestyle}>
                            <Box>
                                <label htmlFor="pageSizeSelect">Show entries:</label>
                                <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange} sx={{ width: "77px" }}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                    <MenuItem value={100}>100</MenuItem>
                                    <MenuItem value={(projDetailsList.length)}>All</MenuItem>
                                </Select>
                            </Box>
                            <Box>
                                <FormControl fullWidth size="small" >
                                    <Typography>Search</Typography>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        {/* ****** Table start ****** */}
                        <TableContainer component={Paper}>
                            <Table
                                width="2000px"
                                aria-label="customized table"
                                id="usertable"
                            >
                                <TableHead sx={{ fontWeight: "600" }}>
                                    <StyledTableRow>
                                        <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>Project ID</Box><Box>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('projectid')}><Box sx={userStyle.tableheadstyle}><Box>Project ID</Box><Box>{renderSortingIcon('projectid')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('project')}><Box sx={userStyle.tableheadstyle}><Box>Project</Box><Box>{renderSortingIcon('project')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subproject')}><Box sx={userStyle.tableheadstyle}><Box>Sub-Project</Box><Box>{renderSortingIcon('subproject')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('module')}><Box sx={userStyle.tableheadstyle}><Box>Module</Box><Box>{renderSortingIcon('module')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('submodule')}><Box sx={userStyle.tableheadstyle}><Box>Sub-Module</Box><Box>{renderSortingIcon('submodule')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('mainpage')}><Box sx={userStyle.tableheadstyle}><Box>Main Page</Box><Box>{renderSortingIcon('mainpage')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpageone')}><Box sx={userStyle.tableheadstyle}><Box>Sub Page-1</Box><Box>{renderSortingIcon('subpageone')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpagetwo')}><Box sx={userStyle.tableheadstyle}><Box>Sub Page-2</Box><Box>{renderSortingIcon('subpagetwo')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpagethree')}><Box sx={userStyle.tableheadstyle}><Box>Sub Page-3</Box><Box>{renderSortingIcon('subpagethree')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpagefour')}><Box sx={userStyle.tableheadstyle}><Box>Sub Page-4</Box><Box>{renderSortingIcon('subpagefour')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('subpagefive')}><Box sx={userStyle.tableheadstyle}><Box>Sub Page-5</Box><Box>{renderSortingIcon('subpagefive')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('projectname')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box>{renderSortingIcon('projectname')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('projectdescrip')}><Box sx={userStyle.tableheadstyle}><Box>Description</Box><Box>{renderSortingIcon('projectdescrip')}</Box></Box></StyledTableCell>
                                        <StyledTableCell onClick={() => handleSorting('projectsummary')}><Box sx={userStyle.tableheadstyle}><Box>Summary</Box><Box>{renderSortingIcon('projectsummary')}</Box></Box></StyledTableCell>
                                        <StyledTableCell>Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody align="left">
                                    {filteredData.length > 0 ? (
                                        filteredData?.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell align="left">{row.serialNumber}</StyledTableCell>
                                                <StyledTableCell align="left">{row.projectid}</StyledTableCell>
                                                <StyledTableCell align="left">{row.project}</StyledTableCell>
                                                <StyledTableCell align="left">{row.subproject}</StyledTableCell>
                                                <StyledTableCell align="left">{row.module}</StyledTableCell>
                                                <StyledTableCell align="left">{row.submodule}</StyledTableCell>
                                                <StyledTableCell align="left">{row.mainpage}</StyledTableCell>
                                                <StyledTableCell align="left">{row.subpageone}</StyledTableCell>
                                                <StyledTableCell align="left">{row.subpagetwo}</StyledTableCell>
                                                <StyledTableCell align="left">{row.subpagethree}</StyledTableCell>
                                                <StyledTableCell align="left">{row.subpagefour}</StyledTableCell>
                                                <StyledTableCell align="left">{row.subpagefive}</StyledTableCell>
                                                <StyledTableCell align="left">{row.taskname}</StyledTableCell>
                                                <StyledTableCell align="left">{<div dangerouslySetInnerHTML={{ __html: row.projectdescrip }}></div>}</StyledTableCell>
                                                <StyledTableCell align="left">{<div dangerouslySetInnerHTML={{ __html: row.projectsummary }}></div>}</StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    <Grid sx={{ display: "flex" }}>
                                                        <Button
                                                            sx={userStyle.buttonedit}
                                                            onClick={() => {
                                                                handleClickOpenEdit();
                                                                getCode(row._id);
                                                            }}
                                                        >
                                                            <EditOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button>
                                                        <Button
                                                            sx={userStyle.buttondelete}
                                                            onClick={(e) => {
                                                                handleClickOpen();
                                                                rowData(row._id);
                                                            }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon
                                                                style={{ fontSize: "large" }}
                                                            />
                                                        </Button>
                                                        <Button
                                                            sx={userStyle.buttonedit}
                                                            onClick={() => {
                                                                handleClickOpenview();
                                                                getviewCode(row._id);
                                                            }}
                                                        >
                                                            <VisibilityOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button>
                                                        <Button
                                                            sx={userStyle.buttonedit}
                                                            onClick={() => {
                                                                handleClickOpeninfo();
                                                                getinfoCode(row._id);
                                                            }}
                                                        >
                                                            <InfoOutlinedIcon style={{ fontsize: "large" }} />
                                                        </Button>

                                                    </Grid>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))) : <StyledTableRow> <StyledTableCell colSpan={16} align="center">No Data Available</StyledTableCell> </StyledTableRow>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box style={userStyle.dataTablestyle}>
                            <Box>
                                Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, projDetailsList.length)} of {projDetailsList.length} entries
                            </Box>
                            <Box>
                                <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{ textTransform: 'capitalize', color: 'black' }}>
                                    Prev
                                </Button>
                                {pageNumbers?.map((pageNumber) => (
                                    <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page)) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
                                        {pageNumber}
                                    </Button>
                                ))}
                                {lastVisiblePage < totalPages && <span>...</span>}
                                <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{ textTransform: 'capitalize', color: 'black' }}>
                                    Next
                                </Button>
                            </Box>
                        </Box>

                        {/* ****** Table End ****** */}


                    </>
                    {/* ****** Table End ****** */}
                </Box>
            </>
            {/* ****** Table End ****** */}

            {/* Delete Modal */}
            <Box>
                {/* ALERT DIALOG */}
                <Dialog
                    open={isDeleteOpen}
                    onClose={handleCloseMod}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent
                        sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
                    >
                        <ErrorOutlineOutlinedIcon
                            sx={{ fontSize: "80px", color: "orange" }}
                        />
                        <Typography variant="h5" sx={{ color: "red", textAlign: "center" }}>
                            Are you sure?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseMod} sx={userStyle.btncancel}>
                            Cancel
                        </Button>
                        <Button
                            autoFocus
                            variant="contained"
                            color="error"
                            onClick={(e) => deleteDetail(proj_detail_Id)}
                        >
                            {" "}
                            OK{" "}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            {/* view model */}
            <Dialog
                open={openview}
                onClose={handleClickOpenview}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <Box>
                        <Typography sx={userStyle.HeaderText}>View SubModule </Typography>
                        <br /><br />
                        <>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Project ID</Typography>
                                    <Typography>{projDetailsEdit.projectid}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Project</Typography>
                                    <Typography>{projDetailsEdit.project}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Sub-Project</Typography>
                                    <Typography>{projDetailsEdit.subproject}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Module</Typography>
                                    <Typography>{projDetailsEdit.module}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6"> Sub-Module</Typography>
                                    <Typography>{projDetailsEdit.submodule}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Main Page</Typography>
                                    <Typography>{projDetailsEdit.mainpage}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Sub-Page 1</Typography>
                                    <Typography>{projDetailsEdit.subpageone}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Sub-Page 2</Typography>
                                    <Typography>{projDetailsEdit.subpagetwo}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Sub-Page 3</Typography>
                                    <Typography>{projDetailsEdit.subpagethree}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Sub-Page 4</Typography>
                                    <Typography>{projDetailsEdit.subpagefour}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Sub-Page 5</Typography>
                                    <Typography>{projDetailsEdit.subpagefive}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Project Name</Typography>
                                    <Typography>{projDetailsEdit.taskname}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Description</Typography>
                                    <Typography>{<div dangerouslySetInnerHTML={{ __html: projDetailsEdit.projectdescrip }}></div>}</Typography>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <Typography variant="h6">Summary</Typography>
                                    <Typography>{<div dangerouslySetInnerHTML={{ __html: projDetailsEdit.projectsummary }}></div>}</Typography>
                                </Grid>
                            </Grid>
                            <br />
                        </>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Button variant="contained" onClick={handleCloseview}> Back </Button>
                        </Grid>
                        <Grid item md={1} xs={12} sm={12}></Grid>

                    </Box>
                </Box>
            </Dialog>

            {/* this is info view details */}
            <Dialog
                open={openInfo}
                onClose={handleCloseinfo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <Box sx={{ padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> Info </Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography><br />
                                    <Table>
                                        <TableHead>
                                            <StyledTableCell sx={{ padding: '5px 10px !important' }}>{"SNO"}.</StyledTableCell>
                                            <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"UserName"}</StyledTableCell>
                                            <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"Date"}</StyledTableCell>
                                        </TableHead>
                                        <TableBody>
                                            {addedby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{ padding: '5px 10px !important' }}>{i + 1}.</StyledTableCell>
                                                    <StyledTableCell sx={{ padding: '5px 10px !important' }}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{ padding: '5px 10px !important' }}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </FormControl>
                            </Grid>
                            <br />
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Updated by</Typography> <br />
                                    <Table>
                                        <TableHead>
                                            <StyledTableCell sx={{ padding: '5px 10px !important' }}>{"SNO"}.</StyledTableCell>
                                            <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"UserName"}</StyledTableCell>
                                            <StyledTableCell sx={{ padding: '5px 10px !important' }}> {"Date"}</StyledTableCell>
                                        </TableHead>
                                        <TableBody>
                                            {updateby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{ padding: '5px 10px !important' }}>{i + 1}.</StyledTableCell>
                                                    <StyledTableCell sx={{ padding: '5px 10px !important' }}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{ padding: '5px 10px !important' }}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </FormControl>
                            </Grid>
                        </Grid>
                        <br /> <br /><br />
                        <Grid container spacing={2}>
                            <Button variant="contained" onClick={handleCloseinfo}> Back </Button>
                        </Grid>
                    </>
                </Box>
            </Dialog>

            {/* print layout */}

            <TableContainer component={Paper} sx={userStyle.printcls}>
                <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>

                    <TableHead sx={{ fontWeight: "600" }}>
                        <TableRow>
                            <TableCell> S.NO</TableCell>
                            <TableCell>Project ID</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>Sub-Project</TableCell>
                            <TableCell>Module</TableCell>
                            <TableCell>Sub-Module</TableCell>
                            <TableCell>Main Page</TableCell>
                            <TableCell>Sub-Page 1</TableCell>
                            <TableCell>Sub-Page 2</TableCell>
                            <TableCell>Sub-Page 3</TableCell>
                            <TableCell>Sub-Page 4</TableCell>
                            <TableCell>Sub-Page 5</TableCell>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Summary</TableCell>
                        </TableRow>
                    </TableHead>
                    {projDetailsList &&
                        projDetailsList.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">{row.projectid}</TableCell>
                                <TableCell align="left">{row.project}</TableCell>
                                <TableCell align="left">{row.subproject}</TableCell>
                                <TableCell align="left">{row.module}</TableCell>
                                <TableCell align="left">{row.submodule}</TableCell>
                                <TableCell align="left">{row.mainpage}</TableCell>
                                <TableCell align="left">{row.subpageone}</TableCell>
                                <TableCell align="left">{row.subpagetwo}</TableCell>
                                <TableCell align="left">{row.subpagethree}</TableCell>
                                <TableCell align="left">{row.subpagefour}</TableCell>
                                <TableCell align="left">{row.subpagefive}</TableCell>
                                <TableCell align="left">{row.taskname}</TableCell>
                                <TableCell align="left">{<div dangerouslySetInnerHTML={{ __html: row.projectdescrip }}></div>}</TableCell>
                                <TableCell align="left">{<div dangerouslySetInnerHTML={{ __html: row.projectsummary }}></div>}</TableCell>
                            </TableRow>
                        ))}
                </Table>
            </TableContainer>

            {/* ALERT DIALOG */}
            <Box>
                <Dialog
                    open={isErrorOpen}
                    onClose={handleCloseerr}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent sx={{ width: '350px', textAlign: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" >{showAlert}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={handleCloseerr}>ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default ProjectDetails;