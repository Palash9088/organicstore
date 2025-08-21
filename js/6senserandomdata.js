function storeVisitorInfo(data) {
    if (typeof data !== 'object' || !data) {
        console.error('Invalid visitor information provided.');
        return;
    }

    try {
        localStorage.setItem('_6senseCompanyDetails', JSON.stringify(data));
    } catch (error) {
        console.error('Error storing visitor info:', error);
    }
}

const randomFrom = arr => Array.isArray(arr) && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBoolean = (probability = 0.1) => Math.random() < probability;

function generateCompanyName() {
    const prefixes = ['Global', 'Tech', 'Innovative', 'Future', 'Smart'];
    const suffixes = ['Solutions', 'Labs', 'Enterprises', 'Technologies', 'Group'];
    const industries = ['Insurance', 'Software', 'Finance', 'Healthcare', 'Manufacturing'];
    return `${randomFrom(prefixes)} ${randomFrom(suffixes)} ${randomFrom(industries)}`;
}

function generateCompanyDetails() {
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    const countries = ['United States', 'Canada', 'United Kingdom'];
    const states = {
        'United States': ['California', 'Texas', 'New York', 'Florida'],
        'Canada': ['Ontario', 'Quebec', 'British Columbia'],
        'United Kingdom': ['England', 'Scotland', 'Wales']
    };
    const cities = {
        'California': ['San Francisco', 'Los Angeles', 'San Diego'],
        'Texas': ['Houston', 'Austin', 'Dallas'],
        'Ontario': ['Toronto', 'Ottawa', 'Mississauga'],
        'England': ['London', 'Manchester', 'Birmingham']
    };

    const country = randomFrom(countries);
    const state = randomFrom(states[country]) || 'Unknown State';
    const city = randomFrom(cities[state]) || 'Unknown City';

    return {
        domain: `www.${generateCompanyName().toLowerCase().replace(/ /g, '')}.com`,
        name: generateCompanyName(),
        region: randomFrom(regions),
        country: country,
        state: state,
        city: city,
        industry: randomFrom(['Software and Technology', 'Finance and Banking', 'Healthcare', 'Insurance', 'Manufacturing']),
    };
}

function generateScores() {
    return Array.from({ length: 3 }, () => randomNumber(50, 100));
}

function generateSegments() {
    const segments = ['Enterprise', 'SMB', 'Startup', 'Government', 'Non-Profit'];
    return {
        ids: Array.from({ length: 3 }, (_, i) => i + 1),
        names: Array.from({ length: 3 }, () => randomFrom(segments)),
        list: Array.from({ length: 3 }, (_, i) => ({
            id: i + 1,
            name: randomFrom(segments)
        }))
    };
}

function generateVisitorInfo() {
    const company = generateCompanyDetails();
    return {
        company: {
            ...company,
            country_iso_code: company.country === 'United States' ? 'US' :
                company.country === 'Canada' ? 'CA' : 'GB',
            address: `${randomNumber(100, 999)} ${randomFrom(['Main', 'Oak', 'Pine'])} St`,
            zip: randomNumber(10000, 99999).toString(),
            phone: `${randomNumber(100, 999)}-${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
            employee_range: randomFrom(['50-100', '100-500', '500-1000', '1000+']),
            revenue_range: randomFrom(['$1M-$10M', '$10M-$50M', '$50M-$100M', '$100M+']),
            employee_count: randomNumber(50, 1000).toString(),
            annual_revenue: `$${randomNumber(1, 100)}M`,
            is_blacklisted: randomBoolean(),
            state_code: company.state ? company.state.substring(0, 2).toUpperCase() : '--',
            is_6qa: randomBoolean(),
            geoIP_country: company.country,
            geoIP_state: company.state,
            geoIP_city: company.city,
            company_match: randomFrom(['Exact Match', 'Partial Match', 'Fuzzy Match']),
            industry_v2: [company.industry],
            sic: randomNumber(1000, 9999).toString(),
            naics: randomNumber(100000, 999999).toString(),
            sic_description: `${company.industry} Services`,
            naics_description: `${company.industry} Services`
        },
        scores: generateScores(),
        segments: generateSegments(),
        confidence: randomFrom(['High', 'Medium', 'Low'])
    };
}

// Generate visitor info only if it's not already set
const existingData = localStorage.getItem('_6senseCompanyDetails');

if (!existingData) {
    const visitorInfo = generateVisitorInfo();
    storeVisitorInfo(visitorInfo);
}