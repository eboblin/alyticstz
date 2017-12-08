import React, { Component } from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux'
import { createTable, createHeader } from './utils';

import { ColsFilter } from './colsfilter'



	
//main view
class App extends Component {

	constructor(props) {

		super(props);

		//no need to keep filter dialog state in store, so just adding state & handlers

		this.state = {
			filterVisibility: false,
			filterPosition: { x: 0, y: 0 }
		}

		this.handleOpenFilter = this.handleOpenFilter.bind(this);
		this.handleCloseFilter = this.handleCloseFilter.bind(this);	
	};

	handleOpenFilter (x,y) {
		this.setState({ filterVisibility: true, filterPosition: {x:x, y:y}});
	  }
	  
	handleCloseFilter () {
		this.setState({ filterVisibility: false });
	}


	render() {
		return (
			<div>				
				<ReactTable
					data={createTable()}
					columns={createHeader(this.props.store.columnsVisibility, this.handleOpenFilter)}
					showPagination={false}
					showPaginationBottom={false}
					showPageSizeOptions={false}
					sortable={false}
					defaultPageSize={5}
					className="-striped -highlight"
				/>

				<ColsFilter
					state={this.props.store.columnsVisibility}
					change={this.props.change}
					close={this.handleCloseFilter}
					position={this.state.filterPosition}
					visibility={this.state.filterVisibility}
				/>
			</div>
			);
	}

}

//connecting store
const mapStateToProps = state => {
	return {
		store: state
	}
  }
  
  const mapDispatchToProps = (dispatch) => {
	return {
	  change : (el) => dispatch({
		  type: 'CHANGE_COLUMN_VISIBILITY',
		  name: el  
		}),
	}
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);
