import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';


const routes: Routes = [
  {  
    path: 'shop',
    component: ShopComponent
  },
];

export const ShopRoutes = RouterModule.forRoot(routes);