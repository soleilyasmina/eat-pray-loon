import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL, config } from "../services";

function Destination(props) {
  const byeByeBirdie = async () => {
    // make our specific URL
    const specificURL = `${baseURL}/${props.destination.id}`;
    // make our request to the URL
    await axios.delete(specificURL, config);
    // setToggleFetch to trigger our useEffect
    props.setToggleFetch((curr) => !curr);
  }

  // same as const country = props.destination.fields.country;
  const { attractions, country, season } = props.destination.fields;
 
  return (
    <div>
      <h3>{country}</h3>
      <h4>{season}</h4>
      <h5>{attractions}</h5>
      <button onClick={byeByeBirdie}>YEET</button>
      <Link to={`/edit/${props.destination.id}`}>
        <button>OooohAhhhh</button>
      </Link>
    </div>
  )
}

export default Destination;