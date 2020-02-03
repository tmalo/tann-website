import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'


const Footer = () => (
    <footer className="footer">

      <Row>
      <Col sm={3}>
        <ul className="social">
          <li>
            <Link href="https://twitter.com/TannKonprann" prefetch={false}><a>
            <FontAwesomeIcon icon={['fab', 'twitter']} size="xs" /> @TannKonprann
          </a></Link>
          </li>
          <li>
          <Link href="https://twitter.com/timalo_officiel" prefetch={false}><a>
            <FontAwesomeIcon icon={['fab', 'twitter']} size="xs" /> @timalo_officiel
          </a></Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/timalo_officiel/" prefetch={false}><a>
              <FontAwesomeIcon icon={['fab', 'instagram']} size="xs"  /> @timalo_officiel
            </a></Link>
          </li>
                  </ul>
        
        </Col>

        <Col>
          <ul className="links">
            <li>
              <Link href="https://www.timalo.com/" prefetch={false}><a>
                Le Blog
              </a></Link>
            </li>
            <li>
              <Link href="https://www.timalo.com/boutique/" prefetch={false}><a>
                La Boutique</a></Link>
            </li>
            <li>
              <Link href="https://www.timalo.com/decouvrir-timalo/" prefetch={false}><a>
                Découvrir TiMalo</a></Link>
            </li>
          </ul>
        </Col>
        </Row>
        <Row className="text-center">
        <Col>
          <p>&copy; TiMalo - Plume Magique 2019-2020</p>
        </Col>
        </Row>
    </footer>
  )
  
  export default Footer