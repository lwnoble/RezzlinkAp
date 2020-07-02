import React from "react";
import {auth} from "./firebase";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Profile= () => {
      return(
      <div>
        <Container>
          <Row>
            <Col>
              <h1>Profile</h1>
              <button className = "btn-primary color2" onClick = {() => {auth.signOut()}}>Sign out</button>

            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default Profile;
