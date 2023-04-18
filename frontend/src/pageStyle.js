export const userStyle = {
    container : {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(97, 97, 97)',
        overflow: 'hidden',
        height: 'max-content',
        padding:'30px',
        boxShadow: '0px 0px 20px #00000029',
        borderRadius:'none',
        fontFamily: 'auto',
        '& .MuiTable-root':{
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',         
        },
        '& .MuiTableCell-root':{
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            background: '#8080800f',
            border: '1px solid #00000021',
           
        },
        '& .MuiOutlinedInput-root':{
            height: '40px',
        }
    },  
    selectcontainer:{
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(97, 97, 97)',
        overflow: 'visible',
        height: 'max-content',
        padding:'50px',
        boxShadow: '0px 0px 20px #00000029',
        borderRadius:'none',
        fontFamily: 'auto',
        '& .MuiTable-root':{
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',         
        },
        '& .MuiTableCell-root':{
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            background: '#8080800f',
            border: '1px solid #00000021',
           
        },
        '& .MuiOutlinedInput-root':{
            height: '40px',
        }
    },
    dialogbox:{
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(97, 97, 97)',
        overflowY: 'visible',
        height: 'max-content',
        padding:'20px',
        maxWidth:'100% !important',
        boxShadow: '0px 0px 20px #00000029',
        borderRadius:'none',
        fontFamily: 'auto',
        '& .MuiTable-root':{
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',         
        },
        '& .MuiTableCell-root':{
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            background: '#8080800f',
            border: '1px solid #00000021',
           
        },
        '& .MuiOutlinedInput-root':{
            height: '40px',
        }
    },
    viewcontainer:{
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(97, 97, 97)',
        overflow: 'hidden',
        height: 'max-content',
        padding:'50px',
        boxShadow: '0px 0px 20px #00000029',
        borderRadius:'none',
        fontFamily: 'auto',
        '& .MuiTable-root':{
            borderBottom: 'none !important',
            paddingTop: '20px',
            paddingBottom: '20px',         
        },
        '& .MuiTableCell-root':{
            fontSize: '18px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            background: '#8080800f',
            border: '1px solid #00000021',
           
        },
        '& .MuiOutlinedInput-root':{
            height: '40px',
        }
    },
    HeaderText:{
        fontFamily:"'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
        fontSize: "24px",
        fontWeight: "500",
        margin:"10px 0px 10px 0px",
        color: '#444 !important',
    },

    SubHeaderText:{
        fontSize: "18px",
        display: "inline-block",
        fontWeight: "400",
        lineHeight: "1",
        color: '#444 !important',
    },
    titletxt:{
        fontSize: "16px",
        display: "inline-block",
        fontWeight: "400",
        lineHeight: "1",
        color: '#444 !important',
    },
  
    topdropdown:{
        border: '1px solid white',
        borderRadius: '4px',
  
    },

    selectwhite:{
        color:'white',
        '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon' : {
            color:'white',
        },
        '&:hover': {
            '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon' : {
                color:'white',
            },           
        },       
    },

    buttongrp:{
        backgroundColor: '#f4f4f4',
        color: '#444',
        borderRadius: '3px',
        boxShadow: 'none',
        fontSize:'12px',
        padding:'4px 6px',
        textTransform:'capitalize',
        border:'1px solid #8080808f',
  
    },
    printcls:{
        display:'none',
        '@media print':{
            display:'block',
        },
    },

    
loginbox:{
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(97, 97, 97)',
    overflow: 'hidden',
    height: 'max-content',
    padding:'30px',
    display:'flex',
    margin:'auto',
    width:'450px',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: '0px 0px 20px #00000029',
    borderRadius:'none',
    fontFamily: 'auto',
    '& .MuiTable-root':{
        borderBottom: 'none !important',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    '& .MuiTableCell-root':{
        fontSize: '18px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        background: '#8080800f',
        border: '1px solid #00000021',
    },
    '& .MuiOutlinedInput-root':{
        height: '40px',
    }
},
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        }
      },
      btncancel:{
        backgroundColor: '#f4f4f4',
        color: '#444',
        boxShadow: 'none',
        borderRadius: '3px',
        border:'1px solid #0000006b',
        '&:hover': {
            '& .css-bluauu-MuiButtonBase-root-MuiButton-root' : {
                backgroundColor:'#f4f4f4',
            },           
        },    
      },   
      customfileupload:{
       
        display: 'inline-block',
        border: '1px solid #b7b4b4',
        padding: '5px 45px',
        cursor: 'pointer',
        borderRadius: '3px',
        background: '#d2cfcf'
      },
      linkstyle:{
        textDecoration: 'none',
         color: '#fff'
      },
      actionbutton:{
        minWidth: '0px',
        boxShadow: '2px 2x #00000036',
        background: 'white',
        padding:'6px'
      },
      
      Todoadd:{
        height: '30px',
        minWidth: '30px',
        padding:'6px 10px',
        marginTop: '28px',
        '@media only screen and (max-width: 600px)' :{
            marginTop: '6px',
        },
    },

    uploadbtn:{
        background: 'rgb(25 118 210)',
        color: '#ffffff',
        appearance: 'none',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
        padding: '7px',
        width:'max-content',
        border: '0px',
        borderRadius:'3px',
      },
      uploadcancel:{
        background: 'f4f4f4',
        color: '#444',
        appearance: 'none',
        fontFamily: 'sans-serif',
        cursor: 'pointer',
        padding: '5px',
        width:'max-content',
        border: '0px',
        borderRadius:'3px',
        
      },
      dataTablestyle:{
        display:"flex",
        margin:'10px 0px',
        justifyContent:'space-between',
        '@media (max-width: 800px)' :{
            display:"grid",
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center'
        },
    },
    
    paginationbtn:{
        color:"inherit",
        textTransform:"capitalize",
        minWidth:'45px',
        // border: '1px solid rgba(0, 0, 0, 0.3)',
        //     boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            // background:"linear-gradient(to bottom, rgba(230, 230, 230, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%)",
        '&:hover': {
            boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            background: 'linear-gradient(to bottom, #333 0%, rgb(0 0 0 / 66%) 100%)',
                  color:"white",    
        },  
        '&.active': {
            backgroundColor: '#f4f4f4',
            color: '#444',
            boxShadow: 'none',
            borderRadius: '3px',
            border:'1px solid #0000006b',
          }
    },

    tableheadstyle:{
        display:'flex',
         gap:'10px',
         height:'max-content',
         width:'max-content',
    }

}