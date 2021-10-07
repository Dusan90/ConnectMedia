export const filtering = (pasedData, selectedStatusSearch, selectedCategorieSearch, selectedSiteSearch, inputValue) => {
    let dataToSend = pasedData


    if (selectedStatusSearch) {
        const newArray = dataToSend?.filter(el => {
            return el.status === selectedStatusSearch.id
        })
        dataToSend = newArray
    }

    if (selectedCategorieSearch) {
        const categori = dataToSend?.filter(el => {
            return el.categories.includes(selectedCategorieSearch.id)
        })

        dataToSend = categori
    }

    if (selectedSiteSearch) {
        const newArray = dataToSend?.filter(el => {
            console.log(el);
            return el?.site === selectedSiteSearch.id
        })

        dataToSend = newArray
    }

    if (inputValue) {
        const newData = dataToSend.filter(el => {
            return el.title?.toLowerCase().includes(inputValue)
        })
        return newData
    }





    return dataToSend



    // if (selectedStatusSearch && !selectedCategorieSearch && !selectedSiteSearch && !inputValue) {

    //     const newArray = pasedData?.filter(el => {
    //         return el.status === selectedStatusSearch.id
    //     })
    //     return newArray
    // }
    // else if (selectedStatusSearch && selectedCategorieSearch && !selectedSiteSearch && !inputValue) {

    //     const categori = pasedData?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })
    //     const newArray = categori.filter(el => {
    //         return el.status === selectedStatusSearch.id
    //     })
    //     return newArray
    // }
    // else if (selectedStatusSearch && !selectedCategorieSearch && selectedSiteSearch && !inputValue) {
    //     const sites = pasedData?.filter(el => {
    //         return el?.site === selectedSiteSearch.id
    //     })

    //     const newArray = sites.filter(el => {
    //         return el?.status === selectedStatusSearch.id
    //     })
    //     return newArray
    // }
    // else if (selectedSiteSearch && !selectedCategorieSearch && !selectedStatusSearch && !inputValue) {

    //     const newArray = pasedData?.filter(el => {
    //         console.log(el);
    //         return el?.site === selectedSiteSearch.id
    //     })
    //     return newArray
    // }

    // else if (!selectedSiteSearch && selectedCategorieSearch && !selectedStatusSearch && !inputValue) {

    //     const categori = pasedData?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })
    //     return categori
    // }

    // else if (selectedSiteSearch && selectedCategorieSearch && !selectedStatusSearch && !inputValue) {

    //     const categori = pasedData?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })

    //     const newArray = categori.filter(el => {
    //         return el?.site === selectedSiteSearch.id
    //     })

    //     return newArray
    // }

    // else if (selectedSiteSearch && selectedCategorieSearch && selectedStatusSearch && !inputValue) {

    //     const status = pasedData?.filter(el => {
    //         return el?.status === selectedStatusSearch.id
    //     })
    //     const categori = status?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })
    //     const newArray = categori.filter(el => {
    //         return el?.site === selectedSiteSearch.id
    //     })


    //     return newArray
    // }







    // else if (inputValue && !selectedSiteSearch && !selectedCategorieSearch && !selectedStatusSearch) {
    //     const newData = pasedData.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }

    // else if (inputValue && selectedSiteSearch && !selectedCategorieSearch && !selectedStatusSearch) {

    //     const site = pasedData?.filter(el => {
    //         return el?.site === selectedSiteSearch.id

    //     })

    //     const newData = site.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })

    //     return newData
    // }

    // else if (inputValue && selectedSiteSearch && selectedCategorieSearch && !selectedStatusSearch) {

    //     const sites = pasedData?.filter(el => {
    //         return el?.site === selectedSiteSearch.id
    //     })

    //     const categori = sites?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })

    //     const newData = categori.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })

    //     return newData
    // }

    // else if (inputValue && selectedSiteSearch && selectedCategorieSearch && selectedStatusSearch) {

    //     const status = pasedData?.filter(el => {
    //         return el.status === selectedStatusSearch.id
    //     })

    //     const site = status?.filter(el => {
    //         return el?.site === selectedSiteSearch.id

    //     })

    //     const categori = site?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })

    //     const newData = categori.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }

    // else if (inputValue && !selectedSiteSearch && selectedCategorieSearch && selectedStatusSearch) {
    //     const status = pasedData?.filter(el => {
    //         return el.status === selectedStatusSearch.id
    //     })
    //     const categori = status?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })
    //     const newData = categori.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }


    // else if (inputValue && !selectedSiteSearch && selectedCategorieSearch && !selectedStatusSearch) {
    //     const categori = pasedData?.filter(el => {
    //         return el.categories.includes(selectedCategorieSearch.id)
    //     })
    //     const newData = categori.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }
    // else if (inputValue && !selectedSiteSearch && !selectedCategorieSearch && selectedStatusSearch) {

    //     const status = pasedData?.filter(el => {
    //         return el.status === selectedStatusSearch.id
    //     })

    //     const newData = status.filter(el => {
    //         return el.title?.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }




}