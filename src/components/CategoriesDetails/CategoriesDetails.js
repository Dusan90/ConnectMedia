import React, { Component } from 'react'
import NavWidget from '../../containers/NavWidget/NavWidget'
import '../SiteDetails/SiteDetails.scss'
import { connect } from 'react-redux'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import Select from 'react-select'
import { GetCategoryDetailsActionRequest, CreateCategoryActionRequest, UpdateCategoryDetailsActionRequest, DeleteCategoryActionRequest } from '../../store/actions/CategoryAction'
import { NotificationManager } from 'react-notifications'



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

export class CategoriesDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            whichisit: '',
            confirmMessage: false,
            dataTest: 'PUBLISHED',
            name: null,
            description: null,
            rename: null,
            categoryDetailsData: '',
            adult: null,
            merge: null,
            mergeOptions: []
        }
    }

    componentDidMount() {
        if (this.props.getCategoryList?.data?.data) {
            const optionsData = this.props.getCategoryList?.data?.data?.map(el => {
                return { value: el.id, label: el.name }
            })
            this.setState({ mergeOptions: optionsData })
        }

        if (this.props?.location?.data?.name) {
            this.setState({ name: this.props.location.data?.name })
        } else {
            this.props.dispatch(GetCategoryDetailsActionRequest({
                id: this.props.match.params.id
            }))
        }
    }

    handleTrashClick = () => {
        this.setState({ confirmMessage: true })
    }

    componentDidUpdate(prevProps) {
        const { createCategory, getCategoryDetails, updateCategoryDetails, deleteCategory } = this.props
        const { data: getCategoryDetailsData, loading: getCategoryDetailsLoading, error: getCategoryDetailsError, errorData: getCategoryDetailsErrorData } = getCategoryDetails;
        const { data: deleteCategoryData, loading: deleteCategoryLoading, error: deleteCategoryError, errorData: deleteCategoryErrorData } = deleteCategory;
        const { data: createCategoryData, loading: createCategoryLoading, error: createCategoryError, errorData: createCategoryErrorData } = createCategory;
        const { data: updateCategoryDetailsData, loading: updateCategoryDetailsLoading, error: updateCategoryDetailsError, errorData: updateCategoryDetailsErrorData } = updateCategoryDetails;


        if (prevProps.getCategoryDetails !== getCategoryDetails && !getCategoryDetailsError && !getCategoryDetailsLoading && getCategoryDetailsData) {
            console.log(getCategoryDetailsData);
            this.setState({ categoryDetailsData: getCategoryDetailsData.data })
        }

        if (prevProps.deleteCategory !== deleteCategory && !deleteCategoryError && !deleteCategoryLoading && deleteCategoryData) {
            NotificationManager.success("Category successfully deleted", "Success", 2000);
            this.props.history.push('/categories')
        }

        if (prevProps.createCategory !== createCategory && !createCategoryError && !createCategoryLoading && createCategoryData) {
            NotificationManager.success("Category successfully created", "Success", 2000);
            this.props.history.push('/categories')
        } else if (prevProps.createCategory !== createCategory && createCategoryError && createCategoryErrorData) {
            NotificationManager.error(`${createCategoryErrorData.data.message}`, "Failed", 2000);

        }

        if (prevProps.updateCategoryDetails !== updateCategoryDetails && !updateCategoryDetailsError && !updateCategoryDetailsLoading && updateCategoryDetailsData) {
            NotificationManager.success("Category successfully created", "Success", 2000);
            this.props.history.push('/categories')
        } else if (prevProps.updateCategoryDetails !== updateCategoryDetails && updateCategoryDetailsError && updateCategoryDetailsErrorData) {
            NotificationManager.error(`${updateCategoryDetailsErrorData.data.message}`, "Failed", 2000);

        }
    }



    handleChangeCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleWhereEverNav = (page) => {
        if (page === 'editDiv') {
            this.setState({ isIteditable: true })
        } else if (page === 'sitesDiv') {
            this.props.history.push({
                pathname: '/sites',
                state: { whichToFilter: 'test' }
            })
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
            const { name, description, adult, rename, merge } = this.state
            if (this.props.location.data?.createNew) {
                console.log('this is create new ');
                this.props.dispatch(CreateCategoryActionRequest({
                    name,
                    description,
                    adult,
                    rename,
                    merge
                }))
            } else {
                this.props.dispatch(UpdateCategoryDetailsActionRequest({
                    id: this.props.match.params.id,
                    name,
                    description,
                    adult,
                    rename,
                    merge
                }))
            }
        } else if (page === 'cancel') {
            this.setState({ isIteditable: false })
        } else {
            this.setState({ whichisit: page })
        }
    }

    handleStatusChange = (status) => {
        this.setState({ dataTest: status })
    }

    handleMergeOption = (item) => {
        console.log(item);
        this.setState({ merge: item?.value })
    }

    deleteuserFunction = () => {
        this.props.dispatch(DeleteCategoryActionRequest({
            id: this.props.match.params.id
        }))
    }
    render() {
        const { isIteditable, categoryDetailsData, adult } = this.state

        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget isButtonNamepased={this.props?.location?.data?.buttonClicked} handleTrashClick={this.handleTrashClick} handleWhereEverNav={this.handleWhereEverNav} pageName={'categories'} />
                {this.state.confirmMessage && <div className='confurmText'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deleteuserFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <h1>{this.props?.location?.data?.name ? this.props?.location?.data?.name : categoryDetailsData?.name}</h1>
                        <div className='generalDiv'>
                            <div className='name_div'>
                                <h4>Name</h4>
                                {!isIteditable && <p>{categoryDetailsData?.name}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChangeCategory(e)} name='name' placeholder={categoryDetailsData?.name} />}
                            </div>

                            <div className='name_div'>
                                <h4>Description</h4>
                                {!isIteditable && <p>{categoryDetailsData?.description}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChangeCategory(e)} name='description' placeholder={categoryDetailsData?.description} />}
                            </div>
                            <div className='name_div'>
                                <h4>Adult</h4>
                                {!isIteditable && <p>{categoryDetailsData?.adult}</p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" value={adult ? adult : categoryDetailsData?.adult} checked={adult ? adult : categoryDetailsData?.adult} onChange={(e) => this.setState({ adult: e.target.checked })} /> <label htmlFor="check"></label></div>}
                            </div>
                            {/* <div className='owner_div'>
                                <h4>Site</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="site"
                                    options={options}
                                />}
                            </div> */}
                            <div className='name_div'>
                                <h4>Rename</h4>
                                {!isIteditable && <p>{categoryDetailsData?.rename}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleChangeCategory(e)} name='rename' placeholder={categoryDetailsData?.rename} />}
                            </div>
                            <div className='url_div selectable'>
                                <h4>Merge</h4>
                                {!isIteditable && <p>{this.props.getCategoryList?.data?.data?.map(el => el.id === categoryDetailsData?.merge ? el.name : '')}</p>}
                                {/* {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>} */}
                                {isIteditable && <Select
                                    defaultValue={this.state.mergeOptions[categoryDetailsData?.merge]}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="merge"
                                    options={this.state.mergeOptions}
                                    onChange={this.handleMergeOption}
                                />}

                            </div>
                        </div>
                    </div>

                    <div className='rightSideDiv'>
                        <div className='categoriesDiv'>

                        </div>

                    </div>
                </div>

                {isIteditable && <div className='buttonsDiv'>
                    <SaveButtonEdit labeltext={'Save changes'} handleButtonActive={() => this.handleButtonActive('save')} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                    <SaveButtonEdit labeltext={'Cancel'} handleButtonActive={() => this.handleButtonActive('cancel')} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                </div>}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    const { CategoryReducer } = state;
    const { createCategory, getCategoryDetails, updateCategoryDetails, deleteCategory, getCategoryList } = CategoryReducer
    return {
        createCategory,
        getCategoryDetails,
        updateCategoryDetails,
        deleteCategory,
        getCategoryList

    }
}

export default connect(mapStateToProps, null)(CategoriesDetails)
