import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { sign } from 'nacl-signature';
import md5 from 'md5';
import Logger from '../utils/logger';

export default class MailchimpForm extends React.Component {
    constructor(props) {
        super();
        this.url='';
        this.state = {
            fname: '',
            lname: '',
            email: '',
            b_b97a79158f6205e5b1a79a8f0_6623aaab9f: '',
            modalContent: '',
            modalShow: false
        };

        this.url = props.url;
        this.server = props.server || '';
    }

    handleClose = () => this.setState({modalShow: false});
    handleChange = (e) => {
        /*
          e.target.name match key in state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

    showFeedback(content) {
        this.setState({modalContent: {__html: content}});
        this.setState({modalShow: true});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //e.stopPropagation();

        Logger.info("submitting...");

        const user = {
            EMAIL: this.state.email,
            FNAME: this.state.fname,
            LNAME: this.state.lname,
            b_b97a79158f6205e5b1a79a8f0_6623aaab9f: this.state.b_b97a79158f6205e5b1a79a8f0_6623aaab9f
          };
        const asstring = JSON.stringify(user);
        const signature = md5(asstring);
        Logger.debug('secret key : '+ process.env.CLIENT_SECRETKEY);
        var content = { 
          data: user, 
          signature: sign(signature, process.env.CLIENT_SECRETKEY)
        };
        axios.post(this.server + '/nl/user', content)
        .then((response)=> {
            Logger.info('...response received');
            Logger.debug(response);
            var rep = response.data;
            if (rep.result != "success") {
                this.showFeedback("L'inscription ne semble pas avoir fonctionné.<br/>Rendez-vous sur <a href='http://eepurl.com/bflQEb'>cette adresse</a> pour vous inscrire");
              } else {
                this.showFeedback("Félicitations, vous êtes inscrit.");
            }
      })
          .catch(function (error) {
            Logger.error(error);
          });
    }

    render() {
        return (
            <>
            <form onSubmit={this.handleSubmit} className="form-inline validate" validate="true" >
                    <div className="form-group col-md-3">
                      <label htmlFor="mce-FNAME" className="sr-only">Pr&eacute;nom</label>
                      <input type="text" className="form-control mb-2" name="fname" 
                         onChange={this.handleChange}
                        id="mce-FNAME" placeholder="Prenom" required />
                      <div className="sr-only invalid-feedback">Prénom obligatoire.</div>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="mce-LNAME" className="sr-only">Nom</label>
                      <input type="text" className="form-control mb-2" name="lname" 
                        onChange={this.handleChange}
                        id="mce-LNAME" placeholder="NOM" required />
                      <div className="sr-only invalid-feedback md-2">Nom obligatoire.</div>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="mce-EMAIL" className="sr-only">Email</label>
                      <input type="email" className="form-control mb-2" name="email" 
                        onChange={this.handleChange}
                        id="mce-EMAIL" placeholder="Email"required />
                      <div className="sr-only invalid-feedback">E-mail obligatoire.</div>
                    </div>
                  <div className="form-group  col-md-3 align-self-end text-right align-top">
                    <button type="submit" id ="nlsubmit" name="Subscribe" className="mb-2 btn btn-danger border-white ">
                        S"inscrire</button>
                  </div>
                  <div id="mce-responses" className="clear">
                    <div className="response" id="mce-error-response" style={{display:'none'}}></div>
                    <div className="response" id="mce-success-response" style={{display:'none'}}></div>
                    </div>    
                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                        <input type="text" name="b_b97a79158f6205e5b1a79a8f0_6623aaab9f" 
                            onChange={this.handleChange}

                            tabIndex="-1" value=""/>
                    </div>
            </form>

            <Modal animation centered show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Votre inscription !</Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={this.state.modalContent} />
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          </>
        )
    }
}
