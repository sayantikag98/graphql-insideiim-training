import {Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import { FormComponent } from '../form/form.component';
import { Feed } from "../feed.model";

@Component({
  providers: [ApiService],
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  isEmpty!: boolean;
  displayedColumns: string[] = ['feedUrl', 'action']; // naming same as defined in the schema
  dataSource: any;
  feedList: any;
  data: any;
  
  @Input() formcomp: FormComponent;
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  


  constructor(private api:ApiService) {}

  ngOnInit(): void {
      this.getAllFeeds();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllFeeds();
    this.dataSource;
    this.isEmpty;
    this.feedList;
    this.data;
    
  }

  getAllFeeds(){
    this.api.getFeeds()
    .subscribe((result: any) => {
      if(result?.data){
        const data = result?.data?.getAllFeedUrls;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.feedList = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else if(result.loading){
        console.log("Loading...");
      }
      else if(result.error){
        console.log("Error in getting all the feeds");
      }
    })
  }

  addOrEditFeed(){
    if(this.formcomp.actionBtn === "Create") this.addFeed();
    else this.editFeed1();
  }

  checkDuplicate(oldFeedList: Feed[], newFeed: any){
    return oldFeedList.filter((ele: Feed) => ele.feedUrl === newFeed.feedUrl).length === 0;
  }

  addFeed(){
    if(this.formcomp.newFeedForm.valid && this.checkDuplicate(this.dataSource.data, this.formcomp.newFeedForm.value)){
      this.api.postFeed(this.formcomp.newFeedForm.value)
      .subscribe((result: any) => {
        if(result?.data) {
          const data = result?.data?.createFeedUrl;
          console.log(data);
          alert("Feed added successfully to the database");
          setTimeout(() => this.formcomp.formGroupDirective.resetForm(), 0);
          this.ngOnInit();
        }
        else if(result.loading){
          console.log("loading...");
        }
        else if(result.error){
          alert("Error!!! Feed cannot be added to the database");
        }
      })
    }
    else{
      alert("Data could not be inserted in the database either because no proper data was provided or duplicated data was provided");
    }
  }

  // for the edit icon button in the table component
  editFeed(data: any){
    this.data = data;
    if(this.data && Object.keys(this.data).length){
      this.formcomp.actionBtn = "Update";
      this.formcomp.newFeedForm.setValue({
        feedUrl: this.data.feedUrl
      });
    }
  }

  // for the update button in the form component
  editFeed1(){
    if(this.formcomp.newFeedForm.valid && this.checkDuplicate(this.dataSource.data, this.formcomp.newFeedForm.value)){
      this.api.updateFeed(this.data._id, this.formcomp.newFeedForm.value)
      .subscribe((result: any) => {
        if(result?.data){
          const data = result?.data?.updateFeedUrl;
          console.log(data);
          alert("Feed updated successfully in the database");
          setTimeout(() => this.formcomp.formGroupDirective.resetForm(), 0);
          this.formcomp.actionBtn = "Create";
          this.ngOnInit();
        }
        else if(result.loading){
          console.log("loading...");
        }
        else if(result.error){
          alert("Error!!! Feed cannot be updated in the database");
        }
      })
    }
    else{
      alert("Data could not be inserted in the database either because no proper data was provided or duplicated data was provided");
    }
  }

  deleteFeed(data:any){
    this.api.deleteFeed(data._id)
    .subscribe((result: any) => {
      if(result?.data){
        const data = result?.data?.deleteFeedUrl;
        console.log(data);
        alert("Feed successfully deleted from the database");
        this.ngOnInit();
      }
      else if(result.loading){
        console.log("loading...");
      }
      else if(result.error){
        alert("Error!!! Feed cannot be deleted from database");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.nextPage();
    }
  }

}
