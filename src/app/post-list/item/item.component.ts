import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postLoveIts = 0;
  @Input() postCreatedAt: Date;
  @Input() post: Post;

  constructor(private postService: PostsService) { }

  ngOnInit() {
  }

  incrementCompteur() {
    this.postLoveIts++;
  }
  decrementCompteur() {
    this.postLoveIts--;
  }

  getColor() {
    if (this.postLoveIts > 0) {
      return 'green';
    } else if (this.postLoveIts < 0) {
      return 'dark-red';
    } else {
      return '';
    }
  }

  onDeletePost() {
    this.postService.deletePost(this.post);
  }
}
