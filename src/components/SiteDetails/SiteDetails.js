import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavWidget from '../../containers/NavWidget/NavWidget'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import xButton from '../../assets/img/SiteDetails/xButton.svg'
import { connect } from 'react-redux'
import './SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import { GetSiteDetailsActionRequest, DeleteSiteActionRequest } from '../../store/actions/SitesListAction'
import Chart from '../../containers/Chart/Chart'
import Select from 'react-select'

const test = [{
    title: 'vesti',
    keep: 50,
    expire: 23,
    maxAge: 24
}]

const test2 = [{ mesto: 'Beograd', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'kultura', title: 'zanimljivosti' }]

const test3 = [{ text: 'vesti' }, { text: 'zabava' }]

const options = ["PUBLISHED", 'DRAFT', 'ERROR', 'TRASH']

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
            dataTest: 'PUBLISHED',
            tabClicked: '',
            confirmMessage: false
        }
    }

    componentDidMount() {
        this.props.dispatch(GetSiteDetailsActionRequest({
            id: this.props.match.params.id
        }))
    }

    componentDidUpdate(prevProps) {
        const { getSiteDetails, deleteSite } = this.props
        const { data: getSiteDetailsData, loading: getSiteDetailsLoading, error: getSiteDetailsError, errorData: getSiteDetailsErrorData } = getSiteDetails;
        const { data: deleteSiteData, loading: deleteSiteLoading, error: deleteSiteError, errorData: deleteSiteErrorData } = deleteSite;


        if (prevProps.getSiteDetails !== getSiteDetails && !getSiteDetailsError && !getSiteDetailsLoading && getSiteDetailsData) {
            console.log(getSiteDetailsData);
            // this.setState({ data: getSiteDetailsData.data })
        }

        if (prevProps.deleteSite !== deleteSite && !deleteSiteError && !deleteSiteLoading && deleteSiteData) {
            console.log(deleteSiteData);
            // this.setState({ data: getSiteDetailsData.data })
        }
    }

    handleWhereEverNav = (page) => {
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
        this.setState({ whichisit: page })
    }

    handleStatusChange = (status) => {
        this.setState({ dataTest: status })
    }

    handleChange = (e) => {
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
        const { isIteditable, whichisit, dataTest, tabClicked } = this.state
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} handleTrashClick={this.handleTrashClick} />
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
                                {!isIteditable && <div className='coloredDivStatus' style={{ background: dataTest === 'PUBLISHED' ? '#ABD996' : dataTest === 'DRAFT' ? '#DFE094' : dataTest === 'ERROR' ? '#E09494' : '#295265' }}>
                                    {dataTest}
                                </div>}
                                {isIteditable && <div className='mainOptionDiv'>
                                    {options.map((item, key) => {
                                        return <div key={key} onClick={() => this.handleStatusChange(item)} className='coloredDivStatus' style={{ height: item === dataTest && '47px', background: item === 'PUBLISHED' ? '#ABD996' : item === 'DRAFT' ? '#DFE094' : item === 'ERROR' ? '#E09494' : '#295265' }}>
                                            {item}
                                        </div>

                                    })}
                                </div>
                                }
                            </div>
                            <div className='name_div'>
                                <h4>Name</h4>
                                {!isIteditable && <p>24Online.rs</p>}
                                {isIteditable && <input onChange={(e) => this.handleChange(e)} type="text" name='Name' placeholder='24Online.rs' />}
                            </div>
                            <div className='url_div'>
                                <h4>Url</h4>
                                {!isIteditable && <Link to='https://24online.rs/'>https://24online.rs/</Link>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} placeholder='https://24online.rs/' name='Url' />}
                                {isIteditable && <SaveButtonEdit labeltext={'Scrape'} colorization={'ScrapeClass'} customStyle={{ width: '135px', marginRight: '20px' }} />}

                            </div>
                            <div className='owner_div'>
                                <h4>Owner</h4>
                                {!isIteditable && <Link to='nina.aralica@alo.rs'>nina.aralica@alo.rs</Link>}
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
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Description' placeholder='' />}

                            </div>
                            <div className='head_div'>
                                <h4>Head</h4>
                                {!isIteditable && <Link to='https://24online.rs/wp-content/cache/autoptimize/css/autoptimize_d69707991926bccc2c924d199b5e56ac.css'>https://24online.rs/wp-content/cache/autoptimize/css/autoptimize_d69707991926bccc2c924d199b5e56ac.css</Link>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Head' placeholder='https://24online.rs/wp-content/cache/autoptimize/css/autoptimize_d69707991926bccc2c924d199b5e56ac.css' />}

                            </div>
                            <div className='info_div'>
                                <div>
                                    <h4>Encoding</h4>
                                    {!isIteditable && <p>utf8</p>}
                                    {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Encoding' placeholder='utf8' style={{ width: '40px' }} />}

                                </div>

                                <div>
                                    <h4>Factor</h4>
                                    {!isIteditable && <p>1</p>}
                                    {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Factor' placeholder='1' style={{ width: '40px' }} />}

                                </div>
                                <div>
                                    <h4>Minimum</h4>
                                    {!isIteditable && <p></p>}
                                    {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Minimum' placeholder='' style={{ width: '40px' }} />}

                                </div>
                            </div>
                            <div className='tracking_div'>
                                <h4>Tracking</h4>
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input name='Tracking' style={{ width: '20px' }} type="checkbox" /> <label htmlFor="check">enable user tracking (sets cookie)</label></div>}
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
                                {!isIteditable && <p>24Online.rs</p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input name='betterImage' style={{ width: '20px' }} type="checkbox" /> <label htmlFor="check">scrape individual pages for images (insert only)</label></div>}


                            </div>
                            <div className='definition_div'>
                                <h4>Feed definition</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input name='FeedDefinition' onChange={(e) => this.handleChange(e)} type="text" placeholder='' />}

                            </div>
                            <div className='postDefinition_div'>
                                <h4>Single post definition</h4>
                                {!isIteditable && <Link to='nina.aralica@alo.rs'>nina.aralica@alo.rs</Link>}
                                {isIteditable && <input name='SingleDefinition' onChange={(e) => this.handleChange(e)} type="text" placeholder='nina.aralica@alo.rs' />}


                            </div>
                            <div className='expression_div'>
                                <h4>Uniq ID expression</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input name='UniqIDExpression' onChange={(e) => this.handleChange(e)} type="text" placeholder='' />}

                            </div>
                            <div className='interval_div'>
                                <h4>Refresh interval (min)</h4>
                                {!isIteditable && <p>73</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='RefreshInterval' placeholder='73' />}

                            </div>
                            <div className='autopublish_div'>
                                <h4>Autopublish</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input name='Autopublish' style={{ width: '20px' }} type="checkbox" /> <label htmlFor="check">limit to feed</label></div>}


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
                                    {test3.map((item, key) => {
                                        if (!isIteditable) {
                                            return <p key={key}>{item.text}</p>
                                        }
                                        else {
                                            return <div key={key}>
                                                <img src={xButton} alt="x" />
                                                <p>{item.text}</p>
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
                                <p></p>
                                {isIteditable && <div><input type="checkbox" name="CopyFromSite" /> <label htmlFor="check">copy site categories to new posts</label></div>}

                            </div>
                            <div className='guessRemote_div'>
                                <h4>Guess remote category from url - enter the number of the path segment</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input name='GuessRemoteCategory' type="text" onChange={(e) => this.handleChange(e)} placeholder='' />}

                            </div>
                            <div className='indexTag_div'>
                                <h4>Index of tag for mapping <br /> (1=first,2=seocnd,..)</h4>
                                {!isIteditable && <p>1</p>}
                                {isIteditable && <input name='IndexOfTag' type="text" onChange={(e) => this.handleChange(e)} placeholder='1' />}

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

                {isIteditable && <div className='buttonsDiv'>
                    <SaveButtonEdit labeltext={'Save changes'} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                    <SaveButtonEdit labeltext={'Cancel'} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { SitesListReducer } = state;
    const { getSiteDetails, deleteSite } = SitesListReducer
    return {
        getSiteDetails,
        deleteSite

    }
}

export default connect(mapStateToProps, null)(SiteDetails)
