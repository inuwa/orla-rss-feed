import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RSS, Item } from 'src/app/_';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'rss-feed',
    templateUrl: './rss-feed.component.html',
    styleUrls: ['./rss-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RssFeedComponent implements OnInit, OnDestroy {
    @Input() rssFeed: RSS;
    @Input() item: Item;
    urlIsCorrect: boolean = false;
    private _subcription: Subscription;
    constructor(private _httpClient: HttpClient, private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this._stripHTMLTags();
        if (this.item.content.length > 150) this.item.content = this._truncateString(this.item.content, 150);
        this._urlIsCorrect()
    }

    ngOnDestroy() {
        this._subcription.unsubscribe();
        this._subcription = null;
    }

    private _stripHTMLTags() {
        this.item.content = this.item.content.replace(/(<([^>]+)>)/gi, '');
    }

    private _truncateString(truncatee: string, strLength: number) {
        const truncated = truncatee.substr(0, strLength);
        return truncatee.substr(0, truncated.lastIndexOf(' ')) + '...';
    }

    private _urlIsCorrect() {
        if (!this.item.enclosure.link) return this.urlIsCorrect;
        this._subcription = this._httpClient.get(this.item.enclosure.link)
            .pipe(
                catchError((error) => {
                    return (error.status !== 200) ? of(false) : of(true);
                })
            ).subscribe(e => {
                this.urlIsCorrect = (e) ? true : false;
                this._changeDetectorRef.detectChanges();
            })

    }
}
