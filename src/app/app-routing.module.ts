import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/checkout/payment/payment.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MainImageComponent } from './pages/product-detail/selected-product/main-image/main-image.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/profile/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path:'products', component: ProductsComponent },
  {
    path:'product_details/:id', component: ProductDetailComponent,
    children:[
      {path: ':id', component: MainImageComponent},
    ]
   },
  {path:'cart',component: CartComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent},
  {path: 'payment', component: PaymentComponent},

{path:'orders', component: OrdersComponent},
{path:'wishlist', component: WishlistComponent},
  {
    
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],

    children: [
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
