import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  storedPosts = ([] as any[]);

  onPostAdded(post: any) {
    this.storedPosts.push(post);
  }
}
