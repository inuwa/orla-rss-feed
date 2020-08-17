import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RssFeedComponent } from './rss-feed/rss-feed.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        RssFeedComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        RssFeedComponent
    ]
})
export class SharedModule { }
