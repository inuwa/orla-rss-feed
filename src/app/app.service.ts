import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RSSFeedsEndpoints } from './_/consts/rss-feeds-endpoints.const';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RSS } from './_';
@Injectable()
export class AppService {

    constructor(private _httpClient: HttpClient) { }

    getRSSFeeds() {
        const subscriptions = this._getSubscriptions();
        return forkJoin(subscriptions);
    }

    private _getSubscriptions(): Observable<RSS>[] {
        return RSSFeedsEndpoints.map((endpoint) => {
            const url$ = this._httpClient.get<RSS>(endpoint.value);
            return url$;
        });
    }
}

/**
 * Adweek - adweek.com/feed - https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.adweek.com%2Ffeed%2F
 * BBC Tech - http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk - https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Ftechnology%2Frss.xml%3Fedition%3Duk
 * Digital Arts Online - https://www.digitalartsonline.co.uk/rss/feeds/digitalarts-news.xml -  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.digitalartsonline.co.uk%2Frss%2Ffeeds%2Fdigitalarts-news.xml
 * Marketing Week - http://www.marketingweek.co.uk/include/qbe/rss_latest_news.xml -
 * Telegraph & Argus - https://www.thetelegraphandargus.co.uk/news/rss/ -  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.thetelegraphandargus.co.uk%2Fnews%2Frss%2F
 * The Guardian Tech - https://www.theguardian.com/uk/technology/rss -  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Fuk%2Ftechnology%2Frss
 * Dezeen - https://www.dezeen.com/interiors/restaurants-and-bars/feed/ -  https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dezeen.com%2Finteriors%2Frestaurants-and-bars%2Ffeed%2F
 * The Times - https://www.timesonline.co.uk/rss -
 */