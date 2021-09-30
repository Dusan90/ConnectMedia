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
            countPerPage: 10,
            selectedSiteSearch: '',
            selectedCategorieSearch: '',
            confirmMessage: false,
            idForDelete: '',

            dataToRender: [],
            mamxPages: '',
            loading: true

        }
    }

    paginate = (page) => {
        const { countPerPage, filteredDate, data } = this.state
        const dataToRender = filteredDate ? filteredDate : data
        let limit = countPerPage;
        let pages = Math.ceil(dataToRender.length / countPerPage);
        const offset = (page - 1) * limit;
        const newArray = dataToRender.slice(offset, offset + limit);

        this.setState({
            dataToRender: newArray,
            loading: false,
            maxPages: pages,
        });
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
            setTimeout(() => {
                this.paginate(1)
            });
        }

    }

    handleSortByStatus = (value) => {
        const newData = this.state.data.filter(el => {
            if (el.status === value) {
                return el
            }
        })
        this.setState({ filteredDate: newData })
        setTimeout(() => {
            this.paginate(1)
        });
    }

    handleHomePageSort = (value, sortBy) => {
        if (!this.state.addButtonClicked) {
            if (sortBy === 'categories') {
                const newData = this.state.data.filter(a => a.categories.find((el) => el.id === value.id))
                this.setState({ filteredDate: newData })
                setTimeout(() => {
                    this.paginate(1)
                });
            } else {
                const newData = this.state.data.filter(el => {
                    if (sortBy === 'users') {
                        if (el.owner.id === value.id) {
                            return el
                        }
                    } else if (sortBy === 'sites') {
                        console.log(value);
                        if (el.site.id === value.id) {
                            return el
                        }
                    }
                })

                this.setState({ filteredDate: newData })
                setTimeout(() => {
                    this.paginate(1)
                });
            }

        }


    }

    handleSubtmit = (e) => {
        e.preventDefault()
        const value = this.state.inputValue.toLowerCase()
        const newData = this.state.data.filter(el => {
            return el.site.name.toLowerCase().includes(value)
        })
        this.setState({ filteredDate: newData })

        setTimeout(() => {
            this.paginate(1)
        });
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

    handlePageChange = (value) => {
        this.setState({ page: value })
        this.paginate(value)
    }


    handleArrowSort = (sortByClicked, value) => {
        // ovde moras da imas 2 parametra, moras da prosledis naziv po kome ce se sortirati i drugi je 'up' ili 'down' po tome ces znati koji arrow je kliknut
        console.log(sortByClicked, value);
        if (value === 'Up') {
            const sorted = this.state.data.sort((a, b) => {
                console.log(typeof a[sortByClicked], a, b[sortByClicked]);
                if (typeof a[sortByClicked] === "string" || typeof b[sortByClicked] === "string") {
                    console.log('pokrece se');
                    return b[sortByClicked]?.localeCompare(a[sortByClicked])
                } else if (typeof a[sortByClicked] === "object" || typeof b[sortByClicked] === "object") {
                    return b[sortByClicked]['name']?.localeCompare(a[sortByClicked]['name'])

                } else {
                    return b[sortByClicked] - a[sortByClicked]
                }
            })
            this.setState({ data: sorted })
            setTimeout(() => {
                this.paginate(1)
            });
        } else if (value === 'Down') {
            const sorted = this.state.data.sort((a, b) => {
                if (typeof a[sortByClicked] === "string" || typeof b[sortByClicked] === "string") {
                    return a[sortByClicked]?.localeCompare(b[sortByClicked])

                } else if (typeof a[sortByClicked] === "object" || typeof b[sortByClicked] === "object") {
                    return a[sortByClicked]['name']?.localeCompare(b[sortByClicked]['name'])

                }
                else {
                    return a[sortByClicked] - b[sortByClicked]
                }

            })
            this.setState({ data: sorted })
            setTimeout(() => {
                this.paginate(1)
            });
        }
    }

    handleHashArrowClick = (item) => {
        this.setState({ hashesArrowDown: !this.state.hashesArrowDown, hashesArrowWitchIsOn: item })
    }

    handleCountPerPage = (e) => {
        console.log(e.target.value);
        if (e.target.value === '' || e.target.value === '0') {
            this.setState({ countPerPage: 10 })
            setTimeout(() => {
                this.paginate(1)
            });
        } else {
            this.setState({ countPerPage: e.target.value })
            setTimeout(() => {
                this.paginate(1)
            });
        }
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
            setTimeout(() => {
                this.paginate(1)
            });
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
        const { selectedSiteSearch, data, filteredDate, loading } = this.state

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
                    {!loading && this.state.dataToRender.length !== 0 ? <ShortTableRowContainer data={this.state.dataToRender} state={this.state} handleTrashFunctionaliti={this.handleTrashFunctionaliti} handleHashArrowClick={this.handleHashArrowClick} pageName={'widgets'} handleArrowSort={this.handleArrowSort} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} /> : loading ? <p className='loadingOnShort' style={{ textAlign: 'center' }}>Loading...</p> : this.state.dataToRender.length === 0 && <p className='loadingOnShort' style={{ textAlign: 'center' }}>No data</p>}
                    {!loading && this.state.dataToRender.length !== 0 ? <TableRowContainer data={this.state.dataToRender} state={this.state} handleTrashFunctionaliti={this.handleTrashFunctionaliti} handleHashArrowClick={this.handleHashArrowClick} pageName={'widgets'} handleArrowSort={this.handleArrowSort} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} /> : loading ? <p className='loadingOnBig' style={{ textAlign: 'center' }}>Loading...</p> : this.state.dataToRender.length === 0 && <p className='loadingOnBig' style={{ textAlign: 'center' }}>No data</p>}
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
