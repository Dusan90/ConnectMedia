import React, { useState } from 'react'
import trash from '../../assets/img/SecondHeader/Icons3.svg'
import search from '../../assets/img/SecondHeader/Frame.svg'
import plas from '../../assets/img/SecondHeader/Group5361.svg'
import arrowLeft from '../../assets/img/SecondHeader/Vector.svg'
import arrowRight from '../../assets/img/SecondHeader/Vector(1).svg'
import Pagination from "react-js-pagination";
import DropDown from '../DropDown/DropDown'
import '../../components/Home/Home.scss'

const options = ['test', 'test2', 'test3']

function SearchContainer({ page, handlePageChange, pageName, handleSortByStatus, handleHomePageSort, handleSubtmit, handleSearchBar, secondHeaderCustomStyle, customStyleForlesTabs }) {
    const [user, setUser] = useState('all users')
    const [showUserOptions, setShowUserOptions] = useState(false)
    const [categorie, setCategorie] = useState('all categories')
    const [showCategorieOptions, setShowCategorieOptions] = useState(false)
    const [sites, setSites] = useState('all sites')
    const [showSitesOptions, setShowSitesOptions] = useState(false)




    const handleChangeOptionsuser = (el) => {
        handleHomePageSort(el, 'users')
        setUser(el)
    }

    const handleChangeOptionscategorie = (el) => {
        handleHomePageSort(el, 'categories')
        setCategorie(el)
    }

    const handleUsersShow = () => {
        setShowUserOptions(prevProps => {
            return !prevProps
        })
        setShowCategorieOptions(false)
    }

    const handleCategorieShow = () => {

        setShowCategorieOptions(prevProps => {
            return !prevProps
        })
        setShowUserOptions(false)
        setShowSitesOptions(false)

    }

    const handleSitesShow = () => {
        setShowSitesOptions(prevProps => {
            return !prevProps
        })
        setShowCategorieOptions(false)
    }

    const handleChangeOptionssites = (el) => {
        handleHomePageSort(el, 'sites')
        setSites(el)
    }


    console.log(showCategorieOptions);

    return (
        <div className='mainSecondHeaderDiv' style={secondHeaderCustomStyle && secondHeaderCustomStyle}>
            <div className={`secondHeaderDiv ${customStyleForlesTabs && 'customStyleForlesTabs'} ${secondHeaderCustomStyle && 'customStyleForTotals'} `}>
                <div className='secondHeaderDivSection1'>
                    <div className='info1'>
                        <div className='box-1'><p style={{ marginRight: '30px' }}>{pageName}</p></div>
                        <div className='horizontal' />
                        {pageName === 'SITES' && <div className='box-2' onClick={handleUsersShow}>
                            <DropDown label={user} isItOpen={showUserOptions} options={options} handleChangeOptions={handleChangeOptionsuser} />
                        </div>}
                        {(pageName === 'POSTS' || pageName === 'WIDGETS' || pageName === 'CATEGORIES' || pageName === 'TOTALS') && <div className='box-2' onClick={handleSitesShow}>
                            <DropDown label={sites} isItOpen={showSitesOptions} options={options} handleChangeOptions={handleChangeOptionssites} />
                        </div>}
                        {pageName !== 'USERS' && <div className='horizontal' />}
                        {pageName !== 'USERS' && pageName !== 'CATEGORIES' && <div className='box-3' onClick={handleCategorieShow}>
                            <DropDown label={categorie} isItOpen={showCategorieOptions} options={options} handleChangeOptions={handleChangeOptionscategorie} />

                        </div>}
                        {pageName !== 'USERS' && pageName !== 'CATEGORIES' && <div className='horizontal' />}
                    </div>
                    {pageName !== 'TOTALS' && pageName !== 'USERS' && pageName !== 'CATEGORIES' && <div className='info2'>
                        <div className='sectionWithTrash'>
                            <div className='col1' onClick={() => handleSortByStatus('NOTRASH')}><p>NO TRASH</p></div>
                            <div className='col2' onClick={() => handleSortByStatus('PUBLISHED')}><p>PUBLISHED</p></div>
                            <div className='col3' onClick={() => handleSortByStatus('DRAFT')}><p>DRAFT</p></div>
                            <div className='col4' onClick={() => handleSortByStatus('ERROR')}><p>ERROR</p></div>

                            <div className='trashDiv' onClick={() => handleSortByStatus('TRASH')}><img src={trash} alt="trash" /></div>
                        </div>
                    </div>}
                </div>
                {pageName !== 'TOTALS' && <div className='section2'>
                    <div className='sectionSearch'>
                        <div>
                            <form onSubmit={handleSubtmit}>
                                <img src={search} alt="search" />
                                <input type="text" placeholder='search' onChange={(e) => handleSearchBar(e)} />
                            </form>
                        </div>

                    </div>
                    <div className='sectionWithAddButton'>
                        <img src={plas} alt="plas" />
                        <p>add</p>

                    </div>
                </div>}
            </div>
            {pageName !== 'TOTALS' && <div className='pagesAndPagination'>
                <div className='divWithInfoText'>LEGEND: <span>in:</span> clicks coming from site X, <span>out:</span> clicks sent to site X <span>txr:</span> out / in</div>
                <div className='pageInfoDiv'>
                    <div>
                        <p>1 - 20 of 23 </p>
                    </div>

                    <input type="number" />
                    <p>per page </p>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={2}
                        onChange={handlePageChange}
                        hideFirstLastPages={true}
                        prevPageText={<img src={arrowLeft} alt='arrowLeft' />}
                        nextPageText={<img src={arrowRight} alt='arrowRight' />}
                        itemClass={'mainLinkClass'}
                    />
                </div>
            </div>}
        </div>
    )
}

export default SearchContainer
