import React, { Component } from 'react'
import TableRowContainer from '../../containers/TableRowContainer/TableRowContainer'
import ShortTableRowContainer from '../../containers/TableRowContainer/ShortTableRowContainer'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import '../Home/Home.scss'
import EditableInline from '../../containers/EditableInline/EditableInline'

const test = [{
    status: 'PUBLISHED',
    owner: 'nina.simone@gmail.com',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
{
    status: 'PUBLISHED',
    owner: 'nina.simone@gmail.com',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
]

export class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: test,
            filteredDate: [],
            inputValue: '',
            checkboxList: []
        }
    }

    handlePageChange = (value) => {
        this.setState({ page: value })
    }

    handleSortByStatus = (value) => {
        const newData = this.state.data.filter(el => {
            return el.status === value
        })
        this.setState({ filteredDate: newData })
    }

    handleHomePageSort = (value, sortBy) => {
        // const { filteredDate, data} = this.state
        // const toTheFilter = filteredDate.length === 0 ? data : filteredDate
        const newData = this.state.data.filter(el => {
            if (sortBy === 'users') {
                return el.owner === value
            } else if (sortBy === 'categories') {
                return el.categories === value
            } else if (sortBy === 'sites') {
                return el.sites === value
            }
        })
        this.setState({ filteredDate: newData })
    }

    handleSubtmit = (e) => {
        e.preventDefault()
        const value = this.state.inputValue.toLowerCase()
        const newData = this.state.data.filter(el => {
            return el.owner.toLowerCase().includes(value)
        })
        this.setState({ filteredDate: newData })

        console.log('hell0');
    }

    handleSearchBar = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    handleCheckbox = (e, item) => {
        if (e.target.checked) {
            this.setState({ checkboxList: [...this.state.checkboxList, item] })

        } else {
            const deleted = this.state.checkboxList.filter((el) => el.id !== item.id)
            this.setState({ checkboxList: deleted })
        }
    }

    handleEditableInlineStatus = (value) => {
        console.log(value);
    }

    handleEditableInlineDropDown = (value) => {
        console.log(value);
    }

    handleArrowSort = (value) => {
        console.log(value);
    }

    render() {
        return (
            <>
                <SearchContainer page={this.state.page} pageName={"WIDGETS"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handleSortByStatus={this.handleSortByStatus} handleHomePageSort={this.handleHomePageSort} handlePageChange={this.handlePageChange} />
                {this.state.checkboxList.length !== 0 && <EditableInline state={this.state} handleEditableInlineStatus={this.handleEditableInlineStatus} handleEditableInlineDropDown={this.handleEditableInlineDropDown} />}
                <div className='mainTableDiv'>
                    <ShortTableRowContainer data={test} pageName={'widgets'} handleArrowSort={this.handleArrowSort} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} />
                    <TableRowContainer data={test} pageName={'widgets'} handleArrowSort={this.handleArrowSort} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} />
                </div>
            </>
        )
    }
}

export default Widgets
