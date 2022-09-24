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
    </>
  );
}

export default App;