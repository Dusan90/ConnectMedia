import React, { Component } from 'react'
import './Home.scss'
import ViewSectionCard from '../../containers/viewSections/ViewSectionCard'
import TableRowContainer from '../../containers/TableRowContainer/TableRowContainer'
import ShortTableRowContainer from '../../containers/TableRowContainer/ShortTableRowContainer'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import EditableInline from '../../containers/EditableInline/EditableInline'
import AddContainer from '../../containers/AddContainer/AddContainer'


const test = [
    {
        status: 'PUBLISHED',
        owner: 'nina.simone@gmail.com',
        nazivKorisnika: 'B92.net',
        hashes: ['test1', 'test2'],
        in: '11212',
        out: '2',
        txr: '0.02%',
        id: '1'
    },
    {
        status: 'PUBLISHED',
        owner: 'nina.simone@gmail.com',
        nazivKorisnika: 'B92.net',
        hashes: ['test1', 'test2'],
        in: '11212',
        out: '2',
        txr: '0.02%',
        id: '2'
    },
]

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: test,
            filteredDate: [],
            inputValue: '',
            checkboxList: [],
            hashesArrowDown: false,
            hashesArrowWitchIsOn: '',
            countPerPage: '',
            selectedUserSearch: '',
            selectedCategorieSearch: '',
            addButtonClicked: false

        }
    }

    handlePageChange = (value) => {
        this.setState({ page: value })
    }

    handleSortByStatus = (value) => {
        const newData = this.state.data.filter(el => {
            if (el.status === value) {
                return el
            }
        })
        this.setState({ filteredDate: newData })
    }

    handleHomePageSort = (value, sortBy) => {
        // const { filteredDate, data} = this.state
        // const toTheFilter = filteredDate.length === 0 ? data : filteredDate
        const newData = this.state.data.filter(el => {
            if (sortBy === 'users') {
                if (el.owner === value) {
                    return el
                }
            } else if (sortBy === 'categories') {
                if (el.categories === value) {
                    return el
                }
            } else if (sortBy === 'sites') {
                if (el.sites === value) {
                    return el
                }
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
        // ovde moras da imas 2 parametra, moras da prosledis naziv po kome ce se sortirati i drugi je 'up' ili 'down' po tome ces znati koji arrow je kliknut
        console.log(value);
    }

    handleHashArrowClick = (item) => {
        this.setState({ hashesArrowDown: !this.state.hashesArrowDown, hashesArrowWitchIsOn: item })
    }

    handleCountPerPage = (e) => {
        this.setState({ countPerPage: e.target.value })
    }

    handleSearchOnMainPage = (el, secondElement) => {
        if (secondElement === 'users') {
            this.setState({ selectedUserSearch: el })
        } else if (secondElement === 'categories') {
            this.setState({ selectedCategorieSearch: el })
        }
    }

    handleAddSomeMore = () => {
        this.setState({ addButtonClicked: !this.state.addButtonClicked })
    }

    render() {
        const { selectedUserSearch } = this.state
        return (
            <>
                <div className='mainDivForViewSection' style={{ marginTop: '44px' }}>
                    <div >
                        <ViewSectionCard label={'<p><span>Info categories </span> <br> on site <span>Novosti.rs</span></p>'} description={'<p>Following categories were disabled: <span> sport, vesti, zabava </span> <br> They were disabled because they have less than 2 posts.</p>'} customDescriptionStyle={{ backgroundColor: '#AEE8F0' }} customStyle={{ backgroundColor: '#94D7E0' }} />
                    </div>
                    <div style={{ marginTop: '17px' }}>
                        <ViewSectionCard label={'<p><span>Warning categories </span> <br> on site <span>Novosti.rs</span></p>'} description={'<p>Following categories were disabled: <span> sport, vesti, zabava </span> <br> They were disabled because they have less than 2 posts.</p>'} customDescriptionStyle={{ backgroundColor: '#EFF0AE' }} customStyle={{ backgroundColor: '#DFE094' }} />
                    </div>
                    <div style={{ marginTop: '17px' }}>
                        <ViewSectionCard label={'<p><span>Error categories </span> <br> on site <span>Novosti.rs</span></p>'} description={'<p>Following categories were disabled: <span> sport, vesti, zabava </span> <br> They were disabled because they have less than 2 posts.</p>'} customDescriptionStyle={{ backgroundColor: '#F0D2AE' }} customStyle={{ backgroundColor: '#E0B494' }} />
                    </div>
                </div>
                <SearchContainer handleAddSomeMore={this.handleAddSomeMore} page={this.state.page} handleSearchOnMainPage={this.handleSearchOnMainPage} state={this.state} handleCountPerPage={this.handleCountPerPage} pageName={"SITES"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handlePageChange={this.handlePageChange} handleSortByStatus={this.handleSortByStatus} handleHomePageSort={this.handleHomePageSort} />
                {this.state.addButtonClicked && <AddContainer>
                    {!selectedUserSearch && <p style={{ color: '#7befff', fontSize: '18px', alignSelf: 'center', padding: '0 10px' }}>Please choose owner.</p>}
                    {selectedUserSearch && <input type="text" placeholder='Enter site name' />}
                    {selectedUserSearch && <button><p>Create site</p></button>}
                </AddContainer>}

                {this.state.checkboxList.length !== 0 && <EditableInline state={this.state} handleEditableInlineStatus={this.handleEditableInlineStatus} handleEditableInlineDropDown={this.handleEditableInlineDropDown} />}
                <div className='mainTableDiv'>
                    <ShortTableRowContainer data={test} state={this.state} handleHashArrowClick={this.handleHashArrowClick} handleCheckbox={this.handleCheckbox} handleArrowSort={this.handleArrowSort} checkboxList={this.state.checkboxList} />
                    <TableRowContainer data={test} state={this.state} handleHashArrowClick={this.handleHashArrowClick} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} handleArrowSort={this.handleArrowSort} />
                </div>
            </>
        )
    }
}

export default Home
