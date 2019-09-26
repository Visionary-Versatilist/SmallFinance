import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/header/header';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Sidebar from './components/sidebar/sidebar';
import Usermanagement from './components/usermanagement/usermanagement';
import AddUser from './components/AddUser/addUser';
import UpdateAdminProfile from './components/updateAdmin/updateadminprofile';
import CompanyProfile from './components/company profile/companyProfile';
import EditCollectorProfile from './components/Editcollector/editcollector';
import EditCompanyProfile from './components/company profile/EditCompanyProfile/editcompanyprofile';
import Dashboard from './components/Dashboard/Dashboard';
import Loan from './components/Loans/Loan';
import MessagingService from './components/MessagingServices/MessagingService';
import Customer from './components/Customers/Customer';
import CollectionReport from './components/CollectionReports/CollectionReport';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      history:"",
    }
  }
  render() {

    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={login} /> */}
          {/* <Route exact path="/Home" component={dashboard}/> */}
          <Route exact path={["/","/signup"]} component={Header}/>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="**" component={Login} /> */}
          <Route exact path="/signup" component={Signup} />
          {/* <Route exact path="/sidebar" component={Sidebar} /> */}
          <Route exact path="/usermanagement" component={Usermanagement} />
          <Route exact path="/usermanagement/adduser" component={AddUser} />
          <Route exact path="/usermanagement/editcollector" component={EditCollectorProfile} />
          <Route exact path="/updateadmin" component={UpdateAdminProfile} />
          <Route exact path="/companyprofile" component={CompanyProfile} />
          <Route exact path="/companyprofile/edit" component={EditCompanyProfile} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/loan" component={Loan} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/share" component={MessagingService} />
          <Route exact path="/collectionreport" component={CollectionReport} />
          {/* <Route exact path="/service" component={Service} />
          <Route exact path="/customer" component={Customer}/> */}
          {/* <Route exact path="/customer/customerDetail" component={CustomerDetailInfo}/> */}

          {/* <Route exact path={["/customer/newRegistration","/customer/customerDetail"]} component={Navbar}/> */}
          
          


          {/* <Route exact path="/service" component={} /> */}
        </Switch>
      </Router>
  );
  }

}

export default App;

