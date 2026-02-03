export const countrySearchOpenStreetMap = async (countryNameOrCode: string) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(countryNameOrCode)}&format=json&limit=7&addressdetails=1&extratags=1&accept-language=en-US`, {
        headers: {
            'User-Agent': 'Mosilla Firefox/1.0'
            }
        });

    if (!response.ok) {
        throw new Error('Failed to fetch country data');
    }
    
    const data = await response.json();
    return data;
}

export const stateSearchOpenStreetMap = async (state: string, countryNameOrCode: string) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?state=${state}&country=${encodeURIComponent(countryNameOrCode)}&format=json&limit=7&addressdetails=1&extratags=1&accept-language=en-US`, {
        headers: {
            'User-Agent': 'Mosilla Firefox/1.0'
            }
        });

    if (!response.ok) {
        throw new Error('Failed to fetch country data');
    }
    
    const data = await response.json();
    return data;
}

if(import.meta.main) {
    //  name: "Ariana",
    //     display_name: "Ariana, Tunisia",
    //     address: {
    //       state: "Ariana",
    //       "ISO3166-2-lvl4": "TN-12",
    //       country: "Tunisia",
    //       country_code: "tn"
    //     },
    (async () => {
        const results = await stateSearchOpenStreetMap('TN-12', 'TN');
        console.log(results);
    })();
}
