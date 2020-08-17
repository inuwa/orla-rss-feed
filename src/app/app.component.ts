import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';
import { RSS } from './_';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        AppService
    ]
})
export class AppComponent implements OnDestroy {
    private _subscription: Subscription;
    rssFeeds: RSS[];
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _appService: AppService) {
        this.addMediaListeners(changeDetectorRef, media);
        this._subscription = this._appService.getRSSFeeds().subscribe((rssFeeds: RSS[]) => {
            this.rssFeeds = rssFeeds;
        })
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this._subscription.unsubscribe();
        this._subscription = null;
    }

    addMediaListeners(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    $$search(searchValue: string) {

    }
}
