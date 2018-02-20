import React from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import FormationStore from '../../stores/FormationStore';
import $ from 'jquery';


export default class FrontModal extends React.Component {

    constructor() {
        super();
        this.handleRegistration.bind(this);
        this.renderAlertBox.bind(this);
        this.renderForm.bind(this);
        this.renderBody.bind(this);
        moment.locale("fr");
        this.state = {
            submited: false,
            status: "",
            message: ""
        };
        ReactModal.setAppElement('body');
        this.userIcon = "data:image/png;base64,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"
    }

    handleRegistration(event) {
        event.preventDefault();
        $(".ajax-loader").css("visibility", "visible");
        this.setState({
            submited: false,
        });
        const form = event.target;
        const data = new FormData(form);
        FormationStore.registration(data)
            .then(response => {
                this.setState({
                    submited: true,
                    status: "success",
                    message: "Votre Inscription a bien été pris en compte ."
                });
                form.reset();
            })
            .catch((error) => {
                this.setState({
                    submited: true,
                    status: "error",
                    message: "Nous rencontrons quelques erreurs, réessayez plutard ."
                });
                console.log("error", error);
            });
    }

    renderAlertBox() {
        $(".ajax-loader").css("visibility", "hidden");
        let {status, message} = this.state;
        const _class = (status === "success") ? "ab_success" : "ab_error";
        return (
            <div className="wpb_column vc_column_container vc_col-sm-12">
                <div className="vc_column-inner">
                    <div className="wpb_wrapper">
                        <div className={"kd-alertbox " + _class}>
                            <div className="ab-icon">
                                <i className="fa-check iconita"/>
                            </div>
                            <div className="ab-message">
                                <p></p><p>{message}</p><p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderForm() {
        const {ID} = this.props.item.item;
        return (
            <section role="form" className="wpcf7" lang="fr-FR" dir="ltr">
                <div className="modal-form-title">
                    <h4>Formulaire d'inscription</h4>
                </div>
                <div className="screen-reader-response"/>
                <form onSubmit={this.handleRegistration.bind(this)}
                      className="wpcf7-form">
                    <p>
                        <span className="wpcf7-form-control-wrap">
                            <input type="text" name="name"
                                   required={true}
                                   className="wpcf7-form-control wpcf7-text"
                                   placeholder="Nom"/>
                        </span>
                        <br/>
                        <span className="wpcf7-form-control-wrap">
                            <input type="email" name="email"
                                   required={true}
                                   className="wpcf7-form-control wpcf7-text
                                   wpcf7-email"
                                   placeholder="Email"/>
                        </span>
                        <br/>
                        <span className="wpcf7-form-control-wrap">
                            <input type="tel" name="phone"
                                   required={true}
                                   className="wpcf7-form-control wpcf7-text wpcf7-tel"
                                   placeholder="Téléphone"/>
                        </span>
                        <br/>
                        <input type="hidden" value={ID} name="formation"/>
                        <br/>
                        <input type="submit" value="S'inscrire" className="wpcf7-form-control
                        wpcf7-submit"/>
                        <span className="ajax-loader"/>
                    </p>
                </form>
            </section>
        )
    }

    renderBody() {
        const formation_type = this.props.item.item.formation_type[0];
        const {post_title, post_content, post_start_date, formation_speaker} = this.props.item.item;
        return (
            <div className="es-accordion no-border modal-body">
                <div className="es-heading es-expanded">
                    <span className="es-time">
                        <i className="fa fa-clock-o"/>{moment.unix(post_start_date[0]).format("LLLL")}
                    </span>
                </div>
                <div className="panel-collapse collapse in" aria-expanded="true" role="tabpanel">
                    <div className="es-speaker-container">
                        <div className="es-speaker-img">
                            <img width="190" height="190"
                                 src={this.userIcon}
                                 className="attachment-full" alt=""
                                 srcSet={this.userIcon + " 190w," + this.userIcon + "  150w"}
                                 sizes="(max-width: 190px) 100vw, 190px"/>
                        </div>
                        <div className="es-speaker-name">{formation_speaker[0].name}</div>
                        <div className="es-speaker-position">{formation_speaker[0].office}</div>
                    </div>
                    <div className="es-session-desc">
                        <div className="es-desc-wrapper">
                            <h5>{formation_type.name}</h5>
                            <p>{formation_type.description}</p>
                            <h5>{post_title}</h5>
                            <p dangerouslySetInnerHTML={{__html: post_content}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        if (!this.props.item.item) return (<div/>);
        else {
            const {title} = this.props.item;
            const formation_type = this.props.item.item.formation_type[0];
            let handleCloseModal = this.props.handleCloseModal;
            let showModal = this.props.showModal;
            const submited = this.state.submited;
            return (
                <ReactModal
                    isOpen={showModal}
                    contentLabel={title}
                    className="modal-content">
                    <div className="row">
                        <h2>
                            {title}
                            <span className="pull-right">
                            <a onClick={handleCloseModal} href="javascript:void(0)">
                                <i className="fa fa-close"/>
                            </a>
                        </span>
                        </h2>
                        <div className="modal-content-inner">
                            <p className="modal-subheading">{formation_type.name}</p>
                            <div className="row">
                                <div className="col-md-8 right-border background-white">
                                    {this.renderBody()}
                                </div>
                                <div className="col-md-4">
                                    {submited ? this.renderAlertBox() : ""}
                                    {this.renderForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            )
        }
    }

}