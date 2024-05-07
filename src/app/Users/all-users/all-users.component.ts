import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  constructor(private userService:UserService ) { }
  users: User[] = [];


  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService
      .getUsers()
      .subscribe(users => this.users = users);
  }

}
