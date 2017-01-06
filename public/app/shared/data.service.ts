import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

//import { List } from '../list.interface';

@Injectable()
export class DataService {
    //private url = 'http://api.allocine.fr/rest/v3/';
    //private partner = 'YW5kcm9pZC12Mg'
    //private partner = '000042532791';
    private url = 'https://api.themoviedb.org/3/';
    private partner = '431bc17da732dfb3be082e58f7a5cf27';

    constructor(private http: Http) { }

    getSearchMovie(name: string, page: number) {
        return this.http.get(this.url + 'search/movie?api_key=' + this.partner + '&language=fr-FR&query=' + name + '&page=' + page)
            .map(res => res.json())
    }

    getNowPlaying(page: number) {
        return this.http.get(this.url + 'movie/now_playing?api_key=' + this.partner + '&language=fr' + '&page=' + page)
            .map((res: Response) => res.json())
    }


    getDetailsMovie(code: number) {
        return this.http.get(this.url + 'movie/' + code + '?api_key=' + this.partner + '&language=fr-FR')
            .map((res: Response) => res.json())
    }

    getVideoMovie(code: number) {
        return this.http.get(this.url + 'movie/' + code + '/videos?api_key=' + this.partner + '&language=fr-FR')
            .map((res: Response) => res.json())
    }

    getUpComing(page: number) {
        return this.http.get(this.url + 'movie/upcoming?api_key=' + this.partner + '&language=fr&page=' + page)
            .map((res: Response) => res.json())
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        let totalPages = totalItems
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = new Array(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

}
