import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {


    let [users, setUsers] = useState(null);

    useEffect(()=>{
            fetch("http://localhost:4001/user")
            .then((res)=>{return res.json()})
            .then((data)=>{
                            console.log(data);
                            setUsers(data);
            })
    }, [])

    let [value, setValue] = useState("no");

    let n = useNavigate();
    
    let username = useRef();
    let dob = useRef();
    let gender = useRef();
    let phone = useRef();
    let email = useRef();
    let pwd = useRef();

   let signup = (e) => {
        e.preventDefault();
    
        let user = {
        username : username.current.value,
        dob : dob.current.value,
        gender : gender.current.value,
        phone : phone.current.value,
        email : email.current.value,
        pwd : pwd.current.value
    
        }

        if(users.some((u)=>{ return u.email==user.email }))
        {
            
            alert(`${user.username} already exists... redirection to login page...`)
            setValue("yes");
        }
        else
        {
            fetch("http://localhost:4001/user", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
            })
            .then(()=>{
                alert(`${user.username} 's signup succesfull... Please Login to continue...`);
                n("/");
            })
        }
   }

   let emailid = useRef();
   let password = useRef();

   let Login = (e) =>{
        e.preventDefault();
        
        let loginid = emailid.current.value;
        let pass = password.current.value;

        if(users.some((u)=>{ return u.email == loginid && u.pwd == pass}))
        {
            alert(`Welcome ${loginid}, its nice to see you here`);
            n("/");
        }
        else{
            alert(`${loginid} not found, please Signup and continue...!`);
            setValue("no");
        }

   }

    return ( 

    <div>

            {value=="no" && <div className="signup">
                                <h1 style={{textAlign : "center"}}>SignUp</h1><hr/><hr/>
                                <form onSubmit={signup}>
                                    <input id="inp" type="text" placeholder="Enter Username" ref={username}/>
                                    <input id="inp" type="date" placeholder="Enter Date of birth" ref={dob}/>
                                    <input id="inp" type="text" placeholder="Enter Gender" ref={gender}/>
                                    <input id="inp" type="tel" placeholder="Enter Contact number" ref={phone}/>
                                    <input id="inp" type="email" placeholder="Enter email id" ref={email}/>
                                    <input id="inp" type="password" placeholder="Enter Password" ref={pwd}/>

                                    <input id="submit" type="submit" value="Signup" />
                                    <br />
                                    <span style={{color : "rgb(27, 163, 27)" ,fontWeight : 700 , fontSize : "large"}}>Already have an account? <span style={{color : "blue"}} onClick={()=>{setValue("yes")}}>login</span></span> 
                                </form>
                            </div>
            }

            {value=="yes" && <div className="signup">
                                <h1 style={{textAlign : "center"}}>Login</h1><hr/><hr/>
                                <form onSubmit={Login}>
                                    <input id="inp" type="email" placeholder="Enter email id" ref={emailid}/>
                                    <input id="inp" type="password" placeholder="Enter Password" ref={password}/>

                                    <input id="submit" type="submit" value="Login" />
                                    <br />
                                    <span style={{color : "rgb(27, 163, 27)" ,fontWeight : 700 , fontSize : "large"}}>Create account ? <span style={{color : "blue"}} onClick={()=>{setValue("no")}}>signup</span></span>
                                </form>
                            </div>
            } 

    </div>
        
     );
}
 
export default Signup;