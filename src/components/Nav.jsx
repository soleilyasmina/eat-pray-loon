import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Eat. Pray. Loon.</Link>
      <Link to="/new">Let's Fly Away</Link>
    </nav>
  )
}

export default Nav;