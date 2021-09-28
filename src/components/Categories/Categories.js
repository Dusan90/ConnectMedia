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

const test = [{
    status: 'PUBLISHED',
    owner: 'B92',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
{
    status: 'PUBLISHED',
    owner: 'Novosti',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
]

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: [],
            filteredDate: [],
            inputValue: '',
            countPerPage: '',
            addButtonClicked: false,
            categoryNewName: ''
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.props.dispatch(GetCategoryListActionRequest())
    }

    componentDidUpdate(prevProps) {
        const { getCategoryList, createCategory } = this.props
        const { loading: createCategoryLoading, error: createCategoryError, data: createCategoryData, errorData: createCategoryErrorData } = createCategory
        const { loading: getCategoryListLoading, error: getCategoryListError, data: getCategoryListData, errorData: getCategoryListErrorData } = getCategoryList


        if (prevProps.getCategoryList !== getCategoryList && !getCategoryListLoading && !getCategoryListError && getCategoryListData) {
            this.setState({ data: getCategoryListData.data })
        }

        if (prevProps.createCategory !== createCategory && !createCategoryLoading && !createCategoryError && createCategoryData) {
            console.log(createCategoryData);
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

    handlePageChange = (value) => {
        this.setState({ page: value })
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

    haneldeRedirect = (value) => {
        console.log(value);
    }

    handleArrowSort = (value) => {
        console.log(value);
    }

    handlePageRedirect = (e, item) => {
        if (!e.target.id || e.target.id !== 'noredirection') {
            history.push({
                pathname: `/categories/${item.id}`,
                state: item
            })
        }
    }

    handleCountPerPage = (e) => {
        this.setState({ countPerPage: e.target.value })
    }

    handleAddSomeMore = () => {
        this.setState({ addButtonClicked: !this.state.addButtonClicked })
    }

    render() {
        const { categoryNewName } = this.state
        return (
            <>
                <SearchContainer page={this.state.page} handleAddSomeMore={this.handleAddSomeMore} state={this.state} handleCountPerPage={this.handleCountPerPage} pageName={"CATEGORIES"} handleHomePageSort={this.handleHomePageSort} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handlePageChange={this.handlePageChange} customStyleForlesTabs={true} />
                {this.state.addButtonClicked && <AddContainer>
                    <input type="text" onChange={(e) => this.setState({ categoryNewName: e.target.value })} placeholder='Enter new name' />
                    {categoryNewName && <button
                        onClick={() => this.props.history.push({
                            pathname: '/categories/create',
                            data: { name: categoryNewName, buttonClicked: 'editDiv', createNew: true }
                        })}><p>Create category</p></button>}
                </AddContainer>}
                <div className='mainTableDiv'>
                    <div className='shortScreenTableDiv'>
                        {this.state.data?.map((item, key) => {
                            return <div key={key} className='mainDivShotScreen'>
                                <div className='nazivDiv' onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('nameUp')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('nameDown')} />
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
                                        <p onClick={() => this.haneldeRedirect(item)}>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item)}>stats</p>
                                    </div>
                                </div>
                                <div className='mainForIcons'>
                                    <div className="divWithClicableIcons">
                                        <img src={posts} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>sites</p>
                                        <img src={posts} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item)}>posts</p>
                                        <img src={widgets} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>widgets</p>


                                    </div>
                                </div>

                            </div>
                        })}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('nameUp')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('nameDown')} />
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
                            {this.state.data?.map((item, key) => {
                                return <tr key={key} onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <td><div className='ownerClass'>
                                        {item.name}
                                    </div></td>
                                    <td><div className="divWithClicableIcons">
                                        <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>stats</p>
                                    </div></td>
                                    <td><div className="divWithClicableIcons">
                                        <img src={posts} alt="widgets" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>sites</p>
                                        <img src={posts} alt="posts" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>posts</p>
                                        <img src={widgets} alt="widgets" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>widgets</p>

                                    </div></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
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
