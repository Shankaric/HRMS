import React, { useState, useEffect, useRef } from "react";
import {
    Box, Typography, OutlinedInput, TableRow, TableCell, FormControl, TableBody, Select, MenuItem, DialogContent, Grid, Dialog, DialogActions, Paper, Table, TableHead, TableContainer, Button,
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
import { SERVICE } from "../../services/Baseservice";
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import moment from 'moment-timezone';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function ProjectEstimation() {

    const [deletebranch, setDeletebranch] = useState(false);
    const [getrowid, setRowGetid] = useState("");
    const [projEstimateEdit, setProjEstimateEdit] = useState({
        project: "", subproject: "", module: "", submodule: "", mainpage: "", subpageone: "", subpagetwo: "", subpagethree: "", subpagefour: "", subpagefive: "",
        expectcompdate: "",
        expectcomptime: "",
        expectcompduration: "",
        budget: "",
        budgetsign: "₹",
        priority: "",
        prioritylevel: "level1",

    });
    const [projEstimate, setProjEstimate] = useState({
        project: "", subproject: "", module: "", submodule: "", mainpage: "", subpageone: "", subpagetwo: "", subpagethree: "", subpagefour: "", subpagefive: "",
        expectcompdate: "",
        expectcomptime: "",
        expectcompduration: "",
        budget: "",
        budgetsign: "",
        priority: "",
        prioritylevel: "level1",
    });
    const [projEstlist, setProjEstList] = useState([]);
    const [project, setProject] = useState([]);
    const [projectEdit, setProjectEdit] = useState([]);
    const [subproject, setSubProject] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [module, setModule] = useState([]);
    const [moduleEdit, setModuleEdit] = useState([]);
    const [submodule, setSubmodule] = useState([]);
    const [submoduleEdit, setSubmoduleEdit] = useState([]);
    const [mainpage, setMainpage] = useState([]);
    const [mainpageEdit, setMainpageEdit] = useState([]);
    const [subpage1, setSubpage1] = useState([]);
    const [subpage1Edit, setSubpage1Edit] = useState([]);
    const [subpage2, setSubpage2] = useState([]);
    const [subpage2Edit, setSubpage2Edit] = useState([]);
    const [username, setUsername] = useState("");
    const [subpage3, setSubpage3] = useState([]);
    const [subpage3Edit, setSubpage3Edit] = useState([]);
    const [subpage4, setSubpage4] = useState([]);
    const [subpage4Edit, setSubpage4Edit] = useState([]);
    const [subpage5, setSubpage5] = useState([]);
    const [subpage5Edit, setSubpage5Edit] = useState([]);
    const [priorities, setpriorities] = useState([]);
    const [prioritiesEdit, setprioritiesEdit] = useState([]);

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
        if (subproject.length === 0) {
            setsubprojectnone("None")
        } else {
            setsubprojectnone("Show")
        }

    })
    const [subprojecteditnone, setsubprojecteditnone] = useState("")

    const [getprojectname, setgetprojectname] = useState("")

    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdownsedit = async () => {
        let projectName = getprojectname ? getprojectname : projEstimateEdit.project;
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (projectName === data.project){
                    return data
                }
                    
            })
            setSubProjectEdit(subProDrop);

        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if (subProjectEdit.length === 0) {
            setsubprojecteditnone("None")
        } else {
            setsubprojecteditnone("Show")
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

    const [getsubprojectname, setgetsubprojectname] = useState("")

    //fetching Module Dropdowns
    const fetchModuleDropdownsedit = async () => {
        let projectName = getprojectname ? getprojectname : projEstimateEdit.project;
        let subPro = getsubprojectname ? getsubprojectname : projEstimateEdit.subproject;
        try {
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
                if (subprojecteditnone === "None" ? projectName == data.project : subPro === data.subproject) {
                    return data
                }
            })
            setModuleEdit(modulelist);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [submodulenone, setsubmodulenone] = useState("");
    const [submoduleeditnone, setsubmoduleeditnone] = useState("");

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

    const [getmodulename, setgetmodulename] = useState("")

    //fetching Sub-Modules Dropdowns
    const fetchSubModuleDropdownsedit = async () => {

        let modu = getmodulename ? getmodulename : projEstimateEdit.module;
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

    useEffect(() => {
        if (submoduleEdit.length === 0) {
            setsubmoduleeditnone("None")
        } else {
            setsubmoduleeditnone("Show")
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

    const [getsubmodulename, setgetsubmodulename] = useState("")

    //fetching Main Page Dropdowns
    const fetchMainPageDropdownsedit = async () => {
        let modu = getmodulename ? getmodulename : projEstimateEdit.module;
        let submod = getsubmodulename ? getsubmodulename : projEstimateEdit.submodule;
        try {
            let mainPag = await axios.get(SERVICE.MAINPAGE);
            let mainPagdrop = mainPag.data.mains.filter((data) => {
                if (submoduleeditnone === "None" ? modu == data.module : submod === data.submodule)
                    return data
            })
            setMainpageEdit(mainPagdrop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

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

    const [getmainpagename, setgetmainpagename] = useState("")

    //fetching Sub-Page-1 Dropdowns
    const fetchSubPage1Dropdownsedit = async () => {
        let mainPag = getmainpagename ? getmainpagename : projEstimateEdit.mainpage;
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



    //fetching Sub-Page-2 Dropdowns
    const fetchSubPage2Dropdowns = async (subpg1) => {
        try {
            let subpag2 = await axios.get(SERVICE.SUBPAGESTWO);
            let subPag1Drop = subpag2.data.subpagestwo.filter((data) => {
                if (subpg1 === data.subpageone)
                    return data
            })

            setSubpage2(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [getsubpage1name, setgetsubpage1name] = useState("")


    //fetching Sub-Page-2 Dropdowns
    const fetchSubPage2Dropdownsedit = async () => {
        let subPage1 = getsubpage1name ? getsubpage1name : projEstimateEdit.subpageone;;

        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESTWO);
            let subPag1Drop = subpag1.data.subpagestwo.filter((data) => {
                if (subPage1 === data.subpageone)
                    return data
            })
            setSubpage2Edit(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    //fetching Sub-Page-3 Dropdowns
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


    const [getsubpage2name, setgetsubpage2name] = useState("")

    const fetchSubPage3Dropdownsedit = async () => {
        let subPage2 = getsubpage2name ? getsubpage2name : projEstimateEdit.subpagetwo;
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

    const [getsubpage3name, setgetsubpage3name] = useState("")
    const fetchSubPage4Dropdownsedit = async () => {
        let subPage3 = getsubpage3name ? getsubpage3name : projEstimateEdit.subpagethree;

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

    const [getsubpage4name, setgetsubpage4name] = useState("")

    //fetching Sub-Page-5 Dropdowns
    const fetchSubPage5Dropdownsedit = async () => {
        try {
            let subPage4 = getsubpage4name ? getsubpage4name : projEstimateEdit.subpagefour;
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


    //fetching Project for Dropdowns
    const fetchPriorities = async () => {
        try {
            let projectDrop = await axios.get(SERVICE.PRIORITY);
            setpriorities(projectDrop.data.priorities);
            setprioritiesEdit(projectDrop.data.priorities);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    //submitting the forms
    const handleSubmit = (e) => {
        e.preventDefault();
        if (projEstimate.project === "") {
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
        else if (projEstimate.subproject === "") {
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
        else if (projEstimate.module === "") {
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
        else if (projEstimate.submodule === "") {
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
        else if (projEstimate.mainpage === "") {
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
        else if (projEstimate.subpage1 === "") {
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
        else if (projEstimate.subpage2 === "") {
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
        else if (projEstimate.expectcompdate === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose exceptcompdate"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projEstimate.expectcomptime === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose Time"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projEstimate.budget === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please select Budget"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projEstimate.budgetsign === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose BudgetSign"}
                    </p>
                </>
            );
            handleClickOpenerr();
        }
        else if (projEstimate.priority === "") {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {"Please choose priority"}
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
                SERVICE.PROJECTESTIMATION_CREATE,
                {
                    project: String(projEstimate.project),
                    subproject: String(subprojectnone === "None" ? "None" : projEstimate.subproject),
                    module: String(projEstimate.module),
                    submodule: String(submodulenone === "None" ? "None" : projEstimate.submodule),
                    mainpage: String(projEstimate.mainpage),
                    subpageone: String(projEstimate.subpageone),
                    subpagetwo: String(projEstimate.subpagetwo),
                    subpagethree: String(projEstimate.subpagethree),
                    subpagefour: String(projEstimate.subpagefour),
                    subpagefive: String(projEstimate.subpagefive),
                    expectcompdate: String(projEstimate.expectcompdate),
                    expectcomptime: String(projEstimate.expectcomptime),
                    expectcompduration: String(projEstimate.expectcompduration),
                    budget: String(projEstimate.budget),
                    budgetsign: String(projEstimate.budgetsign ? projEstimate.budgetsign : "₹"),
                    priority: String(projEstimate.priority),
                    prioritylevel: String(projEstimate.prioritylevel ? projEstimate.prioritylevel : "level1"),
                    addedby: [
                        {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],
                }
            );
            setProjEstimate(req.data);
            setProjEstimate({
                expectcompdate: "",
                expectcomptime: "",
                expectcompduration: "",
                budget: "",
                budgetsign: "",
                priority: "",
            });


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

    //fetching Project Estimation for list Page
    const fetchProjectEstList = async () => {
        try {
            let dep = await axios.get(SERVICE.PROJECTESTIMATION);

            setProjEstList(dep.data.projectestimation);
        } catch (error) {
            console.log(error.response.data);
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

    //get single row to edit
    const getCode = async (e) => {
        setRowGetid(e);
        let res = await axios.get(
            `${SERVICE.PROJECTESTIMATION_SINGLE}/${e}`,
            {}
        );

        setProjEstimateEdit(res.data.sprojectestimation);
        setRowGetid(res.data.sprojectestimation);
    };

    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.PROJECTESTIMATION_SINGLE}/${e}`, {});
        setProjEstimateEdit(res.data.sprojectestimation);
    };


    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.PROJECTESTIMATION_SINGLE}/${e}`, {});
        setProjEstimateEdit(res.data.sprojectestimation);
    };

    //project estimation updatedby edit page....
    let updateby = projEstimateEdit.updatedby;
    let addedby = projEstimateEdit.addedby;


    //editing the single data

    let lang_id = getrowid._id;
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.PROJECTESTIMATION_SINGLE}/${lang_id}`,
                {
                    project: String(projEstimateEdit.project),
                    subproject: String(projEstimateEdit.subproject),
                    module: String(projEstimateEdit.module),
                    submodule: String(projEstimateEdit.submodule),
                    mainpage: String(projEstimateEdit.mainpage),
                    subpageone: String(projEstimateEdit.subpageone),
                    subpagetwo: String(projEstimateEdit.subpagetwo),
                    subpagethree: String(projEstimateEdit.subpagethree),
                    subpagefour: String(projEstimateEdit.subpagefour),
                    subpagefive: String(projEstimateEdit.subpagefive),
                    expectcompdate: String(projEstimateEdit.expectcompdate),
                    expectcomptime: String(projEstimateEdit.expectcomptime),
                    expectcompduration: String(projEstimateEdit.expectcompduration),
                    budget: String(projEstimateEdit.budget),
                    budgetsign: String(projEstimateEdit.budgetsign),
                    priority: String(projEstimateEdit.priority),
                    prioritylevel: String(projEstimateEdit.prioritylevel),
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],
                }
            );
            setProjEstimateEdit(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data.message)
        }
    };

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    };


    //    PDF...
    const modifiedData = projEstlist.map((person) => ({
        ...person,
        budgets: person.budgetsign + ' ' + person.budget,
        priorityLevel: person.priority + ' ' + person.prioritylevel,
    }));


    const columns = [

        { title: "Expectcompdate", field: "expectcompdate" },
        { title: "Expectcomptime", field: "expectcomptime" },
        { title: "Expectcompduration", field: "expectcompduration" },
        { title: "Project", field: "project" },
        { title: "Sub-Project", field: "subproject" },
        { title: "Module", field: "module" },
        { title: "Sub-Module", field: "submodule" },
        { title: "Main Page", field: "mainpage" },
        { title: "Sub-Page 1", field: "subpageone" },
        { title: "Sub-Page 2", field: "subpagetwo" },
        { title: "Sub-Page 3", field: "subpagethree" },
        { title: "Sub-Page 4", field: "subpagefour" },
        { title: "Sub-Page 5", field: "subpagefive" },
        { title: "Budget", field: "budgets" },
        { title: "Priority", field: "priorityLevel" },

    ]
    const downloadPdf = () => {
        const doc = new jsPDF()
        doc.autoTable({
            theme: "grid",
            styles: {
                fontSize: 6,
            },
            columns: columns.map(col => ({ ...col, dataKey: col.field })),
            body: modifiedData
        })
        doc.save('ProjectEstimation.pdf')
    }


    // Excel
    const fileName = "projEstlist";

    const [projestimate, setProjectestimate] = useState([]);

    // get perticular columns for export excel
    const getexcelDatas = async () => {
        let response = await axios.get(SERVICE.PROJECTESTIMATION, {

        })
        var data = response.data.projectestimation.map((t, index) => ({
            "Sno": index + 1,
            "Expectcompdate": t.expectcompdate,
            "Expectcomptime": t.expectcomptime,
            "Expectcompduration": t.expectcompduration,
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
            "Budget": t.budgetsign + " " + t.budget,
            "Priority level": t.priority + " " + t.prioritylevel,
        }));
        setProjectestimate(data);
    }

    // Print
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'PROJECTESTIMATION',
        pageStyle: 'print'
    });


    //set function to get particular row to Delete
    const rowData = async (id) => {
        try {
            let res = await axios.get(
                `${SERVICE.PROJECTESTIMATION_SINGLE}/${id}`
            );
            setDeletebranch(res.data.sprojectestimation);
        } catch (err) { }
    };

    // Alert delete popup
    let branchid = deletebranch._id;
    const delBranch = async () => {
        try {
            await axios.delete(`${SERVICE.PROJECTESTIMATION_SINGLE}/${branchid}`);
            handleCloseMod();
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };



    useEffect(() => {
        fetchProjectEstList();
        fetchSubProjectDropdownsedit();
        fetchModuleDropdownsedit();
        fetchSubModuleDropdownsedit();
        fetchMainPageDropdownsedit();
        fetchSubPage1Dropdownsedit();
        fetchSubPage2Dropdownsedit();
        fetchSubPage3Dropdownsedit();
        fetchSubPage4Dropdownsedit();
        fetchSubPage5Dropdownsedit();

    });

    useEffect(() => {
        getusername();
        getexcelDatas();
        fetchProjectDropdowns();
        fetchModuleDropdowns();
        fetchSubModuleDropdowns();
        fetchMainPageDropdowns();
        fetchSubPage1Dropdowns();
        fetchSubPage2Dropdowns();
        fetchPriorities();

    }, []);

    const [items, setItems] = useState([]);

    const addSerialNumber = () => {
        const itemsWithSerialNumber = projEstlist?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
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

    const totalPages = Math.ceil(projEstlist.length / pageSize);

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
            {/* <Headtitle title={"Qualification"} /> */}
            {/* ****** Header Content ****** */}
            <Typography sx={userStyle.HeaderText}>Project Estimation</Typography>

            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <Typography>Project</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.project}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, project: e.target.value });
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
                            <Grid item md={6} xs={12}>
                                <Typography>Sub-Project</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projEstimate.subproject}
                                        onChange={(e, i) => {
                                            setProjEstimate({ ...projEstimate, subproject: e.target.value });
                                            fetchModuleDropdowns(e.target.value);
                                        }}
                                    >
                                        {subproject &&
                                            subproject.map((row, index) => (
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
                        <Grid item md={6} xs={12}>
                            <Typography>Module</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.module}
                                    onChange={(e, i) => {
                                        setProjEstimate({ ...projEstimate, module: e.target.value });
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
                            <Grid item md={6} xs={12}>
                                <Typography>Sub-Module</Typography>

                                <FormControl fullWidth size="small">
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={projEstimate.submodule}
                                        onChange={(e) => {
                                            setProjEstimate({ ...projEstimate, submodule: e.target.value });
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
                        <Grid item md={4} xs={12}>
                            <Typography>Main Page</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.mainpage}
                                    onChange={(e, i) => {
                                        setProjEstimate({ ...projEstimate, mainpage: e.target.value });
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
                        <Grid item md={4} xs={12}>
                            <Typography>Sub-Page 1</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.subpageone}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, subpageone: e.target.value });
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
                        <Grid item md={4} xs={12}>
                            <Typography>Sub-Page 2</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.subpagetwo}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, subpagetwo: e.target.value });
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
                        <Grid item md={4} xs={12}>
                            <Typography>Sub-Page 3</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.subpagethree}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, subpagethree: e.target.value });
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
                        <Grid item md={4} xs={12}>
                            <Typography>Sub-Page 4</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.subpagefour}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, subpagefour: e.target.value });
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
                        <Grid item md={4} xs={12}>
                            <Typography>Sub-Page 5</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projEstimate.subpagefive}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, subpagefive: e.target.value });
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

                    </Grid><br />

                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Typography>Expected Completion</Typography>

                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="date"
                                    value={projEstimate.expectcompdate}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, expectcompdate: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography>Expected Time</Typography>

                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="time"
                                    value={projEstimate.expectcomptime}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, expectcomptime: e.target.value });
                                    }}
                                />

                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography>Expected Duration</Typography>

                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={projEstimate.expectcompduration}
                                    onChange={(e) => {
                                        setProjEstimate({ ...projEstimate, expectcompduration: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12} sm={12}>
                            <Grid container>
                                <Grid item md={8} xs={8}>
                                    <Typography>Budget</Typography>
                                    <FormControl fullWidth size="small">
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="number"
                                            value={projEstimate.budget}
                                            onChange={(e) => {
                                                setProjEstimate({ ...projEstimate, budget: e.target.value });
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} xs={4}>
                                    <FormControl fullWidth size="small">
                                        <Typography>BudgetSign</Typography>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={projEstimate.budgetsign}
                                            onChange={(e) => {
                                                setProjEstimate({ ...projEstimate, budgetsign: e.target.value });
                                            }}
                                        >
                                            <MenuItem value={"₹"}>₹</MenuItem>
                                            <MenuItem value={"$"}>$</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} xs={12} sm={12}>
                            <Grid container>

                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>Priority</Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={projEstimate.priority}
                                            onChange={(e) => {
                                                setProjEstimate({ ...projEstimate, priority: e.target.value });
                                            }}
                                        >

                                            {
                                                priorities.map((data) => {
                                                    return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography>level</Typography>
                                    <FormControl fullWidth size="small">

                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            value={projEstimate.prioritylevel}
                                            onChange={(e) => {
                                                setProjEstimate({ ...projEstimate, prioritylevel: e.target.value });
                                            }}
                                        >
                                            <MenuItem value={"level1"}>level1</MenuItem>
                                            <MenuItem value={"level2"}>level2</MenuItem>
                                            <MenuItem value={"level3"}>level3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid item md={3} sx={12}>
                        <Button variant="contained" onClick={handleSubmit}>Create</Button>
                    </Grid>

                    <br />
                    <br />
                </>

                <>
                    <Box>
                        {/* Edit DIALOG */}
                        <Dialog
                            open={isEditOpen}
                            onClose={handleCloseModEdit}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            maxWidth="md"
                        >
                            <Box sx={userStyle.dialogbox}>
                                <Typography sx={userStyle.SubHeaderText}> Edit Project Estimation </Typography>
                                <br /><br />
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <Typography>Project</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.project}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, project: e.target.value,module:"",submodule: "",mainpage:"",subpageone:"",subpagetwo:"",subpagethree:"", subpagefour:"",subpagefive:"" });
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
                                        {subprojecteditnone == "None" ? null :
                                        <Grid item md={6} xs={12}>
                                            <Typography>Sub-Project</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.subproject}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, subproject: e.target.value });
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
                                    }
                                    </Grid><br />
                                    <Grid container spacing={2}>
                                        <Grid item md={6} xs={12}>
                                            <Typography>Module</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.module}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, module: e.target.value });
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
                                        {submoduleeditnone == "None" ? null :
                                        <Grid item md={6} xs={12}>
                                            <Typography>Sub-Module</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.submodule}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, submodule: e.target.value });
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
                                        }
                                    </Grid><br />
                                    <Grid container spacing={2}>
                                        <Grid item md={4} xs={12}>
                                            <Typography>Main Page</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.mainpage}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, mainpage: e.target.value });
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
                                        <Grid item md={4} xs={12}>
                                            <Typography>Sub-Page 1</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.subpageone}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, subpageone: e.target.value });
                                                        setgetsubpage1name(e.target.value);

                                                    }}
                                                >
                                                    {
                                                        subpage1Edit && subpage1Edit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <Typography>Sub-Page 2</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.subpagetwo}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, subpagetwo: e.target.value });
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
                                        <Grid item md={4} xs={12}>
                                            <Typography>Sub-Page 3</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.subpagethree}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, subpagethree: e.target.value });
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
                                        <Grid item md={4} xs={12}>
                                            <Typography>Sub-Page 4</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.subpagefour}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, subpagefour: e.target.value });
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
                                        <Grid item md={4} xs={12}>
                                            <Typography>Sub-Page 5</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.subpagefive}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, subpagefive: e.target.value });
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
                                        <Grid item md={4} xs={12}>
                                            <Typography>Expected Completion</Typography>

                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="date"
                                                    value={projEstimateEdit.expectcompdate}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, expectcompdate: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <Typography>Expected Time</Typography>

                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="time"
                                                    value={projEstimateEdit.expectcomptime}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, expectcomptime: e.target.value });
                                                    }}
                                                />

                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <Typography>Expected Duration</Typography>

                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    value={projEstimateEdit.expectcompduration}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, expectcompduration: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid><br />
                                    <Grid container spacing={2}>

                                    <Grid item md={6} xs={12} sm={12}>
                                        <Grid container>
                                        <Grid item md={6} xs={12} sm={12}>
                                            <Typography>Budget</Typography>

                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="number"
                                                    value={projEstimateEdit.budget}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, budget: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} xs={12} sm={12}>
                                            <FormControl fullWidth size="small">
                                                <Typography>Budgetsign</Typography>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.budgetsign}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, budgetsign: e.target.value });
                                                    }}
                                                >
                                                    <MenuItem value={"₹"}>₹</MenuItem>
                                                    <MenuItem value={"$"}>$</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        </Grid>
                                        </Grid>
                                                                         
                                    <Grid item md={6} xs={12} sm={12}>
                                        <Grid container>
                                        <Grid item md={6} xs={12}>
                                            <Typography>priority</Typography>
                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.priority}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, priority: e.target.value });
                                                    }}
                                                >
                                                    {prioritiesEdit &&
                                                        prioritiesEdit.map((row, index) => (
                                                            <MenuItem value={row.name} key={index}>{row.name}</MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography>priority Level</Typography>
                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projEstimateEdit.prioritylevel}
                                                    onChange={(e) => {
                                                        setProjEstimateEdit({ ...projEstimateEdit, prioritylevel: e.target.value });
                                                    }}
                                                >
                                                    <MenuItem value={"level1"}>level1</MenuItem>
                                                    <MenuItem value={"level2"}>level2</MenuItem>
                                                    <MenuItem value={"level3"}>level3</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                                <br /><br />
                                <Grid container>
                                    <Grid item md={1} sx={12}></Grid>
                                    <Grid item md={5} sx={12}>
                                        <Button variant="contained" onClick={editSubmit}> Update </Button>
                                    </Grid>
                                    <Grid item md={5} sx={12}>
                                        <Button sx={userStyle.btncancel} onClick={handleCloseModEdit}> cancel </Button>
                                    </Grid>
                                    <Grid item md={1} sx={12}></Grid>
                                </Grid>

                            </Box>
                        </Dialog>
                    </Box>
                </>
            </Box>
            <br />
            {/* ****** Table Start ****** */}
            <>
                <Box sx={userStyle.container}>
                    { /* ****** Header Buttons ****** */}
                    <Grid container sx={{ justifyContent: "center" }} >
                        <Grid >

                            <ExportCSV csvData={projestimate} fileName={fileName} />

                            <ExportXL csvData={projestimate} fileName={fileName} />

                            <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>

                            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                        </Grid>
                    </Grid><br />

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
                                <MenuItem value={(projEstlist.length)}>All</MenuItem>
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
                            sx={{ minWidth: 700, }}
                            aria-label="customized table"
                            id="usertable"
                        >
                            <TableHead sx={{ fontWeight: "600" }}>
                                <StyledTableRow>
                                    <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
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
                                    <StyledTableCell onClick={() => handleSorting('expectcompdate')}><Box sx={userStyle.tableheadstyle}><Box>Expectcompdate</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('expectcompdate')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('expectcomptime')}><Box sx={userStyle.tableheadstyle}><Box>expectcomptime</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('expectcomptime')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('expectcompduration')}><Box sx={userStyle.tableheadstyle}><Box>expectcompduration</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('expectcompduration')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('budget')}><Box sx={userStyle.tableheadstyle}><Box>Budget</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('budget')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('budgetsign')}><Box sx={userStyle.tableheadstyle}><Box>BudgetSign</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('budgetsign')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('priority')}><Box sx={userStyle.tableheadstyle}><Box>Priority</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('priority')}</Box></Box></StyledTableCell>
                                    <StyledTableCell onClick={() => handleSorting('prioritylevel')}><Box sx={userStyle.tableheadstyle}><Box>Priority Level</Box><Box sx={{ marginTop: '-6PX' }}>{renderSortingIcon('prioritylevel')}</Box></Box></StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody align="left">
                                {filteredData.length > 0 ? (
                                    filteredData?.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="left">{row.serialNumber}</StyledTableCell>
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
                                            <StyledTableCell align="left">{row.expectcompdate}</StyledTableCell>
                                            <StyledTableCell align="left">{row.expectcomptime}</StyledTableCell>
                                            <StyledTableCell align="left">{row.expectcompduration}</StyledTableCell>
                                            <StyledTableCell align="left">{row.budget}</StyledTableCell>
                                            <StyledTableCell align="left">{row.budgetsign}</StyledTableCell>
                                            <StyledTableCell align="left">{row.priority}</StyledTableCell>
                                            <StyledTableCell align="left">{row.prioritylevel}</StyledTableCell>
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
                                    ))) : <StyledTableRow> <StyledTableCell colSpan={4} align="center">No Data Available</StyledTableCell> </StyledTableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box style={userStyle.dataTablestyle}>
                        <Box>
                            Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, projEstlist.length)} of {projEstlist.length} entries
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
                            onClick={(e) => delBranch(branchid)}
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
                    <Typography sx={userStyle.SubHeaderText}>Project Estimation </Typography>
                    <br /><br />
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Project</Typography>
                                    <Typography>{projEstimateEdit.project}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12} >
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6"> Sub-Project</Typography>
                                    <Typography>{projEstimateEdit.subproject}</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6"> Module</Typography>
                                <Typography>{projEstimateEdit.module}</Typography>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <Typography variant="h6">Sub-Module</Typography>
                                <Typography>{projEstimateEdit.submodule}</Typography>
                            </Grid>

                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Main Page</Typography>
                                <Typography>{projEstimateEdit.mainpage}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 1</Typography>
                                <Typography>{projEstimateEdit.subpageone}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 2</Typography>
                                <Typography>{projEstimateEdit.subpagetwo}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 3</Typography>
                                <Typography>{projEstimateEdit.subpagethree}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 4</Typography>
                                <Typography>{projEstimateEdit.subpagefour}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 5</Typography>
                                <Typography>{projEstimateEdit.subpagefive}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Expected Completion</Typography>
                                <Typography>{projEstimateEdit.expectcompdate}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Expected Time</Typography>
                                <Typography>{projEstimateEdit.expectcomptime}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Expected Duration</Typography>
                                <Typography>{projEstimateEdit.expectcompduration}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Budget</Typography>
                                <Typography>{projEstimateEdit.budget + " "+ projEstimateEdit.budgetsign}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">priority</Typography>
                                <Typography>{projEstimateEdit.priority + " " + projEstimateEdit.prioritylevel }</Typography>
                            </Grid>
                            <br /><br />
                        </Grid><br />
                    </>
                    <br /><br />
                    <Grid item md={5} sx={12}>
                        <Button variant="contained" onClick={handleCloseview}> Back </Button>
                    </Grid>
                    <Grid item md={1} sx={12}></Grid>


                </Box>
            </Dialog>

            {/* print layout */}

            <TableContainer component={Paper} sx={userStyle.printcls}>
                <Table sx={{ minWidth: 700, }} aria-label="customized table" id="usertable" ref={componentRef}>
                    <TableHead sx={{ fontWeight: "600" }}>
                        <TableRow>
                            <TableCell> S.NO</TableCell>
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
                            <TableCell>Expectcompdate</TableCell>
                            <TableCell>Expectcomptime</TableCell>
                            <TableCell>Expectcompduration</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell>BudgetSign</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Priority Level</TableCell>
                        </TableRow>
                    </TableHead>
                    {projEstlist &&
                        projEstlist.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{index + 1}</TableCell>
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
                                <TableCell align="left">{row.expectcompdate}</TableCell>
                                <TableCell align="left">{row.expectcomptime}</TableCell>
                                <TableCell align="left">{row.expectcompduration}</TableCell>
                                <TableCell align="left">{row.budget}</TableCell>
                                <TableCell align="left">{row.budgetsign}</TableCell>
                                <TableCell align="left">{row.priority}</TableCell>
                                <TableCell align="left">{row.prioritylevel}</TableCell>
                            </TableRow>
                        ))}
                </Table>
            </TableContainer>


            {/* this is info view details */}

            <Dialog
                open={openInfo}
                onClose={handleCloseinfo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <>
                        <Typography sx={userStyle.HeaderText}> Info </Typography>
                        <br /><br />
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography>
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
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Updated by</Typography>
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

export default ProjectEstimation;