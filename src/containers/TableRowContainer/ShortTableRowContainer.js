import React, { useState, useEffect } from 'react'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import secondTrash from '../../assets/img/TableIcons/trash.svg'
import { useSelector, useDispatch } from 'react-redux'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import history from '../../routes/History'
import { BindCategoryActionRequest, UnbindCategoryActionRequest, GetCategoryListActionRequest } from '../../store/actions/CategoryAction'
import { UpdateWidgetDetailsActionRequest } from '../../store/actions/WidgetActions'


function ShortTableRowContainer({ data, pageName, handleCheckbox, handleTrashFunctionaliti, checkboxList, handleArrowSort, handleHashArrowClick, state }) {
    const statee = useSelector(state => state)
    const dispatch = useDispatch()
    const { CategoryReducer } = statee
    const { loading: getCategoryListLoading, error: getCategoryListError, data: getCategoryListData, errorData: getCategoryListErrorData } = CategoryReducer.getCategoryList
    const [categoryList, setCategoryList] = useState([])


    useEffect(() => {
        if (!getCategoryListLoading && !getCategoryListError && getCategoryListData) {
            setCategoryList(getCategoryListData.data)
        }
    }, [CategoryReducer.getCategoryList])


    const handlePageRedirect = (item) => {
        if (pageName === 'widgets') {
            history.push({
                pathname: `/widgets/${item.site?.id}`,
                state: item
            })
        } else {
            history.push({
                pathname: `/sites/${item.site?.id}`,
                state: item
            })
        }
    }

    const haneldeRedirect = (value, tabClicked) => {
        if (tabClicked === 'edit') {
            history.push({
                pathname: `/sites/${value.id}`,
                data: { buttonClicked: 'editDiv' }
            })
        } else if (tabClicked === 'stats') {
            history.push({
                pathname: `/sites/${value.id}`,
                data: { buttonClicked: 'statsDiv' }
            })
        } else if (tabClicked === 'posts') {
            history.push({
                pathname: `/posts`,
                data: { searchBy: value, prevPath: window.location.pathname }
            })
        } else if (tabClicked === 'widgets') {
            history.push({
                pathname: `/widgets`,
                data: { searchBy: value, prevPath: window.location.pathname }
            })
        }
    }

    const hashesmaping = state?.hashesArrowWitchIsOn?.categories?.length !== 0 ? state?.hashesArrowWitchIsOn?.categories?.map(el => {
        if (pageName !== 'widgets') {
            return el.category.id
        } else {
            return el.id
        }
    }) : []



    return (
        <div className='shortScreenTableDiv'>
            {data.length !== 0 && data.map((item, key) => {

                return <div key={key} className='mainDivShotScreen'>
                    <div className='checkAndTrashDiv'>
                        <input type="checkbox" value={checkboxList} checked={checkboxList[item.id]} onChange={(e) => handleCheckbox(e, item)} />
                        <img src={secondTrash} alt="trash" onClick={() => handleTrashFunctionaliti(item.id)} />
                    </div>
                    <div className='statusDiv'>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'status' : 'state', 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'status' : 'state', 'Down')} alt="arrow" />
                            </div>
                            <p>STATUS</p>
                        </div>
                        {pageName !== 'widgets' && <div className='coloredDivStatus' style={{ background: item.state === 1 ? '#ABD996' : item.state === 0 ? '#dfe094' : item.state === 2 ? '#e09494' : item.state === 3 ? '#295265' : '' }}>
                            {item.state === 1 ? 'PUBLISHED' : item.state === 0 ? 'DRAFT' : item.state === 2 ? 'ERROR' : item.state === 3 ? 'TRASH' : ''}
                        </div>}
                        {pageName === 'widgets' && <div className='coloredDivStatus' style={{ background: item.status === 1 ? '#ABD996' : item.status === 0 ? '#dfe094' : item.status === 2 ? '#e09494' : item.status === 3 ? '#295265' : '' }}>
                            {item.status === 1 ? 'PUBLISHED' : item.status === 0 ? 'DRAFT' : item.status === 2 ? 'ERROR' : item.status === 3 ? 'TRASH' : ''}
                        </div>}
                    </div>
                    <div className='ownerDiv' onClick={() => handlePageRedirect(item)}>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? 'name' : 'owner', 'Up')} />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'name' : 'owner', 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Name' : 'OWNER'}</p>

                        </div>
                        {pageName !== 'widgets' && <div className='ownerClass'>
                            <p id='noredirection' onClick={() => history.push(`/users/${item.owner.id}`)}>
                                {item.owner.email}
                            </p>
                        </div>}
                        {pageName === 'widgets' && <div className='ownerClass'>
                            <p id='noredirection' onClick={() => history.push(`/sites/${item.site?.id}`)}>{item.site?.name}</p>
                        </div>}
                    </div>
                    <div className='nazivDiv'>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'site' : "name", "Up")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'site' : "name", "Down")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Site' : "Name"}</p>

                        </div>
                        <div className='ownersNameClass'>
                            {item.name}
                        </div>
                    </div>
                    <div className='mainForIcons'>
                        <div className="divWithClicableIcons">
                            <img src={visit} alt="visit" />
                            <p onClick={() => {
                                if (item.url) {
                                    window.location.href = `${item.url}`
                                } else return null
                            }
                            }>visit</p>
                            <img src={edit} alt="edit" />
                            <p onClick={() => haneldeRedirect(item, 'edit')}>edit</p>
                            <img src={stats} alt="stats" />
                            <p onClick={() => haneldeRedirect(item, 'stats')}>stats</p>
                            {pageName !== 'widgets' && <img src={posts} alt="posts" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item, 'posts')}>posts</p>}
                            {pageName !== 'widgets' && <img src={widgets} alt="widgets" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item, 'widgets')}>widgets</p>}

                        </div>
                    </div>
                    <div className='mainDivHashes'>
                        <>
                            <div className="divWithHashes">
                                {pageName !== 'widgets' && <p id='noredirection'>{item?.categories?.slice(0, 2).map((el, i) => <a key={i} id='noredirection' onClick={() => {
                                    dispatch(UnbindCategoryActionRequest({
                                        siteId: item.id,
                                        categoryId: el.category.id
                                    }))
                                }}>{`${el.category.name}, `}</a>)}</p>}
                                {pageName === 'widgets' && <p>{item?.categories?.slice(0, 2).map((el, i) => <a id='noredirection' onClick={() => {
                                    const newData = item.categories.filter(elm => elm !== el.id)
                                    dispatch(UpdateWidgetDetailsActionRequest({
                                        id: item.id,
                                        categories: newData
                                    }))
                                }} key={i}>{`${el.name}, `}</a>)}</p>}
                                <div className='box'>
                                    {item?.categories.length > 2 && <p>+<span>{item?.categories.length - 2}</span></p>}
                                    <img src={secondarrowDown} style={{ marginLeft: '5px' }} onClick={() => handleHashArrowClick(item)} alt="arrow" id='noredirection' />

                                </div>
                            </div>
                            {state.hashesArrowDown && item.id === state.hashesArrowWitchIsOn.id && <div id='noredirection' className='offeredHashes' >
                                {categoryList.map((el, i) => {
                                    return <div key={i} id='noredirection' onClick={() => {
                                        if (pageName === 'widgets') {
                                            let newArray = hashesmaping.concat(el.id)
                                            if (!hashesmaping.includes(el.id)) {
                                                dispatch(UpdateWidgetDetailsActionRequest({
                                                    id: item.id,
                                                    categories: newArray
                                                }))
                                                handleHashArrowClick(item)
                                            } else {
                                                let newArray = hashesmaping.filter(elm => elm !== el.id)
                                                dispatch(UpdateWidgetDetailsActionRequest({
                                                    id: item.id,
                                                    categories: newArray
                                                }))
                                                handleHashArrowClick(item)
                                            }
                                        } else {
                                            if (!hashesmaping.includes(el.id)) {
                                                dispatch(BindCategoryActionRequest({
                                                    siteId: item.id,
                                                    categoryId: el.id
                                                }))
                                                handleHashArrowClick(item)
                                            } else {
                                                dispatch(UnbindCategoryActionRequest({
                                                    siteId: item.id,
                                                    categoryId: el.id
                                                }))
                                                handleHashArrowClick(item)
                                            }
                                        }
                                    }} style={{ background: hashesmaping?.includes(el.id) ? '#e09494' : '' }}>
                                        <p id='noredirection'>{el.name}</p>
                                    </div>
                                })}
                            </div>}
                        </>
                    </div>
                    <div className='mainDivInOutTxr'>
                        <div className='statistic'>
                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? "imp" : "in", 'Up')} />
                                    <img src={secondarrowDown} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? "imp" : "in", "Down")} />
                                </div>
                                <p>{pageName === 'widgets' ? "imp" : "in"}</p>

                            </div>
                            <p>{item.in}</p>
                        </div>
                        <div className='statistic'>

                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "clk" : "out", "Up")} alt="arrow" />
                                    <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "clk" : "out", "Down")} alt="arrow" />
                                </div>
                                <p>{pageName === 'widgets' ? "clk" : "out"}</p>

                            </div>
                            <p>{item.out}</p>
                        </div>
                        <div className='statistic'>
                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctr" : "txr", 'Up')} alt="arrow" />
                                    <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctr" : "txr", 'Down')} alt="arrow" />
                                </div>
                                <p>{pageName === 'widgets' ? "ctr" : "txr"}</p>
                            </div>
                            <p>{item.txr}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ShortTableRowContainer
