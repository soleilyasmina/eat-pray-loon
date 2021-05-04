import { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Destination from "./components/Destination";
import Form from "./components/Form";
import Nav from "./components/Nav";
import { baseURL, config } from "./services";
import './App.css';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      const resp = await axios.get(baseURL, config);
      setDestinations(resp.data.records);
    }
    fetchDestinations();
  }, [toggleFetch]);

  return (
    <div className="App">
      <Nav />
      <Route exact path="/">
        <main>
          {destinations.map((destination) => (
            <Destination destination={destination} setToggleFetch={setToggleFetch} />
          ))}
        </main>
      </Route>
      <Route path="/new">
        <Form destinations={destinations} setToggleFetch={setToggleFetch} />
      </Route>
      <Route path="/edit/:id">
        <Form destinations={destinations} setToggleFetch={setToggleFetch} />
      </Route>
    </div>
  );
}

export default App;
