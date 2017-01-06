import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
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

    constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location) { }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return
        }
        this.pager = this.dataService.getPager(this.totalPages, page);
        this.currentPage = this.pager.currentPage;
        this.route.params
            .switchMap((params: Params) => this.dataService.getSearchMovie(params['term'], this.currentPage))
            .subscribe(response => {
                this.movieSearching = response
            })
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.dataService.getSearchMovie(params['term'], 1))
            .subscribe(response => {
                this.movieSearching = response
                console.log('Searching...', this.movieSearching)
                this.totalPages = response.total_pages
                this.setPage(1)
            })
    }
}