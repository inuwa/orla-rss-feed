import { Feed } from './feed.interface';
import { Item } from './item.interface';

export interface RSS {
    status: string;
    feed: Feed;
    items: Item[];
}