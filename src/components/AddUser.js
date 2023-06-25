import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";
import { useParams } from "react-router-dom";
import fireDb from "./FireBase"
export default function AddUser() {

  const [arr, setArr] = useState({});
  const [obj, setObj] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });

  const { id } = useParams();
  
  useEffect(() => {
    fireDb.child("Data").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setArr({ ...snapshot.val() });
      } else {
        setArr({});
      }
    });
    return () => {
      setArr({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setObj({ ...arr[id] });
    } else {
      setObj({
        Name: "",
        Phone: "",
        Email: ""
      });
    }

    return () => {
      setObj({
        Name: "",
        Phone: "",
        Email: ""
      });
    };
  }, [id, arr]);


  function inputChange(e) {
    setObj({ ...obj, [e.target.name]: e.target.value });
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  function save(e) {
    e.preventDefault();
    
    if (
      obj.Name === "" ||
      obj.Phone === "" ||
      obj.Email === "" 
      
    ) 
    {toast.warn("Please Fill the Details",{
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1700
    })
    return;
    }
    else if (!validateEmail(obj.Email)) {
      toast.warn("Please Enter Valid email",{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1700
      })
      return;
    }
    else {
      if (!id) {
        fireDb.child("Data").push(obj, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Your data is saved successfully",{position: toast.POSITION.TOP_CENTER,
              autoClose: 1500});
            setObj({
              Name: "",
              Phone: "",
              Email: "",
            });
          }
        });
      } else {
        fireDb.child(`Data/${id}`).set(obj, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Your data has been updated successfully",{position: toast.POSITION.TOP_CENTER,
              autoClose: 1500});
            setObj({
              Name: "",
              Phone: "",
              Email: "",
            });
          }
        });
      }
    }
    
  }


  return (
    <>
      <div className="user-form">
      <div className="form">
        <h3 className="title">Add New User</h3>
        <div className="email">
          <label htmlFor="email">
            <ion-icon name="mail"></ion-icon>
          </label>
          <input
            value={obj.Email || ""}
            type="text"
            name="Email"
            placeholder="Email"
            onChange={inputChange}
          />
        </div>
        <div className="name">
          <label htmlFor="name">
            <ion-icon name="person-circle"></ion-icon>
          </label>
          <input
            value={obj.Name || ""}
            type="text"
            name="Name"
            placeholder="Name"
            onChange={inputChange}
          />
        </div>
        <div className="phone">
          <label htmlFor="phone">
            <ion-icon name="call"></ion-icon>
          </label>
          <input
            value={obj.Phone || ""}
            type="text"
            name="Phone"
            placeholder="Phone"
            onChange={inputChange}
          />
        </div>
        <div className="submit">
          <button className="btn" onClick={save}>
            Submit
          </button>
        </div>
      </div>
    </div>
        <ToastContainer/>
    </>
  );
}
