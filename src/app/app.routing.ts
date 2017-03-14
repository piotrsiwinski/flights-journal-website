import { Routes } from "@angular/router";
import { BodyComponent } from "./body/body.component";
import { UserComponent } from "./user/user.component";

const appRoutes : Routes = [
  { path: '',             component: BodyComponent },
  { path: 'user',         component: UserComponent },
];

export {appRoutes};
