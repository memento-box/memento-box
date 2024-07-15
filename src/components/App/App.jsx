import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Modal from 'react-modal';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Photos from '../Photos/Photos';
import Videos from '../Videos/Videos';
import Letters from '../Letters/Letters';
import VoiceRecording from '../VoiceRecording/VoiceRecording';
import RecipientBox from '../RecipientBox/RecipientBox';
import RecipientPhotos from '../RecipientPhotos/RecipientPhotos';
import RecipientLetters from '../RecipientLetters/RecipientLetters';
import RecipientVoiceNotes from '../RecipientVoiceNotes/RecipientVoiceNotes';
import RecipientGifts from '../RecipientGifts/RecipientGifts';
import RecipientMixtape from '../RecipientMixtape/RecipientMixtape';
import RecipientVideos from '../RecipientVideos/RecipientVideos';

// Need to create these consolelog team
// import BoxSetupInformation from '../BoxSetupInformation/BoxSetupInformation';
// import BoxSetupDesign from '../BoxSetupDesign/BoxSetupDesign';
// import ContactUs from '../ContactUs/ContactUs';
// import MyBoxes from '../User/MyBoxes';

import './App.css';

// Setting the root element for the modal for accessibility
Modal.setAppElement('#react-root');

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  // Fetch user data on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* Routes for box-turtles */}
          <ProtectedRoute
            // logged in shows imageUpload page else shows LoginPage
            exact
            path="/imageUpload"
          >
            <Photos />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows videoUpload page else shows LoginPage
            exact
            path="/videoUpload"
          >
            <Videos />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows letterUpload page else shows LoginPage
            exact
            path="/letterUpload"
          >
            <Letters />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows voiceUpload page else shows LoginPage
            exact
            path="/voiceUpload"
          >
            <VoiceRecording />
          </ProtectedRoute>

          {/* Routes for console-log */}

          {/* <Route
            exact
            path="/box-setup-information"
          >
           <BoxSetupInformation />
          </Route>

          <Route
            exact
            path="/box-setup-design"
          >
            <BoxSetupDesign />
          </Route>

          <Route
            exact
            path="/contact-us"
          >
            <ContactUs />
          </Route>

          <ProtectedRoute
            exact
            path="/user/my-boxes"
          >
            <MyBoxes />
          </ProtectedRoute> */}

          {/* Routes for three-toed-turtles */}
          <Route exact path="/recipientbox">
            <RecipientBox />
          </Route>
          <Route exact path="/recipient/photos">
            <RecipientPhotos />
          </Route>
          <Route exact path="/recipient/videos">
            <RecipientVideos />
          </Route>
          <Route exact path="/recipient/voicenotes">
            <RecipientVoiceNotes />
          </Route>
          <Route exact path="/recipient/gifts">
            <RecipientGifts />
          </Route>
          <Route exact path="/recipient/mixtape">
            <RecipientMixtape />
          </Route>
          <Route exact path="/recipient/letters">
            <RecipientLetters />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
