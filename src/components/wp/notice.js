import React from 'react';
import classNames from 'classnames';

export default class Notice extends React.Component{

	render() {
		const classes = classNames({
			notice: true,
			'notice-error': this.props.type === 'error',
			'notice-info': this.props.type === 'info',
			'notice-success': this.props.type === 'success',
		});

		return (
			<div className={ classes }>
				<p>{ this.props.children }</p>
			</div>
		);
	}

};
