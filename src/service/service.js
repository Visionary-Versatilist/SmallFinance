import Axios from "axios";
import moment from "moment";
import { ImageBaseUrl as DOMAIN, BaseUrl as url } from '../Environment'
import { profile as defaultImage,infoimag } from '../assets/images';
import localStorage from "local-storage";






export const fetchAPIData = async (key, value) => {
    //default
    const companyId = localStorage.get('loggedinUserCompany')
    const token = localStorage.get('token')
    const cancelLoan = '/loan/cancelLoan';
    const dashboardAPI = '/loanCollection/getCollectionDashboard'

    //CollectionReport.js
    const tableRecord = "/loan/getCollectionReport"
    const collectors = `/user/getAllCollectors?companyId=${companyId}`
    const getLoanTypes = `/loanType/getAllLoanTypes?loanType=&companyId=${companyId}`

    //CustomerDetails.js
    const getLoanByID = "/loan/getLoanDetails?loanId="
    const paymentAction = "/loanCollection/putLoanCollection"
    const getCustomerInfoByID = "/customer/getCustomerDetails?customerId="

    //config header
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };




    let response = null
    let res = null
    let customerID
    switch (key) {
        case "customerDetailByID":
            customerID = value;
            res = await Axios.get(url + getCustomerInfoByID + customerID, { headers: headers })
            if (res.status === 200 || res.status === 304) {
                response = modifiyJSONFormat("customerDetailByID", res.data)
            }
            break;

        case "cancelLoan":
            let obj = value;
            res = await Axios.put(url + cancelLoan, obj, { headers: headers })
            if (res.status === 200 || res.status === 304)
                response = true
            else
                response = false
            break;

        case "dashboard":
            // + dashboardAPI
            let condition = value
            console.log('condition ', value)
            res = await Axios.post(url + dashboardAPI, condition, { headers: headers })
            if (res.status === 200 || res.status === 304) {
                condition['rawData'] = res.data
                response = modifiyJSONFormat('dashboard', condition)
            }
            else
                console.log('data from dashboard not receved is received')
            break;

        // Collection Report Calls
        case "tableRecord":
            // get Table records data
            let calcValue = {};
            let filter = value
            res = await Axios.post(url + tableRecord, filter, { headers: headers })

            if (res.status === 200 || res.status === 304) {
                calcValue = calculateCardRecords(res.data)
                response = { calcValue, ...modifiyJSONFormat("tableRecord", res.data) }
            }

            break;
        case "collectionAgent":
            // get collector data
            res = await Axios.get(url + collectors, { headers: headers })

            if (res.status === 200 || res.status === 304) {
                response = modifiyJSONFormat("collectionAgent", res.data)
            }

            break;
        case "getLoanType":
            res = await Axios.get(url + getLoanTypes, { headers: headers })

            if (res.status === 200 || res.status === 304) {
                response = modifiyJSONFormat("getLoanType", res.data)
            }

            break;

        //CustomerDetails.js
        case "loanID":
            let loanID = value
            res = await Axios.get(url + getLoanByID + loanID, { headers: headers })

            if (res.status === 200 || res.status === 304) {
                console.log("resp", res.data)
                response = {
                    isLoading: false,
                    ...modifiyJSONFormat("detailsByLoanID", res.data)
                }
            }
            break;

        // eslint-disable-next-line no-duplicate-case
        case "customerDetailByID":
            customerID = value
            res = await Axios.get(url + getCustomerInfoByID + customerID, { headers: headers })

            if (res.status === 200 || res.status === 304) {
                // this.setState({ customerInfo: res.data });
                response = modifiyJSONFormat("customerDetailByID", res.data)

            }

            break;

        case "paymentAction": {
            const { nextDue } = value

            res = await Axios.put(url + paymentAction, nextDue, { headers: headers })

            if (res.status === 200 || res.status === 304) {
                console.log("Payment update successfull")

            } else
                console.log("Payment update failed")

        }
            break;


        default:
            console.log("invalid key from Service.js")
            break;
    }
    return response
}



