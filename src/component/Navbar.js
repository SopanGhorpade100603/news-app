import { Link} from 'react-router-dom';

const Navbar =()=> {
    return (
      <div>
         <nav className="navbar fixed-top navbar-expand-lg bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/"> NewsMonkey </Link>
            <button className="navbar-toggler" type="button"data-bs-toggle="collapse"data-bs-target="#navbarSupportedContent"aria-controls="navbarSupportedContent"aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span> </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white " aria-current="page" to="home" >Home </Link></li>
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/business">Business</Link></li>
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/entertainment">Entertainment</Link></li>
                {/* <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/general">General</Link></li> */}
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/health">Health</Link></li> 
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/science">Science</Link></li>
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/sport">Sport</Link></li>
                <li className="nav-item"> <Link className="nav-link navbar-brand text-white" to="/technology">Technology</Link></li>
               </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}
export default Navbar;