import React, { useState, useEffect } from 'react'
import trash from '../../assets/img/SecondHeader/Icons3.svg'
import {
    useSelector,
    //  useDispatch
} from 'react-redux'
import { useLocation } from 'react-router'
import search from '../../assets/img/SecondHeader/Frame.svg'
import plas from '../../assets/img/SecondHeader/Group5361.svg'
import arrowLeft from '../../assets/img/SecondHeader/Vector.svg'
import arrowRight from '../../assets/img/SecondHeader/Vector(1).svg'
import Pagination from "react-js-pagination";
import DropDown from '../DropDown/DropDown'
// import { GetCategoryListActionRequest } from '../../store/actions/CategoryAction'
// import { GetSitesListActionRequest } from '../../store/actions/SitesListAction'
// import { GetUsersListActionRequest } from '../../store/actions/UsersActions'


import '../../components/Home/Home.scss'


function SearchContainer({ page, handlePageChange, handleAllOptionsOnMain, selectedSiteSearch, handleSearchOnMainPage, pageName, state, handleAddSomeMore, handleCountPerPage, handleSortByStatus, handleSubtmit, handleSearchBar, secondHeaderCustomStyle, customStyleForlesTabs }) {
    const [user, setUser] = useState('all users')
    const [statusOn, setStatusOn] = useState('NOTRASH')
    // const dispatch = useDispatch()
    const location = useLocation()
    const [showUserOptions, setShowUserOptions] = useState(false)
    const [categorie, setCategorie] = useState('all categories')
    const [showCategorieOptions, setShowCategorieOptions] = useState(false)
    const [sites, setSites] = useState('all sites')
    const [showSitesOptions, setShowSitesOptions] = useState(false)
    const states = useSelector(state => state)
    const { CategoryReducer, SitesListReducer, UsersReducer } = states
    const { error: getCategoryListError, data: getCategoryListData } = CategoryReducer.getCategoryList
    const { error: getSitesListError, data: getSitesListData } = SitesListReducer.getSitesList
    const { error: getUsersListError, data: getUsersListData } = UsersReducer.getUsersList

    // useEffect(() => {
    //     if (!getCategoryListLoading && !getCategoryListError && !getCategoryListData) {
    //         dispatch(GetCategoryListActionRequest())
    //     }
    // }, [CategoryReducer.getCategoryList])

    // useEffect(() => {
    //     if (!getSitesListLoading && !getSitesListError && !getSitesListData) {
    //         dispatch(GetSitesListActionRequest())

    //     }
    // }, [SitesListReducer.getSitesList])

    // useEffect(() => {
    //     if (!getUsersListLoading && !getUsersListError && !getUsersListData) {
    //         dispatch(GetUsersListActionRequest())

    //     }
    // }, [UsersReducer.getUsersList])


    const handleChangeOptionsuser = (el) => {
        handleSearchOnMainPage(el, 'users')
        setUser(el.name)
    }

    const handleChangeOptionscategorie = (el) => {
        handleSearchOnMainPage(el, 'categories')
        setCategorie(el.name)
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
        handleSearchOnMainPage(el, 'sites')

        setSites(el.name)
    }

    const handleAllOptionsUser = (el) => {
        setUser(el)
        handleAllOptionsOnMain(el, 'users')
    }
    const handleAllOptionsSite = (el) => {
        setSites(el)
        handleAllOptionsOnMain(el, 'sites')

    }
    const handleAllOptionsCateg = (el) => {
        setCategorie(el)
        handleAllOptionsOnMain(el, 'categories')
    }

    const handleStatusShow = (el) => {
        if (statusOn === el) {
            setStatusOn('')
        } else {
            setStatusOn(el)
        }
        handleSortByStatus(el)
    }


    useEffect(() => {
        if (location?.data?.searchBy && location?.data?.prevPath) {
            const pasedDataSearch = location?.data?.searchBy
            const prePath = location?.data?.prevPath
            prePath === '/sites' && setSites(pasedDataSearch.name)
        } else if (location?.data?.searchBycategory && location?.data?.prevPath) {
            const pasedDataSearch = location?.data?.searchBycategory
            const prePath = location?.data?.prevPath
            prePath === '/categories' && setCategorie(pasedDataSearch.name)
        } else if (location?.data?.searchByuser && location?.data?.prevPath) {
            const pasedDataSearch = location?.data?.searchByuser
            const prePath = location?.data?.prevPath
            prePath === '/users' && setUser(pasedDataSearch.name)
        } else if (location?.dataFromStats?.searchBycategory) {
            const el = location?.dataFromStats
            if (el.pageName === 'stats') {
                setCategorie(el.searchBycategory?.name)
                setSites(el.searchByuser.name)
                setStatusOn(el.status)
            }
        }

    }, [])

    return (
        <div className='mainSecondHeaderDiv' style={secondHeaderCustomStyle && secondHeaderCustomStyle}>
            <div className={`secondHeaderDiv ${customStyleForlesTabs && 'customStyleForlesTabs'} ${secondHeaderCustomStyle && 'customStyleForTotals'} `}>
                <div className={`secondHeaderDivSection1 ${(pageName === 'USERS' || pageName === 'CATEGORIES' || pageName === 'TOTALS') && 'secondUserHeaderDiv'}`}>
                    <div className='info1'>
                        <div className={`box-1 ${pageName === 'USERS' && 'userAloneBox'}`}><p style={{ marginRight: '30px' }}>{pageName}</p></div>
                        <div className='horizontal' />
                        {pageName === 'SITES' && <div className='box-2' onClick={handleUsersShow}>
                            <DropDown label={user} isItOpen={showUserOptions} handleAllOptions={handleAllOptionsUser} options={!getUsersListError && getUsersListData && getUsersListData.data} handleChangeOptions={handleChangeOptionsuser} />
                        </div>}
                        {(pageName === 'POSTS' || pageName === 'WIDGETS' || pageName === 'CATEGORIES' || pageName === 'TOTALS') && <div className='box-2' onClick={handleSitesShow}>
                            <DropDown label={sites} isItOpen={showSitesOptions} handleAllOptions={handleAllOptionsSite} options={!getSitesListError && getSitesListData && getSitesListData.data} handleChangeOptions={handleChangeOptionssites} />
                        </div>}
                        {pageName !== 'USERS' && <div className='horizontal' />}
                        {pageName !== 'USERS' && pageName !== 'CATEGORIES' && <div className='box-3' onClick={handleCategorieShow}>
                            <DropDown label={categorie} isItOpen={showCategorieOptions} handleAllOptions={handleAllOptionsCateg} options={!getCategoryListError && getCategoryListData && getCategoryListData.data} handleChangeOptions={handleChangeOptionscategorie} />

                        </div>}
                        {pageName !== 'USERS' && pageName !== 'CATEGORIES' && <div className='horizontal' />}
                    </div>
                    {pageName !== 'TOTALS' && pageName !== 'USERS' && pageName !== 'CATEGORIES' && <div className='info2'>
                        <div className='sectionWithTrash'>
                            <div className='col1' style={{ borderBottom: statusOn === 'NOTRASH' && '5px solid #94d7e0' }} onClick={() => handleStatusShow('NOTRASH')}><p>NO TRASH</p></div>
                            <div className='col2' style={{ borderBottom: statusOn === 1 && '5px solid #94d7e0' }} onClick={() => handleStatusShow(1)}><p>PUBLISHED</p></div>
                            <div className='col3' style={{ borderBottom: statusOn === 0 && '5px solid #94d7e0' }} onClick={() => handleStatusShow(0)}><p>DRAFT</p></div>
                            <div className='col4' style={{ borderBottom: statusOn === 2 && '5px solid #94d7e0' }} onClick={() => handleStatusShow(2)}><p>ERROR</p></div>

                            <div className='trashDiv' style={{ borderBottom: statusOn === 3 && '5px solid #94d7e0' }} onClick={() => handleStatusShow(3)}><img src={trash} alt="trash" /></div>
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
                    <div className='sectionWithAddButton' >
                        <div onClick={() => handleAddSomeMore()}>
                            <img src={plas} alt="plas" />
                            <p>add</p>
                        </div>
                    </div>
                </div>}
            </div>
            {pageName !== 'TOTALS' && <div className='pagesAndPagination'>
                <div className='divWithInfoText'>LEGEND: <span>in:</span> clicks coming from site X, <span>out:</span> clicks sent to site X <span>txr:</span> out / in</div>
                <div className='pageInfoDiv'>
                    <div>
                        <p>{`${page * state.countPerPage - state.countPerPage} - ${state.countPerPage * page} of ${state.data?.length}`}</p>
                    </div>

                    <input type="number" onChange={(e) => handleCountPerPage(e)} />
                    <p>per page </p>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={state.countPerPage ? parseInt(state.countPerPage) : 10}
                        totalItemsCount={state.data?.length}
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
