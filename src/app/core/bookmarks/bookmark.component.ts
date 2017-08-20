import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark';

@Component({
  selector: 'item',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  @Input() item: Bookmark;  

  constructor() {
  }

  ngOnInit() {}

  get hasUrl(): boolean {
    return this.item.LinkUrl.indexOf('http') === 0;
  }
}
