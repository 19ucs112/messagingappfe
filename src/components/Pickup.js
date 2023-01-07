import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import messageService from "../service/messageService";

function Pickup() {
  const history = useNavigate();
  const location = useLocation();
  const s = location.state;
  const obj = {
    repliedMessage: null,
  };
  const [data, setdata] = useState({
    id: 0,
    message: "",
  });
  function handle(e) {
    console.log(s.id);
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setdata(newData);
  }
  function handleclick(e) {
    e.preventDefault();
    messageService.updatemessagestatus(s, data.id).then(() => {});
    replymessage();
  }
  function replymessage() {
    obj.repliedMessage = data.message;
    messageService.savereplymessage(obj, s.id);
    history("/");
  }
  return (
    <div className="container my-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h1 className="text-center">Submit details</h1>
          <div className="card-body">
            <form className="form-group">
              <input
                type="text"
                placeholder="enter employee id"
                id="id"
                name="id"
                onChange={(e) => handle(e)}
              ></input>{" "}
              &emsp;
              <input
                type="text"
                placeholder="reply message..."
                id="message"
                name="message"
                onChange={(e) => handle(e)}
              ></input>
              &emsp;
              <button
                className="btn btn-success"
                type="submit"
                onClick={(e) => handleclick(e)}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pickup;
