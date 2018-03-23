import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';


import {HistoryComponent} from './components/history/history.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'searchresult',
        component: SearchresultComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
