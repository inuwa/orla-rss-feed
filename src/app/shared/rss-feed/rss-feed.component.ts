import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { RSS, Item } from 'src/app/_';
import { Subscription, of } from 'rxjs';

@Component({
    selector: 'rss-feed',
    templateUrl: './rss-feed.component.html',
    styleUrls: ['./rss-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RssFeedComponent implements OnInit {
    @Input() rssFeed: RSS;
    @Input() item: Item;
    imageLoadingError: boolean = false;
    private _subcription: Subscription;
    constructor() { }

    ngOnInit(): void {
        this._stripHTMLTags();
        if (this.item.content.length > 150) this.item.content = this._truncateString(this.item.content, 150);
    }


    private _stripHTMLTags() {
        this.item.content = this.item.content.replace(/(<([^>]+)>)/gi, '');
    }

    private _truncateString(truncatee: string, strLength: number) {
        const truncated = truncatee.substr(0, strLength);
        return truncatee.substr(0, truncated.lastIndexOf(' ')) + ' ...';
    }
}
