import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import messageService from "../service/messageService";
function Homepage() {
  const [messagedetails, setmessagedetails] = useState([]);
  const [option, setoption] = useState(false);
  const [data, setdata] = useState({
    line: "",
  });
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
  function handlepending(e) {
    if (e.target.value !== "All") {
      console.log(e.target.value);
      setoption(true);
      messageService.getpendingmessages(e.target.value).then((res) => {
        setmessagedetails(res.data);
      });
    } else {
      setoption(false);
    }
  }
  function handleclick() {
    if (data.line.length !== 0) {
      setoption(true);
      messageService.getmessagebyword(data.line).then((res) => {
        setmessagedetails(res.data);
      });
    } else {
      setoption(false);
    }
  }
  function handlechange(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setdata(newData);
  }
  useEffect(() => {
    if (option === false) {
      messageService.getallmessages().then((res) => {
        setmessagedetails(res.data);
      });
    }
  });
  return (
    <div className="container">
      <h1 className="text-center">Customer Requests</h1>
      <label>Search Messages</label>
      <div className="row">
        <div className="form-group col-md-4">
          <div className="input-group rounded">
            <input
              type="search"
              name="line"
              id="line"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e) => handlechange(e)}
            />
            <button className="btn btn-primary" onClick={() => handleclick()}>
              search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-4">
          <label>sort by:</label>
          <select
            id="inputState"
            className="form-control"
            onChange={(e) => handlepending(e)}
          >
            <option defaultValue="All">All</option>
            <option value="pending">pending</option>
            <option value="replied">replied</option>
          </select>
        </div>
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
