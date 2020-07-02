import React, { useState } from "react";
import {auth} from "./firebase";
import profile from './img/circle-10.svg' // relative path to image
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Profile from "./Profile";
import Builder from "./Builder";
import Viewer from "./Viewer";
import Print from "./Print";
import Preview from "./Preview";
import Share from "./Share";


const Home = ({user}) => {
  console.log(user)
  //const {photoURL, displayName, email, name, first, rezzes, activeRezz} = user;
  const [color, setColor] = useState('rezzi');
  const [nav, setNav]     = useState('viewer');
  const [modal, setModal] = useState('');
  const [step, setStep] = useState('General');
  const modalActive  = modal === "addRezz" ? "active" : "";

  const viewer  = nav === "viewer" ? "navItem active" : "navItem";
  const print   = nav === "print" ? "navItem active" : "navItem";
  const preview = nav === "preview" ? "navItem active" : "navItem";
  const share   = nav === "share" ? "navItem active" : "navItem";
  const profile = nav === "profile" ? "active" : "";

  function openModal(modalName, stepName){
    setModal(modalName)
    setStep(stepName)
  }

  function updateColor(newColor) {
    setColor(newColor);
  }


    return (

    <Router>
      <div id={color}>
        <div id="modal" className={modalActive}>
          {modal === "addRezz" && <Builder closeModal={() => setModal('')} updateColor={() => setColor()}  stepName={step}  updateStep={setStep} colorName={color}/>}
        </div>
        <nav id="topNav">
          <div id="menu"></div>
          <div id="brand"
           onClick={() => setNav('viewer')}
          >
          </div>
          <nav id="navBar">
            <div
              className={viewer}
              id="viewer"
              onClick={() => setNav('viewer')}
              value="viewer"
            >
              <span>View</span>
            </div>

            <div
            className={preview}
            id="preview"
            onClick={() => setNav('preview')}
            value="preview"
            >
              <span>Preview</span>
            </div>
            <div
            className={print}
            id="print"
            onClick={() => setNav('print')}
            value="print"
            >
              <span>PDF</span>
            </div>
            <div className={share} id="share" onClick={() => setNav('share')} value="share"><span>Share</span></div>
          </nav>
           <div id="profile" className={profile}  onClick={() => setNav('profile')}  value="profile">
           <div
               style={{
                // background: `url(${photoURL || profile})  no-repeat center center`,
                 backgroundSize: "cover",
                 height: "38px",
                 width: "38px"
               }}
               className="wide"
             ></div>
           </div>
        </nav>
        <div id='nameBar'
        className='color1'>RezzLink name<div className='arrowDown'></div><div className='addNew' onClick={() => openModal('addRezz', 'General')}
        >+</div><div className='yourRezzes'></div></div>
        <div id="sectionTitle" className="">
          <div className="titleArea">Education</div>
          <div className="close" id="closeCard"></div>
        </div>

        <main>
           {nav === "viewer" && <Viewer />}
           {nav === "print" && <Print />}
           {nav === "preview" && <Preview />}
           {nav === "share" && <Share />}
           {nav === "profile" && <Profile />}
       </main>
      </div>
    </Router>
    );
};


export default Home;
