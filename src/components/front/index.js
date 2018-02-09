import React from 'react';
import CustomTimeline from './custom-timeline';
import moment from 'moment';
import FrontModal from './modal';
import Formation from './formation';
import $ from 'jquery';

require('./style.scss');




export default class Front extends React.Component {

    constructor() {
        super();
        moment.locale("fr");
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.timelineNavigation = this.timelineNavigation.bind(this);
        this.renderPreviousFormation = this.renderPreviousFormation.bind(this);
        this.renderTimeline = this.renderTimeline.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.state = {
            showModal: false,
            modalTitle: "title",
            modalBody: "body",
        };

        this.groups = [
            {id: 1, title: 'Formation 1'},
            {id: 2, title: 'Formation 2'},
            {id: 3, title: 'Formation 3'},
            {id: 4, title: 'Formation 4'},
            {id: 5, title: 'Formation 5'}
        ];


        this.itemProps = {
            // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            //onItemSelect: this.handleOpenModal
        };


        this.items = [
            {
                id: 1, group: 1, title: 'session 3 item 1',
                canMove: false, canResize: false, canChangeGroup: false,
                start_time: moment(), end_time: moment().add(9, 'hour'),
                itemProps: this.itemProps

            },
            {
                id: 2, group: 2, title: 'session 1 item 2',
                canMove: false, canResize: false, canChangeGroup: false,
                start_time: moment().add(12, 'hour'), end_time: moment().add(1, 'day').add(8, 'hour'),
                itemProps: this.itemProps

            },
            {
                id: 3, group: 3, title: 'session 2 item 3',
                canMove: false, canResize: false, canChangeGroup: false,
                start_time: moment().add(10, 'hour'), end_time: moment().add(1, 'day').add(5, 'hour'),
                itemProps: this.itemProps

            }, {
                id: 4, group: 4, title: 'session 5 item 2',
                canMove: false, canResize: false, canChangeGroup: false,
                start_time: moment().add(-0.5, 'hour'), end_time: moment().add(1, 'day').add(0.5, 'hour'),
                itemProps: this.itemProps

            },
            {
                id: 5, group: 5, title: 'session 1 item 3',
                canMove: false, canResize: false, canChangeGroup: false,
                start_time: moment().add(1, 'day').add(2, 'hour'), end_time: moment().add(1.5, 'day').add(3, 'hour'),
                itemProps: this.itemProps

            }
        ];

    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    renderModal() {
        let title = this.state.modalTitle;
        let body = this.state.modalBody;
        return (
            <FrontModal showModal={this.state.showModal}
                        handleCloseModal={this.handleCloseModal}
                        modalTitle={title}
                        modalBody={body}/>
        )
    }

    timelineNavigation(way) {
        let $elem = $(".rct-scroll");
        var leftPos = $elem.scrollLeft();
        switch (way) {
            case "right":
                $elem.scrollLeft(leftPos + 200);
                break;
            case "left":
                $elem.scrollLeft(leftPos - 200);
                break;
            default:
                break;
        }
    }

    renderTimeline() {
        const containerStyle = {
            background: "#fff !important"
        };
        return (
            <div style={containerStyle}
                 className="vc_row wpb_row vc_row-fluid padding_top_50  padding_bottom_150 background-grey">
                <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner ">
                        <div className="wpb_wrapper">
                            <h4 className="box-title">Calendrier des Formations</h4>
                            <p className="section-subheading">
                                Cliquer sur la session pour vous inscrire à la formation .
                            </p>
                            <div className="vc_row wpb_row vc_inner vc_row-fluid container">
                                <div className="wpb_column vc_column_container vc_col-sm-12">
                                    <div className="vc_column-inner ">
                                        <div className="wpb_wrapper">
                                            <div onClick={this.timelineNavigation.bind(null, "left")}
                                                 className="timeline-nav timeline-nav-left">
                                                <i className="fa fa-angle-left"/>
                                            </div>
                                            <div>
                                                <CustomTimeline groups={this.groups}
                                                                items={this.items}
                                                                itemTouchSendsClick={true}
                                                                onItemSelect={this.handleOpenModal}
                                                                defaultTimeStart={moment().add(-12, 'hour')}
                                                                defaultTimeEnd={moment().add(12, 'hour')}/>
                                            </div>
                                            <div onClick={this.timelineNavigation.bind(null, "right")}
                                                 className="timeline-nav timeline-nav-right">
                                                <i className="fa fa-angle-right"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderComingFormation() {
        return (
           <Formation title={"Formations à venir"}/>
        )
    }

    renderPreviousFormation() {
        return (
           <Formation title={"Historique formations"}/>
        )
    }

    render() {
        return (
            <div className="wpb_wrapper">
                {this.renderComingFormation()}
                {this.renderTimeline()}
                {this.renderPreviousFormation()}
                {this.renderModal()}
            </div>
        )
    }

}
