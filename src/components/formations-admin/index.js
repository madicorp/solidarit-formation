import React from 'react';
import AdminHeader from 'components/wp/admin-header';
import Table from 'components/wp/table';
import Button from 'components/wp/button';


require('./style.scss');

export default class FormationAdmin extends React.Component {

    constructor() {
        super();
        this.ajoutFormation = this.ajoutFormation.bind(this);
        this.supprimerFormation = this.supprimerFormation.bind(this);
        this.afficherFormation = this.afficherFormation.bind(this);
        this.state = {
            view: "formation",
            formations: [
                {id: 1, name: "test 1", date: "03/12/2017"},
                {id: 2, name: "test 2", date: "04/12/2017"},
                {id: 3, name: "test 3", date: "05/12/2017"}
            ],
            currentFormation: {}
        }
    }

    ajoutFormation() {
        let formation = {
            id: this.state.formations.length + 1,
            name: this.refs.nomFormation.value,
            date: "05/12/2017"
        };
        let formations = this.state.formations;
        formations.push(formation);
        this.setState({
            formations: formations,
        });
        this.refs.nomFormation.value = "";
    }

    afficherFormation(id) {
        let formation = this.state.formations.find((f) => {
            return f.id === id
        });
        this.setState({view: "single", currentFormation: formation});
    }

    supprimerFormation() {

    }

    renderFormation() {
        let formations = this.state.formations;
        let actions = {
            list: this.afficherFormation,
            delete: this.supprimerFormation
        };

        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="todolist">
                        <h2>Formations</h2>
                        <input type="text" ref="nomFormation" className="form-control add-todo"
                               placeholder="Ajouter Formation"/>
                        <Button type="primary" action={this.ajoutFormation}>Ajouter</Button>
                        <div className="spacer-50"></div>
                        <Table items={formations} actions={actions}/>
                    </div>
                </div>
            </div>
        );
    }

    renderSingleFormation() {
        let formation = this.state.currentFormation;
        return (
            <div>
                <h1>{formation.name}</h1>
                <Button type="primary" action={() => this.setState({view: "formation"})}>
                    {"<<"} Retour sur Formations
                </Button>
                <div className="row">
                    <div className="col-md-3">
                        <div className="todolist">
                            <h2>{formation.name}</h2>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="todolist">
                            <h2>Hello</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderView() {
        let view = this.state.view;

        switch (view) {
            case "formation":
                return this.renderFormation();
            case "single":
                return this.renderSingleFormation();
            default:
                console.log(view, "here");
                return this.renderFormation();
        }
    }

    render() {
        return (
            <div className="wp-styleguide">
                <AdminHeader>
                    Gestion des Formations
                </AdminHeader>
                {this.renderView()}
            </div>
        );
    }

}
