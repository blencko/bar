import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from './requests/requests.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        RequestsService
    ]
})
export class ServicesModule { }
