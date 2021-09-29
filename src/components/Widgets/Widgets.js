import React, { Component } from 'react'
import TableRowContainer from '../../containers/TableRowContainer/TableRowContainer'
import ShortTableRowContainer from '../../containers/TableRowContainer/ShortTableRowContainer'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import AddContainer from '../../containers/AddContainer/AddContainer'
import Select from 'react-select'
import { connect } from 'react-redux'
import '../Home/Home.scss'
import EditableInline from '../../containers/EditableInline/EditableInline'
import { GetWidgetsListActionRequest, DeleteWidgetActionRequest } from '../../store/actions/WidgetActions'

const test = [{
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

const optionss = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        flex: "1",
        fontWeight: "500",
        // background: "white",
        background: '#d6dbdc',
        // !props.organization && props.color && "rgb(245, 192, 192)",
    }),
    placeholder: () => ({
        color: 'black'
    })
};

export class Widgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: test,
            filteredDate: '',
            inputValue: '',
            checkboxList: [],
            hashesArrowDown: false,
            hashesArrowWitchIsOn: '',
            countPerPage: '',
            selectedSiteSearch: '',
            selectedCategorieSearch: '',
            confirmMessage: false,
            idForDelete: ''

        }
    }

    componentDidMount() {
        if (this.props.location?.data?.searchBy) {
            this.handleSearchOnMainPage(this.props.location?.data?.searchBy)
        }

        this.props.dispatch(GetWidgetsListActionRequest())

    }

    componentDidUpdate(prevProps) {
        const { getWidgetsList } = this.props
        const { loading: getWidgetsListLoading, error: getWidgetsListError, data: getWidgetsListData, errorData: getWidgetsListErrorData } = getWidgetsList



        if (prevProps.getWidgetsList !== getWidgetsList && !getWidgetsListLoading && !getWidgetsListError && getWidgetsListData) {
            this.setState({ data: getWidgetsListData.data })
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
            return el.site.toLowerCase().includes(value)
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

    handleHashArrowClick = (item) => {
        this.setState({ hashesArrowDown: !this.state.hashesArrowDown, hashesArrowWitchIsOn: item })
    }

    handleCountPerPage = (e) => {
        this.setState({ countPerPage: e.target.value })
    }

    handleAddSomeMore = () => {
        this.props.history.push({
            pathname: '/widgets/create',
            data: { buttonClicked: 'editDiv', createNew: true }
        })
    }

    handleSearchOnMainPage = (el, secondElement) => {
        if (this.props.location?.data?.searchBy) {
            const newData = this.state.data.filter((el) => {
                return el.site === el
            })
            this.setState({
                filteredDate: newData,
                selectedSiteSearch: el
            })
        } else {
            if (secondElement === 'sites') {
                this.setState({ selectedSiteSearch: el })
            } else if (secondElement === 'categories') {
                this.setState({ selectedCategorieSearch: el })
            }
        }
    }

    deletesiteFunction = () => {
        this.props.dispatch(DeleteWidgetActionRequest({
            id: this.state.idForDelete
        }))
    }

    handleTrashFunctionaliti = (id) => {
        console.log(id);
        this.setState({ confirmMessage: true, idForDelete: id })
    }

    render() {
        const { selectedSiteSearch, data, filteredDate } = this.state

        return (
            <>
                <SearchContainer page={this.state.page} handleSearchOnMainPage={this.handleSearchOnMainPage} handleAddSomeMore={this.handleAddSomeMore} state={this.state} handleCountPerPage={this.handleCountPerPage} pageName={"WIDGETS"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handleSortByStatus={this.handleSortByStatus} handleHomePageSort={this.handleHomePageSort} handlePageChange={this.handlePageChange} />
                {/* {this.state.addButtonClicked && <AddContainer> */}
                {/* {!selectedSiteSearch && <p style={{ color: '#7befff', fontSize: '18px', alignSelf: 'center', padding: '0 10px' }}>Please choose a site.</p>} */}
                {/* <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // isLoading={true}
                        placeholder='Select a widget to copy'
                        styles={customSelectStyles}
                        isClearable={true}
                        isSearchable={true}
                        name="merge"
                        options={optionss}
                    />
                    <button><p>Create widget</p></button> */}
                {/* </AddContainer>} */}

                {this.state.checkboxList.length !== 0 && <EditableInline state={this.state} handleEditableInlineStatus={this.handleEditableInlineStatus} handleEditableInlineDropDown={this.handleEditableInlineDropDown} />}
                {this.state.confirmMessage && <div className='confurmTextOnMani'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deletesiteFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                <div className='mainTableDiv'>
                    <ShortTableRowContainer data={data} state={this.state} handleTrashFunctionaliti={this.handleTrashFunctionaliti} handleHashArrowClick={this.handleHashArrowClick} pageName={'widgets'} handleArrowSort={this.handleArrowSort} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} />
                    <TableRowContainer data={data} state={this.state} handleTrashFunctionaliti={this.handleTrashFunctionaliti} handleHashArrowClick={this.handleHashArrowClick} pageName={'widgets'} handleArrowSort={this.handleArrowSort} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { WidgetReducer } = state;

    const { getWidgetsList } = WidgetReducer


    return {
        getWidgetsList,

    }
}

export default connect(mapStateToProps, null)(Widgets)
