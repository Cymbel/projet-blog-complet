import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  postsSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) {
    this.getPosts();
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts.slice());
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPostsSubject();
  }

  savePosts() {
    this.httpClient
    .put('https://projet-blog-11d3f.firebaseio.com/posts.json', this.posts)
    .subscribe(
     () => {
       console.log('Enregistrement terminé !');
     },
     (error) => {
       console.log('Erreur de sauvegarde' + error);
     }
    );
  }

  getPosts() {
    this.httpClient
      .get<any[]>('https://projet-blog-11d3f.firebaseio.com/posts.json')
      .subscribe(
        (response) => {
          this.posts = response ? response : [];
          this.emitPostsSubject();
        },
        (error) => {
          console.log('Erreur de chargement' + error);
        }
      );
  }
  deletePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (bookEl) => {
        if (bookEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPostsSubject();
  }
}
