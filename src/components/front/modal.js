import React from 'react';
import ReactModal from 'react-modal';


export default class FrontModal extends React.Component {

    constructor() {
        super();
        this.renderForm.bind(this);
        this.renderBody.bind(this);
    }

    renderForm() {
        return (
            <div role="form" className="wpcf7" lang="fr-FR" dir="ltr">
                <div className="modal-form-title">
                    <h4>Formulaire d'inscription</h4>
                </div>
                <div className="screen-reader-response"/>
                <form action="/solidarit-prod/formation/#wpcf7-f170-o1" method="post" className="wpcf7-form"
                      novalidate="novalidate">
                    <p>
                        <span className="wpcf7-form-control-wrap your-name">
                            <input type="text" name="your-name" value=""
                                   size="40"
                                   className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required col-md-6"
                                   aria-required="true" aria-invalid="false"
                                   placeholder="Nom"/>
                        </span>
                        <br/>
                        <span className="wpcf7-form-control-wrap your-phone">
                            <input type="tel" name="your-phone" value=""
                                   size="40"
                                   className="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel col-md-6"
                                   aria-required="true"
                                   aria-invalid="false"
                                   placeholder="Téléphone"/>
                        </span>
                        <br/>
                        <span className="wpcf7-form-control-wrap your-email">
                            <input type="email" name="your-email" value=""
                                   size="40"
                                   className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email col-md-12"
                                   aria-required="true"
                                   aria-invalid="false"
                                   placeholder="Email"/>
                        </span>
                        <br/>
                        <input type="submit" value="S'inscrire" className="wpcf7-form-control wpcf7-submit"/>
                        <span className="ajax-loader"/>
                    </p>
                    <div className="wpcf7-response-output wpcf7-display-none"/>
                </form>
            </div>
        )
    }

    renderBody() {
        return (
            <div className="es-accordion no-border modal-body">
                <div className="es-heading es-expanded">
                    <span className="es-time">
                        <i className="fa fa-clock-o"/>10:00 AM
                    </span>
                    <h4>
                        Badge pick-up &amp; breakfast
                    </h4>
                </div>
                <div className="panel-collapse collapse in" aria-expanded="true" role="tabpanel">
                    <div className="es-speaker-container">
                        <div className="es-speaker-img">
                            <img width="190" height="190"
                                 src="http://keydesign-themes.com/incubator/wp-content/uploads/2016/09/raymond-turner.png"
                                 className="attachment-full" alt=""
                                 srcSet="http://keydesign-themes.com/incubator/wp-content/uploads/2016/09/raymond-turner.png 190w, http://keydesign-themes.com/incubator/wp-content/uploads/2016/09/raymond-turner-150x150.png 150w"
                                 sizes="(max-width: 190px) 100vw, 190px"/>
                        </div>
                        <div className="es-speaker-name">Raymond Turner</div>
                        <div className="es-speaker-position">CEO - KeySoft</div>
                    </div>
                    <div className="es-session-desc">
                        <div className="es-desc-wrapper">
                            <p>
                                Mus accumsan venenatis hac curabitur per quis parturient vel ut a sit scelerisque a
                                sociis posuere penatibus. Nunc risus est nulla morbi, egestas lobortis dui maecenas
                                lacinia qui adipiscing, evget purus morbi, pellentesque ipsum tortor ipsum. Tincidunt
                                elit magnis nulla facilisis. Dolor sagittis maecenas.
                            </p>
                            <p>
                                Sapien nunc amet ultrices, dolores sit ipsum velit purus aliquet, massa fringilla leo
                                orci. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        let title = this.props.modalTitle;
        let body = this.props.modalBody;
        let handleCloseModal = this.props.handleCloseModal;
        let showModal = this.props.showModal;
        return (
            <ReactModal
                isOpen={showModal}
                contentLabel={title}
                className="modal-content">
                <div className="row">
                    <h2>
                        {title}
                        <span className="pull-right">
                            <a onClick={handleCloseModal} href="javascript:void(0)"><i className="fa fa-close"/></a>
                        </span>
                    </h2>
                    <div className="modal-content-inner">
                        <p className="modal-subheading">lorem ipsum subtitle</p>
                        <div className="row">
                            <div className="col-md-8 right-border background-white">
                                {this.renderBody()}
                            </div>
                            <div className="col-md-4">
                                {this.renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
        )
    }

}