import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../models/Post';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css',
  providers: [DatePipe]
})
export class BlogEditorComponent {
  public Editor:any;
  ckeConfig: any;
  postData = new Post();
  formTitle = 'Add';
  postId = '';
  public editorData = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly datePipe: DatePipe,
    private readonly router: Router,
    private readonly blogService: BlogService,
  ) {
    this.setEditorConfig();
  }

  setEditorConfig() {
    this.ckeConfig = {
    removePlugins: ['ImageUpload', 'MediaEmbed'],
    heading: {
    options: [
    { model: 'paragraph', title: 'Paragraph', class: 'ckheading_paragraph' },
    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ckheading_heading1' },
    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ckheading_heading2' },
    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ckheading_heading3' },
    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ckheading_heading4' },
    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ckheading_heading5' },
    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ckheading_heading6' },
    { model: 'Formatted', view: 'pre', title: 'Formatted' },
    ]
    }
    };
    }

    saveBlogPost() {
      debugger;
      this.postData.createdDate = this.datePipe.transform(Date.now(), 'MMdd-yyyy HH:mm');
      this.blogService.createPost(this.postData).then(
      () => {
      this.router.navigate(['/']);
      }
      );
      }

      cancel() {
        this.router.navigate(['/']);
    }
}
