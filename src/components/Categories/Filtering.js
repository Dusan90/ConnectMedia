export const filtering = (pasedData, selectedSitesSearch, inputValue) => {


    if (!selectedSitesSearch && inputValue) {
        const newData = pasedData.filter(el => {
            return el.name.toLowerCase().includes(inputValue)
        })
        return newData
    }
    else if (selectedSitesSearch && !inputValue) {
        const sitesCategory = selectedSitesSearch?.categories?.map(el => el.category.id)
        const site = pasedData?.filter(el => {
            return sitesCategory.includes(el.id)
        })
        return site
    }

    else if (selectedSitesSearch && inputValue) {

        const sitesCategory = selectedSitesSearch?.categories?.map(el => el.category.id)
        const site = pasedData?.filter(el => {
            return sitesCategory.includes(el.id)
        })

        const newData = site.filter(el => {
            return el.name.toLowerCase().includes(inputValue)
        })

        return newData
    }


}