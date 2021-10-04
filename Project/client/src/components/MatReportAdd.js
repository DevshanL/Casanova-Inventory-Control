import React, { Component } from 'react'
import axios from 'axios'
import './styleSideNav.css';
import Swal from 'sweetalert2';
import {MatReportAddValid, setErrors} from "./../components/validationprocess/MatReportAddValid"


export default class MatReportAdd extends Component {

       constructor(props){
           super(props);
           this.state={
            matreportID:"",
            matID:"",
            matName:"",
            date:"",
            shipID:"",
            defect:"",
            qty:"",
            errors:{}

          }
       } 

       handleInputChange = (e) =>{
           const{name,value} = e.target;

           this.setState({
               ...this.state,
               [name]:value
           })

       } 


         //Form Validation part
  validate = (
    matreportID,
    matID,
    matName,
    date,
    shipID,
    defect,
    qty
  ) => {
    const errors = setErrors(
      matreportID,
      matID,
      matName,
      date,
      shipID,
      defect,
      qty
    );

    this.setState({ errors: errors });

    return Object.values(errors).every((err) => err === "");
  };









       
       onSubmit =(e) =>{
           e.preventDefault();

           const {matreportID,matID,matName,date,shipID,defect,qty} = this.state;
           if (this.validate(matreportID,matID,matName,date,shipID,defect,qty)) {

           const data = {
            matreportID:matreportID,
            matID:matID,
            matName:matName,
            date:date,
            shipID:shipID,
            defect:defect,
            qty:qty
           }

           console.log(data)

           axios.post("http://localhost:8000/matreport/save", data).then((res) =>{
               if(res.data.success){
                Swal.fire('Added','Report Added Successfilly','success')
                   this.setState(
                       {
                        matreportID:"",   
                        matID:"",
                        matName:"",
                        date:"",
                        shipID:"",
                        defect:"",
                        qty:""
                       }
                   )
               }
           })

       }
       }

    render() {
        return (

            <div id="wrapper" className="toggled">
            <div id="page-content-wrapper">
            <div className="container-fluid">


            
              <nav class="navbar navbar-expand-lg navbar-info bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/matDash">Dashboard </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/matreport"> &#62;Reports</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href=""> &#62; Add a Report <span class="sr-only">(current)</span> </a>
      </li>
    </ul>
  </div>
</nav> 


<hr/>

<div class="card text-dark bg-info mb-3">
  <div class="card-header">INSTRUCTIONS</div>
  <div class="card-body">
    <h5 class="card-title">Reporting</h5>
    <p class="card-text">There are rules and regualtions for Reporting.They are given below.</p>
  </div>
</div>
             


<div class="p-3 mb-2 bg-info text-dark  rounded-3">
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">ADD NEW REPORT</h1>




               
                <form className="needs-validation" noValidate>
                    

                
                    <div class="row">
  <div class="col">
    <label style={{marginBottom:'5px'}} >Report ID</label>
    <input type="text" class="form-control" name="matreportID" placeholder="Enter Report ID"
    value={this.state.matreportID}
    onChange={this.handleInputChange}
    />

{this.state.errors.matreportID && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.matreportID}</div>
)}
  </div>

  <div class="col">
  <label style={{marginBottom:'5px'}} >Material ID</label>
    <input type="text" class="form-control" name="matID"  placeholder="Enter Material ID"
     value={this.state.matID}
     onChange={this.handleInputChange}
     />

{this.state.errors.matID && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.matID}</div>
)}
  </div>
</div>

   
<div class="row">
  <div class="col">
  <label style={{marginBottom:'5px'}} >Material Name</label>
    <input type="text" class="form-control" name="matName" placeholder="Enter Material Name"
    value={this.state.matName}
    onChange={this.handleInputChange}
    />

{this.state.errors.matName && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.matName}</div>
)}
  </div>

  <div class="col">
  <label style={{marginBottom:'5px'}} >Date</label>
    <input type="date" class="form-control" name="date"  placeholder="Enter Date"
     value={this.state.date}
     onChange={this.handleInputChange}
     />
     {this.state.errors.date && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.date}</div>
)}
  </div>
</div>




<div class="row">
  <div class="col">
  <label style={{marginBottom:'5px'}} >Ship ID</label>
    <input type="text" class="form-control" name="shipID" placeholder="Enter Ship ID"
    value={this.state.shipID}
    onChange={this.handleInputChange}
    />
     {this.state.errors.shipID && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.shipID}</div>
)}
  </div>
  <div class="mb-3">

  <div class="col">
  <label for="exampleFormControlTextarea1" class="form-label" style={{marginBottom:'5px'}} >Defect</label>

  <textarea class="form-control" name="defect" id="exampleFormControlTextarea1" rows="3"
  placeholder="Enter Defect"
  value={this.state.defect}
     onChange={this.handleInputChange}
  
  ></textarea>

{this.state.errors.defect && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.defect}</div>
)}
   
     </div>
  </div>
</div>






                        
                        <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}} >Qty</label>
                        <input type="number"
                        className="form-control"
                        name="qty"
                        placeholder="Enter Qty"
                        value={this.state.qty}
                        onChange={this.handleInputChange}/>


{this.state.errors.qty && (

<div classNane="text-danger" style={{ color:'red'}}>{this.state.errors.qty}</div>
)}
                        </div>

                       
                        <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i>
                            &nbsp; Add Report
                        </button>

                    </form>  
                    </div>
                    </div>
                    </div>
                    </div>  

                    <div class="footer">


<div class="contain">

  <br/>
<div class="col">
  <h1>ABOUT US</h1>

  
  <ul>
 
    <li><i class="fas fa-phone-square"></i>&nbsp; &nbsp; Contact us</li>
    <li><i class="fas fa-comment-alt"></i>&nbsp; &nbsp;Suggestion</li>
    
  </ul>
  
  
</div>
<div class="col">
  <h1></h1>
  <ul>
    <li></li>
  </ul>
</div>
<div class="col">
<div class="position-absolute top-50 start-50 translate-middle">
<br/>

<img src="%PUBLIC_URL%../../white.jpg" class="rounded-circle" width="40" height="40"  alt=""/>
  <h1>CASANOVA</h1>
  
  <ul>
    <li>@ Copyright reserved</li>
  </ul>
  </div>
</div>
<div class="col">
  <h1></h1>
  <ul>
  </ul>
  </div>

  <div class="position-absolute top-50 end-0 translate-middle-y">
<div class="col social">
  <h1>Help</h1>
  
  <ul>
  
    <li><i class="fas fa-envelope"></i>&nbsp; &nbsp; <i class="fas fa-map-marker-alt"></i>&nbsp; &nbsp;<i class="fas fa-star"></i></li>
    
  </ul>
  
  </div>
</div>
<div class="clearfix">


</div>
</div>
</div>
        </div>
            
            
        )
    }
}