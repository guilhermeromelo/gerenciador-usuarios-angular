
import { Routes } from '@angular/router';
import { AccountComponent } from './views/account-screen/account-screen';
import { NotfoundComponent } from './views/authentication/404/not-found.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { SignupComponent } from './views/authentication/signup/signup.component';
import { BackgroundComponent } from './views/background/blank.component';

export const Approutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '',
        component: BackgroundComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            },
            {
                path: 'account/:id',
                component: AccountComponent
            }
        ]
    },
    {
        path: '404',
        component: NotfoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    },
];
