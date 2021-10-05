import React, { Component } from 'react'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import { connect } from 'react-redux'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import history from '../../routes/History'
import { GetCategoryListActionRequest } from '../../store/actions/CategoryAction'
import '../Home/Home.scss'
import AddContainer from '../../containers/AddContainer/AddContainer'
import { NotificationManager } from 'react-notifications'
import { filtering } from './Filtering'

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: [],
            filteredDate: '',
            tipeSearch: '',
            inputValue: null,
            countPerPage: 10,
            addButtonClicked: false,
            categoryNewName: '',
            selectedSitesSearch: null,
            selectedCategorieSearch: '',

            dataToRender: [],
            mamxPages: '',
            loading: true
        }
    }

    paginate = (page) => {
        const { countPerPage, filteredDate, data, tipeSearch, inputValue } = this.state
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
        this.props.dispatch(GetCategoryListActionRequest())
    }

    componentDidUpdate(prevProps) {
        const { inputValue, selectedSitesSearch } = this.state
        const { getCategoryList, createCategory } = this.props
        const { loading: createCategoryLoading, error: createCategoryError, data: createCategoryData, errorData: createCategoryErrorData } = createCategory
        const { loading: getCategoryListLoading, error: getCategoryListError, data: getCategoryListData, errorData: getCategoryListErrorData } = getCategoryList


        if (prevProps.getCategoryList !== getCategoryList && !getCategoryListLoading && !getCategoryListError && getCategoryListData) {
            if (selectedSitesSearch || inputValue) {
                this.setState({ data: filtering(getCategoryListData.data, selectedSitesSearch, inputValue) ? filtering(getCategoryListData.data, selectedSitesSearch, inputValue) : getCategoryListData.data })
            } else {
                this.setState({ data: getCategoryListData.data })

            }

            setTimeout(() => {
                this.setState({ page: 1 })

                this.paginate(1)
            });
        }

        if (prevProps.createCategory !== createCategory && !createCategoryLoading && !createCategoryError && createCategoryData) {
            this.setState({
                newUseremail: '',
                newUserpassword: '',
                newUsername: '',
                addButtonClicked: false
            })
            NotificationManager.success("Category successfully created", "Success", 2000);

        } else if (prevProps.createCategory !== createCategory && createCategoryError && createCategoryErrorData) {
            NotificationManager.error(`${createCategoryErrorData.data.message}`, "Failed", 2000)
        }
    }



    handleSubtmit = (e) => {
        e.preventDefault()

        setTimeout(() => {
            this.props.dispatch(GetCategoryListActionRequest())
        });

    }

    handleSearchBar = (e) => {
        const value = e.target.value.toLowerCase()
        this.setState({ inputValue: value })
    }


    haneldeRedirect = (value, tabClicked) => {
        if (tabClicked === 'edit') {
            history.push({
                pathname: `/categories/${value.id}`,
                data: { buttonClicked: 'editDiv' }
            })
        } else if (tabClicked === 'stats') {
            history.push({
                pathname: `/categories/${value.id}`,
                data: { buttonClicked: 'statsDiv' }
            })
        }
        else if (tabClicked === 'posts') {
            history.push({
                pathname: `/posts`,
                data: { searchBycategory: value, prevPath: window.location.pathname }
            })
        } else if (tabClicked === 'widgets') {
            history.push({
                pathname: `/widgets`,
                data: { searchBycategory: value, prevPath: window.location.pathname }
            })
        }
        else if (tabClicked === 'sites') {
            history.push({
                pathname: `/sites`,
                data: { searchBycategory: value, prevPath: window.location.pathname }
            })
        }
    }


    handleArrowSort = (sortByClicked, value) => {
        // ovde moras da imas 2 parametra, moras da prosledis naziv po kome ce se sortirati i drugi je 'up' ili 'down' po tome ces znati koji arrow je kliknut
        if (value === 'Up') {
            const sorted = this.state.data.sort((a, b) => {
                if (typeof a[sortByClicked] === "string" || typeof b[sortByClicked] === "string") {
                    return b[sortByClicked]?.localeCompare(a[sortByClicked])
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
                }
            })
            this.setState({ data: sorted })
            setTimeout(() => {
                this.setState({ page: 1 })
                this.paginate(1)
            });
        }
    }

    handlePageRedirect = (e, item) => {
        if (!e.target.id || e.target.id !== 'noredirection') {
            history.push({
                pathname: `/categories/${item.id}`,
                state: item
            })
        }
    }

    handlePageChange = (value) => {
        this.setState({ page: value })
        this.paginate(value)
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
        this.setState({ addButtonClicked: !this.state.addButtonClicked })
    }

    handleSearchOnMainPage = (el, secondElement) => {
        if (!this.state.addButtonClicked) {
            if (secondElement === 'sites') {
                this.setState({ selectedSitesSearch: el })
                setTimeout(() => {
                    this.props.dispatch(GetCategoryListActionRequest())
                });
            } else if (secondElement === 'categories') {
                this.setState({ selectedCategorieSearch: el })
                setTimeout(() => {
                    this.props.dispatch(GetCategoryListActionRequest())
                });
            }
        }
    }


    handleAllOptionsOnMain = () => {
        this.setState({ selectedSitesSearch: '' })
        setTimeout(() => {
            this.props.dispatch(GetCategoryListActionRequest())
        });

    }

    render() {
        const { categoryNewName, dataToRender, loading } = this.state

        console.log(dataToRender);

        return (
            <>
                <SearchContainer page={this.state.page} handleAllOptionsOnMain={this.handleAllOptionsOnMain} handleSearchOnMainPage={this.handleSearchOnMainPage} handleAddSomeMore={this.handleAddSomeMore} state={this.state} handleCountPerPage={this.handleCountPerPage} pageName={"CATEGORIES"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handlePageChange={this.handlePageChange} customStyleForlesTabs={true} />
                {this.state.addButtonClicked && <AddContainer>
                    <input type="text" onChange={(e) => this.setState({ categoryNewName: e.target.value })} placeholder='Enter new name' />
                    {categoryNewName && <button
                        onClick={() => this.props.history.push({
                            pathname: '/categories/create',
                            data: { name: categoryNewName, buttonClicked: 'editDiv', createNew: true }
                        })}><p>Create category</p></button>}
                </AddContainer>}
                <div className='mainTableDiv'>
                    {!loading && this.state.dataToRender.length !== 0 ? <div className='shortScreenTableDiv'>
                        {dataToRender.length !== 0 && dataToRender?.map((item, key) => {
                            return <div key={key} className='mainDivShotScreen'>
                                <div className='nazivDiv' onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('name', 'Up')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('name', 'Down')} />
                                        </div>
                                        <p>{"Name"}</p>

                                    </div>
                                    <div className='ownersNameClass'>
                                        {item.nazivKorisnika}
                                    </div>
                                </div>
                                <div className='mainForIcons'>
                                    <div className="divWithClicableIcons">
                                        <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'visit')}>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'edit')}>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item, 'stats')}>stats</p>
                                    </div>
                                </div>
                                <div className='mainForIcons'>
                                    <div className="divWithClicableIcons">
                                        <img src={posts} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'sites')}>sites</p>
                                        <img src={posts} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item, 'posts')}>posts</p>
                                        <img src={widgets} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'widgets')}>widgets</p>


                                    </div>
                                </div>

                            </div>
                        })}
                    </div> : loading ? <p style={{ textAlign: 'center' }} className="loadingOnShort">Loading...</p> : this.state.dataToRender.length === 0 && <p style={{ textAlign: 'center' }} className="loadingOnShort" >No data</p>}
                    {!loading && this.state.dataToRender.length !== 0 ? <table>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('name', 'Up')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('name', 'Down')} />
                                        </div>
                                        <p>Name</p>
                                    </div>
                                </th>
                                <th></th>
                                <th>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataToRender.length !== 0 && dataToRender?.map((item, key) => {
                                return <tr key={key} onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <td><div className='ownerClass'>
                                        {item.name}
                                    </div></td>
                                    <td><div className="divWithClicableIcons">
                                        <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'visit')} id='noredirection'>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'edit')} id='noredirection'>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item, 'stats')} id='noredirection'>stats</p>
                                    </div></td>
                                    <td><div className="divWithClicableIcons">
                                        <img src={posts} alt="widgets" />
                                        <p onClick={() => this.haneldeRedirect(item, 'sites')} id='noredirection'>sites</p>
                                        <img src={posts} alt="posts" />
                                        <p onClick={() => this.haneldeRedirect(item, 'posts')} id='noredirection'>posts</p>
                                        <img src={widgets} alt="widgets" />
                                        <p onClick={() => this.haneldeRedirect(item, 'widgets')} id='noredirection'>widgets</p>

                                    </div></td>
                                </tr>
                            })}
                        </tbody>
                    </table> : loading ? <p className='loadingOnBig' style={{ textAlign: 'center' }}>Loading...</p> : this.state.dataToRender.length === 0 && <p className='loadingOnBig' style={{ textAlign: 'center' }}>No data</p>}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { CategoryReducer } = state;
    const { getCategoryList, createCategory } = CategoryReducer
    return {
        getCategoryList,
        createCategory

    }
}

export default connect(mapStateToProps, null)(Categories)
