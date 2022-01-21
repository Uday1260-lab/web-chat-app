import React from 'react';
import firebase from 'firebase/app';
import { Col, Container,Button, Grid, Panel, Row, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
    const signInWithProvider = async (provider) => {
        try{
            const {additionalUserInfo,user} = await auth.signInWithPopup(provider);
            if(additionalUserInfo.isNewUser){
               await database.ref(`/profiles/${user.uid}`).set({
                   name: user.displayName,
                   createdAt: firebase.database.ServerValue.TIMESTAMP
               }); 
            }
            Alert.success("Signed in Successfully!!!" , 5000);
        } catch(err){
            Alert.error(err.message,5000)
        }
    };
    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider());
    };
    const onGoogleSignIn = () => {
        signInWithProvider( new firebase.auth.GoogleAuthProvider());
    };
  return <Container>
    
      <Grid className='mt-page'>
          <Row>
              <Col xs={24} md={12} mdOffset={6} >
                  <Panel>
                      <div className='text-center'>
                          <h2>Welcome to web-chat</h2>
                          <p>Progessive chat platform for neophytes</p>
                      </div>
                      <div className='mt-3'>
                          <Button block color="blue" appearance="primary" onClick={onFacebookSignIn}>
                              <i class="fab fa-facebook-square"></i>   Continue with Facebook
                          </Button>
                          <Button block color="green" appearance="primary" onClick={onGoogleSignIn}>
                              <i class="fab fa-google"></i>   Continue with Google
                          </Button>
                      </div>
                  </Panel>
              </Col>
          </Row>
      </Grid>
  </Container>;
};

export default SignIn;