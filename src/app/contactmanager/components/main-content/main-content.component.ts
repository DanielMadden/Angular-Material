import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.user = null;
      let subscriptionUsers = this.service.users.subscribe((users) => {
        // if (!users[id]) this.router.navigate(['/contactmanager' + 1]);
        if (!id) id = 1;
        if (users.length == 0) return;
        setTimeout(() => {
          this.user = this.service.userById(id);
          subscriptionUsers.unsubscribe();
        }, Math.floor(Math.random() * 700) + 100);
      });
    });
  }
}
