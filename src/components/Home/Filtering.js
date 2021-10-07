export const filtering = (pasedData, selectedStatusSearch, selectedCategorieSearch, selectedUserSearch, inputValue) => {

    let dataToSend = pasedData

    if (selectedStatusSearch) {
        const newArray = dataToSend?.filter(el => {
            return el?.state === selectedStatusSearch.id
        })
        dataToSend = newArray
    }

    if (selectedCategorieSearch) {
        const categori = dataToSend?.filter(el => {
            return el.categories.find(elm => {
                return elm.category.id === selectedCategorieSearch.id
            })
        })

        dataToSend = categori
    }

    if (selectedUserSearch) {
        const newArray = dataToSend?.filter(el => {
            return el.owner?.id === selectedUserSearch.id
        })
        dataToSend = newArray
    }

    if (inputValue) {
        const newData = dataToSend.filter(el => {
            return el.name?.toLowerCase().includes(inputValue)
        })
        dataToSend = newData
    }



    return dataToSend








    // if (selectedStatusSearch && !selectedCategorieSearch && !selectedUserSearch && !inputValue) {
    //     const newArray = pasedData?.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })
    //     return newArray
    // }
    // else if (selectedStatusSearch && selectedCategorieSearch && !selectedUserSearch && !inputValue) {

    //     const categori = pasedData?.filter(el => {
    //         console.log(el);
    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })
    //     const newArray = categori.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })
    //     return newArray
    // }
    // else if (selectedStatusSearch && !selectedCategorieSearch && selectedUserSearch && !inputValue) {
    //     const sites = pasedData?.filter(el => {
    //         return el.owner?.id === selectedUserSearch.id
    //     })

    //     const newArray = sites.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })
    //     return newArray
    // }
    // else if (selectedUserSearch && !selectedCategorieSearch && !selectedStatusSearch && !inputValue) {

    //     const newArray = pasedData?.filter(el => {
    //         console.log(el, selectedUserSearch);
    //         return el.owner?.id === selectedUserSearch.id
    //     })
    //     return newArray
    // }

    // else if (!selectedUserSearch && selectedCategorieSearch && !selectedStatusSearch && !inputValue) {

    //     const categori = pasedData?.filter(el => {
    //         console.log(el);
    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })
    //     return categori
    // }

    // else if (selectedUserSearch && selectedCategorieSearch && !selectedStatusSearch && !inputValue) {


    //     const categori = pasedData?.filter(el => {

    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })

    //     const newArray = categori.filter(el => {
    //         return el.owner?.id === selectedUserSearch.id
    //     })

    //     return newArray
    // }

    // else if (selectedUserSearch && selectedCategorieSearch && selectedStatusSearch && !inputValue) {

    //     const status = pasedData?.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })

    //     const categori = status?.filter(el => {
    //         console.log(el);
    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })
    //     const newArray = categori.filter(el => {
    //         return el.owner?.id === selectedUserSearch.id
    //     })


    //     return newArray
    // }











    // else if (inputValue && !selectedUserSearch && !selectedCategorieSearch && !selectedStatusSearch) {
    //     const newData = pasedData.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }

    // else if (inputValue && selectedUserSearch && !selectedCategorieSearch && !selectedStatusSearch) {

    //     const user = pasedData?.filter(el => {
    //         return el.owner?.id === selectedUserSearch.id
    //     })

    //     const newData = user.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })

    //     return newData
    // }

    // else if (inputValue && selectedUserSearch && selectedCategorieSearch && !selectedStatusSearch) {

    //     const user = pasedData?.filter(el => {
    //         return el.owner?.id === selectedUserSearch.id
    //     })

    //     const categori = user?.filter(el => {

    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })

    //     const newData = categori.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })

    //     return newData
    // }

    // else if (inputValue && selectedUserSearch && selectedCategorieSearch && selectedStatusSearch) {

    //     const status = pasedData?.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })

    //     const user = status?.filter(el => {
    //         return el.owner?.id === selectedUserSearch.id
    //     })

    //     const categori = user?.filter(el => {

    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })

    //     const newData = categori.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }
    // else if (inputValue && !selectedUserSearch && selectedCategorieSearch && selectedStatusSearch) {
    //     const status = pasedData?.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })
    //     const categori = status?.filter(el => {

    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })
    //     const newData = categori.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }

    // else if (inputValue && !selectedUserSearch && selectedCategorieSearch && !selectedStatusSearch) {
    //     const categori = pasedData?.filter(el => {

    //         return el.categories.find(elm => {
    //             return elm.category.id === selectedCategorieSearch.id
    //         })
    //     })
    //     const newData = categori.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }
    // else if (inputValue && !selectedUserSearch && !selectedCategorieSearch && selectedStatusSearch) {

    //     const status = pasedData?.filter(el => {
    //         return el?.state === selectedStatusSearch.id
    //     })

    //     const newData = status.filter(el => {
    //         return el.name?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }



}