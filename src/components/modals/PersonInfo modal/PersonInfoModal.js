import Dialog from "@material-ui/core/Dialog";
import { DialogContent, DialogTitle, InputLabel } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ImageBaseUrl as DOMAIN } from '../../../Environment'
import "./PersonInfoModal.scss";
import { pencil as editIcon, userdefault } from "../../../assets/images";
import { withNamespaces } from 'react-i18next';

class PersonInfoModal extends Component {
  constructor() {
    super();
    this.state = {
      customerDetail: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    let { customerInfo } = nextProps
    this.setState({
      customerDetail: customerInfo
    });
  }
  onEditIconClick = (customerID) => {
    this.props.history.push({ pathname: '/customers/addcustomer', params: customerID })
  }
  render() {
    let { customerDetail } = this.state
    const { t } = this.props;

    return (
      <div onClick={this.personInfo}>
        {
          <div className="personinfopage Fonts">
            <Dialog open={this.props.open} className="personInfodialogbox" style={{ position: "absolute", marginTop: "0px !important" }}>
              <DialogTitle id="customized-dialog-title" className="TitleDiv">
                <div style={{ display: "flex" }}>
                  <div className="mainTitle" style={{ width: "108%" }}>
                    <h4 style={{ margin: "-1rem" }} className="Fonts"> {t('AddCustomer.personalinfo')}</h4>
                  </div>
                  <div className="personcloseButtonDiv" style={{ width: "4%" }}>
                    <CloseIcon onClick={this.props.close} />
                  </div>
                </div>
              </DialogTitle>
              <DialogContent className="bottomPart1">
                <div className="mainDiv Fonts">
                  <div className="heading Fonts" style={{ display: "flex" }}>
                    <div> {t('AddCustomer.fCard')}</div>
                    <img className="editIcon"
                      style={{ marginLeft: "20rem" }}
                      onClick={() => this.onEditIconClick(customerDetail.customerId)}
                      src={editIcon}
                      alt={'editIcon'}
                    />

                  </div>
                  <div className="firstDiv Fonts" style={{}}>
                    <div className="firstDivOne Fonts">
                      <div className="firstDivOneOne Fonts">
                        <div className="firstDivOneOneOne Fonts">
                          <div className="personalImage Fonts">
                            <img
                              className="profileImage"
                              src={customerDetail.profileImg ? customerDetail.profileImg : userdefault}
                              alt={'profile'}
                            />
                          </div>
                        </div>
                        <div className="firstDivOneOneTwo Fonts">
                          <div className="firstDivOneOneTwoOne Fonts">
                            <div className="CustomerName Fonts">{customerDetail.firstName ? customerDetail.firstName + " " + customerDetail.lastName : null}</div>
                          </div>
                          <div className="firstDivOneOneTwoTwo Fonts">
                            <InputLabel className="CustomerInfo Fonts">
                              {customerDetail.dob ? moment(customerDetail.dob).format("DD MMM YYYY") : null}
                            </InputLabel>
                          </div>
                          <div className="firstDivOneOneTwoThree Fonts">
                            <InputLabel className="CustomerInfo Fonts">
                              {customerDetail.gender ? customerDetail.gender : null}
                            </InputLabel>
                          </div>
                          <div className="firstDivOneOneTwoFour Fonts">
                            <InputLabel className="CustomerInfo Fonts">
                              {t('NewCustomer.loans')}:
                            </InputLabel>
                            <div className="CustomerInfo Fonts">{customerDetail.noOfLoans ? customerDetail.noOfLoans : 0}</div>
                          </div>
                        </div>
                      </div>
                      <div className="firstDivOneTwo Fonts">
                        <div className="firstDivOneTwoOne Fonts">
                          <InputLabel className="CustomerInfo Fonts">
                            {t('AddCustomer.phone')}:
                          </InputLabel>
                          <div className="CustomerContentInfo Fonts">
                            {customerDetail.phone ? customerDetail.phone : null}
                          </div>
                        </div>
                        <div className="firstDivOneTwoTwo Fonts">
                          <InputLabel className="CustomerInfo Fonts">
                            {t('AddCustomer.email')}
                          </InputLabel>
                          <div className="CustomerContentInfo Fonts">
                            {customerDetail.email ? customerDetail.email : null}
                          </div>
                        </div>
                        <div className="firstDivOneTwoThree">
                          <InputLabel className="CustomerInfo Fonts">
                            {t('AddCustomer.annincome')}
                          </InputLabel>
                          <div className="CustomerContentInfo Fonts">
                            {customerDetail.annualIncome ? customerDetail.annualIncome : null}
                          </div>
                        </div>
                        <div className="firstDivOneTwoFour">
                          <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.addar')}
                          </InputLabel>
                          <div className="CustomerContentInfo Fonts">
                            {customerDetail.aadhar ? customerDetail.aadhar : null}
                          </div>
                        </div>

                        <div className="firstDivOneTwoFive">
                          <InputLabel className="CustomerInfo Fonts">
                            {t('AddCustomer.blank')}
                          </InputLabel>
                          <img className="blankcheck"
                            style={{ width: "400px", height: "200px" }}
                            src={customerDetail.blankCheqImg ? customerDetail.blankCheqImg : userdefault}
                            alt={'cheque'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="firstDivTwo">
                      <div className="firstDivTwoOne Fonts">
                        <InputLabel>{t('AddCustomer.status')}</InputLabel>
                        <div className="CustomerContentInfo Fonts">{customerDetail.maritalStatus ? customerDetail.maritalStatus : null}</div>
                      </div>
                      <div className="firstDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.dadname')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">{customerDetail.fatherName ? customerDetail.fatherName : null}</div>
                      </div>

                      <div className="firstDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                          {t('AddCustomer.momname')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">{customerDetail.motherName ? customerDetail.motherName : null}</div>
                      </div>
                      {/* <div className="firstDivTwoOne">
                        <InputLabel className="CustomerInfo">
                          No Of Dependents
                        </InputLabel>
                        <div className="CustomerContentInfo">{true ? "VALUE" : null}</div>
                      </div> */}
                      <div className="firstDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.majscr')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">{customerDetail.incomeSource ? customerDetail.incomeSource : null}</div>
                      </div>
                      <div className="firstDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.pan')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">{customerDetail.pan ? customerDetail.pan : null}</div>
                      </div>
                    </div>
                  </div>
                  <div className="heading Fonts"> {t('AddCustomer.sCard')}</div>
                  <div className="secondDiv">
                    <div className="secondDivOne">
                      <div className="secondDivOneOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.address')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {
                            customerDetail.homeAddress ?
                              <div>
                                <div className="CustomerInfo Fonts">{customerDetail.homeAddress.AddressLine}</div>
                                <div className="CustomerInfo Fonts">{customerDetail.homeAddress.AddressStreet}</div>
                                <div className="CustomerInfo Fonts" >{customerDetail.homeAddress.AddressLandmark}</div>
                                <div className="CustomerInfo Fonts">{customerDetail.homeAddress.AddressCity}</div>
                                <div className="CustomerInfo Fonts">{`${customerDetail.homeAddress.AddressState} ${customerDetail.homeAddress.AddressPincode}`}</div>

                              </div>
                              : null
                          }
                        </div>
                      </div>

                      <div className="secondDivOneTwo">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.offaddrss')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {
                            customerDetail.officeAddress ?
                              <div>
                                <div className="CustomerInfo Fonts">{customerDetail.officeAddress.AddressLine}</div>
                                <div className="CustomerInfo Fonts">{customerDetail.officeAddress.AddressStreet}</div>
                                <div className="CustomerInfo Fonts">{customerDetail.officeAddress.AddressLandmark}</div>
                                <div className="CustomerInfo Fonts">{customerDetail.officeAddress.AddressCity}</div>
                                <div className="CustomerInfo Fonts">{`${customerDetail.officeAddress.AddressState} ${customerDetail.officeAddress.AddressPincode}`}</div>

                              </div>
                              : null
                          }
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="heading Fonts"> {t('AddCustomer.ThCard')}</div>
                  <div className="thirdDiv">
                    <div className="thirdDivOne">
                      <div className="thirdDivOneOne">
                        <InputLabel className="CustomerInfo Fonts">
                          {t('AddCustomer.place')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.collectionDetail ? customerDetail.collectionDetail.collectonPlace : null}
                        </div>
                      </div>
                    </div>
                    <div className="thirdDivTwo">
                      <div className="thirdDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.time')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.collectionDetail ? customerDetail.collectionDetail.collectionTime : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="heading Fonts"> {t('AddCustomer.FCard')}</div>
                  <div className="fourthDiv">
                    <div className="fourthDivOne">
                      <div className="fourthDivOneOne">
                        <InputLabel className="CustomerInfo Fonts">
                          {t('AddCustomer.bname')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.bankDetail ? customerDetail.bankDetail.bankName : null}
                        </div>
                      </div>
                      <div className="fourthDivOneTwo">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.accnum')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.bankDetail ? customerDetail.bankDetail.accountNumber : null}
                        </div>
                      </div>
                    </div>

                    <div className="fourthDivTwo">
                      <div className="fourthDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.ifsc')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.bankDetail ? customerDetail.bankDetail.ifsc : null}
                        </div>
                      </div>
                      <div className="fourthDivTwoTwo">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.acctype')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.bankDetail ? customerDetail.bankDetail.accountType : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="heading Fonts">  {t('AddCustomer.fifthCrad')}</div>
                  <div className="fifthDiv">
                    <div className="fifthDivOne">
                      <div className="fifthDivOneOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.refname')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.referenceDetail ? customerDetail.referenceDetail.referenceName1 : null}
                        </div>
                      </div>
                      <div className="fifthDivOneTwo">
                        <InputLabel className="CustomerInfo Fonts">
                          {t('AddCustomer.reffname')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.referenceDetail ? customerDetail.referenceDetail.referenceName2 : null}
                        </div>
                      </div>
                    </div>

                    <div className="fifthDivTwo">
                      <div className="fifthDivTwoOne">
                        <InputLabel className="CustomerInfo Fonts">
                           {t('AddCustomer.refphone')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.referenceDetail ? customerDetail.referenceDetail.referenceNumber1 : null}
                        </div>
                      </div>
                      <div className="fifthDivTwoTwo">
                        <InputLabel className="CustomerInfo Fonts">
                          {t('AddCustomer.reffphone')}
                        </InputLabel>
                        <div className="CustomerContentInfo Fonts">
                          {customerDetail.referenceDetail ? customerDetail.referenceDetail.referenceNumber2 : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="heading Fonts">  {t('AddCustomer.sixCard')}</div>
                  <div className="sixthDiv Fonts">
                    {customerDetail.proofs ?
                      customerDetail.proofs
                        .map((proof, index) =>
                          <Proof key={index} proof={proof} />
                        )
                      : null}




                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        }
      </div>
    );
  }
}
export default withNamespaces()(withRouter(PersonInfoModal));

let Proof = (props) => {
  const { proof } = props
  const { imgLink, imgName } = getImageDetails(proof.proofImagePath)
  return (
    <div className="sixthDivOne" style={{ display: "flex" }}>
      <div className="CustomerContentInfo Fonts" style={{ width: "150px", fontSize: "14px" }}>{proof.proofType}</div>
      <div className="CustomerContentInfo Fonts" style={{ fontSize: "14px" }} >
        <a href={imgLink} target={"_blank"}>{imgName}</a>
      </div>
    </div>
  )
}

let getImageDetails = imgPath => {
  let imgName = imgPath.substring(imgPath.lastIndexOf("/") + 1, imgPath.lastIndexOf("."))
  let imgLink = DOMAIN + imgPath
  return { imgLink: imgLink, imgName: imgName }
}