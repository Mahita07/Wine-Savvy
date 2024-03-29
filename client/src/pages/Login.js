import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
export const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [_, setCookies] = useCookies(["accessToken"]);
    const navigate = useNavigate();
    const onChangePassword = (event) =>{
         setPassword(event.target.value);
         console.log(password);
    }
    const onChangeUsername = (event) =>{
        setUsername(event.target.value);
        console.log(username);
    }
    const onSubmit = async(event) =>{
        event.preventDefault();
        try{
            if(!username || !password){
              alert("Enter all fields !");
              window.location.reload();
            }
            else{
              const response = await axios.post("http://localhost:3001/user/login", 
              {username,password});
              console.log(response);
              if(typeof response.data.message==="string"){
                alert("No user with entered credentials exists.");
                window.location.reload();
                return;
              }
              else{
                setCookies(["accessToken",response.data.token]);
                window.localStorage.setItem("accessToken",response.data.token);
                window.localStorage.setItem("userID",response.data.userID);
                navigate('/user/home');
              }
              
            }
        }
        catch(err){
            console.log(err); 
        }
    }
    const onLogout = () =>{
      setCookies(["accessToken",""]);
      setCookies(["userID",""])
      window.localStorage.setItem("accessToken","");
      window.localStorage.setItem("userID","");
      navigate('/login');
    }
    return (
      <>
      <h1 style={{justifyContent:"center",display: "flex"}} >Login</h1>
      <br></br>
      <div style={{justifyContent:"center",display: "flex"}} >
      <Form  onSubmit = {onSubmit} style={{ display: "flex", flexDirection: "column"}} method="POST">
          <div style={{marginRight:"30px",marginBottom:"20px"}}>
            <Form.Label>User name</Form.Label>
            <Form.Control  type="text" placeholder="Enter user name" name="username" onChange = {onChangeUsername}/>
          </div>
          <div style={{marginRight:"30px",marginBottom:"20px"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control  type="password" placeholder="Enter password" name="password"  onChange = {onChangePassword }/>
          </div>
        <div style={{marginRight:"30px"}}>
        <Button variant="light" type="submit">
          Submit
        </Button>
        </div>
      </Form>

      </div>
      
    </>
    );
  }