const modifiyJSONFormat = (key, rawData) => {
    let returnValue = null
    let updatedRecords = []

    switch (key) {
        case 'dashboard':

            let fromDate = rawData.fromDate
            let toDate = rawData.toDate
            let type = rawData.category
            rawData = rawData.rawData
            //declare returnvalue as empty object
            returnValue = {}

            let lineChartList = dashboardCalculation(fromDate, toDate, type, rawData)

            let dayLoan = [], weekLoan = [], monthLoan = [], penaltyLoan = []
            let dayPaidLoanTotal = 0, weekPaidLoanTotal = 0, monthPaidLoanTotal = 0
            let dayLoanTotal = 0, weekLoanTotal = 0, monthLoanTotal = 0
            let cardDetail, pieChartData;
            let dueTotal = 0, overDueTotal = 0, collectedTotal = 0

            //calculation:

            dayLoan = rawData.filter(loan => loan.loan.loanTenureType === 'daily')
            weekLoan = rawData.filter(loan => loan.loan.loanTenureType === 'weekly')
            monthLoan = rawData.filter(loan => loan.loan.loanTenureType === 'monthly')
            penaltyLoan = rawData.filter(loan => loan.PenaltyApplied !== null)


            //sum of paid dues
            dayPaidLoanTotal = dayLoan.filter(obj => obj.collectionStatus === 'Paid')
                .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)
            weekPaidLoanTotal = weekLoan.filter(obj => obj.collectionStatus === 'Paid')
                .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)
            monthPaidLoanTotal = monthLoan.filter(obj => obj.collectionStatus === 'Paid')
                .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)

            //sum of total dues
            dayLoanTotal = dayLoan.reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)
            weekLoanTotal = weekLoan.reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)
            monthLoanTotal = monthLoan.reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)

            //due overdue collected amount calculation.

            dueTotal = rawData.filter(loan =>
                loan.loan.loanPaymentStatus === 'Due' && loan.collectionStatus === null)
                .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0);
                console.log("servicedueTotal", dueTotal)

            overDueTotal = rawData.filter(loan => loan.loan.loanPaymentStatus === 'OverDue')
                .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0);

            //logic: sum of collectedamount of paid due - sum of paid penalty
            collectedTotal = rawData.filter(loan => loan.collectionStatus === 'Paid')
                .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0)

            //assigning in objects
            cardDetail = {
                daily: {
                    paidSum: dayPaidLoanTotal,
                    total: dayLoanTotal,
                    percentage: Math.round(dayPaidLoanTotal * 100 / dayLoanTotal)
                },
                weekly: {
                    paidSum: weekPaidLoanTotal,
                    total: weekLoanTotal,
                    percentage: Math.round(weekPaidLoanTotal * 100 / weekLoanTotal)
                },
                monthly: {
                    paidSum: monthPaidLoanTotal,
                    total: monthLoanTotal,
                    percentage: Math.round(monthPaidLoanTotal * 100 / monthLoanTotal)
                },
                penalty: {
                    paidSum: 0,
                    total: penaltyLoan.reduce((total, loan) => total + parseInt(loan.PenaltyApplied), 0),
                    percentage: 0,
                }
            }

            pieChartData = { due: dueTotal, overdue: overDueTotal, collected: collectedTotal }

            returnValue.cardDetail = cardDetail
            returnValue.pieChartData = pieChartData
            returnValue.lineChartList = lineChartList


            break;

        case "detailsByLoanID":
            let paidPenalty = 0, unpaidPenalty = 0, totalPenalty, isLoanActive = false, isLastDue = 0
            let totalPaidAmount = 0, balanceAmount = 0, percentage = 0, loanDetails = 0, duration = 0
            let profilePhoto = ''


            //Calculation
            //taking the next active due from the list
            let nextDue = rawData?rawData.loanCollections.find(obj => obj.collectionStatus === null):""

            //total loan amount
            let loanAmount = parseInt(rawData.totalAmountToCollect)

            // taking paid/unpaid due list from the list
            let pastLoanDueList = rawData.loanCollections.filter(obj => obj.collectionStatus !== null)

            //taking Paid dues from the list
            let paidDues = rawData.loanCollections.filter(obj => obj.collectionStatus === 'Paid')


            //checking loan is active or inactive
            isLoanActive = rawData.loanStatus === 'Open'

            //checking the loan has last due 
            isLastDue = rawData.loanCollections.filter(obj => obj.collectionStatus === null).length === 1

            //profile pic
            console.log('before 271')
            profilePhoto = rawData?rawData.customer.proofs?rawData.customer.proofs.find(obj => obj.proofType === 'profilepic'):"":""
            console.log('after 271')
            if (profilePhoto !== "") {
                console.log('monday offer',profilePhoto)
                profilePhoto =DOMAIN+ profilePhoto.proofImagePath
            } else {
                console.log('else offer',profilePhoto)
                profilePhoto = infoimag
            }

            //Calcuation for paid, unpaid penalty amount 
            //only if due present
            if (nextDue) {

                let prevInstallment = 0, totalPenalty = 0
                let indexOfNextDue = rawData.loanCollections.indexOf(nextDue)

                //initialize previous penalty and prev installment in the next due  
                nextDue.prevPenalities = totalPenalty
                nextDue.prevInstallment = prevInstallment

                //calculating Loan duration i.e. start date and end date
                duration = moment(rawData.loanCollections[0].dueDate).format("DD MMM YYYY") + "-" +
                    moment(rawData.loanCollections[rawData.loanCollections.length - 1].dueDate).format("DD MMM YYYY")

                //setting flag to identify the next due in Table
                rawData.loanCollections[indexOfNextDue].flag = true

            }


            // checking if list contain past loan
            if (pastLoanDueList) {

                if (paidDues.length !== 0) {

                    let lastPaidDues = paidDues[paidDues.length - 1];
                    //taking last paid due date to calculate the penalty from that to before list
                    let lastPaidDueDate = lastPaidDues.dueDate;

                    let pastPaidpenaltyList = pastLoanDueList.filter(due =>
                        moment(due.dueDate).isSameOrBefore(moment(lastPaidDueDate)))

                    //validation for Installment Calculator on Paid penalty. if method is Installment Calculator, dont do paid penalty
                    if (rawData.method !== "Installment Calculator") {
                        //check if pastPaidpenaltyList 'undefined' and sum the penalty or zero
                        paidPenalty = pastPaidpenaltyList ?
                            pastPaidpenaltyList.reduce((acc, due) => parseInt(due.PenaltyApplied) + acc, 0) : 0
                    }
                }

                //calculate total penalty
                totalPenalty = pastLoanDueList
                    .reduce((acc, due) => acc + parseInt(due.PenaltyApplied), 0)

                //calculate unpaidpeanlty 
                unpaidPenalty = totalPenalty - paidPenalty


            }


            //totalPaidAmount var with penalty
            totalPaidAmount = paidDues
                .reduce((acc, loanDue) => acc + parseInt(loanDue.collectionAmount), 0)



            //totalPaidAmount var: removing paid penalty
            totalPaidAmount -= paidPenalty

            balanceAmount = loanAmount - totalPaidAmount


            percentage = Math.round(totalPaidAmount * 100 / loanAmount)

            //assigning the calculated values inside the JSON

            loanDetails = {

                isLoanActive: isLoanActive,
                method: rawData.method,

                tentureType: rawData.loanTenureType.indexOf('ily') !== -1 ?
                    rawData.loanTenureType.replace("ily", "ys") : rawData.loanTenureType.replace("ly", "s"),

                loanHistoryDetailList: rawData.loanCollections,
                cancellationReason: rawData.cancellationReason,

                personalCardDetail: {
                    isLastDue: isLastDue,

                    loanStatus: rawData.loanStatus,
                    personalDetails: {
                        name: rawData.customer.firstName + " " + rawData.customer.lastName,
                        customerID: rawData.customer.customerId,
                        loanID: rawData.loanId,
                        phoneNo: rawData.customer.phone,
                        otherLoanIDs: rawData.customer.loans,
                        profilePhoto:profilePhoto
                    },
                    nextDue: {
                        installment: nextDue !== undefined ? nextDue.Installment : null,
                        prevInstallment: nextDue !== undefined ? nextDue.prevInstallment : null,
                        penalty: unpaidPenalty,
                        basicPenalty: rawData.penalty ? rawData.penalty : 0,
                        loanCollectionId: nextDue !== undefined ? nextDue.loanCollectionId : null,
                        loanId: nextDue !== undefined ? nextDue.loanId : null,
                        dueDate: nextDue !== undefined ? nextDue.dueDate : null,
                        nextSchedule: nextDue !== undefined ? nextDue.nextSchedule : null,
                        Installment: nextDue !== undefined ? nextDue.Installment : null,
                        collectionAmount: nextDue !== undefined ? nextDue.collectionAmount : null,
                        collectionStatus: nextDue !== undefined ? nextDue.collectionStatus : null,
                        PenaltyApplied: nextDue !== undefined ? nextDue.PenaltyApplied : null,
                        collectorId: nextDue !== undefined ? nextDue.collectorId : null,
                        createdByUserId: nextDue !== undefined ? nextDue.createdByUserId : null,
                        updatedByUserId: nextDue !== undefined ? nextDue.updatedByUserId : null,
                        customerId: nextDue !== undefined ? nextDue.customerId : null,
                        createdAt: nextDue !== undefined ? nextDue.createdAt : null,
                        updatedAt: nextDue !== undefined ? nextDue.updatedAt : null,
                        isLastDue: isLastDue
                    },
                    previousDueList: (rawData.loanCollections.filter(rec => rec.collectionStatus === 'Paid')).reverse()
                },
                infoCard: {
                    headerData: {
                        rateOfInterest: rawData.rateOfInterest,
                        method: rawData.method,
                        moratoriumPeriods: rawData.moratoriumPeriods,
                        loanType: rawData.loanType.loanType,
                        totalLoanAmount: rawData.totalAmountToCollect,
                        location: rawData.customer.collectionDetail ? rawData.customer.collectionDetail.collectonPlace : null,
                        time: rawData.customer.collectionDetail ? rawData.customer.collectionDetail.collectionTime : null,
                    },
                    loanOverView: {
                        duration: duration,
                        collectionSequence: rawData.loanTenureType,
                        collectorName: rawData.user.firstName + " " + rawData.user.lastName,
                        method: rawData.method,
                        penalty: rawData.penalty
                    },
                    amountOverView: {
                        totalAmountPaid: totalPaidAmount, balanceData: balanceAmount, percentage: percentage, paidPenalty: paidPenalty
                    },
                    loanId: rawData.loanId
                },

            }


            returnValue = { loanDetails }
            break;

        case "customerDetailByID":

            let customerInfo = rawData
            let temp = customerInfo?customerInfo.proofs.find(proof => proof.proofType === "profilepic"):null
            customerInfo.profileImg = temp ? DOMAIN + "\\" + temp.proofImagePath : null
            temp = customerInfo?customerInfo.proofs.find(proof => proof.proofType === "blankcheck"):""
            customerInfo.blankCheqImg = temp ? DOMAIN + "\\" + temp.proofImagePath : null

            returnValue = customerInfo;
            break;

        //Collection Report
        case "tableRecord":
            updatedRecords = []
            if (rawData.length !== 0) {
                updatedRecords = rawData.map((record) => ({
                    loanId: record.loanId,
                    loanIcon: getImg(record),
                    loanType: record.loan.loanType.loanType,
                    customerId: record.loan.customer.firstName,
                    customerName: record.loan.customer.firstName + " " + record.loan.customer.lastName,
                    collectionAgent: record.user.firstName + " " + record.user.lastName,
                    collectionAgentID: record.user.userId,
                    totalAmount: record.loan.loanAmount,
                    installment: record.Installment,
                    collectedAmount: null,
                    dueDate: record.dueDate,
                    collectionSeq: record.loan.loanTenureType,
                    penalty: record.PenaltyApplied,
                    loanPaymentStatus: record.loan.loanPaymentStatus,
                    collectionStatus: record.collectionStatus
                }))
            }
            returnValue = { tableRecords: updatedRecords, isLoading: false };
            break;

        case "collectionAgent":
            if (rawData.length !== 0)
                updatedRecords = rawData.map(agent => ({
                    name: agent.firstName + " " + agent.lastName,
                    id: agent.userId,
                    isActive: false
                }))
            returnValue = { collectionAgents: updatedRecords }
            break;

        case "getLoanType":
            updatedRecords = rawData.map(loan => ({
                loanTypeId: loan.loanTypeId,
                label: loan.loanType,
                isActive: false
            }))
            returnValue = { loanTypes: updatedRecords };
            break

        default:
            console.log(`Invalid key name ${key}`)
            break;
    }

    return returnValue
}


