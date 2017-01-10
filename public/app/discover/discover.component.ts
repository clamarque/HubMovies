import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/_services/index';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'discover-component',
    templateUrl: './app/discover/discover.component.html'
})
export class DiscoverComponent implements OnInit {
    movies: any[];
    totalPages: number;
    pager: any = {}
    currentPage: number;

    constructor(private dataService: DataService) { }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return
        }
        this.pager = this.dataService.getPager(this.totalPages, page);
        this.currentPage = this.pager.currentPage;
        this.dataService.getMovieDiscover(this.currentPage).subscribe(response => {
            this.movies = response
        })
    }

    ngOnInit() {
        this.dataService.getMovieDiscover(1).subscribe(response => {
            this.totalPages = response.total_pages
            this.setPage(1)
        })
    }
}