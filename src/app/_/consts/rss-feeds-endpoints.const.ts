import { API_KEY } from './api-key.const';

export const RSSFeedsEndpoints: { key: string; value: string; name: string; }[] = [
    {
        key: 'Adweek',
        value: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.adweek.com%2Ffeed%2F&api_key=' + API_KEY,
        name: 'Adweek'
    },
    {
        key: 'BBCTech',
        value: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Ftechnology%2Frss.xml%3Fedition%3Duk&api_key=' + API_KEY,
        name: 'BBC Tech'
    },
    {
        key: 'DigitalArtsOnline',
        value: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.digitalartsonline.co.uk%2Frss%2Ffeeds%2Fdigitalarts-news.xml&api_key=' + API_KEY,
        name: 'Digital Arts Online'
    },
    {
        key: 'TelegraphArgus',
        value: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.thetelegraphandargus.co.uk%2Fnews%2Frss%2F&api_key=' + API_KEY,
        name: 'Telegraph & Argus'
    },
    {
        key: 'TheGuardianTech',
        value: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Fuk%2Ftechnology%2Frss&api_key=' + API_KEY,
        name: 'The Guardian Tech'
    },
    {
        key: 'Dezeen',
        value: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dezeen.com%2Finteriors%2Frestaurants-and-bars%2Ffeed%2F&api_key=' + API_KEY,
        name: 'The Times'
    }
]
