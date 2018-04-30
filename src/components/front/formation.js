import React from 'react';
import MainStore from '../../stores/MainStore';
import FormationStore from '../../stores/FormationStore';
import FormationImage from './formationImage';

import moment from 'moment';
import FrontModal from './modal';
import $ from 'jquery';


export default class Formation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formations: [],
            formationTypes: []
        };
        this.formationsListener.bind(this);
        this.formationTypesListener.bind(this);
        /*this.mainStore = new MainStore();
        this.mainStore.authentication();*/
        FormationStore.loadFormations();
        FormationStore.loadFormationTypes();

    }


    componentWillMount() {
        /*this.mainStore.on("authenticated", ()=> {
            FormationStore.loadFormations();
            FormationStore.loadFormationTypes();
        });*/
        FormationStore
            .on("formations", this.formationsListener.bind(this))
            .on("formationTypes", this.formationTypesListener.bind(this))
    }

    componentWillUnmount() {
        FormationStore
            .removeListener("formations", this.formationsListener)
            .removeListener("formationTypes", this.formationTypesListener);
    }

    formationsListener() {
        this.setState({
            formations: FormationStore.getFormations()
        });
    }

    formationTypesListener() {
        this.setState({
            formationTypes: FormationStore.getFormationTypes()
        });
    }


    renderTypeCard(type) {
        const {term_id, name, description, image_meta} = type;
        return (
            <div key={guid()} className="wpb_column vc_column_container vc_col-sm-3">
                <div className="vc_column-inner ">
                    <div className="wpb_wrapper">
                        <div className="kd-photobox opacity-effect">
                            <a href="#" title={name}>
                                <FormationImage id={image_meta[0] || 0} title={name}/>
                                <div className="phb-content text-center">
                                    <h4>{name}</h4>
                                    <h6>[code - {term_id}]</h6>
                                    <p>{description.substring(0, 200) + ' ...'}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {title, type} = this.props;
        let selectedFormationTypes = [];
        this.state.formations.filter((formation) => {
            let filter = false;
            if (type === "previous")
                filter = moment.unix(formation.post_start_date[0]).isBefore(moment());
            else
                filter = moment.unix(formation.post_start_date[0]).isAfter(moment());
            if (filter)
                formation.formation_type.forEach((_type) => {
                    selectedFormationTypes.push(_type.term_id)

                });
            return filter;
        });
        const formationTypes = this.state.formationTypes.filter((formationType) => {
            return selectedFormationTypes.includes(formationType.term_id);
        });
        return (
            <div className="vc_row wpb_row vc_row-fluid padding_top_20">
                <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner ">
                        <div className="wpb_wrapper">
                            <h4 className="box-title">{title}</h4>
                            <div className="vc_row wpb_row vc_idier vc_row-fluid container">
                                {formationTypes.map((type) => {
                                    return this.renderTypeCard(type);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}