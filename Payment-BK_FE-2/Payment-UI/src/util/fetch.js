//This file is one -> it have all backend API calls
const BASE_URL = "http://localhost:8081";


export const loginUser = (username,password) => {
    return fetch(BASE_URL+"/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "username":username,
              "password":password
              })
          });
}

export const getUser = (username,email) => {
  return fetch(BASE_URL+"/user?username="+username+"&email="+email, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
}

export const registerUser = (name, username,password, cnumber, anumber) => {
  console.log("register user called"+JSON.stringify({
                  "name":name,
                  "username":username,
                  "password":password,
                  "cnumber":cnumber,
                  "accNo":anumber
                  }));
    return fetch(BASE_URL+"/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "name":name,
                  "username":username,
                  "password":password,
                  "cnumber":cnumber,
                  "accNo":anumber
              })
          });
}

export const editUsers = (name, username,password, cnumber, anumber) => {
  console.log("register user called"+JSON.stringify({
                "name":name,
                "username":username,
                "password":password,
                "cnumber":cnumber,
                "accNo":anumber
                }));
  return fetch(BASE_URL+"/editUser?id="+localStorage.getItem("id"), {
          method: "PUT",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
                "name":name,
                "username":username,
                "password":password,
                "cnumber":cnumber,
                "accNo":anumber
            })
        });
}

export const getAllUsers = () => {
    return fetch(BASE_URL+"/allUsers", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
          })
          .catch(error=>{
              console.log("Error while getAllUsers");
          })
}

export const savePayment = (account, amount,type, notes) => {
   return fetch(BASE_URL+"/savePayment", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                  "from":localStorage.getItem('username'),
                  "accountNo":account,
                  "amount":amount,
                  "type":type,
                  "notes":notes,
                  })
        });
 }

 export const getAllFeeds = (type) => {
  return fetch(BASE_URL+"/all-feeds?type="+type+"&username="+localStorage.getItem('username')+"&email="+localStorage.getItem('email'), {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}