import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListService } from '../services/list.service';
import { List } from '../models/list';

@Component({
  selector: 'app-view-list',
  providers: [HttpClient],
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {
  private lists: List[] = [];

  constructor(private listServ: ListService) { }

  ngOnInit() {
    this.loadLists();
  }

  public loadLists() {
    this.listServ.getAllLists().subscribe((response) => {
      this.lists = response;
    });
  }
  public deleteList(list: List) {
    this.listServ.deleteList(list._id).subscribe(
      response => this.lists.filter(lists => lists !== list)
    )
  }
}
