import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/_services/index';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'upcoming-component',
    templateUrl: './app/upcoming/upcoming.component.html'
})
export class UpcomingComponent implements OnInit {
    movieUpcoming: any[];

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
        this.dataService.getUpComing(this.currentPage).subscribe(response => {
            this.movieUpcoming = response
        })
    }

    ngOnInit() {
        this.dataService.getUpComing(1).subscribe(response => {
            this.movieUpcoming = response
            console.log('Coming...', this.movieUpcoming)
            this.totalPages = response.total_pages
            this.setPage(1)
        })
    }
}