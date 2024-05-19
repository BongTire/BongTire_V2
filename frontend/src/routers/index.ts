// src/router.ts
import { createWebHistory, createRouter } from "vue-router";

// Layout
import PublicLayout from "../layouts/public.vue";
import AdminLayout from "../layouts/admin.vue";

//Page
//Public
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Board from "../views/Board.vue";
import BoardDetail from "../views/BoardDetail.vue";
import Reservation from "../views/Reservation.vue";
import Login from "../views/Login.vue"

// Admin
import Dashboard from "../views/admin/Dashboard.vue";
import Car from "../views/admin/Car.vue";
import AdminProduct from "../views/admin/Product.vue";
import AdminReservation from "../views/admin/Reservation.vue";
import Tire from "../views/admin/Tire.vue";
import Wheel from "../views/admin/Wheel.vue";
import User from "../views/admin/User.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: PublicLayout },
  },
  {
    path: "/tire",
    name: "Tire",
    component: Product,
    meta: { layout: PublicLayout },
  },
  {
    path: "/wheel",
    name: "Wheel",
    component: Product,
    meta: { layout: PublicLayout },
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    meta: { layout: PublicLayout },
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: Reservation,
    meta: { layout: PublicLayout },
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    meta: { layout: PublicLayout },
  },
  {
    path: "/board/:id",
    name: "BoardDetail",
    component: BoardDetail,
    meta: { layout: PublicLayout },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: PublicLayout },
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: AdminLayout },
  },
  {
    path: "/admin/user",
    name: "User",
    component: User,
    meta: { layout: AdminLayout },
  },
  {
    path: "/admin/car",
    name: "Car",
    component: Car,
    meta: { layout: AdminLayout },
  },
  {
    path: "/admin/product",
    name: "AdminProduct",
    component: AdminProduct,
    meta: { layout: AdminLayout },
  },
  {
    path: "/admin/tire",
    name: "AdminTire",
    component: Tire,
    meta: { layout: AdminLayout },
  },
  {
    path: "/admin/wheel",
    name: "AdminWheel",
    component: Wheel,
    meta: { layout: AdminLayout },
  },
  {
    path: "/admin/reservation",
    name: "AdminReservation",
    component: AdminReservation,
    meta: { layout: AdminLayout },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
