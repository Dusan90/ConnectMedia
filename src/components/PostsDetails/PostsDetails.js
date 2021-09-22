import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavWidget from '../../containers/NavWidget/NavWidget'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import xButton from '../../assets/img/SiteDetails/xButton.svg'
import '../SiteDetails/SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import Chart from '../../containers/Chart/Chart'
import VerticalChart from '../../containers/Chart/VerticalChart'


// const test = [{
//     title: 'vesti',
//     keep: 50,
//     expire: 23,
//     maxAge: 24
// }]

// const test2 = [{ mesto: 'Beograd', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'kultura', title: 'zanimljivosti' }]

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
]

const test3 = [{ text: 'vesti' }, { text: 'zabava' }]

const options = ["PUBLISHED", 'DRAFT', 'ERROR', 'TRASH']

export class PostsDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            whichisit: '',
            dataTest: 'PUBLISHED',
            file: null,
            tabClicked: ''

        }
    }

    handleWhereEverNav = (page) => {
        if (page === 'editDiv') {
            this.setState({ isIteditable: true })
        } else {
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

    handleChangeFile = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }
    render() {
        const { isIteditable, dataTest, tabClicked } = this.state
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} pageName={'posts'} />
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
                                {isIteditable && <input type="text" placeholder='24Online.rs' />}
                            </div>
                            <div className='url_div'>
                                <h4>Url</h4>
                                {!isIteditable && <Link to='https://24online.rs/'>https://24online.rs/</Link>}
                                {isIteditable && <input type="text" placeholder='https://24online.rs/' />}
                                {isIteditable && <SaveButtonEdit labeltext={'Scrape'} colorization={'ScrapeClass'} customStyle={{ width: '135px', marginRight: '20px' }} />}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Canonical</h1>

                            <div className='owner_div selectable'>
                                <h4>Site</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>}
                            </div>
                            <div className='owner_div'>
                                <h4>Owner</h4>
                                {!isIteditable && <Link to='nina.aralica@alo.rs'>nina.aralica@alo.rs</Link>}
                                {isIteditable && <input type="text" placeholder='nina.aralica@alo.rs' />}
                            </div>
                            <div className='description_div'>
                                <h4>Description</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Author</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Order</h1>
                            <div className='head_div'>
                                <h4>Content</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                        </div>


                    </div>
                    <div className='rightSideDiv'>
                        <div className='categoriesDiv'>
                            <h1>Categories</h1>
                            <div className='categ_div'>
                                <h4>Categories</h4>
                                <div>
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

                                </div>
                            </div>
                            <div className='categ_div'>
                                <h4>Date</h4>

                                {!isIteditable && <p></p>}
                                {isIteditable && <input className='dateInput' type="date" placeholder='' />}

                            </div>
                            <div className='categ_div'>
                                <h4>Image</h4>
                                {!isIteditable && <img src={arrowUp} alt='arrow up' />}
                                {isIteditable && <input type="file" onChange={this.handleChangeFile} placeholder='' />}
                            </div>
                            {this.state.file && <div className='categ_div'>
                                <img style={{ width: '300px' }} src={this.state.file} alt='uploaded' />

                            </div>}

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

export default PostsDetails
