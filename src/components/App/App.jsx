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
import PreviewSend from "../PreviewSend/PreviewSend";
import AdminOverview from "../AdminOverview/AdminOverview";
import BoxSetupInformation from "../BoxSetupInformation/BoxSetupInformation";
import BoxSetupDesign from "../Boxdesign/BoxSetupDesign";
import RecipientBox from "../RecipientBox/RecipientBox";
import RecipientPhotos from "../RecipientPhotos/RecipientPhotos";
import RecipientLetters from "../RecipientLetters/RecipientLetters";
import RecipientVoiceNotes from "../RecipientVoiceNotes/RecipientVoiceNotes";
import RecipientGifts from "../RecipientGifts/RecipientGifts";
import RecipientMixtape from "../RecipientMixtape/RecipientMixtape";
import RecipientVideos from "../RecipientVideos/RecipientVideos";
import ThankYouPage from "../ThankYouPage/ThankYouPage";
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
          {/* Public Routes */}
          <Route exact path="/about">
            {/* Shows AboutPage at all times (logged in or not) */}
            <AboutPage />
          </Route>
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
          {/* Protected Routes */}
          <ProtectedRoute exact path="/user">
            {/* If logged in, shows UserPage, else shows LoginPage */}
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/info">
            {/* If logged in, shows AccountInfo page, else shows LoginPage */}
            <AccountInfo />
          </ProtectedRoute>
          <ProtectedRoute exact path="/imageUpload">
            {/* If logged in, shows Photos page else shows LoginPage */}
            <Photos />
          </ProtectedRoute>
          <ProtectedRoute exact path="/videoUpload">
            {/* If logged in, shows Videos page else shows LoginPage */}
            <Videos />
          </ProtectedRoute>
          <ProtectedRoute exact path="/letterUpload">
            {/* If logged in, shows Letters page else shows LoginPage */}
            <Letters />
          </ProtectedRoute>
          <ProtectedRoute exact path="/voiceUpload">
            {/* If logged in, shows VoiceRecording page else shows LoginPage */}
            <VoiceRecording />
          </ProtectedRoute>
          <ProtectedRoute exact path="/previewSend">
            {/* If logged in, shows PreviewSend page else shows LoginPage */}
            <PreviewSend />
          </ProtectedRoute>
          <ProtectedRoute exact path="/adminOverview">
            {/* If logged in, shows AdminOverview page else shows LoginPage */}
            <AdminOverview />
          </ProtectedRoute>
          {/* Box setup and recipient routes */}
          <Route exact path="/box-setup-information">
            {/* Shows BoxSetupInformation page */}
            <BoxSetupInformation />
          </Route>
          <Route exact path="/box-setup-design">
            {/* Shows BoxSetupDesign page */}
            <BoxSetupDesign />
          </Route>
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
          <Route exact path="/recipient/letters">
            {/* Shows RecipientLetters page */}
            <RecipientLetters />
          </Route>
          <Route exact path="/recipient/voice-notes">
            {/* Shows RecipientVoiceNotes page */}
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
          <Route exact path="/thankyou/:id">
            {/* Shows ThankYouPage */}
            <ThankYouPage />
          </Route>
          {/* Catch-all for unmatched routes */}
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
