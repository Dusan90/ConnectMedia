import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavWidget from '../../containers/NavWidget/NavWidget'
// import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import { connect } from 'react-redux'
// import xButton from '../../assets/img/SiteDetails/xButton.svg'
import '../SiteDetails/SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import Chart from '../../containers/Chart/Chart'
import VerticalChart from '../../containers/Chart/VerticalChart'
import Select from 'react-select'
import { GetPostDetailsActionRequest, CreatePostActionRequest, UpdatePostDetailsActionRequest, DeletePostActionRequest } from '../../store/actions/PostActions'
import { GetSiteDetailsActionRequest } from '../../store/actions/SitesListAction'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'


const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        // height: "48px",
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

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
]

const options = [0, 1, 2, 3]

export class PostsDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            whichisit: '',
            dataState: null,
            confirmMessage: false,
            siteDetailsData: '',
            dataTest: 'PUBLISHED',
            siteOptions: [],
            postDetailsData: '',
            file: null,
            tabClicked: '',
            name: null,
            url: null,
            description: null,
            author: null,
            content: null,
            date: null,
            site: null,
            categories: null,
            wordToPass: ''

        }
    }

    componentDidMount() {
        const { data: getSitesListData, loading: getSitesListLoading, error: getSitesListError } = this.props.getSitesList;
        if (!getSitesListError && !getSitesListLoading && getSitesListData) {
            const siteOptions = getSitesListData.data.map(el => {
                return { value: el.id, label: el.name ? el.name : 'no name' }
            })
            this.setState({ siteOptions })
        }


        if (this.props?.location?.data?.urlpost) {
            this.setState({ url: this.props.location.data?.urlpost, site: this.props.location.data?.site.id })
            this.props.dispatch(GetSiteDetailsActionRequest({
                id: this.props.location.data?.site.id
            }))
        } else {
            this.props.dispatch(GetPostDetailsActionRequest({
                id: this.props.match.params.id
            }))

        }
    }

    componentDidUpdate(prevProps) {
        const { getPostDetails, getSiteDetails, deletePost, createPost, updatePostDetails } = this.props
        const { data: getPostDetailsData, loading: getPostDetailsLoading, error: getPostDetailsError } = getPostDetails;
        const { data: getSiteDetailsData, loading: getSiteDetailsLoading, error: getSiteDetailsError } = getSiteDetails;
        const { data: deletePostData, loading: deletePostLoading, error: deletePostError } = deletePost;
        const { data: createPostData, loading: createPostLoading, error: createPostError, errorData: createPostErrorData } = createPost;
        const { data: updatePostDetailsData, loading: updatePostDetailsLoading, error: updatePostDetailsError, errorData: updatePostDetailsErrorData } = updatePostDetails;


        if (prevProps.getSiteDetails !== getSiteDetails && !getSiteDetailsError && !getSiteDetailsLoading && getSiteDetailsData) {
            this.setState({
                // dataState: getSiteDetails.data.state,
                siteDetailsData: getSiteDetailsData.data,
            })
        }


        if (prevProps.getPostDetails !== getPostDetails && !getPostDetailsError && !getPostDetailsLoading && getPostDetailsData) {
            this.props.dispatch(GetSiteDetailsActionRequest({
                id: getPostDetailsData.data.site.id
            }))
            this.setState({
                dataState: getPostDetails.data.state,
                postDetailsData: getPostDetailsData.data,
            })
        }



        if (prevProps.deletePost !== deletePost && !deletePostError && !deletePostLoading && deletePostData) {
            NotificationManager.success("Post successfully deleted", "Success", 2000);
            this.props.history.push('/posts')
        }

        if (prevProps.createPost !== createPost && !createPostError && !createPostLoading && createPostData) {
            NotificationManager.success("Post successfully created", "Success", 2000);
            this.props.history.push('/posts')
        } else if (prevProps.createPost !== createPost && createPostError && createPostErrorData) {
            NotificationManager.error(`${createPostErrorData.data.message}`, "Failed", 2000);

        }

        if (prevProps.updatePostDetails !== updatePostDetails && !updatePostDetailsError && !updatePostDetailsLoading && updatePostDetailsData) {
            NotificationManager.success("Post successfully updated", "Success", 2000);
            this.props.history.push('/posts')
        } else if (prevProps.updatePostDetails !== updatePostDetails && updatePostDetailsError && updatePostDetailsErrorData) {
            NotificationManager.error(`${updatePostDetailsErrorData.data.message}`, "Failed", 2000);

        }
    }

    handleWhereEverNav = (page) => {
        if (page === 'editDiv') {
            this.setState({ isIteditable: true })
        } else {
            this.setState({ isIteditable: false })
        }
        this.setState({ tabClicked: page, wordToPass: '' })

    }

    handleButtonActive = (page) => {
        this.setState({ whichisit: page })
    }

    handleStatusChange = (status) => {
        this.setState({ dataState: status })
    }

    handleChangeFile = (event) => {
        this.setState({
            file: event.target.value
        })
    }

    handleButtonActive = (page) => {
        if (page === 'save') {
            const { name, description, file, url, author, content, date, site, dataState, categories } = this.state
            if (this.props.location.data?.createNew) {
                this.props.dispatch(CreatePostActionRequest({
                    image: file,
                    title: name,
                    link: url,
                    description,
                    author,
                    content,
                    timestamp: date ? date : new Date().getTime(),
                    site,
                    status: dataState,
                    categories
                }))
            } else {
                this.props.dispatch(UpdatePostDetailsActionRequest({
                    id: this.props.match.params.id,
                    image: file,
                    title: name,
                    link: url,
                    description,
                    author,
                    content,
                    timestamp: date,
                    site,
                    status: dataState,
                    categories

                }))
            }
        } else if (page === 'cancel') {
            this.setState({ isIteditable: false, wordToPass: 'canceled' })
        } else {
            this.setState({ whichisit: page })
        }
    }

    handleSite = value => {
        this.setState({ site: value.value })
        this.props.dispatch(GetSiteDetailsActionRequest({
            id: value.value
        }))
    }

    handleChangeInputs = e => {
        if (e.target.type === 'date') {
            const d = new Date(e.target.value);
            const seconds = d.getTime() / 1000
            this.setState({ [e.target.name]: parseInt(seconds) })

        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    deleteuserFunction = () => {
        this.props.dispatch(DeletePostActionRequest({
            id: this.props.match.params.id
        }))
    }

    handlePostDetailsCategorie = value => {
        const saveData = value.length !== 0 ? value.map(el => el.value) : []
        this.setState({ categories: saveData })
    }

    handleTrashClick = () => {
        this.setState({ confirmMessage: true })
    }
    render() {
        const { isIteditable, dataState, tabClicked, wordToPass, postDetailsData, site, siteOptions, siteDetailsData } = this.state
        const categorialOption = siteDetailsData?.categories?.map(el => {
            return { value: el.category.id, label: el.category.name }
        })



        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} wordToPass={wordToPass} handleTrashClick={this.handleTrashClick} isButtonNamepased={this.props?.location?.data?.buttonClicked} pageName={'posts'} />
                {this.state.confirmMessage && <div className='confurmText'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deleteuserFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                {tabClicked === 'statsDiv' && <> <div style={{ height: '500px', marginTop: '20px' }}>
                    <Chart customStyle={{ padding: '0' }} />
                </div>
                    <h1 style={{ marginTop: '50px', textAlign: 'center', fontSize: '30px' }}>Daily totals for post</h1>
                    <div style={{ height: `200px` }}>
                        <VerticalChart customData={data} customStyle={{ padding: '0' }} />
                    </div>
                </>
                }
                {tabClicked !== 'statsDiv' && <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <div className='generalDiv'>
                            <h1>General</h1>
                            <div className='status_div'>
                                <h4>Status</h4>
                                {!isIteditable && <div className='coloredDivStatus' style={{ background: postDetailsData?.status === 1 ? '#ABD996' : postDetailsData?.status === 0 ? '#DFE094' : postDetailsData?.status === 2 ? '#E09494' : postDetailsData?.status === 3 ? '#295265' : '' }}>
                                    {postDetailsData?.status === 1 ? 'PUBLISHED' : postDetailsData?.status === 0 ? 'DRAFT' : postDetailsData?.status === 2 ? 'ERROR' : postDetailsData?.status === 3 ? 'TRASH' : ''}

                                </div>}
                                {isIteditable && <div className='mainOptionDiv'>
                                    {options.map((item, key) => {
                                        return <div key={key} onClick={() => this.handleStatusChange(item)} className='coloredDivStatus' style={{ height: item === dataState && '47px', background: item === 1 ? '#ABD996' : item === 0 ? '#DFE094' : item === 2 ? '#E09494' : item === 3 ? '#295265' : '' }}>
                                            {item === 1 ? 'PUBLISHED' : item === 0 ? 'DRAFT' : item === 2 ? 'ERROR' : item === 3 ? 'TRASH' : ''}
                                        </div>

                                    })}
                                </div>
                                }
                            </div>
                            <div className='name_div'>
                                <h4>Name</h4>
                                {!isIteditable && <p>{postDetailsData?.title}</p>}
                                {isIteditable && <input type="text" name='name' onChange={(e) => this.handleChangeInputs(e)} placeholder={postDetailsData?.title} />}
                            </div>
                            <div className='url_div'>
                                <h4>Url</h4>
                                {!isIteditable && <a onClick={() => window.open(`${postDetailsData && postDetailsData['link']}`)} href='#'>{postDetailsData['link']}</a>}
                                {isIteditable && <input type="text" name='url' onChange={(e) => this.handleChangeInputs(e)} placeholder={this.state.url ? this.state.url : postDetailsData['link']} />}
                                {/* {isIteditable && <SaveButtonEdit labeltext={'Scrape'} colorization={'ScrapeClass'} customStyle={{ width: '135px', marginRight: '20px' }} />} */}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Canonical</h1>

                            <div className='owner_div selectable'>
                                <h4>Site</h4>
                                {!isIteditable && <p>{site ? siteOptions.map(el => el.value === site ? el.label : '') : postDetailsData?.site?.name}</p>}
                                {/* {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>} */}
                                {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={this.state.siteOptions[site]}
                                    onChange={this.handleSite}
                                    // isLoading={true}
                                    placeholder={site ? siteOptions.map(el => el.value === site ? el.label : '') : postDetailsData?.site?.name}
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="merge"
                                    options={this.state.siteOptions}
                                />}
                            </div>
                            <div className='owner_div'>
                                <h4>Owner</h4>
                                <Link to='#'>{postDetailsData?.owner?.email}</Link>
                                {/* {isIteditable && <input type="text" placeholder='nina.aralica@alo.rs' />} */}
                            </div>
                            <div className='description_div'>
                                <h4>Description</h4>
                                {!isIteditable && <p>{postDetailsData?.description}</p>}
                                {isIteditable && <input name='description' onChange={(e) => this.handleChangeInputs(e)} type="text" placeholder={postDetailsData?.description} />}

                            </div>
                            <div className='description_div'>
                                <h4>Author</h4>
                                {!isIteditable && <p>{postDetailsData?.author}</p>}
                                {isIteditable && <input name='author' onChange={(e) => this.handleChangeInputs(e)} type="text" placeholder={postDetailsData?.author} />}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Order</h1>
                            <div className='description_div'>
                                <h4>Content</h4>
                                {!isIteditable && <p>{postDetailsData?.content}</p>}
                                {isIteditable && <input type="text" name='content' onChange={(e) => this.handleChangeInputs(e)} placeholder={postDetailsData?.content} />}

                            </div>
                        </div>


                    </div>
                    <div className='rightSideDiv'>
                        <div className='categoriesDiv'>
                            <h1>Categories</h1>
                            <div className='categ_div'>
                                <h4>Categories</h4>
                                {!isIteditable && <div className='listOfCateg'>
                                    <p>{postDetailsData?.categories?.map(el => `${el.name} `)}</p>

                                </div>}
                                {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={postDetailsData?.categories?.map(el => {


                                        return { value: el.id, label: el.name }

                                    })}
                                    // isLoading={true}
                                    onChange={this.handlePostDetailsCategorie}
                                    isMulti
                                    styles={customSelectStyles}
                                    // isClearable={true}
                                    isSearchable={true}
                                    name="merge"
                                    options={categorialOption}
                                />}
                            </div>
                            <div className='categ_div'>
                                <h4>Date</h4>

                                {!isIteditable && <p>{postDetailsData?.timestamp && `${moment(new Date(postDetailsData?.timestamp * 1000)).format("MM-DD-YYYY")}`}</p>}
                                {isIteditable && <input className='dateInput' name='date' onChange={(e) => this.handleChangeInputs(e)} type="date" placeholder={postDetailsData?.timestamp && new Date(postDetailsData?.timestamp)} />}

                            </div>
                            <div className='categ_div'>
                                <h4>Image</h4>
                                {isIteditable && <input type="text" id='file' onChange={this.handleChangeFile} placeholder='Enter image url' />}
                            </div>
                            {this.state.file ? <div className='categ_div'>
                                <img style={{ width: '300px' }} src={this.state.file} alt='uploaded' />

                            </div> :
                                postDetailsData?.image ? <div className='categ_div'>
                                    <img style={{ width: '300px' }} src={postDetailsData?.image} alt='uploaded' />

                                </div> : ''
                            }

                        </div>

                    </div>
                </div>}

                {isIteditable && <div className='buttonsDiv'>
                    <SaveButtonEdit labeltext={'Save changes'} handleButtonActive={() => this.handleButtonActive('save')} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                    <SaveButtonEdit labeltext={'Cancel'} handleButtonActive={() => this.handleButtonActive('cancel')} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { PostsReducer, SitesListReducer, CategoryReducer } = state;
    const { getPostDetails, deletePost, createPost, updatePostDetails } = PostsReducer
    const { getCategoryList } = CategoryReducer
    const { getSitesList, getSiteDetails } = SitesListReducer
    return {
        getPostDetails,
        getSitesList,
        getSiteDetails,
        getCategoryList,
        deletePost,
        createPost,
        updatePostDetails

    }
}

export default connect(mapStateToProps, null)(PostsDetails)
