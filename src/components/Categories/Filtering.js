export const filtering = (pasedData, selectedSitesSearch, inputValue) => {
    let dataToSend = pasedData

    if (inputValue) {
        const newData = dataToSend.filter(el => {
            return el.name.toLowerCase().includes(inputValue)
        })
        dataToSend = newData
    }

    if (selectedSitesSearch) {
        const sitesCategory = selectedSitesSearch?.categories?.map(el => el.category.id)
        const site = dataToSend?.filter(el => {
            return sitesCategory.includes(el.id)
        })
        dataToSend = site
    }

    return dataToSend



    // if (!selectedSitesSearch && inputValue) {
    //     const newData = pasedData.filter(el => {
    //         return el.name.toLowerCase().includes(inputValue)
    //     })
    //     return newData
    // }
    // else if (selectedSitesSearch && !inputValue) {
    //     const sitesCategory = selectedSitesSearch?.categories?.map(el => el.category.id)
    //     const site = pasedData?.filter(el => {
    //         return sitesCategory.includes(el.id)
    //     })
    //     return site
    // }

    // else if (selectedSitesSearch && inputValue) {

    //     const sitesCategory = selectedSitesSearch?.categories?.map(el => el.category.id)
    //     const site = pasedData?.filter(el => {
    //         return sitesCategory.includes(el.id)
    //     })

    //     const newData = site.filter(el => {
    //         return el.name.toLowerCase().includes(inputValue)
    //     })

    //     return newData
    // }


}