import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL, config } from "../services";

function Form(props) {
  const [country, setCountry] = useState("");
  const [season, setSeason] = useState("");
  const [attractions, setAttractions] = useState("");
  const params = useParams();

  useEffect(() => {
    // if we're editing (we have an id), and our destinations have loaded (we have more than 0)
    if (params.id && props.destinations.length) {
      // .find() the record with an id that matches our id in params
      const destination = props.destinations.find((destination) => destination.id === params.id);
      // if we find that record (if it exists)
      if (destination) {
        // set the country to that record's country etc.
        setCountry(destination.fields.country);
        setSeason(destination.fields.season);
        setAttractions(destination.fields.attractions);
      }
    }
  }, [props.destinations, params.id]);

  const handleSubmit = async (e) => {
    // prevent the default behavior of the submit event
    e.preventDefault();
    // assemble our object (country, season etc.)
    const newDestination = {
      country,
      season,
      attractions,
    };
    // make our request
    if (params.id) {
      const specificURL = `${baseURL}/${params.id}`;
      await axios.put(specificURL, { fields: newDestination }, config);
    } else {
      await axios.post(baseURL, { fields: newDestination }, config);
    }
    // ...what do we do? (😉)
    props.setToggleFetch((curr) => !curr);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="country">Country: </label>
      <input
        type="text"
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <label htmlFor="season">Season: </label>
      <input
        type="text"
        id="season"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      />
      <label htmlFor="attractions">Attractions: </label>
      <input
        type="text"
        id="attractions"
        value={attractions}
        onChange={(e) => setAttractions(e.target.value)}
      />
      <button type="submit">LEGGO</button>
    </form>
  );
}

export default Form;
