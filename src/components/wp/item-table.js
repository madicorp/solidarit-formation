import React from 'react';

export default class ItemTable extends React.Component {
    render() {
        let id = this.props.item.id;
        let name = this.props.item.name;
        let date = this.props.item.date;
        let list = this.props.actions.list;
        let del = this.props.actions.delete;
        return (
            <tr>
                <td className="title column-title has-row-actions column-primary"
                    data-colname="Fichier">
                    <strong className="has-media-icon">
                        <a onClick={list.bind(null, id)} href="#">
                            {name}
                        </a>
                    </strong>
                    <div className="row-actions">
                        <span className="edit">
                            <a href="#" onClick={list.bind(null, id)}>
                                Modifier
                            </a> |
                        </span>
                        <span className="delete">
                            <a href="#" className="submitdelete aria-button-if-js" onClick={del.bind(null, id)} role="button">
                                Supprimer définitivement
                            </a> |
                        </span>
                    </div>
                    <button type="button" className="toggle-row">
                        <span className="screen-reader-text">Afficher plus de détails</span>
                    </button>
                </td>
                <td className="date column-date" data-colname="Date">
                    Publié<br/>
                    <abbr title="03/12/2017 4 h 26 min 53 s">{date}</abbr>
                </td>
            </tr>
        );
    }
}