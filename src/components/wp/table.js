import React from 'react';
import ItemTable from './item-table';


export default class Table extends React.Component {
    render() {
        let items = this.props.items;
        let actions = this.props.actions;
        console.log(actions);
        return (
            <table className="wp-list-table widefat fixed striped media">
                <thead>
                <tr>
                    <th scope="col" id="title" className="manage-column column-title column-primary">
                        <span>Nom</span>
                    </th>
                    <th scope="col" id="date" className="manage-column column-title column-primary">
                        <span>Date</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => <ItemTable key={item.id} item={item} actions={actions}/>)}
                </tbody>
                <tfoot>
                <tr>
                    <th scope="col" id="title" className="manage-column column-title column-primary">
                        <span>Nom</span>
                    </th>
                    <th scope="col" id="date" className="manage-column column-title column-primary">
                        <span>Date</span>
                    </th>
                </tr>
                </tfoot>
            </table>
        );
    }
}
