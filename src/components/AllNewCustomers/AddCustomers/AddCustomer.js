import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import 'date-fns';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import customercamera from '../../../assets/images/customercamera.svg';
import newfield from '../../../assets/images/newfield.svg';
import remove from '../../../assets/images/remove.svg';
import Sidebar from '../../sidebar/sidebar';
import DatePicker from 'react-date-picker';
import { BaseUrl, ImageBaseUrl } from "../../../Environment"
import moment from 'moment';
import './AddCustomer.scss';
import Eyeline from "../../../assets/images/eyeline.svg";
import Cloud from "../../../assets/images/cloud.svg";

import ImageModal from '../../modals/ImageModal/ImageModal';
import { withNamespaces } from 'react-i18next';
const axios = require('axios')
const annualincome = [
    {
        value: ' 0.00 -  250,000',
        label: '₹ 0.00 - ₹ 250,000',
    },
    {
        value: ' 250,001 -  500,000',
        label: '₹ 250,001 - ₹ 500,000',
    },
    {
        value: ' 500,001 -  1,000,000',
        label: '₹ 500,001 - ₹ 1,000,000',
    },
    {
        value: ' 1,000,000 -  50,000,000',
        label: '₹ 1,000,000 - ₹ 50,000,000',
    },
    {
        value: '50,000,000',
        label: 'Above ₹ 50,000,000',
    },

];
const preferredtime = [

    {
        value: '08:00 a.m - 11:00 a.m',
        label: '08:00 a.m - 11:00 a.m',
    },
    {
        value: '11:00 a.m - 02:00 p.m',
        label: '11:00 a.m - 02:00 p.m',
    },
    {
        value: '02:00 p.m - 05:00 p.m',
        label: '02:00 p.m - 05:00 p.m',
    },
    {
        value: '05:00 p.m - 08:00 p.m',
        label: '05:00 p.m - 08:00 p.m',
    },
    {
        value: 'Anytime',
        label: 'Anytime',
    },

];

const doctype = [
    {
        value: ' aadharcard',
        label: 'Aadhaar Card',
    },
    {
        value: ' pancard',
        label: 'Pan Card',
    },
    {
        value: 'voterid',
        label: 'Voter Id',
    },
    {
        value: 'Driving License (DL)',
        label: 'Driving License (DL)',
    },
    {
        value: 'Passport',
        label: 'Passport',
    },
    {
        value: 'Electricity Bill',
        label: 'Electricity Bill',
    },
    {
        value: 'Property Tax',
        label: 'Property Tax',
    },
    {
        value: 'Bank Statement',
        label: 'Bank Statement',
    },
    {
        value: 'Shop Act Certificate',
        label: 'Shop Act Certificate',
    },
    {
        value: 'Incorporation Certificate',
        label: 'Incorporation Certificate',
    },
    {
        value: 'Income Tax Return',
        label: 'Income Tax Return',
    },
    {
        value: 'Credit Score Report',
        label: 'Credit Score Report',
    },
    {
        value: 'Vehicle Registration Certificate',
        label: 'Vehicle Registration Certificate',
    },
    {
        value: 'Property Registration',
        label: 'Property Registration',
    },
    {
        value: 'Auto Debit - National Automated Clearing House (NACH) Mandate',
        label: 'Auto Debit - National Automated Clearing House (NACH) Mandate',
    },

];
const accType = [
    {
        value: 'Savings',
        label: 'Savings',
    },
    {
        value: 'Current',
        label: 'Current',
    },
];
const state = [
    {
        value: ' Andhra Pradesh',
        label: 'Andhra Pradesh',
    },
    {
        value: ' Arunachal Pradesh',
        label: 'Arunachal Pradesh',
    },
    {
        value: ' Assam',
        label: 'Assam',
    },
    {
        value: ' Bihar',
        label: 'Bihar',
    },
    {
        value: ' Chhattisgarh',
        label: 'Chhattisgarh',
    },
    {
        value: ' Goa',
        label: 'Goa',
    },
    {
        value: ' Gujarat',
        label: 'Gujarat',
    },
    {
        value: ' Haryana',
        label: 'Haryana',
    },
    {
        value: ' Himachal Pradesh',
        label: 'Himachal Pradesh',
    },
    {
        value: ' Jammu and Kashmir',
        label: 'Jammu and Kashmir',
    },
    {
        value: ' Jharkhand',
        label: 'Jharkhand',
    },
    {
        value: ' Karnataka',
        label: 'Karnataka',
    },
    {
        value: ' Kerala',
        label: 'Kerala',
    },
    {
        value: ' Madhya Pradesh',
        label: 'Madhya Pradesh',
    },
    {
        value: ' Maharashtra',
        label: 'Maharashtra',
    },
    {
        value: ' Manipur',
        label: 'Manipur',
    },
    {
        value: ' Meghalaya',
        label: 'Meghalaya',
    },
    {
        value: ' Mizoram',
        label: 'Mizoram',
    },
    {
        value: ' Nagaland',
        label: 'Nagaland',
    },
    {
        value: ' Odisha',
        label: 'Odisha',
    },
    {
        value: ' Punjab',
        label: 'Punjab',
    },
    {
        value: ' Rajasthan',
        label: 'Rajasthan',
    },
    {
        value: ' Sikkim',
        label: 'Sikkim',
    },
    {
        value: ' Tamil Nadu',
        label: 'Tamil Nadu',
    },
    {
        value: ' Telangana',
        label: 'Telangana',
    },
    {
        value: ' Tripura',
        label: 'Tripura',
    },
    {
        value: ' Uttarakhand',
        label: 'Uttarakhand',
    },
    {
        value: ' Uttar Pradesh',
        label: 'Uttar Pradesh',
    },
    {
        value: ' West Bengal',
        label: 'West Bengal',
    },
    {
        value: ' Andaman and Nicobar Islands',
        label: 'Andaman and Nicobar Islands',
    },
    {
        value: ' Chandigarh',
        label: 'Chandigarh',
    },
    {
        value: ' Dadra and Nagar Haveli',
        label: 'Dadra and Nagar Haveli',
    },
    {
        value: ' Daman and Diu',
        label: 'Daman and Diu',
    },
    {
        value: ' Delhi',
        label: 'Delhi',
    },
    {
        value: ' Lakshadweep',
        label: 'Lakshadweep',
    },
    {
        value: ' Puducherry',
        label: 'Puducherry',
    },
];





