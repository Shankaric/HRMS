import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, OutlinedInput, TableBody, TableRow,TableCell,Select, Paper, MenuItem, Dialog, DialogContent, DialogActions, FormControl, Grid, Table, TableHead, TableContainer, Button } from "@mui/material";
import { userStyle } from "../../pageStyle";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import { ExportXL, ExportCSV } from "../../components/Export";
import { StyledTableRow, StyledTableCell } from "../../components/Table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { SERVICE } from "../../services/Baseservice";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import moment from "moment-timezone";
import { useReactToPrint } from "react-to-print";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, makeStyles } from "@material-ui/core";
import pdfIcon from "./pdf-icon.png";
import wordIcon from "./word-icon.png";
import excelIcon from "./excel-icon.png";
import csvIcon from "./CSV.png";
import fileIcon from "./file-icons.png";
import { Delete } from "@material-ui/icons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { PDFDocument, StandardFonts,rgb} from "pdf-lib";
import * as XLSX from "xlsx"; 

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

function Project() {
  const [project, setProject] = useState({
    name: "",
    estimation: "",
    estimationtime: "Year",
    files: "",
    addedby: "",
    updatedby: "",
  });

  const [projid, setProjid] = useState({
    name: "",
    estimation: "",
    estimationtime: "",
  });
  const [projects, setProjects] = useState([]);
  const [entries, setEntries] = useState(1);
  const [pages, setPages] = useState(1);
  const [files, setFiles] = useState([]);
  const [filesedit, setFilesedit] = useState([]);
  const [getrowid, setRowGetid] = useState("");
  const [username, setUsername] = useState("");


  //Datatable
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const userData = {
    name: username,
    date: new Date(),
  };

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

  let printsno = 1;

  //added the s.no
  let sino = 1;

  // Error Popup model
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showAlert, setShowAlert] = useState();
  const handleClickOpenerr = () => {
    setIsErrorOpen(true);
  };
  const handleCloseerr = () => {
    setIsErrorOpen(false);
  };

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

  //Delete model
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDeleteOpen(true);
  };
  const handleCloseMod = () => {
    setIsDeleteOpen(false);
  };

  const [deleteproject, setDeleteproject] = useState({});

  //set function to get particular row
  const rowData = async (id) => {
    try {
      let res = await axios.get(`${SERVICE.PROJECT_SINGLE}/${id}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      setDeleteproject(res.data.sprojects);
    } catch (err) {}
  };

  // Alert delete popup
  let projectid = deleteproject._id;
  const delProject = async () => {
    try {
      await axios.delete(`${SERVICE.PROJECT_SINGLE}/${projectid}`, {
        // headers: {
        //     'Authorization': `Bearer ${auth.APIToken}`
        // }
      });
      handleCloseMod();
    } catch (err) {}
  };

//pdf converter
const handleDownloadAll = async () => {
  const pdfDoc = await PDFDocument.create();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < selectedFiles.length; i++) {
    const page = pdfDoc.addPage();
    const file = selectedFiles[i];
    if (isImage(file.name)) {
      if (file.type === "image/jpg" || file.type === "image/jpeg") {
        const image = await pdfDoc.embedJpg(file.preview);
        const imageSize = image.scale(0.5);
        const pageDimensions = page.getSize();
        const imageAspectRatio = imageSize.width / imageSize.height;
        const pageAspectRatio = pageDimensions.width / pageDimensions.height;
        let width, height;
        if (imageAspectRatio > pageAspectRatio) {
          width = pageDimensions.width;
          height = width / imageAspectRatio;
        } else {
          height = pageDimensions.height;
          width = height * imageAspectRatio;
        }
        page.drawImage(image, {
          x: (pageDimensions.width - width) / 2,
          y: (pageDimensions.height - height) / 2,
          width: width,
          height: height,
        });
      } else {
        console.log(`${file.name} is not a PNG, JPG, or JPEG file.`);
      }
    }
    
    else if (isImages(file.name)) {
      if (file.type === "image/png") {
        const image = await pdfDoc.embedPng(file.preview);
        const imageSize = image.scale(0.5);
        const pageDimensions = page.getSize();
        const imageAspectRatio = imageSize.width / imageSize.height;
        const pageAspectRatio = pageDimensions.width / pageDimensions.height;
        let width, height;
        if (imageAspectRatio > pageAspectRatio) {
          width = pageDimensions.width;
          height = width / imageAspectRatio;
        } else {
          height = pageDimensions.height;
          width = height * imageAspectRatio;
        }
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      } else {
        console.log(`${file.name} is not a PNG, JPG, or JPEG file.`);
      }
    }
    
    else if (isPdf(file.name)) {
      const pdfBytes = await fetch(file.preview).then((res) => res.arrayBuffer());
      const pdfDocToMerge = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdfDocToMerge, pdfDocToMerge.getPageIndices());
      copiedPages.forEach((copiedPage) => pdfDoc.addPage(copiedPage));
    }
 
    else if (isTxt(file.name)) {
      const text = await fetch(file.preview).then((res) => res.text());
      const lines = text.split('\n');
      lines.forEach((line, index) => {
        page.drawText(line, { x: 50, y: 750 - index * 20, font: helveticaFont, size: 12 });
      });
    }
    else if (isExcel(file.name)) {
      const excelBytes = await fetch(file.preview).then((res) => res.arrayBuffer());
      const workbook = XLSX.read(excelBytes, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const { width, height } = page.getSize();
      const cellWidth = 80;
      const cellHeight = 20;
      const scaleX = width / (sheetData[0].length * cellWidth);
      const scaleY = height / (sheetData.length * cellHeight);
      const scale = Math.min(scaleX, scaleY);
      sheetData.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
          const text = `${cellValue}`;
          page.drawText(text, {
            x: colIndex * cellWidth * scale,
            y: height - (rowIndex + 1) * cellHeight * scale,
            font: helveticaFont,
            size: 6 * scale,
            color:rgb(0, 0, 0),
            opacity: 0.8,
          });
        });
      });
    }
    
    else {
      console.log(`${file.name} is not a supported file type.`);
    }
  }


  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

const isImages = (fileName) => {
  return /\.png$/i.test(fileName);
};

const isImage = (fileName) => {
  return /\.jpeg$|\.jpg$/i.test(fileName);
};

const isPdf = (fileName) => {
  return /\.pdf$/i.test(fileName);
};

const isExcel = (fileName) => {
  return /\.xlsx?$/i.test(fileName);
};



function isTxt(fileName) {
  return /\.txt$/.test(fileName);
}

//



  //add function
  const sendRequest = async () => {
    try {
      let projectscreate = await axios.post(SERVICE.PROJECT_CREATE, {
        // headers: {
        //     'Authorization':`Bearer ${auth.APIToken}`
        //     }

        name: String(project.name),
        estimation: String(project.estimation),
        estimationtime: String(project.estimationtime)? project.estimationtime : "Year",
        files: [...selectedFiles],
        addedby: [
         
          {
            name: String(username),
            date: String(new Date()),
          },
        ],
      });
      setProject(projectscreate.data);
      setProject({ name: "", estimation: "", estimationtime: "", files: "" });
      setSelectedFiles([]);
    } catch (error) {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {error.response.data.errorMessage}
          </p>
        </>
      );
      handleClickOpenerr();
    }
  };

  //submit option for saving
  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.name === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please Enter Name"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else if (project.estimation === "" && project.estimationtime === "") {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {"Please Enter Estimation time"}
          </p>
        </>
      );
      handleClickOpenerr();
    } else {
      sendRequest();
    }
  };

  //Edit model...
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleClickOpenEdit = () => {
    setIsEditOpen(true);
  };
  const handleCloseModEdit = (e, reason) => {
    if (reason && reason === "backdropClick") return;
    setIsEditOpen(false);
  };

  //get single row to edit....
  const getCode = async (e) => {
    setRowGetid(e);
    let res = await axios.get(`${SERVICE.PROJECT_SINGLE}/${e}`, {});
    setProjid(res.data.sprojects);
    setSelectedFilesedit(res.data.sprojects.files);
  };

  //id for login...
  let loginid = localStorage.LoginUserId;

  //get user row  edit  function
  const getusername = async () => {
    try {
      let res = await axios.get(`${SERVICE.USER}`);
      let user = res.data.users.filter((data) => {
        if (loginid == data._id) {
          setUsername(data.username);
          return data;
        }
      });
    } catch (err) {
      console.log(err.response.data.errorMessage);
    }
  };

  // get single row to view....
  const getviewCode = async (e) => {
    let res = await axios.get(`${SERVICE.PROJECT_SINGLE}/${e}`, {});
    setProjid(res.data.sprojects);
  };

  // get single row to view....
  const getinfoCode = async (e) => {
    let res = await axios.get(`${SERVICE.PROJECT_SINGLE}/${e}`, {});
    setProjid(res.data.sprojects);
  };


  //Project updateby edit page...
  let updateby = projid.updatedby;
  let addedby = projid.addedby;

  let projectsid = projid._id;

  //editing the single data...
  const sendEditRequest = async () => {
    try {
      let res = await axios.put(`${SERVICE.PROJECT_SINGLE}/${projectsid}`, {
        name: String(projid.name),
        estimation: String(projid.estimation),
        estimationtime: String(projid.estimationtime),
        files: [...selectedFilesedit],
        updatedby: [
          ...updateby,
          {
            name: String(username),
            date: String(new Date()),
          },
        ],
      });
      setProjid(res.data);
      handleCloseModEdit();
      setSelectedFilesedit([]);
    } catch (err) {
      setShowAlert(
        <>
          <ErrorOutlineOutlinedIcon
            sx={{ fontSize: "100px", color: "orange" }}
          />
          <p style={{ fontSize: "20px", fontWeight: 900 }}>
            {err.response.data.errorMessage}
          </p>
        </>
      );
      handleClickOpenerr();
      console.log(err.response.data);
    }
  };

  const editSubmit = (e) => {
    e.preventDefault();
    sendEditRequest();
  };

  //get all project.
  const fetchAllProject = async () => {
    try {
      let res_project = await axios.get(SERVICE.PROJECT, {});
      setProjects(res_project.data.projects);
    } catch (err) {
      const messages = err.response.data.message;
      console.log(messages);
    }
  };

  const modifiedData = projects.map((person) => ({
    ...person,
    estimateTime: person.estimation + ' ' + person.estimationtime,
  }));

  // pdf.....
  const columns = [
    { title: "Name", field: "name" },
    { title: "EstimationTime", field: "estimateTime" },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.autoTable({
      theme: "grid",
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: modifiedData,
    });
    doc.save("Project.pdf");
  };

  // Excel
  const fileName = "Project";

  const [projectData, setProjectData] = useState([]);

  // get particular columns for export excel
  const getexcelDatas = async () => {
    let response = await axios.get(SERVICE.PROJECT, {
      //  headers: {
      //      'Authorization': `Bearer ${auth.APIToken}`
      //  },
    });
    var data = response.data.projects.map((t) => ({
      Name: t.name,
      "Estimation Time": t.estimation + " " + t.estimationtime,
    }));
    setProjectData(data);
  };

  //print...
  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Project",
    pageStyle: "print",
  });

  useEffect(() => {
    fetchAllProject();
    getexcelDatas();
    getusername();
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

  const totalPages = Math.ceil(projects.length / pageSize);

  const visiblePages = Math.min(totalPages, 3);

  const firstVisiblePage = Math.max(1, page - 1);
  const lastVisiblePage = Math.min(firstVisiblePage + visiblePages - 1, totalPages);

  const pageNumbers = [];

  const indexOfLastItem = page * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;

  for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
    pageNumbers.push(i);
  }
  let total = 0;

  return (
    <Box>
      {/* ****** Header Content ****** */}
      <Typography sx={userStyle.HeaderText}>Project </Typography>
      <Box sx={userStyle.container}>
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography sx={userStyle.importheadtext}>
                Manage Project
              </Typography>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} sm={12}>
              <FormControl fullWidth size="small">
                <Typography>Name</Typography>
                <OutlinedInput
                  id="component-outlined"
                  type="text"
                  value={project.name}
                  onChange={(e) => {
                    setProject({ ...project, name: e.target.value });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12} sm={12}>
              <Grid container>
                <Grid item md={6} xs={6} sm={6}>
                  <Typography>Estimation</Typography>
                  <FormControl fullWidth size="small">
                    <OutlinedInput
                      id="component-outlined"
                      type="text"
                      value={project.estimation}
                      onChange={(e) => {
                        setProject({ ...project, estimation: e.target.value });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                  <Typography>Time</Typography>
                  <Select
                    fullWidth
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={project.estimationtime}
                    onChange={(e) => {
                      setProject({
                        ...project,
                        estimationtime: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Days"> {"Days"} </MenuItem>
                    <MenuItem value="Month"> {"Month"} </MenuItem>
                    <MenuItem value="Year"> {"Year"} </MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>       
          <br />
          <br />
          <br />
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
          {/* <button onClick={handleDownloadAll}>download All</button> */}

          <Grid item xs={12} sm={6} md={6} lg={6} marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{ display: "flex" }}
              onClick={handleSubmit}
            >
              Create New
            </Button>
          </Grid>
        </>
      </Box>
      <Box>
        {/* Edit DIALOG */}
        <Dialog
          open={isEditOpen}
          onClose={handleCloseModEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
        >
          <Box sx={userStyle.dialogbox}>
            <DialogContent sx={{ maxWidth: "100%", padding: "20px" }}>
              <>
                <Grid container spacing={2}>
                  <Typography sx={userStyle.importheadtext}>
                    Manage Project
                  </Typography>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12} sm={12}>
                    <FormControl fullWidth size="small">
                      <Typography>Name</Typography>
                      <OutlinedInput
                        id="component-outlined"
                        type="text"
                        value={projid.name}
                        onChange={(e) => {
                          setProjid({ ...projid, name: e.target.value });
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item md={6} xs={12} sm={12}>
                    <Grid container>
                      <Grid item md={6} xs={12} sm={12}>
                        <Typography>Estimation</Typography>
                        <FormControl fullWidth size="small">
                          <OutlinedInput
                            id="component-outlined"
                            type="text"
                            value={projid.estimation}
                            onChange={(e) => {
                              setProjid({
                                ...projid,
                                estimation: e.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <br />
                      <Grid item md={6} xs={12} sm={12}>
                        <Typography>Estimation Time</Typography>
                        <Select
                          fullWidth
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={projid.estimationtime}
                          onChange={(e) => {
                            setProjid({
                              ...projid,
                              estimationtime: e.target.value,
                            });
                          }}
                        >
                          <MenuItem value="Days"> {"Days"} </MenuItem>
                          <MenuItem value="Month"> {"Month"} </MenuItem>
                          <MenuItem value="Year"> {"Year"} </MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br />
                <Grid item md={12} xs={12} sm={12}>
                  <Typography sx={userStyle.SubHeaderText}>Document</Typography>
                  <br></br>
                </Grid>
                <br />
                <br />
                <br />
               
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
                <br />
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12} sm={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={editSubmit}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item md={6} xs={12} sm={12}>
                    <Button
                      sx={userStyle.btncancel}
                      onClick={handleCloseModEdit}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </>
            </DialogContent>
          </Box>
        </Dialog>
      </Box>
      <br />
      {/* ****** Table Start ****** */}
      <>
        <Box sx={userStyle.container}>
          {/* ******************************************************EXPORT Buttons****************************************************** */}
          <Grid item xs={8}>
            <Typography sx={userStyle.importheadtext}>Project List</Typography>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid>
              {/* {isUserRoleCompare[0].excelsupplier && (
                                <> */}
              <ExportCSV csvData={projectData} fileName={fileName} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].csvsupplier && (
                                <> */}
              <ExportXL csvData={projectData} fileName={fileName} />
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].printsupplier && (
                                <> */}
              <Button sx={userStyle.buttongrp} onClick={handleprint}>
                &ensp;
                <FaPrint />
                &ensp;Print&ensp;
              </Button>
              {/* </>
                            )} */}
              {/* {isUserRoleCompare[0].pdfsupplier && (
                                <> */}
              <Button sx={userStyle.buttongrp} onClick={() => downloadPdf()}>
                <FaFilePdf />
                &ensp;Export to PDF&ensp;
              </Button>
              {/* </>
                            )} */}
            </Grid>
          </Grid>
          <br />
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
                  <MenuItem value={(projects.length)}>All</MenuItem>
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
              sx={{ minWidth: 700 }}
              aria-label="customized table"
              id="usertable"
            >
              <TableHead sx={{ fontWeight: "600" }}>
              <StyledTableRow>
                  <StyledTableCell onClick={() => handleSorting('serialNumber')}><Box sx={userStyle.tableheadstyle}><Box>SNo</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('serialNumber')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('name')}><Box sx={userStyle.tableheadstyle}><Box>Project Name</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('name')}</Box></Box></StyledTableCell>
                  <StyledTableCell onClick={() => handleSorting('estimateTime')}><Box sx={userStyle.tableheadstyle}><Box>Estimation Time</Box><Box sx={{marginTop:'-6PX'}}>{renderSortingIcon('estimateTime')}</Box></Box></StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody align="left">
              {filteredData.length > 0 ? (
              filteredData?.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{row.serialNumber}</StyledTableCell>
                        <StyledTableCell>{row.name}</StyledTableCell>
                        <StyledTableCell>
                          {row.estimateTime}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row" colSpan={1}>
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

                            {/* <Link to={`/location/${row._id}`} style={{ textDecoration: 'none', color: '#fff', minWidth: '0px' }}><Button sx={userStyle.buttonedit} style={{ minWidth: '0px' }}><EditOutlinedIcon style={{ fontSize: 'large' }} /></Button></Link> */}
                            <Button
                              sx={userStyle.buttondelete}
                              onClick={(e) => {
                                handleClickOpen();
                                rowData(row._id);
                              }}
                            >
                              <DeleteOutlineOutlinedIcon
                                style={{ fontsize: "large" }}
                              />
                            </Button>
                            <Button
                              sx={userStyle.buttonedit}
                              onClick={() => {
                                handleClickOpenview();
                                getviewCode(row._id);
                              }}
                            >
                              <VisibilityOutlinedIcon
                                style={{ fontsize: "large" }}
                              />
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
                  )))  :   <StyledTableRow> <StyledTableCell colSpan={4} align="center">No Data Available</StyledTableCell> </StyledTableRow> }
              </TableBody>
            </Table>
          </TableContainer>
          <Box style={userStyle.dataTablestyle}>
            <Box>
                Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, projects.length)} of {projects.length} entries
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
              onClick={(e) => delProject(projectid)}
            >
              {" "}
              OK{" "}
            </Button>
          </DialogActions>
        </Dialog>

        {/* this is info view details */}

        <Dialog
          open={openInfo}
          onClose={handleCloseinfo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
        >
          <Box sx={{ width: "550px", padding: "20px 50px" }}>
            <>
              <Typography sx={userStyle.HeaderText}>
                {" "}
                Project Activity log
              </Typography>
              <br />
              <br />
              <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl fullWidth size="small">
                                    <Typography variant="h6">addedby</Typography>
                                    <br/>
                                    <Table>
                                            <TableHead>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{"SNO"}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"UserName"}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {"Date"}</StyledTableCell>
                                            </TableHead>
                                            <TableBody>
                                            {addedby?.map((item, i) => (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{sino++}.</StyledTableCell>
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
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}>{sino++}.</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {item.name}</StyledTableCell>
                                                    <StyledTableCell sx={{padding:'5px 10px !important'}}> {moment(item.date).format('DD-MM-YYYY hh:mm:ss a')}</StyledTableCell>
                                                </StyledTableRow>
                                                     ))}
                                            </TableBody>
                                        </Table>
                               
                                </FormControl>
                            </Grid>
                        </Grid>
              <br /> <br />
              <br />
              <Grid container spacing={2}>
                <Button variant="contained" onClick={handleCloseinfo}>
                  {" "}
                  Back{" "}
                </Button>
              </Grid>
            </>
          </Box>
        </Dialog>

        {/* print layout */}

        <TableContainer component={Paper} sx={userStyle.printcls}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            id="usertable"
            ref={componentRef}
          >
            <TableHead>
              <TableRow>
                <TableCell> SI.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Estimation Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody align="left">
              {projects &&
                projects.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{printsno++}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.estimation + " " + row.estimationtime}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* view model */}
      <Dialog
        open={openview}
        onClose={handleClickOpenview}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ width: "350px", padding: "20px 50px" }}>
          <>
            <Typography sx={userStyle.HeaderText}> View Project</Typography>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6"> Name</Typography>
                  <Typography>{projid.name}</Typography>
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl fullWidth size="small">
                  <Typography variant="h6">Estimation Time</Typography>
                  <Typography>
                    {projid.estimation + " " + projid.estimationtime}
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>
            <br /> <br /> <br />
            <Grid container spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseview}
              >
                {" "}
                Back{" "}
              </Button>
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
          <DialogContent
            sx={{ width: "350px", textAlign: "center", alignItems: "center" }}
          >
            {/* <ErrorOutlineOutlinedIcon sx={{ fontSize: "80px", color: 'orange' }} /> */}
            <Typography variant="h6">{showAlert}</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleCloseerr}>
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Project;