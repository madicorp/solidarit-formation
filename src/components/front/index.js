import React from 'react';
import CustomTimeline from './custom-timeline';
import moment from 'moment';
import FrontModal from './modal';
import Formation from './formation';
import $ from 'jquery';
import FormationStore from "../../stores/FormationStore";

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
        this.formationsListener.bind(this);
        this.formationTypesListener.bind(this);

        this.state = {
            showModal: false,
            modalTitle: "title",
            modalBody: "body",
            formationTypes: [],
            formations: [],
            selectedFormation: {},
            timeStart:moment().add(-2, 'day'),
            timeEnd:moment().add(7, 'day')

        };
    }

    componentWillMount() {
        FormationStore
            .on("formations", this.formationsListener.bind(this))
            .on("formationTypes", this.formationTypesListener.bind(this))
    }


    formationsListener() {
        const itemProps = {
            // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            //onItemSelect: this.handleOpenModal
        };
        const formations = FormationStore.getFormations();
        const items = formations.map((formation) => {
            return {
                id: formation.ID,
                group: formation.formation_type[0].term_id,
                title: formation.post_title,
                canMove: false, canResize: false, canChangeGroup: false,
                start_time: moment.unix(formation.post_start_date[0]),
                end_time: moment.unix(formation.post_end_date[0]),
                itemProps: itemProps,
                item: formation
            }
        });

        const lastFormation = items.reduce(
            (prev, current) => ((prev.start_time.isAfter(current.start_time)) ? prev : current)
        );
        const defaultTimeStart = this.state.timeStart;
        const timeStart = (lastFormation.start_time.isAfter(moment())) ? moment(lastFormation.start_time).add(-2, 'day') : defaultTimeStart ;
        const timeEnd = moment(timeStart).add(7, 'day');
        this.setState({
            formations: items,
            timeStart:timeStart,
            timeEnd:timeEnd
        });

    }

    formationTypesListener() {
        const types = FormationStore.getFormationTypes();
        const groups = types.map((type) => {
            return {id: type.term_id, title: `Frm [code - ${type.term_id}]`}
        });
        this.setState({
            formationTypes: groups
        });
    }

    handleOpenModal(itemId, event) {
        const formation = this.state.formations.find((formation) => {
            return formation.id === itemId
        });
        this.setState({showModal: true, selectedFormation: formation});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    renderModal() {
        let {selectedFormation} = this.state;
        return (
            <FrontModal showModal={this.state.showModal}
                        handleCloseModal={this.handleCloseModal}
                        item={selectedFormation}/>
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
        const {formationTypes, formations,timeStart,timeEnd} = this.state;
        return (
            <div style={containerStyle}
                 className="vc_row wpb_row vc_row-fluid padding_top_20  padding_bottom_150 background-grey">
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
                                                <CustomTimeline groups={formationTypes}
                                                                items={formations}
                                                                itemTouchSendsClick={true}
                                                                onItemClick={this.handleOpenModal}
                                                                onItemSelect={this.handleOpenModal}
                                                                visibleTimeStart={timeStart}
                                                                visibleTimeEnd={timeEnd}/>
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
            <Formation title={"Formations à venir"} type={"coming"}/>
        )
    }

    renderPreviousFormation() {
        return (
            <Formation title={"Historique formations"} type={"previous"}/>
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
