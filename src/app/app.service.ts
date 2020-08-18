import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RSSFeedsEndpoints } from './_/consts/rss-feeds-endpoints.const';
import { Observable, forkJoin, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { RSS } from './_';
@Injectable()
export class AppService {
    private _rssFeedsCache: RSS[];
    constructor(private _httpClient: HttpClient) { }

    get rssFeeds(): RSS[] {
        return this._rssFeedsCache;
    }

    set rssFeeds(rssFeeds: RSS[]) {
        this._rssFeedsCache = rssFeeds;
    }

    getRSSFeeds() {
        if (this.rssFeeds) return of(this.rssFeeds);
        const subscriptions = this._getSubscriptions();
        return forkJoin(subscriptions).pipe(tap((rssFeeds: RSS[]) => this.rssFeeds = rssFeeds));
    }

    removeRSSFeed(rssFeed: RSS): RSS[] {
        this.rssFeeds = this.rssFeeds.filter(e => e !== rssFeed);
        return this.rssFeeds;
    }

    private _getSubscriptions(): Observable<RSS>[] {
        return RSSFeedsEndpoints.map((endpoint) => {
            const url$ = this._httpClient.get<RSS>(endpoint.value);
            return url$;
        });
    }

    addRSSFeed(rssRequest: { name: string; url: string; }) {
        return this._getNewSubscription(rssRequest.url);
    }

    private _getNewSubscription(url: string) {
        return this._httpClient.get(url).pipe(
            map((rss: RSS) => {
                console.log(rss);
                this.rssFeeds.push(rss)
                return this.rssFeeds;
            }),
            catchError(this._handleError)
        )
    }

    private _handleError(error: HttpErrorResponse) {
        return of({ error });
    }
}
