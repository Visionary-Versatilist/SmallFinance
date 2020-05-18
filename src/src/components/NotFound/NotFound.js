import React, { Component } from 'react';
class NotFound extends Component {
    componentDidMount(){
        localStorage.removeItem('token')
        localStorage.removeItem('loggedinUser')
        localStorage.removeItem('userid')
        localStorage.removeItem('loggedinUserCompany')
        this.props.history.push("/")
    }
    render() {
        return (
            <div></div>
        )
    }
}
export default NotFound