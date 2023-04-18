import React, { useState, useEffect, useRef,useContext } from "react";
import {
    Box, Typography, OutlinedInput, FormControl, TableBody, Select, MenuItem, DialogContent, Grid, Dialog, DialogActions, Paper, Table, TableHead, TableContainer, Button,
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
// import Headtitle from "../../components/header/Headtitle";
import $ from "jquery";
// import { UserRoleAccessContext } from "../../context/Appcontext";
import { SERVICE } from "../../services/Baseservice";
import ProjectDetails from "./Projectdetails";
// import { AuthContext } from '../../context/Appcontext';
// import { useNavigate} from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import moment from 'moment-timezone';


function Projectallocation() {
    // const { isUserRoleCompare } = useContext(UserRoleAccessContext);
    // const { auth, setAuth } = useContext(AuthContext);
    const [deleteProjAlloc, setDeleteProjAlloc] = useState(false);
    const [getrowid, setRowGetid] = useState("");
    const [empNames, setEmpNames] = useState("");
    const [projAllocationEdit, setProjAllocationEdit] = useState({project:"",subproject:"",module:"",submodule:"",mainpage:"",subpageone:"",subpagetwo:"",subpagethree:"",subpagefour:"",subpagefive:"",
    assignedto: "",
    assignedtotype: "",
    assignedtodate: "",
    assignedby: "",
    assignedbydate: "",
    assignedbytime: "",
    deadline: "",
    calculatedtime: "",});
    const [projAllocation, setProjAllocation] = useState({
        project:"",subproject:"",module:"",submodule:"",mainpage:"",subpageone:"",subpagetwo:"",subpagethree:"",subpagefour:"",subpagefive:"",
        assignedto: "",
        assignedtotype: "",
        assignedtodate: "",
        assignedby: "",
        assignedbydate: "",
        assignedbytime: "",
        deadline: "",
        calculatedtime: "",
    });
    const [projAllocList, setProjAllocLisLang] = useState([]);
    const [project, setProject] = useState([]);
    const [subProject, setSubProject] = useState([]);
    const [module, setModule] = useState([]);
    const [submodule, setSubmodule] = useState([]);
    const [mainpage, setMainpage] = useState([]);
    const [subpageone, setsubpageone] = useState([]);
    const [subpagetwo, setsubpagetwo] = useState([]);
    const [subpagethree, setsubpagethree] = useState([]);
    const [subpagefour, setsubpagefour] = useState([]);
    const [subpagefive, setsubpagefive] = useState([]);
    const [subProjectEdit, setSubProjectEdit] = useState([]);
    const [moduleEdit, setModuleEdit] = useState([]);
    const [submoduleEdit, setSubmoduleEdit] = useState([]);
    const [mainpageEdit, setMainpageEdit] = useState([]);
    const [subpageoneEdit, setsubpageoneEdit] = useState([]);
    const [subpagetwoEdit, setsubpagetwoEdit] = useState([]);
    const [subpagethreeEdit, setsubpagethreeEdit] = useState([]);
    const [subpagefourEdit, setsubpagefourEdit] = useState([]);
    const [subpagefiveEdit, setsubpagefiveEdit] = useState([]);
    const [calculatedTime, setCalculatedTime] = useState("");
    const [username, setUsername] = useState("");

    // Error Popup model
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [showAlert, setShowAlert] = useState()
    const handleClickOpenerr = () => {
        setIsErrorOpen(true);
    };
    const handleCloseerr = () => {
        setIsErrorOpen(false);
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



    //fetching Project for Dropdowns
    const fetchProjectDropdowns = async () => {
        try {
            let projectDrop = await axios.get(SERVICE.PROJECT);
            setProject(projectDrop.data.projects);
            setCalculatedTime(projectDrop.data.projects)
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const[subprojectnone, setsubprojectnone] = useState("");
    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdowns = async (e) => {
        try {
            // console.log(projectName)
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

    const [getprojectname, setgetprojectname] = useState("")
    const[subprojecteditnone, setsubprojecteditnone] = useState("");

    //fetching sub-Project Dropdowns
    const fetchSubProjectDropdownsedit = async () => {
        let projectName = getprojectname ? getprojectname : projAllocationEdit.project;
        try {
            let subPro = await axios.get(SERVICE.SUBPROJECT);
            let subProDrop = subPro.data.subprojects.filter((data) => {
                if (projectName == data.project){
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
    const fetchModuleDropdowns = async (subPro) => {
        try {
            // console.log(subPro)
            let dropModule = await axios.get(SERVICE.MODULE);
            let modulelist = dropModule.data.modules.filter((data) => {
               
                if (subPro === data.subproject) {
                    // console.log(data)
                    return data
                }

            })
            setModule(modulelist);
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

    const [getsubprojectname, setgetsubprojectname] = useState("")

    //fetching Module Dropdowns
    const fetchModuleDropdownsedit = async () => {
        let projectName = getprojectname ? getprojectname : projAllocationEdit.project;

    let subPro = getsubprojectname ? getsubprojectname : projAllocationEdit.subproject;
    try {
        let dropModule = await axios.get(SERVICE.MODULE);
        let modulelist = dropModule.data.modules.filter((data) => {
            if (subprojecteditnone == "None" ? projectName == data.project : subPro == data.subproject) {
                return data
            }
        })
        setModuleEdit(modulelist);
    } catch (error) {
        console.log(error.response.data);
    }
    };


   

    const[submodulenone, setsubmodulenone] = useState("");
    const[submoduleeditnone, setsubmoduleeditnone] = useState("");

    //fetching Sub-Modules Dropdowns
    const fetchSubModuleDropdowns = async (modu) => {
        try {
            // console.log(modu)
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
    });
    
const [getmodulename, setgetmodulename] = useState("")

//fetching Sub-Modules Dropdowns
const fetchSubModuleDropdownsedit = async () => {
let modu = getmodulename ? getmodulename : projAllocationEdit.module;
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
    const fetchMainPageDropdowns = async (submod) => {
        try {
            let mainPag = await axios.get(SERVICE.MAINPAGE);
            let mainPagdrop = mainPag.data.mains.filter((data) => {
                if (submod === data.submodule)
                    return data
            })
            setMainpage(mainPagdrop);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    //fetching Sub-Page-1 Dropdowns
    const fetchsubpageoneDropdowns = async (mainPag) => {
        try {
            let subpag1 = await axios.get(SERVICE.SUBPAGESONE);
            let subPag1Drop = subpag1.data.subpagesone.filter((data) => {
                if (mainPag === data.mainpage)
                    return data
            })
            setsubpageone(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    //fetching Sub-Page-2 Dropdowns
    const fetchsubpagetwoDropdowns = async (e) => {
        try {
            let subpag2 = await axios.get(SERVICE.SUBPAGESTWO);
            let subPag1Drop = subpag2.data.subpagestwo.filter((data) => {
                console.log(data.subpageone,'data.subpageone')
                if (e === data.subpageone)
                    return data
            })

            setsubpagetwo(subPag1Drop);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Sub-Page-2 Dropdowns
    const fetchsubpagethreeDropdowns = async (e) => {
    try {
        //console.log(e)
        let subpag2 = await axios.get(SERVICE.SUBPAGESTHREE);
        let subPag1Drop = subpag2.data.subpagesthree.filter((data) => {
            console.log(e,'e')
            if (e === data.subpagetwo)
                return data
        })
        setsubpagethree(subPag1Drop);
    } catch (error) {
        console.log(error.response.data);
    }
};

        //fetching Sub-Page-4 Dropdowns
        const fetchsubpagefourDropdowns = async (subpagethree) => {
            try {
                let subpag1 = await axios.get(SERVICE.SUBPAGESFOUR);
                let subPag1Drop = subpag1.data.subpagesfour.filter((data) => {
                    if (subpagethree === data.subpagethree)
                        return data
                })
                setsubpagefour(subPag1Drop);
            } catch (error) {
                console.log(error.response.data);
            }
        };
       
           //fetching Sub-Page-4 Dropdowns
           const fetchsubpagefiveDropdowns = async (subpagethree) => {
            try {
                let subpag1 = await axios.get(SERVICE.SUBPAGESFIVE);
                let subPag1Drop = subpag1.data.subpagesfive.filter((data) => {
                    if (subpagethree === data.subpagefour)
                        return data
                })
                setsubpagefive(subPag1Drop);
            } catch (error) {
                console.log(error.response.data);
            }
        };



        











const [getsubmodulename, setgetsubmodulename] = useState("")

//fetching Main Page Dropdowns
const fetchMainPageDropdownsedit = async () => {
    let submod = getsubmodulename ? getsubmodulename : projAllocationEdit.submodule;
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
const fetchsubpageoneDropdownsedit = async () => {
let mainPag = getmainpagename ? getmainpagename : projAllocationEdit.mainpage;
try {
    let subpag1 = await axios.get(SERVICE.SUBPAGESONE);
    let subPag1Drop = subpag1.data.subpagesone.filter((data) => {
        if (mainPag === data.mainpage)
            return data
    })
    setsubpageoneEdit(subPag1Drop);
} catch (error) {
    console.log(error.response.data);
}
};


const [getsubpageonename, setgetsubpageonename] = useState("")


//fetching Sub-Page-2 Dropdowns
const fetchsubpagetwoDropdownsedit = async () => {
    let subpageone = getsubpageonename ? getsubpageonename : projAllocationEdit.subpageone;;

    try {
        let subpag1 = await axios.get(SERVICE.SUBPAGESTWO);
        let subPag1Drop = subpag1.data.subpagestwo.filter((data) => {
            if (subpageone === data.subpageone)
                return data
        })
        setsubpagetwoEdit(subPag1Drop);
    } catch (error) {
        console.log(error.response.data);
    }
};

const [getsubpagetwoname, setgetsubpagetwoname] = useState("")

const fetchsubpagethreeDropdownsedit = async () => {
    let subpagetwo = getsubpagetwoname ? getsubpagetwoname : projAllocationEdit.subpagetwo;
    try {
        let subpag1 = await axios.get(SERVICE.SUBPAGESTHREE);
        let subPag1Drop = subpag1.data.subpagesthree.filter((data) => {
            if (subpagetwo === data.subpagetwo)
                return data
        })
        setsubpagethreeEdit(subPag1Drop);
    } catch (error) {
        console.log(error.response.data);
    }
};


const [getsubpagethreename, setgetsubpagethreename] = useState("")
const fetchsubpagefourDropdownsedit = async () => {
    let subpagethree = getsubpagethreename ? getsubpagethreename : projAllocationEdit.subpagethree;

    try {
        let subpag1 = await axios.get(SERVICE.SUBPAGESFOUR);
        let subPag1Drop = subpag1.data.subpagesfour.filter((data) => {
            if (subpagethree === data.subpagethree)
                return data
        })
        setsubpagefourEdit(subPag1Drop);
    } catch (error) {
        console.log(error.response.data);
    }
};


const [getsubpagefourname, setgetsubpagefourname] = useState("")
const fetchsubpagefiveDropdownsedit = async () => {
    let subpagethree = getsubpagefourname ? getsubpagefourname : projAllocationEdit.subpagefour;

    try {
        let subpag1 = await axios.get(SERVICE.SUBPAGESFIVE);
        let subPag5Drop = subpag1.data.subpagesfive.filter((data) => {
            if (subpagethree === data.subpagefour)
                return data
        })
        setsubpagefiveEdit(subPag5Drop);
    } catch (error) {
        console.log(error.response.data);
    }
};

    //fetching the calculated times 
    const fetchCalculatedTime = async (start, end) => {
        try {

            if (start == "project") {
                let projectDrop = await axios.get(SERVICE.PROJECT);
                let projTime = projectDrop.data.projects.filter((data) => {


                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 12;
                        setCalculatedTime(`${calTimeDays} Months Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        if (Number(data.estimation) >= 12) {
                            let calTimeDays = (Number(data.estimation)) / 12;
                            setCalculatedTime(`${calTimeDays} years Remaining`)

                        } else if (Number(data.estimation) < 12) {
                            let calTimeDays = Number(data.estimation);
                            // let calTimeHours = calTimeDays * 8 ;
                            setCalculatedTime(`${calTimeDays} Months Remaining`)
                        }
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        if (Number(data.estimation) >= 365) {
                            let calTimeDays = (Number(data.estimation)) / 12;
                            setCalculatedTime(`${calTimeDays} Years Remaining`)

                        } else if (Number(data.estimation) >= 30 && Number(data.estimation) < 365) {
                            let calTimeDays = (Number(data.estimation));
                            setCalculatedTime(`${calTimeDays} Months Remaining`)
                        }
                        else if (Number(data.estimation) < 30) {
                            let calTimeDays = (Number(data.estimation));
                            setCalculatedTime(`${calTimeDays} days Remaining`)
                        }
                    }
                })
            }


            else if (start == "subproject") {
                let projectDrop = await axios.get(SERVICE.SUBPROJECT);
                let projTime = projectDrop.data.subprojects.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining `)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }



            else if (start == "module") {
                let projectDrop = await axios.get(SERVICE.MODULE);
                let projTime = projectDrop.data.modules.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {

                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {

                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }



            else if (start == "submodule") {
                let projectDrop = await axios.get(SERVICE.SUBMODULE);
                let projTime = projectDrop.data.submodules.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Hours") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation) / 8;
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }

            else if (start == "mainpage") {
                let projectDrop = await axios.get(SERVICE.MAINPAGE);
                let projTime = projectDrop.data.mains.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }



            else if (start == "subpageone") {
                let projectDrop = await axios.get(SERVICE.SUBPAGEONE);
                let projTime = projectDrop.data.subpagesone.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }


            else if (start == "subpagetwo") {
                let projectDrop = await axios.get(SERVICE.SUBPAGETWO);
                let projTime = projectDrop.data.subpagestwo.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }


            else if (start == "subpagethree") {
                let projectDrop = await axios.get(SERVICE.SUBPAGESTHREE);
                let projTime = projectDrop.data.subpagesthree.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }




            else if (start == "subpagefour") {
                let projectDrop = await axios.get(SERVICE.SUBPAGESFOUR);
                let projTime = projectDrop.data.subpagesfour.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }


            else if (start == "subpagefive") {
                let projectDrop = await axios.get(SERVICE.SUBPAGESFIVE);
                let projTime = projectDrop.data.subpagesfive.filter((data) => {
                    if (data.name === end && data.estimationtime === "Year") {
                        let calTimeDays = Number(data.estimation) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Month") {
                        // console.log(data)
                        let calTimeDays = (Number(data.estimation) / 12) * 365;
                        let calTimeHours = calTimeDays * 8;
                        setCalculatedTime(`${calTimeDays} days Remaining and ${calTimeHours} hours Remaining`)
                    }
                    else if (data.name === end && data.estimationtime === "Days") {
                        // console.log(data)
                        let calTimeDays = Number(data.estimation);
                        // let calTimeHours = calTimeDays * 8 ;
                        setCalculatedTime(`${calTimeDays} days Remaining`)
                    }
                    else if (end === undefined) {
                        setCalculatedTime(0)
                    }
                })
            }

        }
        catch (error) {
            console.log(error.response.data);
        }
    }
    let today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    let formattedDate = yyyy+ '-' + mm+ '-' + dd; 

    //submitting the forms
    const handleSubmit = (e) => {
        sendRequest();
    };

    //submitting the form
    const sendRequest = async () => {
        try {
            let req = await axios.post(
                SERVICE.PROJECTALLOCATION_CREATE,
                {
                    project: String(projAllocation.project),
                    subproject: String(projAllocation.subproject),
                    module: String(projAllocation.module),
                    submodule: String(projAllocation.submodule),
                    mainpage: String(projAllocation.mainpage),
                    subpageone: String(projAllocation.subpageone),
                    subpagetwo: String(projAllocation.subpagetwo),
                    subpagethree: String(projAllocation.subpagethree),
                    subpagefour: String(projAllocation.subpagefour),
                    subpagefive: String(projAllocation.subpagefive),
                    assignedto: String(projAllocation.assignedto),
                    assignedtotype: String(projAllocation.assignedtotype),
                    assignedtodate: String(projAllocation.assignedtotype === "auto" ? formattedDate : projAllocation.assignedtodate),
                    assignedby: String(username),
                    assignedbydate: String( projAllocation.assignedbydate ),
                    assignedbytime: String(projAllocation.assignedbytime),
                    deadline: String(projAllocation.deadline),
                    calculatedtime: String(projAllocation.calculatedtime),
                    addedby: [
                        {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],


                }
            );
            setProjAllocation(req.data);
            setProjAllocation({
                project:"",subproject:"",module:"",submodule:"",mainpage:"",subpageone:"",subpagetwo:"",subpagethree:"",subpagefour:"",subpagefive:"",
                assignedto: "",
                assignedtotype: "",
                assignedtodate: "",
                assignedby: "",
                assignedbydate: "",
                assignedbytime: "",
                deadline: "",
                calculatedtime: "",
            });


        } catch (error) {
            setShowAlert(
                <>
                    <ErrorOutlineOutlinedIcon
                        sx={{ fontSize: "100px", color: "orange" }}
                    />
                    <p style={{ fontSize: "20px", fontWeight: 900 }}>
                        {(error.response.data.errorMessage)}
                    </p>
                </>
            );
            handleClickOpenerr();
        
        }
    };

    //fetching Project Estimation for list Page
    const fetchProjectEstList = async () => {
        try {
            let dep = await axios.get(SERVICE.PROJECTALLOCATION);

            setProjAllocLisLang(dep.data.projectallocation);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    //fetching Users for dropdown employees
    const fetchEmpDropdown = async () => {
        try {
            let dep = await axios.get(SERVICE.USER);

            setEmpNames(dep.data.users);
        } catch (error) {
            console.log(error.response.data);
        }
    };


    //get single row to edit
    const getCode = async (e) => {
        setRowGetid(e);
        let res = await axios.get(
            `${SERVICE.PROJECTALLOCATION_SINGLE}/${e}`,
            {}
        );

        setProjAllocationEdit(res.data.sprojectallocation);
        setRowGetid(res.data.sprojectallocation);
    };


    //Local storage ....
    let loginid = localStorage.LoginUserId;
    // console.log(localStorage);

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
        // console.log(res.data.sarea)
    }
    // console.log(username);


    // get single row to view....
    const getviewCode = async (e) => {
        let res = await axios.get(`${SERVICE.PROJECTALLOCATION_SINGLE}/${e}`, {});
        setProjAllocationEdit(res.data.sprojectallocation);
    };

    // get single row to view....
    const getinfoCode = async (e) => {
        let res = await axios.get(`${SERVICE.PROJECTALLOCATION_SINGLE}/${e}`, {});
        setProjAllocationEdit(res.data.sprojectallocation);
    };

    //mainpage updateby edit page...
    let updateby = projAllocationEdit.updatedby;
    let addedby = projAllocationEdit.addedby;


    //editing the single data
    let proj_alloc = getrowid._id;
    const sendEditRequest = async () => {
        try {
            let res = await axios.put(
                `${SERVICE.PROJECTALLOCATION_SINGLE}/${proj_alloc}`,
                {
                    assignedto: String(projAllocationEdit.assignedto),
                    project: String(projAllocationEdit.project),
                    subproject: String(projAllocationEdit.subproject),
                    module: String(projAllocationEdit.module),
                    submodule: String(projAllocationEdit.submodule),
                    mainpage: String(projAllocationEdit.mainpage),
                    subpageone: String(projAllocationEdit.subpageone),
                    subpagetwo: String(projAllocationEdit.subpagetwo),
                    subpagethree: String(projAllocationEdit.subpagethree),
                    subpagefour: String(projAllocationEdit.subpagefour),
                    subpagefive: String(projAllocationEdit.subpagefive),
                    assignedtotype: String(projAllocationEdit.assignedtotype),
                    assignedtodate: String(projAllocationEdit.assignedtotype === "auto" ? formattedDate : projAllocationEdit.assignedtodate),
                    assignedby: String(username),
                    assignedbydate: String(projAllocationEdit.assignedbydate),
                    assignedbytime: String(projAllocationEdit.assignedbytime),
                    deadline: String(projAllocationEdit.deadline),
                    calculatedtime: String(projAllocationEdit.calculatedtime),
                    updatedby: [
                        ...updateby, {
                            name: String(username),
                            date: String(new Date()),
                        },
                    ],

                }
            );
            setProjAllocationEdit(res.data);
            handleCloseModEdit();
        } catch (err) {
            console.log(err.response.data.message)
        }
    };

    const editSubmit = (e) => {
        e.preventDefault();
        sendEditRequest();
    };

    const modifiedData = projAllocList.map((person) => ({
        ...person,
        estimateTime: person.estimation + ' ' + person.estimationtime,
      }));

    //    PDF
    const columns = [
      { title: "Assigned To", field: "assignedto" },
      { title: "Assigned Type", field: "assignedtotype" },
      { title: "Assigned Date", field: "assignedtodate" },
      { title: "Assigned by", field: "assignedby" },
      { title: "Assigned by date", field: "assignedbydate" },
      { title: "Assigned by time", field: "assignedbytime" },
      { title: "Deadline",field: "deadline"},
      { title: "Calcualted Time",field: "calculatedtime"},
  ]

  const downloadPdf = () => {
      const doc = new jsPDF()
      doc.autoTable({
          theme: "grid",
          columns: columns.map(col => ({ ...col, dataKey: col.field })),
          body: projAllocList
      })
      doc.save('projectallocation.pdf')
  }

    // Excel
    const fileName = "projectallocation";
    let excelno = 1;
 
    const [projectallocationdata, setProjectalocationdata] = useState([]);

    const getexcelDatas = async () => {

        let response = await axios.get(SERVICE.PROJECTALLOCATION,{
              })
              var data = response.data.projectallocation.map((t,index) => ({
                  sino : index+1,
                  assignedto : t.assignedto,
                  assignedtotype : t.assignedtotype,
                  assignedtodate : t.assignedtodate,
                  assignedby : t.assignedby,
                  assignedbydate : t.assignedbydate,
                  assignedbytime : t.assignedbytime,
                  deadline : t.deadline,
              }));
              setProjectalocationdata(data);
          }
    // Print
    const componentRef = useRef();
    const handleprint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Projectallocation',
        pageStyle: 'print'
    });

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
                `${SERVICE.PROJECTALLOCATION_SINGLE}/${id}`
            );
            setDeleteProjAlloc(res.data.sprojectallocation);
        } catch (err) { }
    };

    // Alert delete popup
    let projAllocId = deleteProjAlloc._id;
    const delProjectAlloc = async () => {
        try {
            await axios.delete(`${SERVICE.PROJECTALLOCATION_SINGLE}/${projAllocId}`);
            handleCloseMod();
        } catch (err) {
            console.log(err.response.data.errorMessage)
        }
    };
    useEffect(() => {
        getexcelDatas();
        fetchEmpDropdown();
        getusername();
    },[])

    useEffect(() => {
        fetchProjectEstList();       
        fetchProjectDropdowns();
        fetchSubProjectDropdownsedit();
        fetchModuleDropdownsedit();
        fetchSubModuleDropdownsedit();
        fetchMainPageDropdownsedit();
        fetchsubpageoneDropdownsedit();
        fetchsubpagetwoDropdownsedit();
        fetchsubpagethreeDropdownsedit();
        fetchsubpagefourDropdownsedit();
        fetchsubpagefiveDropdownsedit();
    });

    const [items, setItems] = useState([]);

    const addSerialNumber = () => {
    const itemsWithSerialNumber = modifiedData?.map((item, index) => ({ ...item, serialNumber: index + 1 }));
    setItems(itemsWithSerialNumber);
    }

    useEffect(()=>{
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
                <Box sx={{ color:'#bbb6b6'}}>
                    <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
                        <ArrowDropUpOutlinedIcon/>
                    </Grid>
                    <Grid sx={{height:'6px',fontSize:'1.6rem'}}>
                        <ArrowDropDownOutlinedIcon/>
                    </Grid>
                </Box>
            </>;
        } else if (sorting.direction === 'asc') {
            return <>
                <Box >
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropUpOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
                    </Grid>
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropDownOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
                    </Grid>
                </Box>
            </>;
        } else {
            return  <>
                <Box >
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropUpOutlinedIcon style={{ color:'#bbb6b6',fontSize:'1.6rem'}}/>
                    </Grid>
                    <Grid sx={{height:'6px'}}>
                        <ArrowDropDownOutlinedIcon style={{ color:'black',fontSize:'1.6rem'}}/>
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

    const totalPages = Math.ceil(projAllocList.length / pageSize);

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
            <Typography sx={userStyle.HeaderText}>Project Allocation</Typography>

            <Box sx={userStyle.container}>
                <>
                    <Grid container spacing={2}>
                        <Grid item md={6} sx={12}>
                            <Typography>Project</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.project}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, project: e.target.value });                                      
                                        
                                    }}
                                >
                                    {
                                        project && project.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => { fetchSubProjectDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        {subprojectnone =="None" ? null :
                        <Grid item md={6} sx={12}>
                            <Typography>Sub-Project</Typography>
                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.subproject}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, subproject: e.target.value });                                      
                                       
                                    }}
                                >
                                    {
                                        subProject && subProject.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => { fetchModuleDropdowns(data.name); fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    </Grid><br />
                    <Grid container spacing={2}>
                        <Grid item md={6} sx={12}>
                            <Typography>Module</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.module}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, module: e.target.value });
                                        
                                        
                                    }}
                                >
                                    {
                                        module && module.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => {fetchSubModuleDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        {submodulenone =="None" ? null :
                        <Grid item md={6} sx={12}>
                            <Typography>Sub-Module</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.submodule}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, submodule: e.target.value });
                                       
                                        

                                    }}
                                >
                                    {
                                        submodule && submodule.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => { fetchMainPageDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        }
                    </Grid><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} sx={12}>
                            <Typography>Main Page</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.mainpage}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, mainpage: e.target.value });
                                        
                                        
                                    }}
                                >
                                    {
                                        mainpage && mainpage.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => {fetchsubpageoneDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Sub-Page 1</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.subpageone}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, subpageone: e.target.value });
                                        
                                        

                                    }}
                                >
                                    {
                                        subpageone && subpageone.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => {fetchsubpagetwoDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Sub-Page 2</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.subpagetwo}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, subpagetwo: e.target.value });
                                      
                                    }}
                                >
                                    {
                                        subpagetwo && subpagetwo.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => { fetchsubpagethreeDropdowns(data.name); fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} sx={12}>
                            <Typography>Sub-Page 3</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.subpagethree}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, subpagethree: e.target.value });
                                       
                                        
                                    }}
                                >
                                    {
                                        subpagethree && subpagethree.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => { fetchsubpagefourDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Sub-Page 4</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.subpagefour}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, subpagefour: e.target.value });
                                    }}
                                >
                                    {
                                        subpagefour && subpagefour.map((data) => {
                                            return <MenuItem value={data.name} onClick={() => { fetchsubpagefiveDropdowns(data.name);fetchCalculatedTime(data.name)}}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Sub-Page 5</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.subpagefive}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, subpagefive: e.target.value });
                                    }}
                                >
                                    {
                                        subpagefive && subpagefive.map((data) => {
                                            return <MenuItem value={data.name} >{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} sx={12}>
                            <FormControl fullWidth size="small">
                                <Typography>Assigned To</Typography>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.assignedto}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, assignedto: e.target.value });
                                        
                                    }}
                                >
                                    {
                                        empNames && empNames.map((data) => {
                                            return <MenuItem value={data.companyname}>{data.companyname}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} sx={12}>
                            <Typography>Assigned mode</Typography>

                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={projAllocation.assignedtotype}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, assignedtotype: e.target.value });
                                    }}
                                >
                                    <MenuItem value={"auto"}>Auto</MenuItem>
                                    <MenuItem value={"manual"}>Manual</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Assigned date</Typography>
                            <FormControl fullWidth size="small">
                                {
                                    (projAllocation.assignedtotype === "auto") ?
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="text"
                                            disabled
                                            value={formattedDate}
                                        />
                                        :
                                        <OutlinedInput
                                            id="component-outlined"
                                            type="date"
                                            value={projAllocation.assignedtodate}
                                            onChange={(e) => {
                                                setProjAllocation({ ...projAllocation, assignedtodate: e.target.value });
                                            }}
                                        />
                                }

                            </FormControl>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} sx={12}>
                            <Typography>Assigned By</Typography>
                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, assignedby: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Date</Typography>
                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="date"
                                    value={projAllocation.assignedbydate}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, assignedbydate: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={4} sx={12}>
                            <Typography>Time</Typography>
                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="time"
                                    value={projAllocation.assignedbytime}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, assignedbytime: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={2}>
                        <Grid item md={4} sx={12}>
                            <Typography>Deadline</Typography>
                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="date"
                                    value={projAllocation.deadline}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, deadline: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        {/* <Grid item md={8} sx={12}>
                            <Typography>Calculated Time</Typography>
                            <FormControl fullWidth size="small">
                                <OutlinedInput
                                    id="component-outlined"
                                    type="text"
                                    value={calculatedTime}
                                    onChange={(e) => {
                                        setProjAllocation({ ...projAllocation, calculatedtime: e.target.value });
                                    }}
                                />
                            </FormControl>
                        </Grid> */}
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
                        {/* ALERT DIALOG */}
                        <Dialog
                            open={isEditOpen}
                            onClose={handleCloseModEdit}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Box sx={userStyle.container}>
                                <Typography sx={userStyle.SubHeaderText}> Edit Project Allocation </Typography>
                                <br /><br />
                                <>
                                    <Grid container spacing={2}>
                                        <Grid item md={6} sx={12}>
                                            <Typography>Project</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.project}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, project: e.target.value, module:"", submodule:"",mainpage:"",subpageone:"",subpagetwo:"",subpagethree:"",subpagefour:"",subpagefive:""});
                                                        setgetprojectname(e.target.value);
                                                    }}
                                                >
                                                    {
                                                        project && project.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        {subprojecteditnone =="None" ? null :
                                        <Grid item md={6} sx={12}>
                                            <Typography>Sub-Project</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.subproject}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, subproject: e.target.value });
                                                        setgetsubprojectname(e.target.value);
                                                    }}
                                                >
                                                    {
                                                        subProjectEdit && subProjectEdit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        }
                                    </Grid><br />
                                    <Grid container spacing={2}>
                                        <Grid item md={6} sx={12}>
                                            <Typography>Module</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.module}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, module: e.target.value });
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
                                        {submoduleeditnone =="None" ? null :
                                        <Grid item md={6} sx={12}>
                                            <Typography>Sub-Module</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.submodule}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, submodule: e.target.value });
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
                                        <Grid item md={4} sx={12}>
                                            <Typography>Main Page</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.mainpage}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, mainpage: e.target.value });
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
                                        <Grid item md={4} sx={12}>
                                            <Typography>Sub-Page 1</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.subpageone}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, subpageone: e.target.value });
                                                        setgetsubpageonename(e.target.value);

                                                    }}
                                                >
                                                    {
                                                        subpageoneEdit && subpageoneEdit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Sub-Page 2</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.subpagetwo}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, subpagetwo: e.target.value });
                                                        setgetsubpagetwoname(e.target.value);
                                                    }}
                                                >
                                                    {
                                                        subpagetwoEdit && subpagetwoEdit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid><br />
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Sub-Page 3</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.subpagethree}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, subpagethree: e.target.value });
                                                        setgetmainpagename(e.target.value);
                                                    }}
                                                >
                                                    {
                                                         subpagethreeEdit &&  subpagethreeEdit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Sub-Page 4</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.subpagefour}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, subpagefour: e.target.value });
                                                        setgetsubpageonename(e.target.value);

                                                    }}
                                                >
                                                    {
                                                        subpagefourEdit && subpagefourEdit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Sub-Page 5</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.subpagefive}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, subpagefive: e.target.value });
                                                        setgetsubpagetwoname(e.target.value);
                                                    }}
                                                >
                                                    {
                                                        subpagefiveEdit && subpagefiveEdit.map((data) => {
                                                            return <MenuItem value={data.name}>{data.name}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                    </Grid><br />
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sx={12}>
                                            <FormControl fullWidth size="small">
                                                <Typography>Assigned To</Typography>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.assignedto}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, assignedto: e.target.value });
                                                    }}
                                                >
                                                    {
                                                        empNames && empNames.map((data) => {
                                                            return <MenuItem value={data.companyname}>{data.companyname}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={3} sx={12}>
                                            <Typography>Assigned type</Typography>

                                            <FormControl fullWidth size="small">
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={projAllocationEdit.assignedtotype}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, assignedtotype: e.target.value });
                                                    }}
                                                >
                                                    <MenuItem value={"auto"}>Auto</MenuItem>
                                                    <MenuItem value={"manual"}>Manual</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Assigned date</Typography>
                                            <FormControl fullWidth size="small">

                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    value={projAllocationEdit.assignedtodate}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, assignedtodate: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Assigned By</Typography>
                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    value={projAllocationEdit.assignedby}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, assignedby: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Date</Typography>
                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="date"
                                                    value={projAllocationEdit.assignedbydate}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, assignedbydate: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Time</Typography>
                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="time"
                                                    value={projAllocationEdit.assignedbytime}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, assignedbytime: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sx={12}>
                                            <Typography>Deadline</Typography>
                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="date"
                                                    value={projAllocationEdit.deadline}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, deadline: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        {/* <Grid item md={4} sx={12}>
                                            <Typography>Calculated Time</Typography>
                                            <FormControl fullWidth size="small">
                                                <OutlinedInput
                                                    id="component-outlined"
                                                    type="text"
                                                    value={projAllocationEdit.calculatedtime}
                                                    onChange={(e) => {
                                                        setProjAllocationEdit({ ...projAllocationEdit, calculatedtime: e.target.value });
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid> */}
                                    </Grid>
                                    <br /><br />
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
                            {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
                            <ExportCSV csvData={projectallocationdata} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
                            <ExportXL csvData={projectallocationdata} fileName={fileName} />
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].projectall && (
                                <> */}
                            <Button sx={userStyle.buttongrp} onClick={handleprint}>&ensp;<FaPrint />&ensp;Print&ensp;</Button>
                            {/* </>
                            )} */}
                            {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
                            <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}><FaFilePdf />&ensp;Export to PDF&ensp;</Button>
                            {/* </>
                            )} */}
                        </Grid>
                    </Grid><br />
                
                        { /* ******************************************************EXPORT Buttons****************************************************** */}
                        {/* ****** Table Grid Container ****** */}
                        <Grid style={userStyle.dataTablestyle}>
                        <Box>
                            <label htmlFor="pageSizeSelect">Show entries:</label>
                            <Select id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange} sx={{width:"77px"}}>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={(modifiedData.length)}>All</MenuItem>
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
                                        <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('assignedto')}><Box sx={userStyle.tableheadstyle}><Box>Assigned To</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assignedto')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('assignedtotype')}><Box sx={userStyle.tableheadstyle}><Box>Assinged Mode</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assignedtotype')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('assignedtodate')}><Box sx={userStyle.tableheadstyle}><Box>Assingedto Date</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assignedtodate')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('assignedby')}><Box sx={userStyle.tableheadstyle}><Box>Assinged By</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assignedby')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('assignedbydate')}><Box sx={userStyle.tableheadstyle}><Box>Assingedby Date</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assignedbytime')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('assignedbytime')}><Box sx={userStyle.tableheadstyle}><Box>Time</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('assignedbytime')}</Box></Box></StyledTableCell>
                                            <StyledTableCell onClick={() => handleSorting('deadline')}><Box sx={userStyle.tableheadstyle}><Box>Deadline</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('deadline')}</Box></Box></StyledTableCell>
                                            <StyledTableCell>Action</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody align="left">
                                        {filteredData.length > 0 ? (
                                        filteredData?.map((row, index) => (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell align="left">{row.serialNumber}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.assignedto}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.assignedtotype}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.assignedtodate}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.assignedby}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.assignedbydate}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.assignedbytime}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.deadline}</StyledTableCell>
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
                                           )))  :   <StyledTableRow> <StyledTableCell colSpan={10} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
                                           </TableBody>
                                         </Table>
                                       </TableContainer>
                                       <Box style={userStyle.dataTablestyle}>
                                         <Box>
                                             Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, projAllocList.length)} of {projAllocList.length} entries
                                           </Box>
                                           <Box>
                                             <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1} sx={{textTransform:'capitalize',color:'black'}}>
                                               Prev
                                             </Button>
                                             {pageNumbers?.map((pageNumber) => (
                                               <Button key={pageNumber} sx={userStyle.paginationbtn} onClick={() => handlePageChange(pageNumber)} className={((page )) === pageNumber ? 'active' : ''} disabled={page === pageNumber}>
                                                 {pageNumber}
                                               </Button>
                                             ))}
                                             {lastVisiblePage < totalPages && <span>...</span>}
                                             <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} sx={{textTransform:'capitalize',color:'black'}}>
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
                            onClick={(e) => delProjectAlloc(projAllocId)}
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
                maxWidth="lg"
            >
                <Box sx={{ width: '550px', padding: '20px 50px' }}>
                    <Typography sx={userStyle.HeaderText}>Project Allocation </Typography>
                    <br /><br />
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Project</Typography>
                                <Typography>{projAllocationEdit.project}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Project</Typography>
                                <Typography>{projAllocationEdit.subproject}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Module</Typography>
                                <Typography>{projAllocationEdit.module}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6" >Sub-Module</Typography>
                                <Typography>{projAllocationEdit.module}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Main Page</Typography>
                                <Typography>{projAllocationEdit.mainpage}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 1</Typography>
                                <Typography>{projAllocationEdit.subpageone}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Sub-Page 2</Typography>
                                <Typography>{projAllocationEdit.subpagetwo}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Assigned To</Typography>
                                <Typography>{projAllocationEdit.subpagetwo}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Assigned type</Typography>
                                <Typography>{projAllocationEdit.assignedtotype}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Assigned date</Typography>
                                <Typography>{projAllocationEdit.assignedtodate}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Assigned By</Typography>
                                <Typography>{projAllocationEdit.assignedby}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Date</Typography>
                                <Typography>{projAllocationEdit.assignedbydate}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Time</Typography>
                                <Typography>{projAllocationEdit.assignedbytime}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Deadline</Typography>
                                <Typography>{projAllocationEdit.deadline}</Typography>
                            </Grid>
                            <Grid item md={6} xs={12} sm={12}>
                                <Typography variant="h6">Calculated Time</Typography>
                                <Typography>{projAllocationEdit.calculatedtime}</Typography>
                            </Grid>
                        </Grid><br /><br />
                    </>
                    <Grid container spacing={2}>
                        <Button variant="contained" onClick={handleCloseview}> Back </Button>
                    </Grid>

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
                                    <Typography variant="h6">addedby</Typography>
                                    <Table>
                                            <TableHead>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                                            </TableHead>
                                            <TableBody>
                                            {addedby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{i+1}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                                                </StyledTableRow>
                                                     ))}
                                            </TableBody>
                                        </Table>
                                </FormControl>
                            </Grid>
                            <br />
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">Updated by</Typography>
                                        <br />
                                        <Table>
                                            <TableHead>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                                            </TableHead>
                                            <TableBody>
                                            {updateby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{i+1}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
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
                        <StyledTableRow>
                            <StyledTableCell> S.NO</StyledTableCell>
                            <StyledTableCell>Assigned To</StyledTableCell>
                            <StyledTableCell>Assigned type</StyledTableCell>
                            <StyledTableCell>Assigned date</StyledTableCell>
                            <StyledTableCell>Assigned by</StyledTableCell>
                            <StyledTableCell>Assigned by date</StyledTableCell>
                            <StyledTableCell>Assigned by time</StyledTableCell>
                            <StyledTableCell>Deadline</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    {projAllocList &&
                        projAllocList.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">{index+1}</StyledTableCell>
                                <StyledTableCell align="left">{row.assignedto}</StyledTableCell>
                                <StyledTableCell align="left">{row.assignedtotype}</StyledTableCell>
                                <StyledTableCell align="left">{row.assignedtodate}</StyledTableCell>
                                <StyledTableCell align="left">{row.assignedby}</StyledTableCell>
                                <StyledTableCell align="left">{row.assignedbydate}</StyledTableCell>
                                <StyledTableCell align="left">{row.assignedbytime}</StyledTableCell>
                                <StyledTableCell align="left">{row.deadline}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </Table>
            </TableContainer>
           {/* ALERT DIALOG  */}
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

export default Projectallocation;