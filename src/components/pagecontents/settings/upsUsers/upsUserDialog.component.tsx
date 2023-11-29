import { Fragment, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";


import {  
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  StepContent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";
import countryCodeEmoji from "country-code-emoji";
import upsService from "../../../../services/ups.service";
import ToastService from "../../../toast/toast.component";
import { list } from "postcss";
import { useNavigate } from "react-router-dom";
const steps = [
  "1. Introduction",
  "2. Account Information",
  "3. Agreement",
  "4. Confirmation",
];
interface UPSUserDialogProps {
  open: boolean;
  editmode: boolean;
  userData: UPSUserData;
  handleClose: () => void;
  setUpsUserData: (value: UPSUserData) => void;
  handleAddUser: () => void;
}
export interface UPSUserData {
  shipper_nickName: string;
  shipper_fullName: string;
  shipper_companyName : string;
  shipper_attentionname: string;
  shipper_taxidnum: string;
  shipper_phone: string;
  shipper_number: string;
  shipper_fax: string;
  shipper_address: string;
  shipper_city: string;
  shipper_statecode: string;
  shipper_postalcode: string;
  shipper_countrycode: string;
  shipper_upsNumber: string;
  shipper_zipCode: string;
  shipper_selected: boolean;
}

export default function UpsUserDialog(props: UPSUserDialogProps) {
  const {
    open,
    editmode,
    userData,
    handleClose,
    handleAddUser,
    setUpsUserData,
  } = props;
  const options = useMemo(() => countryList().getData(), []);
  const [countryValue, setCountryValue] = useState("CA");
  
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [shipperLocation, setShipperLocationData] = useState<UPSUserData>({
    shipper_nickName: "",
    shipper_fullName: "",
    shipper_companyName: "",
    shipper_attentionname: "",
    shipper_taxidnum: "",
    shipper_phone: "",
    shipper_number: "",
    shipper_fax: "",
    shipper_address: "",
    shipper_city: "",
    shipper_statecode: "",
    shipper_postalcode: "",
    shipper_countrycode: "",
    shipper_upsNumber: '',
    shipper_zipCode: '',
    shipper_selected: false,
  });
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountryValue(event.target.value);
    handleShipperChange("shipper_countrycode", event.target.value);
  };

  const handleShipperChange = (name: string, value: string) => {
    setShipperLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    shipper_fullName: '',
    shipper_companyName: '',
    shipper_attentionname: '',
    shipper_taxidnum : '',
    shipper_phone : '',
    shipper_address : '',
    shipper_postalcode : '',
    shipper_city: '',
    shipper_statecode: '',
    shipper_upsNumber: '',
    shipper_zipCode: '',
  });

  const send_ups_usedata = async (shipperLocation: any) => {
    const headers = { Authorization: localStorage.getItem("token")};
    try {
      const response = await axios.get('api/ups/adduserdetails', {
        headers: headers,
        params: {
          account_nickname: shipperLocation.shipper_nickName,
          fullname: shipperLocation.shipper_fullName,
          company_name: shipperLocation.shipper_companyName,
          email: shipperLocation.shipper_taxidnum,
          phone: shipperLocation.shipper_phone,
          street1: shipperLocation.shipper_address,
          street2: shipperLocation.shipper_attentionname,
          city: shipperLocation.shipper_city,
          state: shipperLocation.shipper_statecode,
          country1: shipperLocation.shipper_countrycode,
          zip_code: shipperLocation.shipper_zipCode,
          UPS_account_number: shipperLocation.shipper_upsNumber,
          postcode: shipperLocation.shipper_postalcode,
          counrty2: shipperLocation.shipper_countrycode,
        },
      });
      
      // Handle the response here
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error sending UPS user data:', error);
      throw error; // Propagate the error to the caller
    }
  };
  
  
  const handleFinal = () => {
    let isValid = true;
    switch (activeStep) {
      case 3:
        let step3Errors = {
          shipper_upsNumber: '',
          shipper_postalcode: '',
        };
        if (!shipperLocation.shipper_upsNumber) {
          step3Errors.shipper_upsNumber = 'UPS Account number is required';
          isValid = false;
        }
        if (!shipperLocation.shipper_postalcode) {
          step3Errors.shipper_postalcode = 'Postal Code is required';
          isValid = false;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...step3Errors,
        }));
        break;
      default:
        break;
    }
    if (isValid) {
      send_ups_usedata(shipperLocation);

      navigate('/application/settings/product');
    }
  };



  const handleNext = () => {
    let isValid = true;
    
    switch (activeStep) {
      case 1: // For Step 1
        let step1Errors = {
          shipper_fullName: '',
          shipper_companyName: '',
          shipper_taxidnum: '',
          shipper_phone: '',
        };

        if(!shipperLocation.shipper_fullName){
          step1Errors.shipper_fullName = "Full name is Required !!"
          isValid = false;
        }
        if(!shipperLocation.shipper_companyName){
          step1Errors.shipper_companyName = "Company name is Required !!"
          isValid = false;
        }
  
        if (!shipperLocation.shipper_taxidnum.includes("@") || !shipperLocation.shipper_taxidnum.includes(".")) {
          step1Errors.shipper_taxidnum = 'Attention email is not valid !';
          isValid = false;
        } 
        if (!shipperLocation.shipper_taxidnum) {

          step1Errors.shipper_taxidnum = 'Attention email is required';
          isValid = false;
        }
  
        if (!shipperLocation.shipper_phone) {
          step1Errors.shipper_phone = 'Phone is required';
          isValid = false;
        }
  
        // Set the errors for Step 1
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...step1Errors,
        }));
        break;
      // Handle errors for other steps similarly...

      case 2:
        let step2Errors = {
          shipper_address : '',
          shipper_city : '',
          shipper_statecode : '',
          shipper_zipCode : '',
        }

        if(!shipperLocation.shipper_address){
          step2Errors.shipper_address = 'Street address is required';
          isValid = false;
        }
        if(!shipperLocation.shipper_city){
          step2Errors.shipper_city = 'City is required';
          isValid = false;
        }
        if(!shipperLocation.shipper_statecode){
          step2Errors.shipper_statecode = 'state is required';
          isValid = false;
        }
        if(!shipperLocation.shipper_zipCode){
          step2Errors.shipper_zipCode = 'Zipcode is required';
          isValid = false;
        }
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...step2Errors,
        }));
        break;
        
      

  
      default:
        break;
    }
  
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1); // Proceed to the next step
    }
  };
  
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0) {
        return 0; // Return the current activeStep if it is already 0
      } else {
        return prevActiveStep - 1; // Decrement the activeStep otherwise
      }
    });
  };


    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
    const value = event.target.value;
    handleShipperChange(name, value);
  };

  
  const handleLogin = () => {
    localStorage.setItem("upsAccount", shipperLocation.shipper_number);
    upsService
      .validate()
      .then((data) => {
        if (data.result == "success") {
          shipperLocation.shipper_selected = false;
          upsService.addUser(shipperLocation);
          upsService.getCode(data.LassoRedirectURL, data.type);
        } else if (data.response.errors[0].message)
          ToastService.showToast("failed", data.response.errors[0].message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleShipperChange("shipper_countrycode", "CA");
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <ToastService.MyToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        PaperProps={{ sx: { width: "100%", height: "70%" } }}
      >
        <DialogTitle>{editmode ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <div className=" mt-4 mb-4">
            <Divider />
            <Typography className="text-left pt-2" gutterBottom>
              As users come and go from your organization, it's important to
              maintain historical references on their activity. Old user
              accounts are never fully deleted; instead they are deactivated and
              prevented from accessing the system.
            </Typography>
          </div>
          <Box sx={{ width: "100%" }}>
            <Stepper
              activeStep={activeStep}
              orientation="horizontal"
              alternativeLabel
              style={{ maxWidth: "100%" }} // Set the maxWidth to 100%
            >
              <Step key={"introduction"} completed={false}>
                <StepLabel>{"1. Account Nickname"}</StepLabel>
              </Step>
              <Step key={"accountInformation"} completed={false}>
                <StepLabel>{"2. Contact Information"}</StepLabel>
              </Step>
              <Step key={"agreement"} completed={false}>
                <StepLabel>{"3. Billing Address"}</StepLabel>
              </Step>
              <Step key={"confirmation"} completed={false}>
                <StepLabel>{"4. Ups Account Information"}</StepLabel>
              </Step>
            </Stepper>

            {activeStep === steps.length ? (
              <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleLogin}>Login</Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>

                {/* step content */}
                <Collapse in={activeStep === 0}>
                  <div className="flex">
                    <div className="h-[250px] w-9/12 m-3">
                      <Typography variant="h6" className="text-left mb-2 pb-2">
                        Please Enter your Account Nickname 
                      </Typography>
                      <Divider />
                      {/* <p>
                        This wizard will assist you in completing the necessary
                        licensing and registration requirements to activate and
                        use the UPS Developer Kit from within ShipStation{" "}
                      </p>
                      <br />
                      <p>
                        If you do not wish to use any of the functions that
                        utilize the UPS Developer Kit, click the Cancel button
                        and this provider will not be enabled.{" "}
                      </p>
                      <br />
                      <p>
                        {" "}
                        If, at a later time, you wish to use the UPS Developer
                        Kit, return to this section and complete the UPS
                        Developer Kit licensing and registration process.
                      </p> */}
                      <br />
                      <TextField
                            className="w-full"
                            variant="outlined"
                            label="Account Nickname"
                            name="shipper_nickName"
                            value={shipperLocation.shipper_nickName}
                            size="small"

                            required
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              maxWidth : "35em"
                            }}
                          />                       
                    </div>
                    <div className="h-[250px] w-3/12 m-4">
                      <img src="/ups.svg" alt="" className="w-36 h-36" />
                    </div>
                  </div>
                </Collapse>

                <Collapse in={activeStep === 1}>
                  <div className="h-[250px] m-2">
                    <Grid container spacing={2}>
                      <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                        <Typography
                          textAlign={"left"}
                          variant="h6"
                          className="text-center"
                          gutterBottom
                        >
                          Contact Information
                        </Typography>
                        <Divider />
                      </Grid>
                      <Grid
                        container
                        xs={12}
                        sx={{ p: 2, border: "1px solid #ccc" , margin: "10px 0;"}}
                      >
                        <p></p>

                          <TextField
                            className="w-full"
                            variant="outlined"
                            label="Full Name"
                            name="shipper_fullName"
                            value={shipperLocation.shipper_fullName}
                            error={errors.shipper_fullName !== ''}
                            helperText={errors.shipper_fullName}
                            size="small"
                            required
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                              
                            }}
                          />
                          <br />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="Company Name"
                            name="shipper_companyName"
                            value={shipperLocation.shipper_companyName}
                            error={errors.shipper_companyName !== ''}
                            helperText={errors.shipper_companyName}
                            size="small"
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="Email"
                            name="shipper_taxidnum"
                            value={shipperLocation.shipper_taxidnum}
                            size="small"
                            onChange={handleLabelChange}
                            required  
                            error={errors.shipper_taxidnum !== ''} // Set error state based on validation
                            helperText={errors.shipper_taxidnum}
                            InputProps={{
                              type: "email",  // Setting input type to 'email' for browser validation
                            }}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="Phone Number"
                            name="shipper_phone"
                            value={shipperLocation.shipper_phone}
                            size="small"
                            error={errors.shipper_phone !== ''} // Set error state based on validation
                            helperText={errors.shipper_phone}
                            onChange={handleLabelChange}
                            required
                            InputProps={{
                              type: "tel",  // Setting input type to 'tel' for browser validation
                            }}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px"
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                        
                      </Grid>
                     

                      
                    </Grid>
                  </div>
                </Collapse>

                <Collapse in={activeStep === 2}>
                  <div className="h-[250px] m-3">
                    <Grid container spacing={2}>
                      <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                        <Typography
                          textAlign={"left"}
                          variant="h6"
                          className="text-center"
                          gutterBottom
                        >
                          Contact Information
                        </Typography>
                        <Divider />
                      </Grid>
                      <Grid
                        container
                        xs={12}
                        sx={{ p: 2, border: "1px solid #ccc" }}
                      >
                          <TextField
                            className="w-full"
                            variant="outlined"
                            label="Street 1"
                            name="shipper_address"
                            value={shipperLocation.shipper_address}
                            error={errors.shipper_address !== ''} // Set error state based on validation
                            helperText={errors.shipper_address} 
                            size="small"
                            required
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                        <Divider />

                          <br />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="Street 2"
                            name="shipper_attentionname"
                            value={shipperLocation.shipper_attentionname}
                            size="small"
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="City"
                            name="shipper_city"
                            value={shipperLocation.shipper_city}
                            error={errors.shipper_city !== ''} // Set error state based on validation
                            helperText={errors.shipper_city} 
                            size="small"
                            onChange={handleLabelChange}
                            required  // Adding the required attribute
                            InputProps={{
                              type: "email",  // Setting input type to 'email' for browser validation
                            }}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="State"
                            name="shipper_statecode"
                            value={shipperLocation.shipper_statecode}
                            error={errors.shipper_statecode !== ''} // Set error state based on validation
                            helperText={errors.shipper_statecode} 
                            size="small"
                            onChange={handleLabelChange}
                            required  // Adding the required attribute
                            InputProps={{
                              type: "tel",  // Setting input type to 'tel' for browser validation
                            }}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="Zip Code"
                            name="shipper_zipCode"
                            value={shipperLocation.shipper_zipCode}
                            error={errors.shipper_zipCode !== ''} // Set error state based on validation
                            helperText={errors.shipper_zipCode} 
                            size="small"
                            onChange={handleLabelChange}
                            required
                            InputProps={{
                              type: "tel",  // Setting input type to 'tel' for browser validation
                            }}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                        
                      </Grid>
                     

                      
                    </Grid>
                  </div>
                </Collapse>
                <Collapse in={activeStep === 3}>
                  <div className="h-[250px] m-3">
                  <Grid xs={12} sx={{ p: 1 }} md={12} xl={12}>
                        <Typography
                          textAlign={"left"}
                          variant="h6"
                          className="text-center"
                          gutterBottom
                        >
                          UPS Account Information
                        </Typography>
                      </Grid>
                      {/* <Grid
                        container
                        xs={12}
                        sx={{ p: 2, border: "1px solid #ccc" }}
                      >
                          <TextField
                            className="w-full"
                            variant="outlined"
                            label="UPS Account Number"
                            name="shipper_fullName"
                            value={shipperLocation.shipper_fullName}
                            size="small"
                            required
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                            }}
                          />
                        <Divider />

                          <br />
                          <p></p>
                          <TextField
                            className="w-full "
                            variant="outlined"
                            label="Postal Code"
                            name="shipper_attentionname"
                            value={shipperLocation.shipper_attentionname}
                            size="small"
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                            }}
                          />
                          
                        
                      </Grid> */}
                      <Grid xs={12} sx={{ p: 1 }} md={12}>
                          <TextField
                            className="w-full"
                            variant="outlined"
                            label="UPS Account Number"
                            name="shipper_upsNumber"
                            value={shipperLocation.shipper_upsNumber}
                            error={errors.shipper_upsNumber !== ''} // Set error state based on validation
                            helperText={errors.shipper_upsNumber} 
                            size="small"
                            required
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }} md={12}>
                          <Typography>
                            You can find your account number (aka "Shipper
                            Number") by logging into your "My UPS" account and
                            selecting "Account Summary"
                          </Typography>
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }} md={12}>
                          <div className="flex">
                            <ReactCountryFlag
                              className="mr-1 border border-gray-200 shadow-md rounded-md"
                              style={{ width: "32px", height: "32px" }}
                              countryCode={countryValue ? countryValue : ""}
                              svg
                              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                              cdnSuffix="svg"
                              title={countryValue ? countryValue : ""}
                            />
                            <Select
                              value={countryValue}
                              size="small"
                              name="shipper_countrycode"
                              onChange={handleCountryChange}
                              className="w-full"
                              sx={{
                                fontSize: "14px",
                                maxWidth : "37em"
                              }}
                            >
                              {options.map((country) => (
                                <MenuItem
                                  id={country.value}
                                  key={country.value}
                                  value={country.value}
                                  sx={{
                                    fontSize: "14px",
                                  }}
                                >
                                  {"(" +
                                    countryCodeEmoji(country.value) +
                                    ") " +
                                    country.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </Grid>
                        <Grid xs={12} sx={{ p: 1 }} md={12}>
                          <TextField
                            className="w-full"
                            variant="outlined"
                            label="Postal Code"
                            name="shipper_postalcode"
                            value={shipperLocation.shipper_postalcode}
                            error={errors.shipper_postalcode !== ''} // Set error state based on validation
                            helperText={errors.shipper_postalcode} 
                            size="small"
                            required
                            onChange={handleLabelChange}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "14px",
                              },
                              "& .MuiOutlinedInput-input": {
                                fontSize: "14px",
                              },
                              marginTop: "10px", 
                              marginBottom: "10px",
                              maxWidth : "35em"
                            }}
                          />
                        </Grid>
                  </div>
                </Collapse>
              </Fragment>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <button
              type="submit"
              className="w-[120px] h-[42px] text-center align-middle ml-4 px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
              onClick={handleBack}
            >
              <span className="text-white text-base">Back</span>
            </button>

            {/* <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            {activeStep > steps.length - 1 ? (
              ""
            ) : activeStep === steps.length - 1 ? (
              <button
                type="submit"
                className="w-[120px] h-[42px] text-center align-middle ml-4 px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
                onClick={handleFinal}
              >
                <span className="text-white text-base">Finish</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-[120px] h-[42px] text-center align-middle ml-4 px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
                onClick={handleNext}
              >
                <span className="text-white text-base">Next</span>
              </button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
