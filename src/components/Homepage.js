import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import messageService from "../service/messageService";
function Homepage() {
  const [messagedetails, setmessagedetails] = useState([]);
  const [option, setoption] = useState(false)
  const history = useNavigate();
  function handlepickup(value) {
    history("/pickup", {
      state: value,
    });
  }
  function pickup(value) {
    if (value.employee === null) {
      return true;
    } else {
      return false;
    }
  }
  function getEmployee(value) {
    if (value.employee === null) {
      return "Not Assigned";
    } else {
      return value.employee.employeeId;
    }
  }
  function handlepending(e){
    if(e.target.value !== "All")
    {
        console.log(e.target.value)
        setoption(true)
        messageService.getpendingmessages(e.target.value).then((res)=>{
            setmessagedetails(res.data);
        })
    }
    else
    {
        setoption(false)
    }
   
  }
  useEffect(() => {
    if(option === false){
        messageService.getallmessages().then((res) => {
            setmessagedetails(res.data);
          });
    }
});
  return (
    <div className="container">
      <h1 className="text-center">All messages</h1>
      <div className="form-group col-md-4">
        <label>sort by:</label>
      <select id="inputState" className="form-control" onChange={(e)=>handlepending(e)}>
        <option defaultValue="All">All</option>
        <option value="pending">pending</option>
        <option value="replied">replied</option>
      </select>
    </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Message ID</th>
            <th scope="col">message</th>
            <th scope="col">Customer ID</th>
            <th scope="col">status</th>
            <th scope="col">Employee ID</th>
            <th scope="col">DateTime</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messagedetails.map((value) => (
            <tr key={value.id}>
              <td>{value.id}</td>
              <td>{value.message}</td>
              <td>{value.customer.customerId}</td>
              <td>{value.status}</td>
              <td>{getEmployee(value)}</td>
              <td>{value.dateTime}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => handlepickup(value)}
                  style={{ display: pickup(value) ? "block" : "none" }}
                >
                  pickup
                </button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Homepage;