const dashboardCalculation = (fromDate, toDate, type, data) => {

    let label, begin, end
    let output = [];

    switch (type) {
        case 'today':
            label = ''
            for (let index = 6; index < 18; index += 2) {
                begin = moment(fromDate)
                    .add(index, 'hours')
                    .startOf('hour')
                    .format('DD MMM YYYY HH:mm:mm')
                end = moment(fromDate)
                    .add(index + 1, 'hours')
                    .endOf('hour')
                    .format('DD MMM YYYY HH:mm:mm')
                label = moment(begin).format('HH:mm')
                output.push({ name: label, ...getFullListByDate(begin, end, data) })
            }
            break;

        case 'week':
            label = ''
            for (let index = 0; index < 7; index++) {
                begin = moment(fromDate)
                    .add(index, 'days')
                    .startOf('day')
                    .format('DD MMM YYYY HH:mm:mm')
                end = moment(fromDate)
                    .add(index, 'days')
                    .endOf('day')
                    .format('DD MMM YYYY HH:mm:mm ')
                label = moment(begin).format('DD MMM')
                output.push({ name: label, ...getFullListByDate(begin, end, data) })
            }
            break;

        case 'month':
            label = ''
            for (let index = 0; index < 4; index++) {
                begin = moment(fromDate)
                    .add(index, 'weeks')
                    .startOf('day')
                    .format('DD MMM YYYY HH:mm:mm')
                end = moment(fromDate)
                    .add(index, 'weeks')
                    .add(6, 'days')
                    .endOf('day')
                    .format('DD MMM YYYY HH:mm:mm ')
                label = `Week ${index + 1} ${moment(begin).format('MMM')}`
                output.push({ name: label, ...getFullListByDate(begin, end, data) })
            }
            break;

        case 'year':
            label = ''
            for (let index = 0; index < 12; index++) {
                begin = moment(fromDate)
                    .add(index, 'month')
                    .startOf('month')
                    .format('DD MMM YYYY HH:mm:mm')
                end = moment(fromDate)
                    .add(index, 'month')
                    .endOf('month')
                    .format('DD MMM YYYY HH:mm:mm ')
                label = moment(begin).format('MMMYY')
                output.push({ name: label, ...getFullListByDate(begin, end, data) })
            }
            break;

        default:
            break;
    }
    return output
}

