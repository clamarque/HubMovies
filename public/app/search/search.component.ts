import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DataService } from '../shared/_services/index';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'search-component',
    templateUrl: './app/search/search.component.html'
})
export class SearchComponent implements OnInit {
    movieSearching: any[];
    totalPages: number;
    pager: any = {}
    currentPage: number;

    constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return
        }
        this.pager = this.dataService.getPager(this.totalPages, page);
        this.currentPage = this.pager.currentPage;
        this.route.params
            .switchMap((params: Params) => this.dataService.getSearchMovie(params['term'], this.currentPage))
            .subscribe(data => {
                if(data.total_results > 0) this.movieSearching = data
                else {
                    this.movieSearching == null
                    this.snackbar.open('No results found', 'retry', { duration: 10000 })
                } 
            })
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.dataService.getSearchMovie(params['term'], 1))
            .subscribe(data => {
                console.log(data.total_results)
                if (data.total_results > 0) {
                    this.movieSearching = data
                    this.totalPages = data.total_pages
                    this.setPage(1)
                }
                else this.movieSearching == null
            })
    }
}