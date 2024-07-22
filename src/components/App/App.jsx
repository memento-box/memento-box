import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import AccountInfo from "../AccountInfo/AccountInfo";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Photos from "../Photos/Photos";
import Videos from "../Videos/Videos";
import Letters from "../Letters/Letters";
import VoiceRecording from "../VoiceRecording/VoiceRecording";
import RecipientBox from "../RecipientBox/RecipientBox";
import RecipientPhotos from "../RecipientPhotos/RecipientPhotos";
import RecipientLetters from "../RecipientLetters/RecipientLetters";
import RecipientVoiceNotes from "../RecipientVoiceNotes/RecipientVoiceNotes";
import RecipientGifts from "../RecipientGifts/RecipientGifts";
import RecipientMixtape from "../RecipientMixtape/RecipientMixtape";
import RecipientVideos from "../RecipientVideos/RecipientVideos";
import ThankYouPage from "../ThankYouPage/ThankYouPage";

// Need to create these consolelog team
import BoxSetupInformation from "../BoxSetupInformation/BoxSetupInformation";
// import ContactUs from '../ContactUs/ContactUs';
import BoxSetupDesign from "../Boxdesign/BoxSetupDesign";
// import MyBoxes from '../User/MyBoxes';

import "./App.css";
import PreviewSend from "../PreviewSend/PreviewSend";
import AdminOverview from "../AdminOverview/AdminOverview";

// Setting the root element for the modal for accessibility
Modal.setAppElement("#react-root");

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // Fetch user data on component mount
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Redirect root to /home */}
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
            // logged in shows AccountInfo page, else shows LoginPage
            exact
            path="/info"
          >
            <AccountInfo />
          </ProtectedRoute>

          <Route exact path="/login">
            {/* If the user is logged in, redirect to /home */}
            {user.id ? <Redirect to="/home" /> : <LoginPage />}
          </Route>
          <Route exact path="/registration">
            {/* If the user is logged in, redirect to /home */}
            {user.id ? <Redirect to="/home" /> : <RegisterPage />}
          </Route>
          <Route exact path="/home">
            {/* Always shows LandingPage */}
            <LandingPage />
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

          <ProtectedRoute exact path="/previewSend">
            <PreviewSend />
          </ProtectedRoute>

          <ProtectedRoute exact path="/adminOverview">
            <AdminOverview />
          </ProtectedRoute>

          {/* Routes for console-log */}

          <Route exact path="/box-setup-information">
            {/* Shows BoxSetupInformation page */}
            <BoxSetupInformation />
          </Route>
          <Route exact path="/box-setup-design">
            {/* Shows BoxSetupDesign page */}
            <BoxSetupDesign />
          </Route>

          <Route exact path="/contact-us">
            {/* Dont forget to take it off the comment */}
            {/* <ContactUs /> */}
          </Route>

          <ProtectedRoute exact path="/user/my-boxes">
            {/* Dont forget to take it off the comment */}

            {/* <MyBoxes /> */}
          </ProtectedRoute>

          {/* Routes for three-toed-turtles */}
          <Route exact path="/recipientbox/:id">
            {/* Shows RecipientBox page */}
            <RecipientBox />
          </Route>

          <Route exact path="/recipient/photos">
            {/* Shows RecipientPhotos page */}
            <RecipientPhotos />
          </Route>

          <Route exact path="/recipient/videos">
            {/* Shows RecipientVideos page */}
            <RecipientVideos />
          </Route>
          <Route exact path=" ">
            <RecipientVoiceNotes />
          </Route>

          <Route exact path="/recipient/gifts">
            {/* Shows RecipientGifts page */}
            <RecipientGifts />
          </Route>

          <Route exact path="/recipient/mixtape">
            {/* Shows RecipientMixtape page */}
            <RecipientMixtape />
          </Route>
          <Route exact path="/recipient/letters">
            <RecipientLetters />
          </Route>
          <Route exact path="/thankyou/:id">
            {/* Shows ThankYouPage */}
            <ThankYouPage />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404 - Not Found</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
