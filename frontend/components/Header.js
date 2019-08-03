import Link from 'next/link'
import Image from 'react-bootstrap/Image';
import MdPages from './mdpages';

const Header = (props) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark bg-navbar">
      <Link href="/index">
        <a className="navbar-brand"><Image src='../static/logo.png' height='28px' /></a>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
          <Link href="/index">
            <a className="nav-link">Home <span className="sr-only">(current)</span></a>
            </Link>
          </li>
          <MdPages 
            itemClass="nav-item active" 
            linkClass="nav-link"
            pages={props.docs} />
        </ul>
      </div>

      <div>
      <Link href="https://www.timalo.com">
            <a className="nav-link">timalo.com</a>
            </Link>

      </div>
    </nav>
  </header>
) 

export default Header