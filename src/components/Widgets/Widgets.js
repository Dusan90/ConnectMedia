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
import { GetSitesListActionRequest } from '../../store/actions/SitesListAction'
import { GetCategoryListActionRequest } from '../../store/actions/CategoryAction'
import { GetUsersListActionRequest } from '../../store/actions/UsersActions'

import { NotificationManager } from 'react-notifications'
import { tSThisType } from '@babel/types'
import { filtering } from './Filtering'


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
            data: [],
            filteredDate: '',
            tipeSearch: '',
            inputValue: null,
            checkboxList: [],
            hashesArrowDown: false,
            hashesArrowWitchIsOn: '',
            countPerPage: 10,
            selectedSiteSearch: null,
            selectedCategorieSearch: null,
            selectedStatusSearch: null,
            confirmMessage: false,
            idForDelete: '',

            dataToRender: [],
            mamxPages: '',
            loading: true

        }
    }

    paginate = (page) => {
        const { countPerPage, data, tipeSearch, inputValue } = this.state
        // const dataToRender = (tipeSearch && inputValue) ? tipeSearch : data
        const dataToRender = data
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
        this.props.dispatch(GetWidgetsListActionRequest())

    }

    componentDidUpdate(prevProps) {

        const { selectedSiteSearch, selectedCategorieSearch, selectedStatusSearch, inputValue } = this.state
        const { getWidgetsList, deleteWidget, updateWidgetDetails, getSitesList, getCategoryList, getUsersList } = this.props
        const { loading: getWidgetsListLoading, error: getWidgetsListError, data: getWidgetsListData, errorData: getWidgetsListErrorData } = getWidgetsList
        const { loading: deleteWidgetLoading, error: deleteWidgetError, data: deleteWidgetData, errorData: deleteWidgetErrorData } = deleteWidget
        const { data: updateWidgetDetailsData, loading: updateWidgetDetailsLoading, error: updateWidgetDetailsError, errorData: updateWidgetDetailsErrorData } = updateWidgetDetails;

        const { loading: getSitesListLoading, error: getSitesListError, data: getSitesListData, errorData: getSitesListErrorData } = getSitesList
        const { loading: getCategoryListLoading, error: getCategoryListError, data: getCategoryListData } = getCategoryList
        const { loading: getUsersListLoading, error: getUsersListError, data: getUsersListData } = getUsersList


        if (prevProps.deleteWidget !== deleteWidget && !deleteWidgetError && !deleteWidgetLoading && deleteWidgetData) {
            NotificationManager.success("Widget successfully deleted", "Success", 2000);
            this.setState({ confirmMessage: false })
            this.props.dispatch(GetWidgetsListActionRequest())
        }



        if (prevProps.getWidgetsList !== getWidgetsList && !getWidgetsListLoading && !getWidgetsListError && getWidgetsListData) {

            if (selectedStatusSearch === null && selectedCategorieSearch === null && inputValue === null && selectedSiteSearch === null) {
                setTimeout(() => {
                    if (this.props.location?.data?.searchBy && getWidgetsListData.data) {
                        this.handleSearchOnMainPage(this.props.location?.data?.searchBy)
                    }
                    else if (this.props.location?.data?.searchByuser && getWidgetsListData.data) {
                        this.handleSearchOnMainPage(this.props.location?.data?.searchByuser)
                    } else if (this.props.location?.data?.searchBycategory && getWidgetsListData.data) {
                        this.handleSearchOnMainPage(this.props.location?.data?.searchBycategory)
                    }
                });
            }
            if (selectedStatusSearch || selectedCategorieSearch || selectedSiteSearch || inputValue) {
                this.setState({ data: filtering(getWidgetsListData.data, selectedStatusSearch, selectedCategorieSearch, selectedSiteSearch, inputValue) ? filtering(getWidgetsListData.data, selectedStatusSearch, selectedCategorieSearch, selectedSiteSearch, inputValue) : getWidgetsListData.data })
            } else {
                this.setState({ data: getWidgetsListData.data })

            }

            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        }

        if (!getUsersListLoading && !getUsersListError && !getUsersListData) {
            this.props.dispatch(GetUsersListActionRequest())
        }

        if (!getCategoryListLoading && !getCategoryListError && !getCategoryListData) {
            this.props.dispatch(GetCategoryListActionRequest())
        }

        if (!getSitesListLoading && !getSitesListError && !getSitesListData) {
            this.props.dispatch(GetSitesListActionRequest())
        }





        if (prevProps.updateWidgetDetails !== updateWidgetDetails && !updateWidgetDetailsError && !updateWidgetDetailsLoading && updateWidgetDetailsData) {
            NotificationManager.success("Widget successfully updated", "Success", 2000);
            this.props.history.push('/widgets')
            this.props.dispatch(GetWidgetsListActionRequest())

        } else if (prevProps.updateWidgetDetails !== updateWidgetDetails && updateWidgetDetailsError && updateWidgetDetailsErrorData) {
            NotificationManager.error(`${updateWidgetDetailsErrorData.data.message}`, "Failed", 2000);

        }


    }

    handleSortByStatus = (value) => {

        if (this.state.selectedStatusSearch?.id === value || value === 'NOTRASH') {
            this.setState({ selectedStatusSearch: '' })

        } else {
            this.setState({ selectedStatusSearch: { id: value } })
        }

        setTimeout(() => {
            this.props.dispatch(GetWidgetsListActionRequest())
        });
    }

    handleSubtmit = (e) => {
        e.preventDefault()

        setTimeout(() => {
            this.props.dispatch(GetWidgetsListActionRequest())
        });

    }

    handleSearchBar = (e) => {
        const value = e.target.value.toLowerCase()
        this.setState({ inputValue: value })
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
        if (value === 'Up') {
            const sorted = this.state.data.sort((a, b) => {
                if (typeof a[sortByClicked] === "string" || typeof b[sortByClicked] === "string") {
                    return b[sortByClicked]?.localeCompare(a[sortByClicked])
                } else if (typeof a[sortByClicked] === "object" || typeof b[sortByClicked] === "object") {
                    if (a.site && b.site) {
                        return b.site[sortByClicked]?.localeCompare(a.site[sortByClicked])
                    } else {
                        return -1
                    }
                    // return b?.site[sortByClicked]?.localeCompare(a?.site[sortByClicked])

                } else {
                    return b[sortByClicked] - a[sortByClicked]
                }
            })
            this.setState({ data: sorted })
            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        } else if (value === 'Down') {
            const sorted = this.state.data.sort((a, b) => {
                if (typeof a[sortByClicked] === "string" || typeof b[sortByClicked] === "string") {
                    return a[sortByClicked]?.localeCompare(b[sortByClicked])

                } else if (typeof a[sortByClicked] === "object" || typeof b[sortByClicked] === "object") {
                    if (a.site && b.site) {
                        return a.site[sortByClicked]?.localeCompare(b.site[sortByClicked])
                    } else {
                        return -1
                    }

                }
                else {
                    return a[sortByClicked] - b[sortByClicked]
                }

            })
            this.setState({ data: sorted })
            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        }
    }

    handleHashArrowClick = (item) => {
        this.setState({ hashesArrowDown: !this.state.hashesArrowDown, hashesArrowWitchIsOn: item })
    }

    handleCountPerPage = (e) => {
        if (e.target.value === '' || e.target.value === '0') {
            this.setState({ countPerPage: 10 })
            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        } else {
            this.setState({ countPerPage: parseInt(e.target.value) })
            setTimeout(() => {
                this.setState({ page: 1 })

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
        if (this.props.location?.data?.searchByuser && !secondElement) {
            this.setState({ selectedUserSearch: el })
            const newData = this.state.data.filter(elm => {
                console.log(elm, el);
                return elm.owner.id === el.id
            })
            this.setState({ data: newData })
            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        }
        else if (this.props.location?.data?.searchBycategory && !secondElement) {
            this.setState({ selectedCategorieSearch: el })
            setTimeout(() => {
                this.props.dispatch(GetWidgetsListActionRequest())
            });
        }
        else if (this.props.location?.data?.searchBy && !secondElement) {
            this.setState({ selectedSiteSearch: el })
            setTimeout(() => {
                this.props.dispatch(GetWidgetsListActionRequest())
            });
        } else {
            if (secondElement === 'sites') {
                this.setState({ selectedSiteSearch: el })
                setTimeout(() => {
                    this.props.dispatch(GetWidgetsListActionRequest())
                });
            } else if (secondElement === 'categories') {
                this.setState({ selectedCategorieSearch: el })
                setTimeout(() => {
                    this.props.dispatch(GetWidgetsListActionRequest())
                });
            }
        }
    }

    deletesiteFunction = () => {
        this.props.dispatch(DeleteWidgetActionRequest({
            id: this.state.idForDelete
        }))
    }

    handleTrashFunctionaliti = (id) => {
        this.setState({ confirmMessage: true, idForDelete: id })
    }

    handleAllOptionsOnMain = (el, sortBy) => {
        if (sortBy === "categories") {
            this.setState({ selectedCategorieSearch: '' })
        }
        if (sortBy === 'sites') {
            this.setState({ selectedSiteSearch: '' })
        }
        setTimeout(() => {
            this.props.dispatch(GetWidgetsListActionRequest())
        });

    }

    render() {
        const { selectedSiteSearch, data, loading, selectedCategorieSearch, selectedUserSearch } = this.state

        return (
            <>
                <SearchContainer page={this.state.page} handleAllOptionsOnMain={this.handleAllOptionsOnMain} handleSearchOnMainPage={this.handleSearchOnMainPage} handleAddSomeMore={this.handleAddSomeMore} state={this.state} handleCountPerPage={this.handleCountPerPage} pageName={"WIDGETS"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handleSortByStatus={this.handleSortByStatus} handlePageChange={this.handlePageChange} />
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
    const { WidgetReducer, SitesListReducer, UsersReducer, CategoryReducer } = state;
    const { getSitesList } = SitesListReducer
    const { getUsersList } = UsersReducer
    const { getCategoryList } = CategoryReducer


    const { getWidgetsList, deleteWidget, updateWidgetDetails } = WidgetReducer


    return {
        getWidgetsList,
        deleteWidget,
        updateWidgetDetails,
        getSitesList,
        getUsersList,
        getCategoryList


    }
}

export default connect(mapStateToProps, null)(Widgets)
