import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
 import { Subject } from 'rxjs';
 import { takeUntil } from 'rxjs/operators';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/Post';
@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {

  blogPost: Post[] = [];
  private unsubscribe$ = new Subject<void>();
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogPosts();
    }
    getBlogPosts() {
    this.blogService.getAllPosts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
    this.blogPost = result;
    });
    }

    delete(postId: string) {
    }

    ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
      }
}
