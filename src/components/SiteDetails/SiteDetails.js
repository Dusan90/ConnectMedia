import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavWidget from '../../containers/NavWidget/NavWidget'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import xButton from '../../assets/img/SiteDetails/xButton.svg'
import { connect } from 'react-redux'
import './SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import { GetSiteDetailsActionRequest, DeleteSiteActionRequest, UpdateSiteDetailsActionRequest, CreateSiteActionRequest } from '../../store/actions/SitesListAction'
import Chart from '../../containers/Chart/Chart'
import Select from 'react-select'
import { NotificationManager } from 'react-notifications'

const test = [{
    title: 'vesti',
    keep: 50,
    expire: 23,
    maxAge: 24
}]

const test2 = [{ mesto: 'Beograd', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'kultura', title: 'zanimljivosti' }]

const test3 = [{ text: 'vesti' }, { text: 'zabava' }]

const options = [0, 1, 2, 3]

const optionss = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

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

export class SiteDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            whichisit: '',
            dataState: '',
            tabClicked: '',
            confirmMessage: false,
            siteDetailsData: '',
            name: '',
            url: '',
            description: '',
            head: '',
            encoding: '',
            factor: '',
            minimum: '',
            tracking: '',
            auto_publish: '',
            better_images: '',
            feed_definition: '',
            post_definition: '',
            refresh_interval: '',
            copy_from_site: '',
            guess_remote: '',
            tag_map: ''
        }
    }

    componentDidMount() {


        if (this.props?.location?.data?.url) {
            this.setState({ url: this.props.location.data?.url })
        } else {
            this.props.dispatch(GetSiteDetailsActionRequest({
                id: this.props.match.params.id
            }))

        }
    }

    componentDidUpdate(prevProps) {
        const { getSiteDetails, deleteSite, createSite } = this.props
        const { data: getSiteDetailsData, loading: getSiteDetailsLoading, error: getSiteDetailsError, errorData: getSiteDetailsErrorData } = getSiteDetails;
        const { data: deleteSiteData, loading: deleteSiteLoading, error: deleteSiteError, errorData: deleteSiteErrorData } = deleteSite;
        const { data: createSiteData, loading: createSiteLoading, error: createSiteError, errorData: createSiteErrorData } = createSite;


        if (prevProps.getSiteDetails !== getSiteDetails && !getSiteDetailsError && !getSiteDetailsLoading && getSiteDetailsData) {
            console.log(getSiteDetailsData);
            this.setState({
                dataState: getSiteDetails.data.state,
                siteDetailsData: getSiteDetailsData.data,
            })
        }

        if (prevProps.deleteSite !== deleteSite && !deleteSiteError && !deleteSiteLoading && deleteSiteData) {
            NotificationManager.success("Site successfully deleted", "Success", 2000);
            this.props.history.push('/sites')
        }

        if (prevProps.createSite !== createSite && !createSiteError && !createSiteLoading && createSiteData) {
            NotificationManager.success("Site successfully created", "Success", 2000);
            this.props.history.push('/sites')
        } else if (prevProps.createSite !== createSite && createSiteError && createSiteErrorData) {
            NotificationManager.error(`${createSiteErrorData.data.message}`, "Failed", 2000);

        }
    }

    handleWhereEverNav = (page) => {
        console.log(page);
        if (page === 'editDiv') {
            this.setState({ isIteditable: true })
        } else if (page === 'statsDiv') {

            this.setState({ isIteditable: false })
        } else if (page === 'postsDiv') {
            this.props.history.push({
                pathname: '/posts',
                state: { whichToFilter: 'test' }
            })
        } else if (page === 'widgetsDiv') {
            this.props.history.push({
                pathname: '/widgets',
                state: { whichToFilter: 'test' }
            })
        }
        else {
            this.setState({ isIteditable: false })
        }
        this.setState({ tabClicked: page })
    }


    handleButtonActive = (page) => {
        console.log(page);
        if (page === 'save') {
            const { name, url, description, head, encoding, factor, minimum, tracking, auto_publish, better_images, feed_definition, post_definition, refresh_interval, copy_from_site, guess_remote, tag_map } = this.state
            if (this.props.location.data?.createNew) {
                this.props.dispatch(CreateSiteActionRequest({
                    name,
                    url,
                    description,
                    head,
                    encoding,
                    factor,
                    minimum,
                    tracking,
                    auto_publish,
                    better_images,
                    feed_definition,
                    post_definition,
                    refresh_interval,
                    copy_from_site,
                    guess_remote,
                    tag_map
                }))
            } else {
                this.props.dispatch(UpdateSiteDetailsActionRequest({
                    id: this.props.match.params.id,
                    name,
                    url,
                    description,
                    head,
                    encoding,
                    factor,
                    minimum,
                    tracking,
                    auto_publish,
                    better_images,
                    feed_definition,
                    post_definition,
                    refresh_interval,
                    copy_from_site,
                    guess_remote,
                    tag_map
                }))
            }
        } else if (page === 'cancel') {
            this.setState({ isIteditable: false })
        } else {
            this.setState({ whichisit: page })
        }
    }

    handleStatusChange = (status) => {
        this.setState({ dataState: status })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value);
    }

    arrowSort = (value) => {
        console.log(value);
    }

    handleTrashClick = () => {
        this.setState({ confirmMessage: true })
    }

    deletesiteFunction = () => {
        this.props.dispatch(DeleteSiteActionRequest({
            id: this.props.match.params.id
        }))
    }

    render() {
        console.log(this.state);
        const { isIteditable, whichisit, dataState, tabClicked, siteDetailsData, tracking, better_images, auto_publish, copy_from_site } = this.state
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget isButtonNamepased={this.props?.location?.data?.buttonClicked} handleWhereEverNav={this.handleWhereEverNav} handleTrashClick={this.handleTrashClick} />
                {this.state.confirmMessage && <div className='confurmText'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deletesiteFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                {tabClicked === 'statsDiv' && <div style={{ height: '500px', marginTop: '20px' }}>
                    <Chart customStyle={{ padding: '0' }} />
                </div>}
                {tabClicked !== 'statsDiv' && <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <div className='generalDiv'>
                            <h1>General</h1>
                            <div className='status_div'>
                                <h4>Status</h4>
                                {!isIteditable && <div className='coloredDivStatus' style={{ background: siteDetailsData?.state === 1 ? '#ABD996' : siteDetailsData?.state === 0 ? '#DFE094' : siteDetailsData?.state === 2 ? '#E09494' : siteDetailsData?.state === 3 ? '#295265' : '' }}>
                                    {siteDetailsData?.state === 1 ? 'PUBLISHED' : siteDetailsData?.state === 0 ? 'DRAFT' : siteDetailsData?.state === 2 ? 'ERROR' : siteDetailsData?.state === 3 ? 'TRASH' : ''}
                                </div>}
                                {isIteditable && <div className='mainOptionDiv'>
                                    {options.map((item, key) => {
                                        return <div key={key} onClick={() => this.handleStatusChange(item)} className='coloredDivStatus' style={{ height: item === dataState && '47px', background: item === 1 ? '#ABD996' : item === 0 ? '#DFE094' : item === 2 ? '#E09494' : '#295265' }}>
                                            {item === 1 ? 'PUBLISHED' : item === 0 ? 'DRAFT' : item === 2 ? 'ERROR' : item === 3 ? 'TRASH' : ''}
                                        </div>

                                    })}
                                </div>
                                }
                            </div>
                            <div className='name_div'>
                                <h4>Name</h4>
                                {!isIteditable && <p>{siteDetailsData?.name}</p>}
                                {isIteditable && <input onChange={(e) => this.handleChange(e)} type="text" name='name' placeholder={siteDetailsData?.name} />}
                            </div>
                            <div className='url_div'>
                                <h4>Url</h4>
                                {!isIteditable && <Link to={siteDetailsData?.url}>{siteDetailsData?.url}</Link>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} placeholder={this.state.url ? this.state.url : siteDetailsData?.url} name='url' />}
                                {isIteditable && <SaveButtonEdit labeltext={'Scrape'} colorization={'ScrapeClass'} customStyle={{ width: '135px', marginRight: '20px' }} />}

                            </div>
                            <div className='owner_div'>
                                <h4>Owner</h4>
                                {!isIteditable && <Link to={`/users/${siteDetailsData?.owner?.id}`}>{siteDetailsData?.owner?.email}</Link>}
                                {/* {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Owner' placeholder='nina.aralica@alo.rs' />} */}
                                {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="merge"
                                    options={optionss}
                                />}
                            </div>
                            <div className='description_div'>
                                <h4>Description</h4>
                                {!isIteditable && <p>{siteDetailsData?.description}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='description' placeholder={siteDetailsData?.description} />}

                            </div>
                            <div className='head_div'>
                                <h4>Head</h4>
                                {!isIteditable && <Link to={siteDetailsData?.head}>{siteDetailsData?.head}</Link>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='head' placeholder={siteDetailsData?.head} />}

                            </div>
                            <div className='info_div'>
                                <div>
                                    <h4>Encoding</h4>
                                    {!isIteditable && <p>{siteDetailsData?.encoding}</p>}
                                    {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='encoding' placeholder={siteDetailsData?.encoding} style={{ width: '40px' }} />}

                                </div>

                                <div>
                                    <h4>Factor</h4>
                                    {!isIteditable && <p>{siteDetailsData?.factor}</p>}
                                    {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='factor' placeholder={siteDetailsData?.factor} style={{ width: '40px' }} />}

                                </div>
                                <div>
                                    <h4>Minimum</h4>
                                    {!isIteditable && <p>{siteDetailsData?.minimum}</p>}
                                    {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='minimum' placeholder={siteDetailsData?.minimum} style={{ width: '40px' }} />}

                                </div>
                            </div>
                            <div className='tracking_div'>
                                <h4>Tracking</h4>
                                {!isIteditable && <p>{siteDetailsData?.tracking}</p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input name='tracking' value={tracking} checked={tracking} onChange={(e) => this.setState({ tracking: e.target.checked })} style={{ width: '20px' }} type="checkbox" /> <label htmlFor="check">enable user tracking (sets cookie)</label></div>}
                            </div>
                        </div>


                        <div className='feedDiv'>
                            <h1>Feed</h1>
                            <div className='rss_div'>
                                <h4>RSS</h4>
                                {!isIteditable && <Link to='https://24online.rs/feed/'>https://24online.rs/feed/</Link>}
                                {isIteditable && <input name='RSS' onChange={(e) => this.handleChange(e)} type="text" placeholder='https://24online.rs/feed/' />}

                            </div>
                            <div className='images_div'>
                                <h4>Look for better images</h4>
                                {!isIteditable && <p>{siteDetailsData?.better_images}</p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input name='betterImage' value={better_images} checked={better_images} onChange={(e) => this.setState({ better_images: e.target.checked })} style={{ width: '20px' }} type="checkbox" /> <label htmlFor="check">scrape individual pages for images (insert only)</label></div>}


                            </div>
                            <div className='definition_div'>
                                <h4>Feed definition</h4>
                                {!isIteditable && <p>{siteDetailsData?.feed_definition}</p>}
                                {isIteditable && <input name='feed_definition' onChange={(e) => this.handleChange(e)} type="text" placeholder={siteDetailsData?.feed_definition} />}

                            </div>
                            <div className='postDefinition_div'>
                                <h4>Single post definition</h4>
                                {!isIteditable && <p>{siteDetailsData?.post_definition}</p>}
                                {isIteditable && <input name='post_definition' onChange={(e) => this.handleChange(e)} type="text" placeholder={siteDetailsData?.post_definition} />}


                            </div>
                            <div className='expression_div'>
                                <h4>Uniq ID expression</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input name='UniqIDExpression' onChange={(e) => this.handleChange(e)} type="text" placeholder='' />}

                            </div>
                            <div className='interval_div'>
                                <h4>Refresh interval (min)</h4>
                                {!isIteditable && <p>{siteDetailsData?.refresh_interval}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='refresh_interval' placeholder={siteDetailsData?.refresh_interval} />}

                            </div>
                            <div className='autopublish_div'>
                                <h4>Autopublish</h4>
                                {!isIteditable && <p>{siteDetailsData?.auto_publish}</p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input name='auto_publish' value={auto_publish} checked={auto_publish} onChange={(e) => this.setState({ auto_publish: e.target.checked })} style={{ width: '20px' }} type="checkbox" /> <label htmlFor="check">limit to feed</label></div>}


                            </div>
                            <div className='table_div'>
                                <div className='leftTable'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Category limits</th>
                                                <th>Keep at most</th>
                                                <th>Expire after (hrs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {test.map((item, key) => {
                                                return <tr key={key}>
                                                    <td>
                                                        {!isIteditable && <p>{item.title}</p>}
                                                        {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='CagegoryLimit' placeholder={item.title} />}

                                                    </td>
                                                    <td>
                                                        {!isIteditable && <p> {item.keep}</p>}
                                                        {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='KeepAtMost' placeholder={item.keep} />}

                                                    </td>
                                                    <td>
                                                        {!isIteditable && <p>  {item.maxAge}</p>}
                                                        {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='ExpireAfter' placeholder={item.maxAge} />}


                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='rightTable'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Min impressions</th>
                                                <th>Min CTR (%)</th>
                                                <th>Max Age (hrs)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {test.map((item, key) => {
                                                return <tr key={key}>
                                                    <td>
                                                        {!isIteditable && <p>{item.text}</p>}
                                                        {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='MinImpressions' placeholder={item.text} />}

                                                    </td>
                                                    <td>
                                                        {!isIteditable && <p> {item.text}</p>}
                                                        {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='MinCTR' placeholder={item.text} />}

                                                    </td>
                                                    <td>
                                                        {!isIteditable && <p>  {item.expire}</p>}
                                                        {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='MaxAge' placeholder={item.expire} />}


                                                    </td>

                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rightSideDiv'>
                        <div className='categoriesDiv'>
                            <h1>Categories</h1>
                            <div className='categ_div'>
                                <h4>Categories</h4>
                                {!isIteditable && <div className='listOfCateg'>
                                    {siteDetailsData?.categories?.map((item, key) => {
                                        if (!isIteditable) {
                                            return <p key={key}>{item}</p>
                                        }
                                        else {
                                            return <div key={key}>
                                                <img src={xButton} alt="x" />
                                                <p>{item}</p>
                                            </div>
                                        }
                                    })}

                                </div>}
                                {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    isMulti
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="merge"
                                    options={optionss}
                                />}
                            </div>
                            <div className='copySite_div'>
                                <h4>Copy from site</h4>
                                {!isIteditable && < p > {siteDetailsData?.copy_from_site}</p>}
                                {isIteditable && <div><input type="checkbox" value={copy_from_site} checked={copy_from_site} onChange={(e) => this.setState({ copy_from_site: e.target.checked })} name="copy_from_site" /> <label htmlFor="check">copy site categories to new posts</label></div>}

                            </div>
                            <div className='guessRemote_div'>
                                <h4>Guess remote category from url - enter the number of the path segment</h4>
                                {!isIteditable && <p>{siteDetailsData?.guess_remote}</p>}
                                {isIteditable && <input name='guess_remote' type="text" onChange={(e) => this.handleChange(e)} placeholder='' />}

                            </div>
                            <div className='indexTag_div'>
                                <h4>Index of tag for mapping <br /> (1=first,2=seocnd,..)</h4>
                                {!isIteditable && <p>{siteDetailsData?.tag_map}</p>}
                                {isIteditable && <input name='tag_map' type="text" onChange={(e) => this.handleChange(e)} placeholder={siteDetailsData?.tag_map} />}

                            </div>
                        </div>
                        <div className='feedCategoriesDiv'>
                            <h1>Feed -<span>{`>`}</span> Category</h1>
                            <div className='feedCat_div'>
                                <Link to='https://24online.rs/feed/'>https://24online.rs/feed/</Link>
                                {isIteditable && <div>
                                    <select>
                                        <option className='options' value="">none selected</option>
                                    </select>
                                    <img src={xButton} alt="x" />
                                </div>
                                }
                            </div>
                        </div>

                        <div className='remoteCategoriesDiv'>
                            <div>
                                <h1>Remote Category -<span>{`>`}</span> Category</h1>
                                {isIteditable && <div>
                                    <SaveButtonEdit labeltext={'Add default'} handleButtonActive={() => this.handleButtonActive('AddDefault')} colorization={`ScrapeClass ${whichisit === 'AddDefault' && 'clicked'}`} customStyle={{ minWidth: '100px' }} />
                                    <SaveButtonEdit labeltext={'Clear map'} handleButtonActive={() => this.handleButtonActive('clearMap')} colorization={`ScrapeClass ${whichisit === 'clearMap' && 'clicked'}`} />
                                    <SaveButtonEdit labeltext={'Sunc map'} handleButtonActive={() => this.handleButtonActive('syncMap')} colorization={`ScrapeClass ${whichisit === 'syncMap' && 'clicked'}`} />
                                </div>
                                }
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div>
                                                <div>
                                                    <img src={arrowUp} alt="arrow" onClick={() => this.arrowSort('fromUp')} />
                                                    <img src={secondarrowDown} alt="arrow" onClick={() => this.arrowSort('fromDown')} />
                                                </div>
                                                <p>from</p>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <div>
                                                    <img src={arrowUp} alt="arrow" onClick={() => this.arrowSort('toUp')} />
                                                    <img src={secondarrowDown} alt="arrow" onClick={() => this.arrowSort('toDown')} />
                                                </div>
                                                <p>to</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {test2.map((items, key) => {
                                        return <tr key={key} style={{ background: isIteditable && 'white' }}>
                                            <td><p className='mainTitleName'>{items.mesto}</p></td>
                                            {!isIteditable && <td><p>{items.title}</p></td>}
                                            {isIteditable && <td><div className='selectableDivMain'>
                                                <select>
                                                    {test2.map((item, key) => {
                                                        return <option className='options' key={key} defaultValue={items.title === item.title && true} value={item.title}>{item.title}</option>
                                                    })}
                                                </select>
                                                <img src={xButton} alt="x" />
                                            </div>
                                            </td>
                                            }
                                        </tr>
                                    })

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}

                {
                    isIteditable && <div className='buttonsDiv'>
                        <SaveButtonEdit handleButtonActive={() => this.handleButtonActive('save')} labeltext={'Save changes'} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                        <SaveButtonEdit labeltext={'Cancel'} handleButtonActive={() => this.handleButtonActive('cancel')} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                    </div>
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    const { SitesListReducer } = state;
    const { getSiteDetails, deleteSite, updateSiteDetails, createSite } = SitesListReducer
    return {
        getSiteDetails,
        deleteSite,
        updateSiteDetails,
        createSite

    }
}

export default connect(mapStateToProps, null)(SiteDetails)
