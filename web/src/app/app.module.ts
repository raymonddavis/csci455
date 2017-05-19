import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { AppComponent } from './app.component'

/* Gaurds */
import { AuthGaurd } from './guards/auth.guard'
import { PermGaurd } from './guards/perm.guard'

/* Pages */
import { LoginComponent } from './pages/login.component'
import { ItemsComponent } from './pages/items.component'
import { ItemTypesComponent } from './pages/itemtypes.component'
import { LocationsComponent } from './pages/locations.component'
import { UsersComponent } from './pages/users.component'
import { ItemLocationsComponent } from './pages/itemlocations.component'

/* Services */
import { UserService } from './services/user.service'
import { HttpService } from './services/http.service'

/* Components */
import { HeaderComponent } from './components/header.component'
import { FooterComponent } from './components/footer.component'
import { TableComponent } from './components/table.component'

/* Form Components */
import { UserFormComponent } from './components/user-form.component'
import { ItemFormComponent } from './components/item-form.component'
import { ItemEditComponent } from './components/item-edit.component'
import { ItemTypeFormComponent } from './components/itemtype-form.component'
import { LocationFormComponent } from './components/location-form.component'
import { ItemLocationFormComponent } from './components/itemlocation-form.component'

/* Font Awesome */
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

const appRoutes: Routes = [
  { path: '', component: ItemsComponent, canActivate: [AuthGaurd] },
  { path: 'itemtypes', component: ItemTypesComponent, canActivate: [AuthGaurd] },
  { path: 'login', component: LoginComponent },
  { path: 'locations', component: LocationsComponent, canActivate: [AuthGaurd] },
  { path: 'users', component: UsersComponent, canActivate: [PermGaurd] },
  { path: 'itemlocations', component: ItemLocationsComponent, canActivate: [AuthGaurd] }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ItemsComponent,
    ItemTypesComponent,
    LocationsComponent,
    UsersComponent,
    ItemLocationsComponent,
    TableComponent,
    UserFormComponent,
    ItemFormComponent,
    ItemEditComponent,
    ItemTypeFormComponent,
    LocationFormComponent,
    ItemLocationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    Angular2FontawesomeModule
  ],
  providers: [AuthGaurd, PermGaurd, UserService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
