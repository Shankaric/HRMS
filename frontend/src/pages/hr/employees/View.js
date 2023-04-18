import React, { useState, useEffect } from "react";
import { Box, Typography,  FormControl, Grid,  Button } from "@mui/material";
import { userStyle } from "../../../pageStyle";
import { SERVICE } from '../../../services/Baseservice';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


function View() {



    const [empaddform, setEmpaddform] = useState({
        prefix: "Mr", firstname: "", lastname: "", legalname: "", fathername: "", mothername: "", gender: "", maritalstatus: "", dob: "",
        bloodgroup: "", profileimage: "", location: "", email: "", contactpersonal: "", contactfamily: "", emergencyno: "", doj: "", dot: "", name: "", contactno: "", details: "", username: "",
        password: "", companyname: "", doorno: "", street: "", area: "", landmark: "", thaluka: "", post: "", pincode: "", country: "", state: "", city: "", branch: "", floor: "", department: "",
        team: "", designation: "", shifttiming: "", reportingto: "", empcode: "", remark: ""
    });

    const id = useParams().id

    const fetchHandler = async () => {
        try {
            let response = await axios.get(`${SERVICE.USER_SINGLE}/${id}`, {
                // headers: {
                //     'Authorization': `Bearer ${auth.APIToken}`
                // }
            });
            setEmpaddform(response.data.suser);
        } catch (err) {
            const messages = err.response.data.message;
            console.log(messages);
        }
    }

 

    useEffect(
        () => {
            fetchHandler();
        }
    );
   


    return (
        <Box>
            <Typography sx={userStyle.HeaderText}>View Details</Typography>
            <br />
            <Box sx={userStyle.viewcontainer}>
                    <Grid container>
                        <Grid item md={3} xs={12} sm={12} >
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>First Name</Typography>
                                <Typography>{empaddform.prefix + "." + empaddform.firstname}</Typography>
                                <br /><br />
                                <Typography sx={userStyle.SubHeaderText}>Father Name</Typography>
                                <Typography>{empaddform.fathername}</Typography>
                                <br /><br />
                                <Typography sx={userStyle.SubHeaderText}>BloodGroup</Typography>
                                <Typography>{empaddform.bloodgroup}</Typography>
                                <br /><br />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={12} sm={12} >
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Last Name</Typography>
                                <Typography>{empaddform.lastname}</Typography>
                                <br /><br />
                                <Typography sx={userStyle.SubHeaderText}>Mother Name</Typography>
                                <Typography>{empaddform.mothername}</Typography>
                                <br /><br />
                                <Typography sx={userStyle.SubHeaderText}>Marital Status</Typography>
                                <Typography>{empaddform.maritalstatus}</Typography>
                                <br /><br />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Legal Name</Typography>
                                <Typography>{empaddform.legalname}</Typography>
                                <br /><br />
                                <Typography sx={userStyle.SubHeaderText}>Gender</Typography>
                                <Typography>{empaddform.gender}</Typography>
                                <br /><br />
                                <Typography sx={userStyle.SubHeaderText}>DateOfBirth</Typography>
                                <Typography>{empaddform.dob}</Typography>
                            </FormControl>
                        </Grid>
                        <Grid item lg={3} md={3} sx={12}>
                            <FormControl fullWidth size="small" >
                                <Typography >Upload Image</Typography>
                                
                                <Grid sx={{ border: '1px solid black', height: 153, width: 153 }}>
                                    <img src={empaddform.profileimage ? empaddform.profileimage : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg" } alt="profile" height="150px" width="150px"></img>
                                </Grid>
                                <Typography></Typography>
                            </FormControl>
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Location</Typography>
                                <Typography>{empaddform.location}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Email</Typography>
                                <Typography>{empaddform.email}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>per.contact</Typography>
                                <Typography>{empaddform.contactpersonal}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Fam.contact</Typography>
                                <Typography>{empaddform.contactfamily}</Typography>
                            </FormControl>
                        </Grid>
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Emergency.no</Typography>
                                <Typography>{empaddform.emergencyno}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText} >DOT</Typography>
                                <Typography>{empaddform.dot}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText} >DOJ</Typography>
                                <Typography>{empaddform.doj}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText} >Reference Name </Typography>
                                <Typography>{empaddform.name}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText} >Contact</Typography>
                                <Typography>{empaddform.contactno}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Details</Typography>
                                <Typography>{empaddform.details}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Login Name</Typography>
                                <Typography>{empaddform.username}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Password</Typography>
                                <Typography></Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>company Name</Typography>
                                <Typography>{empaddform.companyname}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>CompanyAccess</Typography>
                                <Typography>{(empaddform.accesslocation)}</Typography>
                            </FormControl>
                        </Grid><br /><br /><br />
                        <Grid md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Door/Flat No</Typography>
                                <Typography>{empaddform.pdoorno}</Typography>
                            </FormControl>
                        </Grid><br /><br /><br />
                        <Grid md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Street/Block</Typography>
                                <Typography>{empaddform.pstreet}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Area/village</Typography>
                                <Typography>{empaddform.parea}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Landmark</Typography>
                                <Typography>{empaddform.plandmark}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText} >Taluk</Typography>
                                <Typography>{empaddform.ptaluk}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Post</Typography>
                                <Typography>{empaddform.ppost}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Pincode</Typography>
                                <Typography>{empaddform.ppincode}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Country</Typography>
                                <Typography>{empaddform.pcountry}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>State</Typography>
                                <Typography>{empaddform.pstate}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>City</Typography>
                                <Typography>{empaddform.pcity}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Door/Flat No</Typography>
                                <Typography>{empaddform.cdoorno}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Street/Block</Typography>
                                <Typography>{empaddform.cstreet}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Area/village</Typography>
                                <Typography>{empaddform.carea}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Landmark</Typography>
                                <Typography>{empaddform.clandmark}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Taluk</Typography>
                                <Typography>{empaddform.ctaluk}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Post</Typography>
                                <Typography>{empaddform.cpost}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Pincode</Typography>
                                <Typography>{empaddform.cpincode}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Country</Typography>
                                <Typography>{empaddform.ccountry}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>State</Typography>
                                <Typography>{empaddform.cstate}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>City</Typography>
                                <Typography>{empaddform.ccity}</Typography>
                            </FormControl>
                        </Grid><br />
                       
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Branch</Typography>
                                <Typography>{empaddform.branch}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Floor</Typography>
                                <Typography>{empaddform.floor}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Team</Typography>
                                <Typography>{empaddform.team}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Designation</Typography>
                                <Typography>{empaddform.designation}</Typography>
                            </FormControl>
                        </Grid><br />
                        <Grid md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Reporting To</Typography>
                                <Typography>{empaddform.reportingto}</Typography>
                            </FormControl>
                        </Grid><br />
                        </Grid>

                        <Grid container sx={{marginBottom:'20px'}}>
                        <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>EmpCode </Typography>
                                <Typography>{empaddform.empcode}</Typography>
                            </FormControl>
                        </Grid><br />
                        {/* <Grid item md={3} xs={12} sm={12}>
                            <FormControl fullWidth size="small" >
                                <Typography sx={userStyle.SubHeaderText}>Uploaded Files</Typography>
                                <Typography>{empaddform.files}</Typography>
                            </FormControl>
                        </Grid><br /> */}
                      
                    </Grid>
                    </Grid>
                    <br /> <br /> <br />
                    <Grid container spacing={2} sx={{textAlign:"center",justifyContent:"center", alignItems:'center'}}>

                    <Link to={`/list`} style={{ textDecoration: 'none', color: 'white' }}><Button variant="contained" color="primary"  > Back</Button> </Link>
                    </Grid>
            </Box>
        </Box>
    );
}


export default View;