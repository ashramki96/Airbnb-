import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import AllSpotsCurrentUser from "./components/AllSpotsCurrentUser";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className = "page-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route path="/current/spots">
            <AllSpotsCurrentUser />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          
        </Switch>
        
      )}
      </div>
      <footer className="footer">
          <div className="footer-about">
            <strong>Ashbnb, a clone of Airbnb. By Ashwin Ramakrishnan</strong>
          </div>
          <div className="footer-links">
            <a id="github" className="links-github" href="https://github.com/ashramki96/Rabbit-">
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
            <a id="linkedin" className="links-github" href="https://www.linkedin.com/in/ashwin-ramakrishnan-4910b9b1/">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
      </footer>
    </>
  );
}

export default App;