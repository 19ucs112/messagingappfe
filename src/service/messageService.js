import axios from "axios";

class messageService {
  getallmessages() {
    let url = "http://localhost:8080/api/v1/message/getallmessages";
    return axios.get(url);
  }
  updatemessagestatus(message, id) {
    let url = "http://localhost:8080/api/v1/message/updatemessagestatus/";
    console.log(message);
    return axios.put(url + id, message);
  }
  savereplymessage(replymessage, id) {
    console.log(replymessage);
    let url = "http://localhost:8080/api/v1/message/savereplymessage/";
    return axios.post(url + id, replymessage);
  }
  getpendingmessages(option) {
    let url = "http://localhost:8080/api/v1/message/getmessagesbyoption/";
    return axios.get(url + option);
  }
  getmessagebyword(word) {
    let url = "http://localhost:8080/api/v1/message/getMessageBySearch/";
    return axios.get(url + word);
  }
}

export default new messageService();