class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5",
            changeColorname: '1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            changeColoremail: '1px solid #D4D4D5',
            changeColorwebsite: '1px solid #D4D4D5',
            changeColoraddress: '1px solid #D4D4D5',
            file: {},
            filecheck: {},
            filedoc: {},
            filename: "",
            filedoc2: {},
            filename2: "",
            filedoc3: {},
            filename3: "",
            filecheckname: "",
            fileprofilename: "",
            imagePreviewUrl: '',
            imagePreviewUrlcheck: '',
            imagePreviewUrldoc: '',
            imagePreviewUrldoc2: '',
            imagePreviewUrldoc3: '',
            imagePopUp: "",
            loginToken: "",
            extrafield1: "",
            extrafield2: "",
            count: 0,
            clicked: false,
            SelectedDate: null,
            gender: "male",
            status: "single",
            pancard: "",
            adharcard: "",
            firstname: "",
            lastname: "",
            mobilenum: "",
            fathersname: "",
            email: "",
            dependentname: "",
            anualincome: "",
            majorsource: "",
            bankname: "",
            bankifsc: "",
            bankaccountnum: "",
            bankaccounttype: "",
            refcontactnum2: "",
            refcontactnum1: "",
            refname2: "",
            refname2: "",
            homeAddressLine: "",
            homeAddressStreet: "",
            homeAddressLandmark: "",
            homeAddressCity: "",
            homeAddressPincode: "",
            homeAddressState: "",
            OfficeAddressLine: "",
            OfficeAddressStreet: "",
            OfficeAddressCity: "",
            OfficeAddressLandmark: "",
            OfficeAddressPincode: "",
            OfficeAddressState: "",
            Customergeneralinfo: "",
            CustomerInfo: "",
            CutomerBank: "",
            CustomerRef: "",
            CustomerAddress: "",
            samehomeaddress: "",
            selectedaddress: "",
            collectiontime: "",
            selectdocument: "",
            selectdocument2: "",
            selectdocument3: "",
            openmodal: false,
            curTime: new Date().toLocaleString(),
            validemail: true,
            emailError: "none",
            validnum: true,
            numError: "none",
            validadhar: true,
            adharError: "none",
            validPan: true,
            panError:"none",
            validhomepin: true,
            homepinError: "none",
            validofficepin: true,
            officepinError: "none",
            validrefnum1: true,
            refnum1Error: "none",
            validrefnum2: true,
            refnum2Error: "none",
            submitted: false,
            customerId: "",
            updatesave: "",
            addcustmr: "",
            proofIdpic: "",
            proofIdcheck: "",
            proofId: "",
            proofId2: "",
            proofId3: "",
            collectionDetailsId: "",
            referenceDetailsId: "",
            bankDetailsId: "",
            addressIdoffice: "",
            addressIdhome: "",
            date: new Date(),
            samehomeaddressChecked: false,
            upload:false

        };

        this.firstnameBox = this.firstnameBox.bind(this)
        this.secondnameBox = this.secondnameBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.dobBox = this.dobBox.bind(this)
        this.mobnumberBox = this.mobnumberBox.bind(this)
        this.mothernameBox = this.mothernameBox.bind(this)
        this.fathernameBox = this.fathernameBox.bind(this)
        this.dependnameBox = this.dependnameBox.bind(this)
        this.annualBox = this.annualBox.bind(this)
        this.majorBox = this.majorBox.bind(this)
        this.adharBox = this.adharBox.bind(this)
        this.panBox = this.panBox.bind(this)
        this.flatBox = this.flatBox.bind(this)
        this.streetBox = this.streetBox.bind(this)
        this.landmarkBox = this.landmarkBox.bind(this)
        this.cityBox = this.cityBox.bind(this)
        this.pinBox = this.pinBox.bind(this)
        this.stateBox = this.stateBox.bind(this)
        this.flatofficeBox = this.flatofficeBox.bind(this)
        this.streetofficeBox = this.streetofficeBox.bind(this)
        this.landmarkofficeBox = this.landmarkofficeBox.bind(this)
        this.cityofficeBox = this.cityofficeBox.bind(this)
        this.pinofficeBox = this.pinofficeBox.bind(this)
        this.stateofficeBox = this.stateofficeBox.bind(this)
        this.preferBox = this.preferBox.bind(this)
        this.banknameeBox = this.banknameeBox.bind(this)
        this.ifscBox = this.ifscBox.bind(this)
        this.accnumberBox = this.accnumberBox.bind(this)
        this.acctypeBox = this.acctypeBox.bind(this)
        this.refername1Box = this.refername1Box.bind(this)
        this.refernum1Box = this.refernum1Box.bind(this)
        this.refername2Box = this.refername2Box.bind(this)
        this.refernum2Box = this.refernum2Box.bind(this)
        this.proffadharBox = this.proffadharBox.bind(this)
        this.proffpanBox = this.proffpanBox.bind(this)
        this.proffvoterBox = this.proffvoterBox.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleRadioChangeaddress = this.handleRadioChangeaddress.bind(this);
        this.handleRadioChangeselectedaddress = this.handleRadioChangeselectedaddress.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        // this.refinfoGet = this.refinfoGet.bind(this)
        this.generalinfoGet = this.generalinfoGet.bind(this)
        // this.addressinfoGet = this.addressinfoGet.bind(this)
        // this.bankinfoGet = this.bankinfoGet.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validEmail = this.validEmail.bind(this)
        this.validNum = this.validNum.bind(this)
        this.validAdhar = this.validAdhar.bind(this)
        this.validPan = this.validPan.bind(this)
        this.validHomePin = this.validHomePin.bind(this)
        this.validOfficePin = this.validOfficePin.bind(this)
        this.validRefNum1 = this.validRefNum1.bind(this)
        this.validRefNum2 = this.validRefNum2.bind(this)
        this.closemodal = this.closemodal.bind(this)
    }
    _handleSubmit(e) {
        e.preventDefault();
    }
    onChangeDate = date => this.setState({ date })


    firstnameBox() {
        this.setState({
            firstnamee: "1px solid #00D95E",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    secondnameBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #00D95E",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    emailBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #00D95E",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    dobBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #00D95E",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    mobnumberBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #00D95E",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    mothernameBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #00D95E",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    fathernameBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #00D95E",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    dependnameBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #00D95E",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    annualBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #00D95E",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    majorBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #00D95E",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    adharBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #00D95E",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    panBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #00D95E",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    flatBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #00D95E",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    streetBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #00D95E",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    landmarkBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #00D95E",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    cityBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #00D95E",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    pinBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #00D95E",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    stateBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #00D95E",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    flatofficeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #00D95E",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    streetofficeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #00D95E",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    landmarkofficeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #00D95E",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    cityofficeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #00D95E",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    pinofficeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #00D95E",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    stateofficeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #00D95E",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    preferBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #00D95E",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    banknameeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            mobdob: "1px solid #D4D4D5",
            number: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #00D95E",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    ifscBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknameee: "1px solid #D4D4D5",
            ifsc: "1px solid #00D95E",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    accnumberBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #00D95E",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    acctypeBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #00D95E",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    refername1Box() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #00D95E",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    refernum1Box() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #00D95E",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    refername2Box() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #00D95E",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    refernum2Box() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #00D95E",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    proffadharBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #00D95E",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    proffpanBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #00D95E",
            proffvoter: "1px solid #D4D4D5"
        })

    }
    proffvoterBox() {
        this.setState({
            firstnamee: "1px solid #D4D4D5",
            secondname: "1px solid #D4D4D5",
            emaill: "1px solid #D4D4D5",
            dob: "1px solid #D4D4D5",
            mobnumber: "1px solid #D4D4D5",
            mothername: "1px solid #D4D4D5",
            fathername: "1px solid #D4D4D5",
            dependname: "1px solid #D4D4D5",
            annual: "1px solid #D4D4D5",
            major: "1px solid #D4D4D5",
            adhar: "1px solid #D4D4D5",
            pan: "1px solid #D4D4D5",
            flat: "1px solid #D4D4D5",
            street: "1px solid #D4D4D5",
            landmark: "1px solid #D4D4D5",
            city: "1px solid #D4D4D5",
            pin: "1px solid #D4D4D5",
            state: "1px solid #D4D4D5",
            flatoffice: "1px solid #D4D4D5",
            streetoffice: "1px solid #D4D4D5",
            landmarkoffice: "1px solid #D4D4D5",
            cityoffice: "1px solid #D4D4D5",
            pinoffice: "1px solid #D4D4D5",
            stateoffice: "1px solid #D4D4D5",
            prefer: "1px solid #D4D4D5",
            banknamee: "1px solid #D4D4D5",
            ifsc: "1px solid #D4D4D5",
            accnumber: "1px solid #D4D4D5",
            acctype: "1px solid #D4D4D5",
            refername1: "1px solid #D4D4D5",
            refernum1: "1px solid #D4D4D5",
            refername2: "1px solid #D4D4D5",
            refernum2: "1px solid #D4D4D5",
            proffadhar: "1px solid #D4D4D5",
            proffpan: "1px solid #D4D4D5",
            proffvoter: "1px solid #00D95E"
        })

    }

    // firstnameBox() {
    //     this.setState({
    //         changeColorname: "1px solid #00D95E",
    //         changeColornumber: "1px solid #D4D4D5",
    //         changeColoremail: "1px solid #D4D4D5",
    //         changeColorwebsite: "1px solid #D4D4D5",
    //         changeColoraddress: "1px solid #D4D4D5"
    //     })
    // }
    // numberBox() {
    //     this.setState({
    //         changeColornumber: "1px solid #00D95E",
    //         changeColorname: "1px solid #D4D4D5",
    //         changeColoremail: "1px solid #D4D4D5",
    //         changeColorwebsite: "1px solid #D4D4D5",
    //         changeColoraddress: "1px solid #D4D4D5"
    //     })
    // }
    // emailBox() {
    //     this.setState({
    //         changeColoremail: "1px solid #00D95E",
    //         changeColornumber: "1px solid #D4D4D5",
    //         changeColorname: "1px solid #D4D4D5",
    //         changeColorwebsite: "1px solid #D4D4D5",
    //         changeColoraddress: "1px solid #D4D4D5"
    //     })
    // }
    // addressBox() {
    //     this.setState({
    //         changeColoraddress: "1px solid #00D95E",
    //         changeColoremail: "1px solid #D4D4D5",
    //         changeColornumber: "1px solid #D4D4D5",
    //         changeColorwebsite: "1px solid #D4D4D5",
    //         changeColorname: "1px solid #D4D4D5",
    //     })
    // }
    // websiteBox() {
    //     this.setState({
    //         changeColoraddress: "1px solid #D4D4D5",
    //         changeColoremail: "1px solid #D4D4D5",
    //         changeColorwebsite: "1px solid #00D95E",
    //         changeColornumber: "1px solid #D4D4D5",
    //         changeColorname: "1px solid #D4D4D5",
    //     })
    // }
    componentDidMount() {
        this.setState({
            loginToken: localStorage.getItem('token'),
            extrafield1: "none",
            extrafield2: "none",
        })
        if (this.props.location.params) {
            this.generalinfoGet();
            this.setState({
                addcustmr: "none",
                updatesave: "initial"
            })
        } else {
            this.setState({
                addcustmr: "initial",
                updatesave: "none"
            })
        }
    }
    openprofileModal() {
        this.setState({
            openmodal: true
        })
    }
    closemodal() {
        this.setState({
            openmodal: false
        })
    }
    eyeline1() {
        if (this.props.location.params) {
            this.setState({
                openmodal: true,
                imagePopUp: ImageBaseUrl + this.state.filename
            })
        } else {
            this.setState({
                openmodal: true,
                imagePopUp: this.state.imagePreviewUrldoc
            })
        }
    }
    eyeline2() {
        if (this.props.location.params) {
            this.setState({
                openmodal: true,
                imagePopUp: ImageBaseUrl + this.state.filename2
            })
        } else {
            this.setState({
                openmodal: true,
                imagePopUp: this.state.imagePreviewUrldoc2
            })
        }
    }
    eyeline3() {
        if (this.props.location.params) {
            this.setState({
                openmodal: true,
                imagePopUp: ImageBaseUrl + this.state.filename3
            })
        } else {
            this.setState({
                openmodal: true,
                imagePopUp: this.state.imagePreviewUrldoc3
            })
        }
    }
    addfield() {
        this.setState({
            count: this.state.count + 1,
        });

        if (this.state.count === 1) {
            this.setState({
                extrafield1: "",
            })
        }
        if (this.state.count === 2) {
            this.setState({
                extrafield2: "",
            })
        }
    }
    removedoc3() {
        this.setState({
            count: this.state.count - 1,
            extrafield2: "none",
        });
        //   if(this.state.count === 1) {
        //     this.setState({
        //         extrafield1:"",
        //     })
        // } 
        // if (this.state.count===2) {
        //     this.setState({
        //         extrafield2:"",
        //     })
        // }
    }
    removedoc2() {
        this.setState({
            count: this.state.count - 1,
            extrafield1: "none",
        });
        //   if(this.state.count === 1) {
        //     this.setState({
        //         extrafield1:"",
        //     })
        // } 
        // if (this.state.count===2) {
        //     this.setState({
        //         extrafield2:"",
        //     })
        // }
    }
    handleRadioChange(event) {
        // set the new value of checked radion button to state using setState function which is async funtion
        this.setState({
            gender: event.target.value
        });
    }
    handleRadioChangeselectedaddress(event) {
        this.setState({
            selectedaddress: event.target.value
        });
    }
    handleRadioChangeaddress(event) {
        this.setState({
            samehomeaddress: event.target.value
        });
        if (this.state.samehomeaddressChecked) {
            this.setState({
                samehomeaddressChecked: false,
                OfficeAddressLine: "",
                OfficeAddressStreet: "",
                OfficeAddressCity: "",
                OfficeAddressLandmark: "",
                OfficeAddressPincode: "",
                OfficeAddressState: "",
            })
        }
        else {
            this.setState({
                samehomeaddressChecked: true,
                OfficeAddressLine: this.state.homeAddressLine,
                OfficeAddressStreet: this.state.homeAddressStreet,
                OfficeAddressCity: this.state.homeAddressCity,
                OfficeAddressLandmark: this.state.homeAddressLandmark,
                OfficeAddressPincode: this.state.homeAddressPincode,
                OfficeAddressState: this.state.homeAddressState,
            })
        }
    }
    handleStatusChange(event) {
        // set the new value of checked radion button to state using setState function which is async funtion
        this.setState({
            status: event.target.value
        });
    }
    handleDateChange = SelectedDate => {
        console.log('birthDate', typeof SelectedDate)
        console.log('birthDate', SelectedDate)

        var today = new Date();
        var birthDate = new Date(SelectedDate);
        console.log('birthDate', birthDate)

        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age >= 18) {
            console.log("date format", moment(SelectedDate).format("DD/MM/YYYY"))

            this.setState({
                SelectedDate: moment(SelectedDate).format("DD/MM/YYYY")
            })
            console.log("date format", moment(SelectedDate).format("DD/MM/YYYY"))
        } else {
            toast.error("Your age is below 18", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    };
    _handleSubmit(e) {
        e.preventDefault();
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { firstname, lastname, mobilenum, homeAddressLine, homeAddressStreet, homeAddressLandmark, homeAddressCity,
            homeAddressPincode, homeAddressState, OfficeAddressLine, OfficeAddressStreet, OfficeAddressCity,
            OfficeAddressLandmark, OfficeAddressPincode, OfficeAddressState } = this.state;
        if (firstname && lastname && mobilenum && homeAddressLine && homeAddressStreet && homeAddressLandmark && homeAddressCity &&
            homeAddressPincode && homeAddressState && OfficeAddressLine && OfficeAddressStreet && OfficeAddressCity &&
            OfficeAddressLandmark && OfficeAddressPincode && OfficeAddressState) {
            this.savegeneralinfo();
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        return re.test(email)
    }
    validEmail = (event) => {
        const email = event.target.value
        const emailVaild = this.validateEmail(email)
        this.setState({
            email: event.target.value,
            validEmail: emailVaild
        })
        if (emailVaild === false) {
            this.setState({
                emailError: "flex"
            })
        } else {
            this.setState({
                emailError: "none"
            })
        }
    }
    validatePan(pancard) {
        // ^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$
        const re = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/g
        return re.test(pancard)
    }
    validPan = (event) =>{
        // (event) => this.setState({ pancard: event.target.value })

        const pancard = event.target.value

        if (pancard.length === 0) {
            this.setState({ pancard: '' })
        } else {
            const panVaild = this.validatePan(pancard)
            this.setState({
                pancard: event.target.value,
                validPan: panVaild
            })
            if (panVaild === false) {
                this.setState({
                    panError: "flex"
                })
            } else {
                this.setState({
                    panError: "none"
                })
            }
        }
    }
    validateNum(mobilenum) {
        const re = /^\d{10}$/g
        return re.test(mobilenum)
    }
    validNum = (event) => {
        // event.target.value = event.target.value.replace(/^[0-9\b]+$/)
        const mobilenum = event.target.value

        if (mobilenum.length === 0) {
            this.setState({ mobilenum: '' })
        } else {
            const numVaild = this.validateNum(mobilenum)
            if (!Number(mobilenum)) {
                return;
            }
            this.setState({
                mobilenum: event.target.value,
                validNum: numVaild
            })
            if (numVaild === false) {
                this.setState({
                    numError: "flex"
                })
            } else {
                this.setState({
                    numError: "none"
                })
            }
        }
    }
    getAdharNumSize = adharcard => {
        const temp = adharcard.split(' ')
        const tempTotal = temp.reduce((total, str) => total + str.length, 0)
        return tempTotal;
    }
    
    validAdhar = (event) => {
        let adharcard = event.target.value
        adharcard = adharcard.split(' ').join('');  // Remove dash (-) if mistakenly entered.
        adharcard = adharcard.substring(0, 12)

        adharcard.charAt(adharcard.length - 1)

        if (adharcard.length === 0)

            this.setState({ adharcard: '' })
        else if ((adharcard[adharcard.length - 1])) {
        console.log("5:-",adharcard)
        if (!Number(adharcard)) {
            return;
        }
            let finalValue = []
            let aadharFormatValue = ''
            for (let index = 0; index < (adharcard.length / 4); index++) {
                // finalValue[index] = adharcard.substring(index,index+3);
                if (index < 3) {
                    let subStr = adharcard.substring(index * 4)
                    let subStrLen = subStr.length
                    if (subStrLen > 4)
                        subStr = subStr.substring(0, 4)
                    finalValue[index] = subStr
                    aadharFormatValue = finalValue.join(' ')
                }
            }
            console.log('.. .. ', aadharFormatValue)
            let finalVal = aadharFormatValue//adharcard.match(/.{1,4}/g).join(' ');
            let aadharSize = this.getAdharNumSize(finalVal)
            const adharVaild = aadharSize === 12
            if (aadharSize <= 12) {
                this.setState({ adharcard: finalVal })
            }
            this.setState({
                validAdhar: adharVaild
            })
            if (adharVaild === false) {
                this.setState({
                    adharError: "flex"
                })
            } else {
                this.setState({
                    adharError: "none"
                })
            }
        }
    }
    validateHomePin(homeAddressPincode) {
        const re = /^\d{6}$/g
        return re.test(homeAddressPincode)
    }
    validHomePin = (event) => {
        const homeAddressPincode = event.target.value
        if (homeAddressPincode.length === 0) {
            this.setState({ homeAddressPincode: '' })
        } else {
            const homepinVaild = this.validateHomePin(homeAddressPincode)
            if (!Number(homeAddressPincode)) {
                return;
            }
            this.setState({
                homeAddressPincode: event.target.value,
                validHomePin: homepinVaild
            })
            if (homepinVaild === false) {
                this.setState({
                    homepinError: "flex"
                })
            } else {
                this.setState({
                    homepinError: "none"
                })
            }
        }
    }
    validateOfficePin(OfficeAddressPincode) {
        const re = /^\d{6}$/g
        return re.test(OfficeAddressPincode)
    }
    validOfficePin = (event) => {
        const OfficeAddressPincode = event.target.value
        if (OfficeAddressPincode.length === 0) {
            this.setState({ OfficeAddressPincode: '' })
        } else {
            const officepinVaild = this.validateOfficePin(OfficeAddressPincode)
            if (!Number(OfficeAddressPincode)) {
                return;
            }
            this.setState({
                OfficeAddressPincode: event.target.value,
                validOfficePin: officepinVaild
            })
            if (officepinVaild === false) {
                this.setState({
                    officepinError: "flex"
                })
            } else {
                this.setState({
                    officepinError: "none"
                })
            }
        }
    }
    validateRefNum1(refcontactnum1) {
        const re = /^\d{10}$/g
        return re.test(refcontactnum1)
    }
    validRefNum1 = (event) => {
        const refcontactnum1 = event.target.value
        if (refcontactnum1.length === 0) {
            this.setState({ refcontactnum1: '' })
        } else {
            const refnum1Vaild = this.validateRefNum1(refcontactnum1)
            if (!Number(refcontactnum1)) {
                return;
            }
            this.setState({
                refcontactnum1: event.target.value,
                validRefNum1: refnum1Vaild
            })
            if (refnum1Vaild === false) {
                this.setState({
                    refnum1Error: "flex"
                })
            } else {
                this.setState({
                    refnum1Error: "none"
                })
            }
        }
    }
    validateRefNum2(refcontactnum2) {
        const re = /^\d{10}$/g
        return re.test(refcontactnum2)
    }
    validRefNum2 = (event) => {
        const refcontactnum2 = event.target.value
        if (refcontactnum2.length === 0) {
            this.setState({ refcontactnum2: '' })
        } else {
            const refnum2Vaild = this.validateRefNum2(refcontactnum2)
            if (!Number(refcontactnum2)) {
                return;
            }
            this.setState({
                refcontactnum2: event.target.value,
                validRefNum2: refnum2Vaild
            })
            if (refnum2Vaild === false) {
                this.setState({
                    refnum2Error: "flex"
                })
            } else {
                this.setState({
                    refnum2Error: "none"
                })
            }
        }
    }


    _handleImageChange(e) {
        e.preventDefault();
        if (e.target.files[0].size > 1000000) {
            toast.error("File Size Should be less than 1 Mb", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } else {

            let reader = new FileReader();
            let file = e.target.files[0];
            let tempName = file.name
            tempName = tempName.split('.');
            let name = tempName[0] + Date.now() + '.' + tempName[1];
            let data;
            let temp = new File([file], name, { type: file.type })

            reader.onloadend = () => {
                this.setState({
                    file: temp,
                    fileprofilename: name,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file)
        }
    }
    _handleImageChangeCheck(e) {
        e.preventDefault();
        if (e.target.files[0].size > 1000000) {
            toast.error("File Size Should be less than 1 Mb", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });         //    this.value = "";
        } else {

            let reader = new FileReader();
            let filecheck = e.target.files[0];
            let tempName = filecheck.name
            tempName = tempName.split('.');
            let name = tempName[0] + Date.now() + '.' + tempName[1];
            let data;
            let temp = new File([filecheck], name, { type: filecheck.type })

            reader.onloadend = () => {
                this.setState({
                    filecheck: temp,
                    filecheckname: name,
                    imagePreviewUrlcheck: reader.result
                });
            }

            reader.readAsDataURL(filecheck)
        }
    }
    _handleImageChangedoc(e) {
        e.preventDefault();
        // var uploadField = document.getElementById("file");

        // uploadField.onchange = function() {
        if (e.target.files[0].size > 1000000) {
            toast.error("File Size Should be less than 1 Mb", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });            //    this.value = "";
        } else {
            let reader = new FileReader();
            let filedoc = e.target.files[0];
            let tempName = filedoc.name
            tempName = tempName.split('.');
            let name = tempName[0] + Date.now() + '.' + tempName[1];
            let data;
            let temp = new File([filedoc], name, { type: filedoc.type })
            reader.onloadend = () => {
                this.setState({
                    filedoc: temp,
                    filename: name,
                    imagePreviewUrldoc: reader.result,
                    upload : true
                });
                // this.state.filedoc.name = name;
            }

            reader.readAsDataURL(filedoc)
        }
        // };


    }
    _handleImageChangedoc2(e) {
        e.preventDefault();
        if (e.target.files[0].size > 1000000) {
            toast.error("File Size Should be less than 1 Mb", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });         //    this.value = "";
        } else {

            let reader = new FileReader();
            let filedoc2 = e.target.files[0];
            let tempName = filedoc2.name
            tempName = tempName.split('.');
            let name = tempName[0] + Date.now() + '.' + tempName[1];
            let data;
            let temp = new File([filedoc2], name, { type: filedoc2.type })

            reader.onloadend = () => {
                this.setState({
                    filedoc2: temp,
                    filename2: name,
                    imagePreviewUrldoc2: reader.result,
                    upload : true
                });
            }

            reader.readAsDataURL(filedoc2)
        }
    }
    _handleImageChangedoc3(e) {
        e.preventDefault();
        if (e.target.files[0].size > 1000000) {
            toast.error("File Size Should be less than 1 Mb", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });         //    this.value = "";
        } else {

            let reader = new FileReader();
            let filedoc3 = e.target.files[0];
            let tempName = filedoc3.name
            tempName = tempName.split('.');
            let name = tempName[0] + Date.now() + '.' + tempName[1];
            let data;
            let temp = new File([filedoc3], name, { type: filedoc3.type })

            reader.onloadend = () => {
                this.setState({
                    filedoc3: temp,
                    filename3: name,
                    imagePreviewUrldoc3: reader.result,
                    upload : true
                });
                // filename3:filedoc3.name+this.state.curTime
            }
            // "createdAt":this.state.curTime,
            // "updatedAt":this.state.curTime
            reader.readAsDataURL(filedoc3)
        }
    }

    updatecustomers() {
        const alldetails = {
            customer: {
                "firstName": this.state.firstname,
                "lastName": this.state.lastname,
                "gender": this.state.gender,
                "maritalStatus": this.state.status,
                "email": this.state.email,
                "dob": this.state.SelectedDate,
                "fatherName": this.state.fathersname,
                "motherName": this.state.mothersname,
                "annualIncome": this.state.anualincome,
                "incomeSource": this.state.majorsource,
                "dependentName": this.state.dependentname,
                "phone": this.state.mobilenum,
                "aadhar": this.state.adharcard,
                "pan": this.state.pancard,
                "customerId": this.props.location.params,
                // "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")

            },
            bankDetails: {
                "bankName": this.state.bankname,
                "ifsc": this.state.bankifsc,
                "accountType": this.state.bankaccounttype,
                "accountNumber": this.state.bankaccountnum,
                "customerId": this.props.location.params,
                "bankDetailsId": this.state.bankDetailsId,
                // "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")


            },
            reference: {
                "referenceNumber1": this.state.refcontactnum1,
                "referenceNumber2": this.state.refcontactnum2,
                "referenceName1": this.state.refname1,
                "referenceName2": this.state.refname2,
                "customerId": this.props.location.params,
                "referenceDetailsId": this.state.referenceDetailsId,
                // "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")


            },
            address: [{
                "AddressLine": this.state.homeAddressLine,
                "AddressStreet": this.state.homeAddressStreet,
                "AddressLandmark": this.state.homeAddressLandmark,
                "AddressCity": this.state.homeAddressCity,
                "AddressPincode": this.state.homeAddressPincode,
                "AddressState": this.state.homeAddressState,
                "AddressType": "Home",
                "customerId": this.props.location.params,
                "addressId": this.state.addressIdhome,
                // "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")

            },
            {
                "AddressLine": this.state.OfficeAddressLine,
                "AddressStreet": this.state.OfficeAddressStreet,
                "AddressCity": this.state.OfficeAddressCity,
                "AddressLandmark": this.state.OfficeAddressLandmark,
                "AddressPincode": this.state.OfficeAddressPincode,
                "AddressState": this.state.OfficeAddressState,
                "AddressType": "Office",
                "customerId": this.props.location.params,
                "addressId": this.state.addressIdoffice,
                // "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")


            }
            ],
            collections: {
                "collectionTime": this.state.collectiontime,
                "collectonPlace": this.state.selectedaddress,
                "customerId": this.props.location.params,
                "collectionDetailsId": this.state.collectionDetailsId,
                // "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")


            }
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }

        let formData = new FormData();
        formData.append('alldetails', JSON.stringify(alldetails));
        formData.append(this.state.selectdocument, this.state.filedoc);
        formData.append(this.state.selectdocument2, this.state.filedoc2);
        formData.append(this.state.selectdocument3, this.state.filedoc3);
        formData.append("profilepic", this.state.file);
        formData.append("blankcheck", this.state.filecheck);

        axios.put(BaseUrl + '/customer/putCustomer', formData, {
            headers: headers,
        }).then(resp => {
            if (resp.status === 200) {
                toast.success("Customer Details Filled Successfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
                this.props.history.push('/allnewcustomers')
            } else {
                toast.error("Please fill correct data!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        }).catch(err => {
            if (err.request.status !== 200) {
                toast.error("Please fill correct data!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        })
    }


    savegeneralinfo() {
        const alldetails = {
            customer: {
                "firstName": this.state.firstname,
                "lastName": this.state.lastname,
                "gender": this.state.gender,
                "maritalStatus": this.state.status,
                "email": this.state.email,
                "dob": this.state.SelectedDate,
                "fatherName": this.state.fathersname,
                "motherName": this.state.mothersname,
                "annualIncome": this.state.anualincome,
                "incomeSource": this.state.majorsource,
                "dependentName": this.state.dependentname,
                "phone": this.state.mobilenum,
                "aadhar": this.state.adharcard,
                "pan": this.state.pancard,
                "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")
            },
            bankDetails: {
                "bankName": this.state.bankname,
                "ifsc": this.state.bankifsc,
                "accountType": this.state.bankaccounttype,
                "accountNumber": this.state.bankaccountnum,
                "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")

            },
            reference: {
                "referenceNumber1": this.state.refcontactnum1,
                "referenceNumber2": this.state.refcontactnum2,
                "referenceName1": this.state.refname1,
                "referenceName2": this.state.refname2,
                "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")


            },
            address: [{
                "AddressLine": this.state.homeAddressLine,
                "AddressStreet": this.state.homeAddressStreet,
                "AddressLandmark": this.state.homeAddressLandmark,
                "AddressCity": this.state.homeAddressCity,
                "AddressPincode": this.state.homeAddressPincode,
                "AddressState": this.state.homeAddressState,
                "AddressType": "Home",
                "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")


            },
            {
                "AddressLine": this.state.OfficeAddressLine,
                "AddressStreet": this.state.OfficeAddressStreet,
                "AddressCity": this.state.OfficeAddressCity,
                "AddressLandmark": this.state.OfficeAddressLandmark,
                "AddressPincode": this.state.OfficeAddressPincode,
                "AddressState": this.state.OfficeAddressState,
                "AddressType": "Office",
                "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")

            }
            ],
            collections: {
                "collectionTime": this.state.collectiontime,
                "collectonPlace": this.state.selectedaddress,
                "createdByUserId": localStorage.getItem("userid"),
                "updatedByUserId": localStorage.getItem("userid"),
                "companyId": localStorage.getItem("loggedinUserCompany")

            }
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }

        let formData = new FormData();
        formData.append('alldetails', JSON.stringify(alldetails));
        formData.append(this.state.selectdocument, this.state.filedoc);
        formData.append(this.state.selectdocument2, this.state.filedoc2);
        formData.append(this.state.selectdocument3, this.state.filedoc3);
        formData.append("profilepic", this.state.file);
        formData.append("blankcheck", this.state.filecheck);

        axios.post(BaseUrl + '/customer/postCustomerMobile', formData, {
            headers: headers,
        }).then(resp => {
            if (resp.status === 200) {
                toast.success("Customer Details Filled Successfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
                this.props.history.push('/allnewcustomers')
            } else {
                toast.error("Please fill correct data!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        }).catch(err => {
            if (err.request.status !== 200) {
                toast.error("Please fill correct data!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        })
    }

    componentWillMount() {
        this.setState({
            customerId: this.props.location.params
        })
    }

    generalinfoGet() {
        this.setState({
            loginToken: localStorage.getItem('token')
        })

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
        axios.get(BaseUrl + '/customer/getCustomerDetails?customerId=' + this.state.customerId, {
            headers: headers,
        }).then(resp => {
            if (resp.status === 200 || resp.status === 304) {
                // var d = resp.data.dob
                console.log('newdate', typeof (resp.data.dob))
                console.log('gmt', new Date(Date.parse(resp.data.dob)))
                console.log('gmt', resp.data.dob)
                this.setState({
                    firstname: resp.data.firstName,
                    lastname: resp.data.lastName,
                    gender: resp.data.gender,
                    SelectedDate: resp.data.dob ? new Date(Date.parse(resp.data.dob)) : new Date(),
                    mobilenum: resp.data.phone,
                    fathersname: resp.data.fatherName,
                    mothersname: resp.data.motherName,
                    status: resp.data.maritalStatus,
                    email: resp.data.email,
                    anualincome: resp.data.annualIncome,
                    majorsource: resp.data.incomeSource,
                    dependentname: resp.data.dependentName,
                    adharcard: resp.data.aadhar,
                    pancard: resp.data.pan,

                    homeAddressLine: resp.data.addresses[0] ? resp.data.addresses[0].AddressLine : null,
                    homeAddressStreet: resp.data.addresses[0] ? resp.data.addresses[0].AddressStreet : null,
                    homeAddressLandmark: resp.data.addresses[0] ? resp.data.addresses[0].AddressLandmark : null,
                    homeAddressCity: resp.data.addresses[0] ? resp.data.addresses[0].AddressCity : null,
                    homeAddressPincode: resp.data.addresses[0] ? resp.data.addresses[0].AddressPincode : null,
                    homeAddressState: resp.data.addresses[0] ? resp.data.addresses[0].AddressState : null,
                    addressIdhome: resp.data.addresses[0] ? resp.data.addresses[0].addressId : null,

                    OfficeAddressLine: resp.data.addresses[1] ? resp.data.addresses[1].AddressLine : null,
                    OfficeAddressStreet: resp.data.addresses[1] ? resp.data.addresses[1].AddressStreet : null,
                    OfficeAddressCity: resp.data.addresses[1] ? resp.data.addresses[1].AddressCity : null,
                    OfficeAddressLandmark: resp.data.addresses[1] ? resp.data.addresses[1].AddressLandmark : null,
                    OfficeAddressPincode: resp.data.addresses[1] ? resp.data.addresses[1].AddressPincode : null,
                    OfficeAddressState: resp.data.addresses[1] ? resp.data.addresses[1].AddressState : null,
                    addressIdoffice: resp.data.addresses[1] ? resp.data.addresses[1].addressId : null,

                    bankname: resp.data.bankDetail ? resp.data.bankDetail.bankName : null,
                    bankifsc: resp.data.bankDetail ? resp.data.bankDetail.ifsc : null,
                    bankaccounttype: resp.data.bankDetail ? resp.data.bankDetail.accountType : null,
                    bankaccountnum: resp.data.bankDetail ? resp.data.bankDetail.accountNumber : null,
                    bankDetailsId: resp.data.bankDetail ? resp.data.bankDetail.bankDetailsId : null,

                    refcontactnum1: resp.data.referenceDetail ? resp.data.referenceDetail.referenceNumber1 : null,
                    refcontactnum2: resp.data.referenceDetail ? resp.data.referenceDetail.referenceNumber2 : null,
                    refname1: resp.data.referenceDetail ? resp.data.referenceDetail.referenceName1 : null,
                    refname2: resp.data.referenceDetail ? resp.data.referenceDetail.referenceName2 : null,
                    referenceDetailsId: resp.data.referenceDetail ? resp.data.referenceDetail.referenceDetailsId : null,

                    collectiontime: resp.data.collectionDetail ? resp.data.collectionDetail.collectionTime : null,
                    selectedaddress: resp.data.collectionDetail ? resp.data.collectionDetail.collectonPlace : null,
                    collectionDetailsId: resp.data.collectionDetail ? resp.data.collectionDetail.collectionDetailsId : null,

                })
                doctype.map(doc => {
                    if (resp.data.proofs !== "") {
                        resp.data.proofs.map(item => {
                            if (item.proofType === 'profilepic') {
                                this.setState({
                                    imagePreviewUrl: item ? ImageBaseUrl + item.proofImagePath : null,
                                    proofIdpic: item ? item.proofId : null,
                                })
                            } if (item.proofType === 'blankcheck') {
                                this.setState({
                                    imagePreviewUrlcheck: item ? ImageBaseUrl + item.proofImagePath : null,
                                    proofIdcheck: item ? item.proofId : null,
                                })
                            } if (item.proofType === doc.value) {
                                this.setState({
                                    filename: item ? item.proofImagePath : null,
                                    selectdocument: item ? item.proofType : null,
                                    proofId: item ? item.proofId : null,
                                })
                            } if (item.proofType === doc.value) {
                                this.setState({
                                    filename2: item ? item.proofImagePath : null,
                                    selectdocument2: item ? item.proofType : null,
                                    proofId2: item ? item.proofId : null,
                                })
                            } if (item.proofType === doc.value) {
                                this.setState({
                                    filename3: item ? item.proofImagePath : null,
                                    selectdocument3: item ? item.proofType : null,
                                    proofId3: item ? item.proofId : null,
                                })
                            }
                        })
                    }
                })
            } else {
                toast.error("Something went wrong. Please try again later!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        }).catch(err => {
            // if(err.request.status!==200){
            // toast.error("Something went wrong. Please try again later!", {
            //     position: "top-center",
            //     autoClose: 2000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: true,
            //     });
            // }
        })
    }



    handleChangeincome = name => event => {
        this.setState({ name: event.target.value });
    };
    backLinkAction() {
        this.props.history.push('/allnewcustomers')
    }


    onlyAlphabets = (e, t) => {

        try {
            if (window.event) {
                var charCode = window.event.keyCode;
            }
            else if (e) {
                var charCode = e.which;
            }
            else { return true; }
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
                return true;
            else
                return false;
        }
        catch (err) {

        }
    }
    onlyNos = (e, t) => {
        try {
            if (window.event) {
                var charCode = window.event.keyCode;
            }
            else if (e) {
                var charCode = e.which;
            }
            else { return true; }
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        }
        catch (err) {
        }
    }

    numberOnly(id) {
        var element = document.getElementById(id);
        var regex = /[^0-9]/gi;
        element.value = element.value.replace(regex, "");
    }

    render() {
        let UserId = localStorage.getItem("userid")
        const { t } = this.props;

        let filedoc = this.state.filedoc;
        filedoc.fieldname = this.state.selectdocument
        filedoc.customerId = this.props.location.params
        filedoc.createdByUserId = parseInt(UserId)
        filedoc.updatedByUserId = parseInt(UserId)

        let filedoc2 = this.state.filedoc2;
        filedoc2.fieldname = this.state.selectdocument2
        filedoc2.customerId = this.props.location.params
        filedoc2.createdByUserId = parseInt(UserId)
        filedoc2.updatedByUserId = parseInt(UserId)

        let filedoc3 = this.state.filedoc3;
        filedoc3.customerId = this.props.location.params
        filedoc3.fieldname = this.state.selectdocument3
        filedoc3.createdByUserId = parseInt(UserId)
        filedoc3.updatedByUserId = parseInt(UserId)

        let filecheck = this.state.filecheck;
        filecheck.fieldname = "blankcheck"
        filecheck.customerId = this.props.location.params
        filecheck.createdByUserId = parseInt(UserId)
        filecheck.updatedByUserId = parseInt(UserId)


        let file = this.state.file;
        file.fieldname = "profilepic"
        file.customerId = this.props.location.params
        file.createdByUserId = parseInt(UserId)
        file.updatedByUserId = parseInt(UserId)

        console.log("filedoc", this.state.filedoc)
        toast.configure({
        });

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="customerprofiile" />);
        } else {
            $imagePreview = (<div className="previewText">
                <img src={customercamera} alt="userdefault" className="iconButton" />
                <div className="Fonts placetext">Drag and Drop or Browse the Photo to Upload. </div>
            </div>);
        }
        let { imagePreviewUrlcheck } = this.state;
        let $imagePreviewcheck = null;
        if (imagePreviewUrlcheck) {
            $imagePreviewcheck = (<img src={imagePreviewUrlcheck} alt="check" className="check" />);
        } else {
            $imagePreviewcheck = (<div className="previewText">
                <img src={customercamera} alt="userdefaultcheck" className="iconButtoncheck" />
                <div className="Fonts placetext">Drag and Drop or Browse the Photo to Upload. </div>
            </div>);
        }
        let { imagePreviewUrldoc } = this.state;
        let $imagePreviewdoc = null;
        if (imagePreviewUrldoc) {
            $imagePreviewdoc = (<img src={imagePreviewUrldoc} alt="doc" className="doc" />);
        } else {
            $imagePreviewdoc = (<div className="previewTextdoc">
                {/* <img src={customercamera} alt="userdefaultcheck" className="iconButtoncheck" /> */}
                <div className="Fonts placetextdoc">Please upload image. </div>
            </div>);
        }
        let { imagePreviewUrldoc2 } = this.state;
        let $imagePreviewdoc2 = null;
        if (imagePreviewUrldoc2) {
            $imagePreviewdoc2 = (<img src={imagePreviewUrldoc2} alt="doc" className="doc" />);
        } else {
            $imagePreviewdoc2 = (<div className="previewTextdoc">
                {/* <img src={customercamera} alt="userdefaultcheck" className="iconButtoncheck" /> */}
                <div className="Fonts placetextdoc">Please upload image. </div>
            </div>);
        }
        let { imagePreviewUrldoc3 } = this.state;
        let $imagePreviewdoc3 = null;
        if (imagePreviewUrldoc3) {
            $imagePreviewdoc3 = (<img src={imagePreviewUrldoc3} alt="doc" className="doc" />);
        } else {
            $imagePreviewdoc3 = (<div className="previewTextdoc">
                {/* <img src={customercamera} alt="userdefaultcheck" className="iconButtoncheck" /> */}
                <div className="Fonts placetextdoc">Please upload image. </div>
            </div>);
        }
        const { firstname, lastname, mobilenum, homeAddressLine, homeAddressStreet, homeAddressLandmark, homeAddressCity,
            homeAddressPincode, homeAddressState, OfficeAddressLine, OfficeAddressStreet, OfficeAddressCity,
            OfficeAddressLandmark, OfficeAddressPincode, OfficeAddressState, validemail, validnum, validadhar, validhomepin, validofficepin, validrefnum1, validrefnum2, submitted } = this.state;
        return (
            <div>
                <Sidebar />
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                    <div>
                        <h3 className="Fonts headFontSize" style={{ marginLeft: '45px' }}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{t('AddCustomer.title')}</span> / {t('AddCustomer.subtitle')}</h3>
                    </div>
                </div>

                <div className="addcustomercomponent">
                    <div className="topName Fonts">{t('AddCustomer.fCard')}</div>
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.fname')}<span className="req">*</span></h6>
                                            <div className={'form-group' + (submitted && !firstname ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <Input className="textBox" type="text" required className="form-control" name="firstname" value={this.state.firstname || ''} style={{ height: '41px', border: this.state.firstnamee }} onClick={this.firstnameBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ firstname: event.target.value }) }} />
                                                {submitted && !firstname &&
                                                    <div className="help-block" style={{ marginRight: "14rem" }}>First name is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddCustomer.lname')}<span className="req">*</span></h6>
                                            <div className={'form-group' + (submitted && !lastname ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <Input type="text" required className="form-control" name="lastname" value={this.state.lastname || ''} className="textBox" style={{ height: '41px', border: this.state.secondname, marginLeft: '70px' }} onClick={this.secondnameBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ lastname: event.target.value }) }} />
                                                {submitted && !lastname &&
                                                    <div className="help-block" style={{ marginLeft: "4.5rem" }}>Last name is required</div>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.gen')}</h6>
                                            <div style={{ display: 'flex' }}>
                                                <div className="radio-item">
                                                    <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.handleRadioChange} />
                                                    <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.genM')}</div>
                                                </div>
                                                <div className="radio-item RadioDiv">
                                                    <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.handleRadioChange} />
                                                    <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.genF')}</div>
                                                </div>
                                                <div className="radio-item RadioDiv">
                                                    <input type="radio" value="transgender" checked={this.state.gender === "transgender"} onChange={this.handleRadioChange} />
                                                    <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.genT')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.Dob')}</h6>
                                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ height: "41px" }}> */}
                                            {/* <KeyboardDatePicker disableToolbar variant="inline" format="DD/MM/YYYY" margin="normal" id="date-picker-inline" value={this.state.SelectedDate} onChange={this.handleDateChange.bind(this)} KeyboardButtonProps={{ 'aria-label': 'change date', }} /> */}
                                            <DatePicker
                                                onChange={this.handleDateChange}
                                                value={this.state.SelectedDate ? this.state.SelectedDate : new Date()}
                                                dateFormat="MMMM dd, yyyy"
                                            />
                                            {/* </MuiPickersUtilsProvider> */}

                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} >{t('AddCustomer.phone')}<span className="req">*</span></h6>
                                            <div className={'form-group' + (submitted && !mobilenum ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <input type="text" minlength="0" maxlength="10" className="textBox" required className="form-control" name="mobilenum" value={this.state.mobilenum || ''} style={{ height: '41px', border: this.state.mobnumber, marginLeft: '70px', width: "82%", borderRadius: "5px", paddingLeft: "10px" }} onClick={this.mobnumberBox} onChange={this.validNum} />
                                                <span style={{ display: this.state.numError, paddingLeft: "4.5rem" }} className="help-block">Mobile number must be 10 digit.</span>
                                                {submitted && !mobilenum &&
                                                    <div className="help-block" style={{ marginLeft: "4.5rem" }}>Mobile number is required</div>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont">{t('AddCustomer.momname')}</h6>
                                            <Input className="textBox" value={this.state.motherssname || ''} style={{ height: '41px', border: this.state.mothername }} onClick={this.mothernameBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ motherssname: event.target.value }) }} />
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} >{t('AddCustomer.dadname')}</h6>
                                            <Input className="textBox" value={this.state.fathersname || ''} style={{ height: '41px', border: this.state.fathername, marginLeft: '70px' }} onClick={this.fathernameBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ fathersname: event.target.value }) }} />
                                        </div>
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont">{t('AddCustomer.status')}</h6>
                                        <div style={{ display: 'flex' }}>
                                            <div className="radio-item">
                                                <input type="radio" value="single" checked={this.state.status === "single"} onChange={this.handleStatusChange} />
                                                <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.stS')}</div>
                                            </div>
                                            <div className="radio-item RadioDiv">
                                                <input type="radio" value="married" checked={this.state.status === "married"} onChange={this.handleStatusChange} />
                                                <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.stMr')}</div>
                                            </div>
                                            <div className="radio-item RadioDiv">
                                                <input type="radio" value="divorced" checked={this.state.status === "divorced"} onChange={this.handleStatusChange} />
                                                <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts" >{t('AddCustomer.stDiv')}</div>
                                            </div>
                                            <div className="radio-item RadioDiv">
                                                <input type="radio" value="widow" checked={this.state.status === "widow"} onChange={this.handleStatusChange} />
                                                <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts" >{t('AddCustomer.stWid')}</div>
                                            </div>
                                            <div className="radio-item RadioDiv">
                                                <input type="radio" value="widower" checked={this.state.status === "widower"} onChange={this.handleStatusChange} />
                                                <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.stWider')}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.email')}</h6>
                                            <Input className="textBox" value={this.state.email || ''} style={{ height: '41px', border: this.state.emaill }} onClick={this.emailBox} onChange={this.validEmail} />
                                            <span style={{ display: this.state.emailError }} className="help-block">Invalid Email id.</span>
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} >{t('AddCustomer.depname')}</h6>
                                            <Input className="textBox" type="number" value={this.state.dependentname || ''} style={{ height: '41px', border: this.state.dependname, marginLeft: '70px' }} onClick={this.dependnameBox} onChange={(event) => { this.setState({ dependentname: event.target.value }) }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.annincome')}</h6>
                                            {/* <Input className="textBox"  value={this.state.anualincome || ''} style={{ height: '41px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={(event) => this.setState({ anualincome: event.target.value })} /> */}
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                className="incomefield"
                                                value={this.state.anualincome}
                                                style={{ border: this.state.annual }}
                                                onClick={this.annualBox}
                                                onChange={(event) => this.setState({ anualincome: event.target.value })}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: "",
                                                    },
                                                }}
                                            >
                                                {annualincome.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} >{t('AddCustomer.majscr')}</h6>
                                            <Input className="textBox" value={this.state.majorsource || ''} style={{ height: '41px', border: this.state.major, marginLeft: '70px' }} onClick={this.majorBox} onChange={(event) => this.setState({ majorsource: event.target.value })} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.addar')}</h6>
                                            <Input className="textBox"  value={this.state.adharcard || ''} style={{ height: '41px', border: this.state.adhar }} onClick={this.adharBox} onChange={this.validAdhar} />
                                            <span style={{ display: this.state.adharError }} className="help-block">Invalid aadhar number.</span>
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} >{t('AddCustomer.pan')}</h6>
                                            <input type="text" minlength="0" maxlength="10" className="textBox" value={this.state.pancard || ''} style={{ height: '36px', border: this.state.pan, width:'84%', borderRadius: "5px", marginLeft: '70px', paddingLeft: "10px" }} onClick={this.panBox} onChange={this.validPan} required />
                                            <span style={{ display: this.state.panError, paddingLeft: "4.5rem" }} className="help-block">Invalid pan number.</span>
                                        </div>                                       
                                    </div>

                                </div>
                            </form>
                        </div>
                    </Card>
                    {/* accept="image/png, image/jpeg"
                    accept="image/png, image/jpeg" */}

                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px', display: "flex" }}>
                                    <div style={{ position: "relative" }}>
                                        <label className="Fonts">{t('AddCustomer.pic')}</label>
                                        <div className="imgPreview">
                                            {$imagePreview}
                                            <input className="fileInput"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={(e) => this._handleImageChange(e)} />
                                        </div>
                                    </div>
                                    <div style={{ position: "relative", marginLeft: "auto" }}>
                                        <label className="Fonts">{t('AddCustomer.blank')}</label>
                                        <div className="imgPreviewcheck">
                                            {$imagePreviewcheck}
                                            <input className="fileInputcheck"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={(e) => this._handleImageChangeCheck(e)} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>

                    <div className="topName Fonts">{t('AddCustomer.sCard')}<span className="req">*</span>  </div>
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px', width: '100%' }}>
                                    <div className="textFieldStyle" style={{ width: '100%' }}>
                                        <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.address')}</h6>
                                        <div className={'form-group' + (submitted && !homeAddressLine ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                            <Input className="textBox" required className="form-control" name="homeAddressLine" placeholder="Flat / House No. / Floor / Building / Colony" value={this.state.homeAddressLine} style={{ height: '41px', border: this.state.flat }} onClick={this.flatBox} onChange={(event) => this.setState({ homeAddressLine: event.target.value })} />
                                            {submitted && !homeAddressLine &&
                                                <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                            }
                                        </div>
                                    </div>

                                    <div className="textFieldStyle" style={{ width: '100%' }}>
                                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                                        <div className={'form-group' + (submitted && !homeAddressStreet ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                            <Input className="textBox" required className="form-control" name="homeAddressStreet" placeholder="Street / Locality" value={this.state.homeAddressStreet} style={{ height: '41px', border: this.state.street }} onClick={this.streetBox} onChange={(event) => this.setState({ homeAddressStreet: event.target.value })} />
                                            {submitted && !homeAddressStreet &&
                                                <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '46%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" ></h6>
                                            <div className={'form-group' + (submitted && !homeAddressLandmark ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <Input required className="form-control" name="homeAddressLandmark" value={this.state.homeAddressLandmark} placeholder="Landmark" className="textBox" style={{ height: '41px', border: this.state.landmark }} onClick={this.landmarkBox} onChange={(event) => this.setState({ homeAddressLandmark: event.target.value })} />
                                                {submitted && !homeAddressLandmark &&
                                                    <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '46%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" ></h6>
                                            <div className={'form-group' + (submitted && !homeAddressCity ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <Input required className="form-control" name="homeAddressCity" value={this.state.homeAddressCity} className="textBox" placeholder="City" style={{ height: '41px', border: this.state.city }} onClick={this.cityBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ homeAddressCity: event.target.value }) }} />
                                                {submitted && !homeAddressCity &&
                                                    <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '46%' }}>
                                            <h6 className="InputLabel Fonts SizeFont"></h6>
                                            <div className={'form-group' + (submitted && !homeAddressPincode ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <input required className="form-control" name="homeAddressPincode" value={this.state.homeAddressPincode} type="text" maxlength="6" placeholder="Pincode" className="number" style={{ height: '41px', border: this.state.pin, width: "82%", borderRadius: "5px", paddingLeft: "10px" }} onClick={this.pinBox} onChange={this.validHomePin} />
                                                <span style={{ display: this.state.homepinError }} className="help-block">Invalid pincode.</span>
                                                {submitted && !homeAddressPincode &&
                                                    <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '46%' }}>
                                            <h6 className="InputLabel Fonts SizeFont"></h6>
                                            <div className={'form-group' + (submitted && !homeAddressState ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                {/* <Input required className="form-control" name="homeAddressState" value={this.state.homeAddressState} className="textBox" placeholder="State"  style={{ height: '41px', border: this.state.state }} onClick={this.stateBox} onChange={(event) => this.setState({ homeAddressState: event.target.value })} /> */}
                                                <Select
                                                    id="standard-select-currency"
                                                    select
                                                    required className="form-control" 
                                                    name="homeAddressState"
                                                    className="incomefield textBox"
                                                    displayEmpty
                                                    value={this.state.homeAddressState}
                                                    style={{ border: this.state.state }}
                                                    onClick={this.stateBox}
                                                    onChange={(event) => this.setState({ homeAddressState: event.target.value })}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            className: "",
                                                        },
                                                    }}
                                                >
                                                        <MenuItem  value="" disabled>
                                                            State
                                                        </MenuItem>
                                                    {state.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {submitted && !homeAddressState &&
                                                    <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <form>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px', width: '100%' }}>
                                    <div className="textFieldStyle" style={{ width: '100%' }}>
                                        <div style={{ display: "flex" }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ width: "fit-content" }} >{t('AddCustomer.offaddrss')}</h6>
                                            <div className="radio-item RadioDiv" style={{ height: "fit-content", marginTop: "15px" }}>
                                                {/* <input type="radio" value="samehomeaddress" checked={this.state.samehomeaddress === "samehomeaddress"} onChange={this.handleRadioChangeaddress} /> */}
                                                <div class="round">
                                                    <input type="checkbox" id="checkbox" checked={this.state.samehomeaddressChecked} onChange={this.handleRadioChangeaddress} />
                                                    <label for="checkbox"></label>
                                                </div>
                                                <div style={{ marginLeft: "5px", marginTop: '5px', width: "fit-content" }} className="Fonts InputLabel SizeFont">{t('AddCustomer.check')}</div>
                                            </div>
                                        </div>
                                        <div className={'form-group' + (submitted && !OfficeAddressLine ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                            <Input required className="form-control" name="OfficeAddressLine" value={this.state.OfficeAddressLine} placeholder="Flat / House No. / Floor / Building / Colony" className="textBox" style={{ height: '41px', border: this.state.flatoffice }} onClick={this.flatofficeBox} onChange={(event) => this.setState({ OfficeAddressLine: event.target.value })} />
                                            {submitted && !OfficeAddressLine &&
                                                <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                            }
                                        </div>
                                    </div>

                                    <div className="textFieldStyle" style={{ width: '100%' }}>
                                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                                        <div className={'form-group' + (submitted && !OfficeAddressStreet ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                            <Input required className="form-control" name="OfficeAddressStreet" value={this.state.OfficeAddressStreet} placeholder="Street / Locality" className="textBox" style={{ height: '41px', border: this.state.streetoffice }} onClick={this.streetofficeBox} onChange={(event) => this.setState({ OfficeAddressStreet: event.target.value })} />
                                            {submitted && !OfficeAddressStreet &&
                                                <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                            }
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="textFieldStyle" style={{ width: '46%' }}>
                                                <h6 className="InputLabel Fonts SizeFont" ></h6>
                                                <div className={'form-group' + (submitted && !OfficeAddressLandmark ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input required className="form-control" name="OfficeAddressLandmark" value={this.state.OfficeAddressLandmark} placeholder="Landmark" className="textBox" style={{ height: '41px', border: this.state.cityoffice }} onClick={this.cityofficeBox} onChange={(event) => this.setState({ OfficeAddressLandmark: event.target.value })} />
                                                    {submitted && !OfficeAddressLandmark &&
                                                        <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="textFieldStyle" style={{ width: '46%' }}>
                                                <h6 className="InputLabel Fonts SizeFont" ></h6>
                                                <div className={'form-group' + (submitted && !OfficeAddressCity ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input required className="form-control" name="OfficeAddressCity" value={this.state.OfficeAddressCity} placeholder="City" className="textBox" style={{ height: '41px', border: this.state.landmarkoffice }} onClick={this.landmarkofficeBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ OfficeAddressCity: event.target.value }) }} />
                                                    {submitted && !OfficeAddressCity &&
                                                        <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div className="textFieldStyle" style={{ width: '46%' }}>
                                                <h6 className="InputLabel Fonts SizeFont" ></h6>
                                                <div className={'form-group' + (submitted && !OfficeAddressPincode ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <input required type="text" maxlength="6" className="form-control" name="OfficeAddressPincode" value={this.state.OfficeAddressPincode} placeholder="Pincode" className="number" style={{ height: '41px', border: this.state.pinoffice, width: "82%", borderRadius: "5px", paddingLeft: "10px" }} onClick={this.pinofficeBox} onChange={this.validOfficePin} />
                                                    <span style={{ display: this.state.officepinError }} className="help-block">Invalid pincode.</span>
                                                    {submitted && !OfficeAddressPincode &&
                                                        <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="textFieldStyle" style={{ width: '46%' }}>
                                                <h6 className="InputLabel Fonts SizeFont" ></h6>
                                                <div className={'form-group' + (submitted && !OfficeAddressState ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    {/* <Input required className="form-control" name="OfficeAddressState"  value={this.state.OfficeAddressState} placeholder="State" className="textBox"  style={{ height: '41px', border: this.state.stateoffice }} onClick={this.stateofficeBox} onChange={(event) => this.setState({ OfficeAddressState: event.target.value })} /> */}
                                                    <Select
                                                        id="standard-select-currency"
                                                        select
                                                        required className="form-control" name="OfficeAddressState"
                                                        className="incomefield textBox"
                                                        displayEmpty
                                                        value={this.state.OfficeAddressState}
                                                        style={{ border: this.state.stateoffice }}
                                                        onClick={this.stateofficeBox}
                                                        onChange={(event) => this.setState({ OfficeAddressState: event.target.value })}
                                                        SelectProps={{
                                                            MenuProps: {
                                                                className: "",
                                                            },
                                                        }}
                                                    >
                                                    <MenuItem  value="" disabled>
                                                            State
                                                        </MenuItem>
                                                        {state.map(option => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {submitted && !OfficeAddressState &&
                                                        <div className="help-block" style={{ marginRight: "14rem" }}>Address is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>

                    <div className="topName Fonts">{t('AddCustomer.ThCard')} </div>
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" > {t('AddCustomer.place')}<span className="req">*</span></h6>
                                            <div style={{ display: 'flex' }}>
                                                <div className="radio-item">
                                                    <input type="radio" value="Home" checked={this.state.selectedaddress === "Home"} onChange={this.handleRadioChangeselectedaddress} />
                                                    <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts"> {t('AddCustomer.address')}</div>
                                                </div>
                                                <div className="radio-item RadioDiv">
                                                    <input type="radio" value="Office" checked={this.state.selectedaddress === "Office"} onChange={this.handleRadioChangeselectedaddress} />
                                                    <div style={{ marginLeft: "5px", marginTop: '5px', color: '#3E4664' }} className="Fonts">{t('AddCustomer.offaddrss')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="textFieldStyle" style={{ width: '50%' }}>
                                        <h6 className="InputLabel Fonts SizeFont" > {t('AddCustomer.time')}</h6>
                                        {/* <Input className="textBox"  value={this.state.anualincome || ''} style={{ height: '41px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={(event) => this.setState({ anualincome: event.target.value })} /> */}
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            className="incomefield"
                                            onClick={this.preferBox}
                                            style={{ border: this.state.prefer }}
                                            value={this.state.collectiontime}
                                            onChange={(event) => this.setState({ collectiontime: event.target.value })}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: "",
                                                },
                                            }}
                                        >
                                            {preferredtime.map(option => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>

                    <div className="topName Fonts"> {t('AddCustomer.FCard')}</div>
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.bname')}</h6>
                                            <Input className="textBox" value={this.state.bankname} style={{ height: '41px', border: this.state.banknamee }} onClick={this.banknameeBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ bankname: event.target.value }) }} />
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}> {t('AddCustomer.ifsc')}</h6>
                                            <Input type="text" value={this.state.bankifsc} className="textBox" style={{ height: '41px', border: this.state.ifsc, marginLeft: '70px' }} onClick={this.ifscBox} onChange={(event) => this.setState({ bankifsc: event.target.value })} />
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddCustomer.accnum')}</h6>
                                            <Input type="number" className="textBox" value={this.state.bankaccountnum} style={{ height: '41px', border: this.state.accnumber }} onClick={this.accnumberBox} onChange={(event) => this.setState({ bankaccountnum: event.target.value })} />
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} >{t('AddCustomer.acctype')}</h6>
                                            {/* <Input className="textBox" value={this.state.bankaccounttype} style={{ height: '41px', border: this.state.acctype, marginLeft: '70px' }} onClick={this.acctypeBox} onChange={(event) => this.setState({ bankaccounttype: event.target.value })} /> */}
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                className="incomefield"
                                                onClick={this.acctypeBox}
                                                style={{ border: this.state.acctype, marginLeft: '70px' }}
                                                value={this.state.bankaccounttype}
                                                onChange={(event) => this.setState({ bankaccounttype: event.target.value })}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: "",
                                                    },
                                                }}
                                            >
                                                {accType.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>
                    <div className="topName Fonts">Reference Details {t('AddCustomer.fifthCrad')}  </div>
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" > {t('AddCustomer.refname')}</h6>
                                            <Input value={this.state.refname1} className="textBox" style={{ height: '41px', border: this.state.refername1 }} onClick={this.refername1Box} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ refname1: event.target.value }) }} />
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}> {t('AddCustomer.refphone')}</h6>
                                            <input value={this.state.refcontactnum1} type="text" maxlength="10" className="textBox" style={{ height: '41px', border: this.state.refernum1, marginLeft: '70px', width: "82%", borderRadius: "5px", paddingLeft: "10px" }} onClick={this.refernum1Box} onChange={this.validRefNum1} />
                                            <span style={{ display: this.state.refnum1Error, marginLeft: "4.5rem" }} className="help-block">Contact number must be 10 digit.</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" > {t('AddCustomer.reffname')}</h6>
                                            <Input value={this.state.refname2} className="textBox" style={{ height: '41px', border: this.state.refername2 }} onClick={this.refername2Box} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ refname2: event.target.value }) }} />
                                        </div>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }} > {t('AddCustomer.reffphone')}</h6>
                                            <input type="text" maxlength="10" value={this.state.refcontactnum2} className="textBox" style={{ height: '41px', border: this.state.refernum2, marginLeft: '70px', width: "82%", borderRadius: "5px", paddingLeft: "10px" }} onClick={this.refernum2Box} onChange={this.validRefNum2}
                                                onKeyPress={this.onlyNos} />
                                            <span style={{ display: this.state.refnum2Error, marginLeft: "4.5rem" }} className="help-block">Contact number must be 10 digit.</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>
                    <div className="topName Fonts">{t('AddCustomer.sixCard')}</div>
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            {/* <h6 className="InputLabel Fonts SizeFont" >Reference Name1</h6> */}
                                            {/* <Input value={this.state.refname1} className="textBox" style={{ height: '41px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ refname1: event.target.value })} /> */}
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                className="incomefield"
                                                onClick={this.proffadharBox}
                                                style={{ border: this.state.proffadhar }}
                                                value={this.state.selectdocument}
                                                onChange={(event) => this.setState({ selectdocument: event.target.value })}
                                                SelectProps={{
                                                    MenuProps: {
                                                        className: "",
                                                    },
                                                }}
                                            >
                                                {doctype.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div className="numaricTextField " style={{ width: '50%' }}>
                                            <div className="docuploadAddCust">
                                                {/* <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>Reference Contact Number1</h6>
                                            <Input value={this.state.refcontactnum1} type="text" className="textBox" style={{ height: '41px', border: this.state.changeColornumber, marginLeft: '70px' }} onClick={this.numberBox} onChange={(event) => this.setState({ refcontactnum1: event.target.value })} /> */}
                                                <div className="imgPreviewdoc">
                                                    {/* {$imagePreviewdoc} */}
                                                    <img src={Cloud} alt="cloud" className="cloud" style={this.state.upload === false?{display:""}:{display:"none"}} />
                                                    <input placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Upload" value={this.state.filename || ""} style={{ border: "none", marginTop: "13px", paddingLeft: "8px", width: "90%" }} onChange={(e) => this._handleImageChangedoc(e)} />
                                                    <input className="fileInputdoc"
                                                        type="file"
                                                        onChange={(e) => this._handleImageChangedoc(e)} />
                                                    <img src={Eyeline} alt="eyeline" className="eyeline" onClick={this.eyeline1.bind(this)} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: this.state.extrafield1 }}>
                                        <div style={{ display: 'flex', marginTop: "18px" }}>
                                            <div className="textFieldStyle" style={{ width: '50%' }}>
                                                {/* <h6 className="InputLabel Fonts SizeFont" >Reference Name1</h6> */}
                                                {/* <Input value={this.state.refname1} className="textBox" style={{ height: '41px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ refname1: event.target.value })} /> */}
                                                <TextField
                                                    id="standard-select-currency"
                                                    select
                                                    className="incomefield"
                                                    onClick={this.proffpanBox}
                                                    style={{ border: this.state.proffpan }}
                                                    value={this.state.selectdocument2}
                                                    onChange={(event) => this.setState({ selectdocument2: event.target.value })}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            className: "",
                                                        },
                                                    }}
                                                >
                                                    {doctype.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                            <div className="numaricTextField " style={{ width: '50%' }}>
                                                <div className="docuploadAddCust">
                                                    {/* <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>Reference Contact Number1</h6>
                                            <Input value={this.state.refcontactnum1} type="text" className="textBox" style={{ height: '41px', border: this.state.changeColornumber, marginLeft: '70px' }} onClick={this.numberBox} onChange={(event) => this.setState({ refcontactnum1: event.target.value })} /> */}
                                                    <div className="imgPreviewdoc">
                                                        {/* {$imagePreviewdoc} */}
                                                        <input placeholder="Upload" value={this.state.filename2 || ""} style={{ border: "none", marginTop: "13px", paddingLeft: "8px", width: "90%" }} onChange={(e) => this._handleImageChangedoc2(e)} />
                                                        <input className="fileInputdoc"
                                                            type="file"
                                                            onChange={(e) => this._handleImageChangedoc2(e)} />
                                                        <img src={Eyeline} alt="eyeline" className="eyeline" onClick={this.eyeline2.bind(this)} />

                                                    </div>
                                                    <img src={remove} alt="remove" className="remove" style={{ marginRight: "-19%" }} onClick={this.removedoc2.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: this.state.extrafield2 }}>
                                        <div style={{ display: 'flex', marginTop: "18px" }}>
                                            <div className="textFieldStyle" style={{ width: '50%' }}>
                                                {/* <h6 className="InputLabel Fonts SizeFont" >Reference Name1</h6> */}
                                                {/* <Input value={this.state.refname1} className="textBox" style={{ height: '41px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ refname1: event.target.value })} /> */}
                                                <TextField
                                                    id="standard-select-currency"
                                                    select
                                                    className="incomefield"
                                                    onClick={this.proffvoterBox}
                                                    style={{ border: this.state.proffvoter }}
                                                    value={this.state.selectdocument3}
                                                    onChange={(event) => this.setState({ selectdocument3: event.target.value })}
                                                    SelectProps={{
                                                        MenuProps: {
                                                            className: "",
                                                        },
                                                    }}
                                                >
                                                    {doctype.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                            <div className="numaricTextField " style={{ width: '50%' }}>
                                                <div className="docuploadAddCust">
                                                    {/* <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>Reference Contact Number1</h6>
                                            <Input value={this.state.refcontactnum1} type="text" className="textBox" style={{ height: '41px', border: this.state.changeColornumber, marginLeft: '70px' }} onClick={this.numberBox} onChange={(event) => this.setState({ refcontactnum1: event.target.value })} /> */}
                                                    <div className="imgPreviewdoc">
                                                        {/* {$imagePreviewdoc} */}
                                                        <input placeholder="Upload" value={this.state.filename3 || ""} style={{ border: "none", marginTop: "13px", paddingLeft: "8px", width: "90%" }} onChange={(e) => this._handleImageChangedoc3(e)} />
                                                        <input className="fileInputdoc"
                                                            type="file"
                                                            onChange={(e) => this._handleImageChangedoc3(e)} />
                                                        <img src={Eyeline} alt="eyeline" className="eyeline" onClick={this.eyeline3.bind(this)} />

                                                    </div>
                                                    <img src={remove} alt="remove" className="remove" style={{ marginRight: "-19%" }} onClick={this.removedoc3.bind(this)} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <img src={newfield} alt="newfield" className="newfield" onClick={this.addfield.bind(this)} />

                                </div>
                            </form>
                        </div>
                    </Card>
                    <div style={{ textAlign: "end" }}>
                        <Button className="cancelbutton btnSizeFont Fonts" onClick={() => this.props.history.push("/allnewcustomers")}>
                            Cancel
                        </Button>
                        <Button style={{ display: this.state.addcustmr }} className="savebutton btnSizeFont Fonts" onClick={this.handleSubmit}>
                            Save
                        </Button>
                        <Button style={{ display: this.state.updatesave }} className="savebutton btnSizeFont Fonts" onClick={this.updatecustomers.bind(this)} >
                            Update
                        </Button>
                    </div>

                </div>
                <ImageModal image={this.state.imagePopUp} open={this.state.openmodal} close={this.closemodal} />
            </div>
        )
    }
}
export default withNamespaces()(AddCustomer);