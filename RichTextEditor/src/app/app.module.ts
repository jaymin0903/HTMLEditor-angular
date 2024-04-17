import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_URL, BaseInterceptor } from './core/interceptors/base.interceptor';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [AppComponent, EditorComponent],
  imports: [
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
