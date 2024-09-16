const provinceData = require('../location-data/data-provinces');
const districtData = require('../location-data/data-districts');
const wardData = require('../location-data/data-wards');

const sortArray = array => {
    if (Array.isArray(array)) {
        const sortedArray = array.sort((arr1, arr2) => {
            if (arr1.name > arr2.name)
                return 1;
            else if (arr1.name < arr2.name)
                return -1;
            else
                return 0;
        });

        return sortedArray;
    }

    return array;
}

const getProvinceList = (req, res) => {
    let provinceList = sortArray(provinceData);
    return res.json({
        code: 0,
        results: provinceList,
    });
}

const getDistrict = (req, res) => {
    const provinceCode = req.query?.provinceCode || '';

    if (!(provinceCode) || isNaN(parseInt(provinceCode))) {
        return res.json({
            code: 1,
            error: 'Parameters are missed',
        });
    }

    let districtList = districtData.filter(d => d.province_code === parseInt(provinceCode));
    districtList = sortArray(districtList);

    return res.json({
        code: 0,
        results: districtList.sort(),
    });
}

const getWards = (req, res) => {
    const districtCode = req.query?.districtCode || '';

    if (!(districtCode) || isNaN(parseInt(districtCode))) {
        return res.json({
            code: 1,
            error: 'Parameters are missed',
        });
    }

    let wardsList = wardData.filter(w => w.district_code === parseInt(districtCode));
    wardsList = sortArray(wardsList);

    return res.json({
        code: 0,
        results: wardsList,
    });
}

module.exports = {
    getProvinceList,
    getDistrict,
    getWards,
}