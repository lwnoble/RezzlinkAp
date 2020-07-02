import React, { useState } from "react";
import SignIn from './SignIn'
import SignUp from './SignUp'
import Button from 'react-bootstrap/Button'


const SignInUp = () => {
    const [sign, setSign]   = useState('signUp');
    const colorSlide     = sign === "signUp" ? "color1 signUp" : "color1 signIn";
    const signUpMessage  = sign === "signUp" ? "message signUpMessage active" : "message signUpMessage";
    const signInMessage  = sign === "signIn" ? "message signInMessage active" : "message signInMessage";
    const signForm       = sign === "signIn" ? "signIn" : ""

      return(  
      <div id="rezzi" className="signInUp">
        <div id="signInNav" class={signForm}><div className="brandName"></div></div> 
        <div id="colorSlider" className={colorSlide}></div>

        <div className={signUpMessage}>
            <div className="messageBox">
                <h1>Welcome back</h1>
                <p>Already have an account? </p>
                <Button className="btn-white"  onClick={() => setSign('signIn')}>Sign in</Button>
            </div>    
        </div>
        <div className={signInMessage}>
            <div className="messageBox">
                <h1>Hello friend</h1>
                <p>Looking to create an account.<br/>Start your journey.</p>
                <Button className="btn-white"   onClick={() => setSign('signUp')}>Sign up</Button>
            </div>    
        </div>

        <main className={signForm}>
           {sign === "signIn" && <SignIn />}
           {sign === "signUp" && <SignUp />}
        </main>
      </div>
    );
}

export default SignInUp;
