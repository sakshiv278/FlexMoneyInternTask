import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const regularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)

const validation = ({ error, ...rest }) => {
    let checkValidation = false;

    Object.values(error).forEach(val => {
        if (val.length > 0) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });
     
    return checkValidation;
    
};

export default class Form extends Component {


    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            number: '',
            message: '',
            error: {
                name: '',
                email: '',
                number: ''
            }
        }
    }
    
    onFormSubmit = event => {
       const name=this.state.name;
       const email=this.state.email;
       const age=this.state.number;
       const batch=this.state.selectedOption;
        event.preventDefault();
        
        if (validation(this.state)) {
            console.log(this.state)
            
        } else {
            console.log("Error occured");
        }
        var payment = this.CompletePayment();
        if(payment===true){
        var formData={
          name: name,
          email: email,
          age: age,
          batch: batch
        }
        axios.post('http://localhost:3001/user', formData,{headers:{"Content-Type" : "application/json"}})
        .then(function (response) {
          Swal.fire('Payment Successful!',name+' registered','Success')
          event.target.reset();
         // this.setState({message:'Success'})
         // console.log(response);
        })
    
        .catch(function (error) {
          console.log(error);
        });
    }
        
    };
    CompletePayment=()=>{
        return true;
    }
    handleOptionChange = changeEvent=> {
      this.setState({
        selectedOption: changeEvent.target.value
      });
    }
   
    formObject = event => {

        event.preventDefault();

        const { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "name":
                error.name = value.length < 5 ? "Name should be 5 characters long" : "";
                break;
            case "email":
                error.email = regularExpression.test(value)
                    ? ""
                    : "Email is not valid";
                break;
            case "number":
                error.number =
                    (value< 18 || value>65) ? "Age Must be between 18-65 years" : "";
                break;
            default:
                break;
        }

        this.setState({
            error,
            [name]: value
        })
        
    };
     

    render() {

        const { error } = this.state;

        return (
            <div className="container d-flex justify-content-center">
                <div className="card mt-5">
                
                    <form className="card-body" onSubmit={this.onFormSubmit}>
                    <h3>Register Now</h3>
                       <h5>{this.state.message}</h5>
                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Name</strong></label>
                            <input 
                               required
                               type="text" 
                               name="name"
                               onChange={this.formObject}
                               className={error.name.length > 0 ? "is-invalid form-control" : "form-control"}/>
                            
                                {error.name.length > 0 && (
                                <span className="invalid-feedback">{error.name}</span>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Email</strong></label>
                            <input
                                required
                                type="email"
                                name="email"
                                className={error.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>

                                {error.email.length > 0 && (
                                    <span className="invalid-feedback">{error.email}</span>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label className="mb-2"><strong>Age</strong></label>
                            <input
                                required
                                type="number"
                                name="number"
                                className={error.number.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>

                                {error.number.length > 0 && (
                                    <span className="invalid-feedback">{error.number}</span>
                                )}
                        </div>
                        <div className="form-group mb-3 d-inline-flex">
                            <label className="me-2"><strong>Batch</strong></label><br/>
                            <label className="me-2">
                            <input
                                required
                                type="radio"
                                name="batch"
                                value="6-7AM"
                                checked={this.state.selectedOption === '6-7AM'} 
                                 onChange={this.handleOptionChange}
                                /> 6-7AM
                                </label>
                                <label className="me-2">
                            <input
                                type="radio"
                                name="batch"
                                value="7-8AM"
                                checked={this.state.selectedOption === '7-8AM'} 
                      onChange={this.handleOptionChange}
                                /> 7-8AM
                                </label>
                                <label className="me-2">
                            <input
                                type="radio"
                                name="batch"
                                value="8-9AM"
                                checked={this.state.selectedOption === '8-9AM'} 
                      onChange={this.handleOptionChange}
                                /> 8-9AM
                                </label>
                                <label>
                            <input
                                type="radio"
                                name="batch"
                                value="5-6PM"
                                checked={this.state.selectedOption === '5-6PM'} 
                      onChange={this.handleOptionChange}
                                /> 5-6PM
                                </label>
                                
                        </div>
                        <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-block btn-secondary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}