const calculateCardRecords = (records) => {
    let totalCustomer, paidCustomer, penalty, overDue, totalOverDue, loanCollectionAmount, totalLoanCollectionAmount, totalpenalty

    totalCustomer = records.length
    paidCustomer = records.filter(record => record.collectionStatus === "Paid").length

    penalty = records
        .filter(record => record.collectionStatus === "Paid")
        .reduce((penalty, record) => penalty + parseInt(record.PenaltyApplied), 0)
    totalpenalty = records.reduce((penalty, record) => penalty +
        parseInt(record.PenaltyApplied) ? parseInt(record.PenaltyApplied) : 0
        , 0)

    overDue = records.filter(record => record.loan.loanPaymentStatus === "OverDue" && record.collectionStatus === "Paid")
        .reduce((acc, record) => acc + parseInt(record.Installment), 0)
    totalOverDue = records.filter(record => record.loan.loanPaymentStatus === "OverDue")
        .reduce((acc, record) => acc + parseInt(record.Installment), 0)

    loanCollectionAmount = records.filter(record => record.collectionStatus === "Paid")
        .reduce((acc, record) => acc + parseInt(record.collectionAmount), 0)
    totalLoanCollectionAmount = records
        .reduce((acc, record) => acc + parseInt(record.collectionAmount), 0)



    return {
        loanCollectionAmount: loanCollectionAmount,
        totalLoanCollectionAmount: totalLoanCollectionAmount,
        overDueAmount: overDue,
        totalOverDueAmount: totalOverDue,
        paidCustomer: paidCustomer,
        totalCustomer: totalCustomer,
        penalty: penalty,
        totalpenalty: totalpenalty
    }

}


export const getImg = record => {
    let proof =record.loan.customer? record.loan.customer.proofs.find(proof => (proof.proofType === "profilepic")):null
    if (proof !== undefined)
        return DOMAIN + "/" + proof.proofImagePath
    return defaultImage
}

const getFullListByDate = (startDate, endDate, data) => {
    let sortedList = data
        .filter(loan => moment(loan.dueDate).isBetween(startDate, endDate))
    let daily, weekly, monthly;
    daily = sortedList.filter(obj => obj.loan.loanTenureType === 'daily')
        .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0);
    weekly = sortedList.filter(obj => obj.loan.loanTenureType === 'weekly')
        .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0);
    monthly = sortedList.filter(obj => obj.loan.loanTenureType === 'monthly')
        .reduce((total, loan) => total + parseInt(loan.collectionAmount), 0);



    return { Daily: daily, Weekly: weekly, Monthly: monthly }
}

