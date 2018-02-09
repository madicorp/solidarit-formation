import React from 'react';
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
        FormationStore.loadFormations();
        FormationStore.loadFormationTypes();
    }


    componentWillMount() {
        FormationStore
            .on("formations", this.formationsListener.bind(this))
            .on("formationTypes", this.formationTypesListener.bind(this))
    }
    componentWillUnmount(){
        FormationStore
            .removeListener("formations", this.formationsListener)
            .removeListener("formationTypes", this.formationTypesListener);
    }

    formationsListener(){
        this.setState({
            formations: FormationStore.getFormations()
        });
    }
    formationTypesListener(){
        this.setState({
            formationTypes: FormationStore.getFormationTypes()
        });
    }


    renderTypeCard(type) {
        const {ID, name, description, image_meta} = type;
        return (
            <div key={guid()} className="wpb_column vc_column_container vc_col-sm-3">
                <div className="vc_column-inner ">
                    <div className="wpb_wrapper">
                        <div className="kd-photobox opacity-effect">
                            <a href="#" title={name}>
                                <FormationImage id={image_meta[0] || 0} title={name}/>
                                <div className="phb-content text-center">
                                    <h4>{name}</h4>
                                    <p>{description}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {title} = this.props;
        const {formationTypes} = this.state;
        return (
            <div  className="vc_row wpb_row vc_row-fluid padding_top_50">
                <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner ">
                        <div className="wpb_wrapper">
                            <h4 className="box-title">{title}</h4>
                            <div className="vc_row wpb_row vc_inner vc_row-fluid container">
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