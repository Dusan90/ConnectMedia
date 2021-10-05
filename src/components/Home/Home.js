import React, { Component } from 'react'
import './Home.scss'
import { connect } from 'react-redux'
import ViewSectionCard from '../../containers/viewSections/ViewSectionCard'
import TableRowContainer from '../../containers/TableRowContainer/TableRowContainer'
import ShortTableRowContainer from '../../containers/TableRowContainer/ShortTableRowContainer'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import EditableInline from '../../containers/EditableInline/EditableInline'
import AddContainer from '../../containers/AddContainer/AddContainer'
import { GetSitesListActionRequest, DeleteSiteActionRequest, CreateSiteActionRequest } from '../../store/actions/SitesListAction'
import { GetCategoryListActionRequest } from '../../store/actions/CategoryAction'
import { GetUsersListActionRequest } from '../../store/actions/UsersActions'
import { NotificationManager } from 'react-notifications'
import { filtering } from './Filtering'


export class Home extends Component {
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
            selectedUserSearch: null,
            selectedSiteSearch: null,
            selectedCategorieSearch: null,
            selectedStatusSearch: null,
            addButtonClicked: false,
            confirmMessage: false,
            urlForCreate: '',
            categoryList: '',
            idForDelete: '',

            dataToRender: [],
            mamxPages: '',
            loading: true
        }
    }

    paginate = (page) => {
        const { countPerPage, filteredDate, data, tipeSearch, inputValue } = this.state
        // const dataToRender = (tipeSearch && inputValue) ? tipeSearch : filteredDate ? filteredDate : data
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
        this.props.dispatch(GetSitesListActionRequest())
        this.props.dispatch(GetCategoryListActionRequest())
        this.props.dispatch(GetUsersListActionRequest())



    }

    componentDidUpdate(prevProps) {
        const { selectedSiteSearch, selectedCategorieSearch, selectedStatusSearch, inputValue, selectedUserSearch } = this.state

        const { getSitesList, deleteSite, getCategoryList, bindCategory, unbindCategory, createSite } = this.props
        const { data: createSiteData, loading: createSiteLoading, error: createSiteError, errorData: createSiteErrorData } = createSite;

        const { data: getSitesListData, loading: getSitesListLoading, error: getSitesListError, errorData: getSitesListErrorData } = getSitesList;
        const { data: deleteSiteData, loading: deleteSiteLoading, error: deleteSiteError, errorData: deleteSiteErrorData } = deleteSite;
        const { loading: getCategoryListLoading, error: getCategoryListError, data: getCategoryListData, errorData: getCategoryListErrorData } = getCategoryList
        const { data: unbindCategoryData, loading: unbindCategoryLoading, error: unbindCategoryError, errorData: unbindCategoryErrorData } = unbindCategory;
        const { data: bindCategoryData, loading: bindCategoryLoading, error: bindCategoryError, errorData: bindCategoryErrorData } = bindCategory;

        if (prevProps.bindCategory !== bindCategory && !bindCategoryError && !bindCategoryLoading && bindCategoryData) {
            NotificationManager.success("Category successfully bind", "Success", 2000);
            this.props.dispatch(GetSitesListActionRequest())

        }

        if (prevProps.createSite !== createSite && !createSiteError && !createSiteLoading && createSiteData) {
            NotificationManager.success("Site successfully created", "Success", 2000);
            this.props.history.push(`/sites/${createSiteData?.data?.id}`)
        } else if (prevProps.createSite !== createSite && createSiteError && createSiteErrorData) {
            NotificationManager.error(`${createSiteErrorData.data.message}`, "Failed", 2000);

        }

        if (prevProps.unbindCategory !== unbindCategory && !unbindCategoryError && !unbindCategoryLoading && unbindCategoryData) {
            NotificationManager.success("Category successfully unbind", "Success", 2000);
            this.props.dispatch(GetSitesListActionRequest())

        }

        if (prevProps.getCategoryList !== getCategoryList && !getCategoryListLoading && !getCategoryListError && getCategoryListData) {
            this.setState({ categoryList: getCategoryListData.data })
        }

        if (prevProps.getSitesList !== getSitesList && !getSitesListError && !getSitesListLoading && getSitesListData) {
            if (selectedStatusSearch || selectedCategorieSearch || selectedSiteSearch || selectedUserSearch || inputValue) {
                this.setState({ data: filtering(getSitesListData?.data, selectedStatusSearch, selectedCategorieSearch, selectedUserSearch, inputValue) ? filtering(getSitesListData?.data, selectedStatusSearch, selectedCategorieSearch, selectedUserSearch, inputValue) : getSitesListData?.data })
            } else {
                this.setState({ data: getSitesListData?.data })
            }
            if (selectedStatusSearch === null && selectedCategorieSearch === null && inputValue === null && selectedUserSearch === null) {
                setTimeout(() => {
                    if (this.props.location?.data?.searchByuser && getSitesListData.data) {
                        this.handleSearchOnMainPage(this.props.location?.data?.searchByuser)
                    } else if (this.props.location?.data?.searchBycategory && getSitesListData.data) {
                        this.handleSearchOnMainPage(this.props.location?.data?.searchBycategory)
                    }

                });
            }
            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        }

        if (prevProps.deleteSite !== deleteSite && !deleteSiteError && !deleteSiteLoading && deleteSiteData) {
            NotificationManager.success("Site successfully deleted", "Success", 2000);
            this.setState({ confirmMessage: false })
            this.props.dispatch(GetSitesListActionRequest())
        }
    }

    handlePageChange = (value) => {
        this.setState({ page: value })
        this.paginate(value)
    }


    handleSortByStatus = (value) => {
        if (this.state.selectedStatusSearch?.id === value || value === 'NOTRASH') {
            this.setState({ selectedStatusSearch: '' })

        } else {
            this.setState({ selectedStatusSearch: { id: value } })
        }

        setTimeout(() => {
            this.props.dispatch(GetSitesListActionRequest())
        });
    }

    handleSubtmit = (e) => {
        e.preventDefault()

        setTimeout(() => {
            this.props.dispatch(GetSitesListActionRequest())
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

    handleArrowSort = (sortByClicked, value) => {
        // ovde moras da imas 2 parametra, moras da prosledis naziv po kome ce se sortirati i drugi je 'up' ili 'down' po tome ces znati koji arrow je kliknut
        if (value === 'Up') {
            const sorted = this.state.data.sort((a, b) => {
                if (typeof a[sortByClicked] === "string" || typeof b[sortByClicked] === "string") {
                    return b[sortByClicked]?.localeCompare(a[sortByClicked])
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

                } else {
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
    handleSearchOnMainPage = (el, secondElement) => {
        if (this.props.location?.data?.searchByuser) {
            this.setState({ selectedUserSearch: el })
            setTimeout(() => {
                this.props.dispatch(GetSitesListActionRequest())
            });
        }
        else if (this.props.location?.data?.searchBycategory) {
            this.setState({ selectedCategorieSearch: el })
            setTimeout(() => {
                this.props.dispatch(GetSitesListActionRequest())
            });
        }
        else if (this.props.location?.data?.searchBy) {
            this.setState({ selectedSiteSearch: el })
            setTimeout(() => {
                this.props.dispatch(GetSitesListActionRequest())
            });
        } else {
            if (!this.state.addButtonClicked) {
                if (secondElement === 'users') {
                    this.setState({ selectedUserSearch: el })
                    setTimeout(() => {
                        this.props.dispatch(GetSitesListActionRequest())
                    });
                } else if (secondElement === 'categories') {
                    this.setState({ selectedCategorieSearch: el })
                    setTimeout(() => {
                        this.props.dispatch(GetSitesListActionRequest())
                    });
                }
            }
        }
    }

    handleAddSomeMore = () => {
        this.setState({ addButtonClicked: !this.state.addButtonClicked })
    }

    deletesiteFunction = () => {
        this.props.dispatch(DeleteSiteActionRequest({
            id: this.state.idForDelete
        }))
    }

    handleTrashFunctionaliti = (id) => {
        this.setState({ confirmMessage: true, idForDelete: id })
    }

    handleAllOptionsOnMain = (el, sortBy) => {
        if (sortBy === "categories") {
            this.setState({ selectedCategorieSearch: '' })
        } else if (sortBy === 'sites') {
            this.setState({ selectedSiteSearch: '' })
        }
        else if (sortBy === 'users') {
            this.setState({ selectedUserSearch: '' })
        }
        setTimeout(() => {
            this.props.dispatch(GetSitesListActionRequest())
        });

    }

    render() {
        const { selectedUserSearch, urlForCreate, loading } = this.state

        console.log(this.props.location);
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
                <SearchContainer handleAllOptionsOnMain={this.handleAllOptionsOnMain} handleAddSomeMore={this.handleAddSomeMore} page={this.state.page} handleSearchOnMainPage={this.handleSearchOnMainPage} state={this.state} handleCountPerPage={this.handleCountPerPage} pageName={"SITES"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handlePageChange={this.handlePageChange} handleSortByStatus={this.handleSortByStatus} />
                {this.state.addButtonClicked && <AddContainer>
                    {/* {!selectedUserSearch && <p style={{ color: '#7befff', fontSize: '18px', alignSelf: 'center', padding: '0 10px' }}>Please choose owner.</p>} */}
                    {<input type="text" onChange={(e) => this.setState({ urlForCreate: e.target.value })} placeholder='Enter Url' />}
                    {urlForCreate && <button onClick={() => {
                        //     this.props.history.push({
                        //     pathname: '/sites/create',
                        //     data: {
                        //         url: urlForCreate,
                        //         //  owner: selectedUserSearch,
                        //         buttonClicked: 'editDiv', createNew: true
                        //     }
                        // })
                        this.props.dispatch(CreateSiteActionRequest({
                            url: urlForCreate,
                        }))
                    }}><p>Create site</p></button>}
                </AddContainer>}

                {this.state.checkboxList.length !== 0 && <EditableInline state={this.state} handleEditableInlineStatus={this.handleEditableInlineStatus} handleEditableInlineDropDown={this.handleEditableInlineDropDown} />}
                {this.state.confirmMessage && <div className='confurmTextOnMani'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deletesiteFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                <div className='mainTableDiv'>
                    {!loading && this.state.dataToRender.length !== 0 ? <ShortTableRowContainer data={this.state.dataToRender} handleTrashFunctionaliti={this.handleTrashFunctionaliti} state={this.state} handleHashArrowClick={this.handleHashArrowClick} handleCheckbox={this.handleCheckbox} handleArrowSort={this.handleArrowSort} checkboxList={this.state.checkboxList} /> : loading ? <p className='loadingOnShort' style={{ textAlign: 'center' }}>Loading...</p> : this.state.dataToRender.length === 0 && <p className='loadingOnShort' style={{ textAlign: 'center' }}>No data</p>}
                    {!loading && this.state.dataToRender.length !== 0 ? <TableRowContainer data={this.state.dataToRender} handleTrashFunctionaliti={this.handleTrashFunctionaliti} state={this.state} handleHashArrowClick={this.handleHashArrowClick} handleCheckbox={this.handleCheckbox} checkboxList={this.state.checkboxList} handleArrowSort={this.handleArrowSort} /> : loading ? <p className='loadingOnBig' style={{ textAlign: 'center' }}>Loading...</p> : this.state.dataToRender.length === 0 && <p className='loadingOnBig' style={{ textAlign: 'center' }}>No data</p>}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { SitesListReducer, CategoryReducer } = state;
    const { getSitesList, deleteSite, createSite } = SitesListReducer
    const { getCategoryList, bindCategory, unbindCategory } = CategoryReducer

    return {
        getSitesList,
        deleteSite,
        getCategoryList,
        bindCategory,
        unbindCategory,
        createSite

    }
}

export default connect(mapStateToProps, null)(Home)
