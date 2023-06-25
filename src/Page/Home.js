import React, { useEffect, useState } from "react";
import ConnectMe from "../components/ConnectMe";
import { Link, useNavigate } from "react-router-dom";
import fireDb from "../components/FireBase"
import { toast } from "react-toastify";

export const Home = () => {
  const navigate =useNavigate();
 
  var [arr, setArr] = useState({});

  useEffect(()=>{
    fireDb.child("Data").on("value",(snapshot)=>{
      if (snapshot.val() !== null){
        setArr({...snapshot.val()})
      }
      else{
        setArr({})
      }
    })
    return ()=>{
      setArr({});
    }
  },[])

  function Update(e){
    navigate(`/update/${e.target.id}`)

  }
  function deleteCard(e) {
    
      fireDb.child(`Data/${e.target.id}`).remove((err)=>{
        if(err){
          toast.error(err)
        }
        else{
          toast.success("Successfully deleted",{
            position:toast.POSITION.TOP_CENTER, 
            autoClose:1700
          });
        }
      })
    
  }
  return (
    <div>
      <div className="home">
        <Link to="/adduser" className="link-addbutton">
          <button className="newuser-btn">
            <ion-icon name="person-add-outline"></ion-icon> Add New User
          </button>
        </Link>
      </div>
     
    <div className='data' >
         {Object.keys(arr).map((user, index) => (
        <div className='data-box' key={index}>
          
          <p className='name'>{arr[user].Name}</p>
          <p className='phone'>{arr[user].Phone}</p>
          <p className='email'>{arr[user].Email}</p>
          <div className="box-btn">
          <button className="dlt-btn" onClick={Update} id={user}>Update</button>
          <button className="updt-btn" onClick={deleteCard} id={user}>Delete</button> </div>
          <hr />
        </div>
      ))}
    </div>
      <ConnectMe />
    </div>
  );
};
