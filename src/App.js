import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import AddUser from './components/AddUser/addUser';
import AddCustomer from './components/AllNewCustomers/AddCustomers/AddCustomer';
import CollectionReport from './components/CollectionReports/CollectionReport';
// import CollectionReport from './components/CollectionReports/CollectionReport';
import CompanyProfile from './components/company profile/companyProfile';
import EditCompanyProfile from './components/company profile/EditCompanyProfile/editcompanyprofile';
import CompanyProfileDetails from './components/CompanyProfileDetails/CompanyProfileDetails';
import AddLoan from './components/CustomersInfoRelatedLoans/AddLoans/AddLoan';
import AddLoanWithoutInterest from './components/CustomersInfoRelatedLoans/AddLoanWithoutInterest/AddLoanWithoutInterest';
import Customer from './components/CustomersInfoRelatedLoans/Customer';
import CustomerDetails from './components/CustomersInfoRelatedLoans/CustomerDetails/CustomerDetails';
import AllCustomerListView from './components/CustomersInfoRelatedLoans/CustomersListView/AllCustomerListView/AllCustomerListView';
import Dashboard from './components/Dashboard/Dashboard';
import EditCollectorProfile from './components/Editcollector/editcollector';
import Header from './components/header/header';
import AddLoanType from './components/LoanType/AddLoanType/AddLoanType';
import EditLoan from './components/LoanType/EditLoan/EditLoan';
import Loan from './components/LoanType/Loan';
import Login from './components/login/login';
import MessagingService from './components/MessagingServices/MessagingService';
import Signup from './components/signup/signup';
import UpdateAdminProfile from './components/updateAdmin/updateadminprofile';
import Usermanagement from './components/usermanagement/usermanagement';
import AllNewCustomers from './components/AllNewCustomers/AllNewCustomer';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ForgetPassword from './components/login/ForgetPassword/ForgetPassword'
import ResetPassword from './components/login/ResetPassword/ResetPassword';
import Help from "./components/Help/Help"
import NotFound from './components/NotFound/NotFound';
import NetworkDetector from './NetworkDetector';
import TermsOfService from './components/modals/TermsOfService/TermsOfService';
import PrivacyPolicy from './components/modals/PrivacyPolicy/PrivacyPolicy';
import VerifyNumber from './components/VerifyNumber/VerifyNumber';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: "",
    }
  }
  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/help" component={Help} />
          <Route exact path={["/", "/signup"]} component={Header} />
          <Route exact path="/" component={Login} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route exact path="/fintech/v1/api/user/reset" component={ResetPassword}/>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/allnewcustomers" component={AllNewCustomers} />
          <Route exact path="/usermanagement" component={Usermanagement} />
          <Route exact path="/usermanagement/adduser" component={AddUser} />
          <Route exact path="/usermanagement/editcollector" component={EditCollectorProfile} />
          <Route exact path="/updateadmin" component={UpdateAdminProfile} />
          <Route exact path="/registercompanyprofile" component={CompanyProfile} />
          <Route exact path="/companyprofile/edit" component={EditCompanyProfile} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addloan" component={AddLoanType} />
          <Route exact path="/addloannointerest" component={AddLoanWithoutInterest} />
          <Route exact path="/loantype" component={Loan} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/customers/addcustomer" component={AddCustomer} />
          <Route exact path="/customer/:filter" component={Customer} />
          <Route exact path="/share" component={MessagingService} />
          <Route exact path="/collectionreport" component={CollectionReport} />
          <Route exact path="/collectionreport/:filter" component={CollectionReport} />
          <Route exact path="/companyprofile" component={CompanyProfileDetails} />
          <Route exact path="/customers/addloan" component={AddLoan} />
          <Route exact path="/loan/editloan" component={EditLoan} />
          <Route exact path="/updatepassword" component={UpdatePassword} />
          <Route exact path="/customers/customerinfo" component={CustomerDetails} />
          <Route exact path="/customers/allcustomerlist" component={AllCustomerListView} />
          <Route exact path="/termsofservice" component={TermsOfService} />
          <Route exact path="/privacypolicy" component={PrivacyPolicy} />
          <Route exact path="/verifynumber" component={VerifyNumber} />
          <Route path="**" component={NotFound} />
        </Switch>
      </Router>
    );
  }

}

export default NetworkDetector(App);

