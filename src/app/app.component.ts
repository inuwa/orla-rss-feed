import { Component, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';
import { RSS } from './_';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
    rssFeedsCache: RSS[];
    private _checkedTitles: string[] = [];
    mobileQuery: MediaQueryList;
    formGroup: FormGroup;
    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _appService: AppService) {
        this.addMediaListeners(changeDetectorRef, media);
    }

    ngOnInit() {
        this._buildForm();
        this._subscription = this._appService.getRSSFeeds().subscribe((rssFeeds: RSS[]) => {
            this.rssFeeds = rssFeeds;
            this.rssFeedsCache = rssFeeds;
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this._subscription.unsubscribe();
        this._subscription = null;
    }

    @HostListener('click', ['$event']) $$checkboxClicked($event) {
        if ($event.target.type !== 'checkbox') return;
        if ($event.target.checked) this._checkedTitles.push($event.target.value)
        else this._checkedTitles = this._checkedTitles.filter(e => e !== $event.target.value);

        this._filterCheckedTitles();
    }

    addMediaListeners(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    $$search(searchValue: string) {
        this.rssFeeds = this.rssFeedsCache.filter(e => e.feed.title.indexOf(searchValue) !== -1);
    }


    private _filterCheckedTitles() {

        this.rssFeeds = (this._checkedTitles.length) ? this.rssFeedsCache.filter(rssFeed => this._checkedTitles.find(title => title === rssFeed.feed.title)) : this.rssFeedsCache;
    }

    $$remove(rssFeed: RSS) {
        const rssFeeds = this._appService.removeRSSFeed(rssFeed);
        this.rssFeeds = rssFeeds;
        this.rssFeedsCache = rssFeeds;
    }

    $$addRssFeed() {
        this._appService.addRSSFeed(this.formGroup.value).subscribe(e => {
            if ((<HttpErrorResponse>e).error) return;
            this.rssFeeds = (<RSS[]>e);
            this.rssFeedsCache = (<RSS[]>e);
        });
    }

    private _buildForm() {
        this.formGroup = new FormGroup({
            name: new FormControl('', [Validators.required]),
            url: new FormControl('', [Validators.required])
        });
    }
}
