import feature from "../models/feature.ts";
import {appRoute} from "../models/app-route.ts";
import HomeView from "../views/home.vue";
import CreateTest from "../views/create-test.vue";
import AvailableTests from "../views/available-tests.vue";
import TakeTest from "../views/take-test.vue";

export enum routeNames{
    Home,
    CreateTests,
    ShowAvailableTests,
    TakeTest
}
export  const applicationRoutes:appRoute[] =[
    new appRoute(routeNames.Home, "Home","Spelltacula Home","/",HomeView),
    new appRoute(routeNames.CreateTests, "Create","Create Tests","/test/create",CreateTest),
    new appRoute(routeNames.ShowAvailableTests, "List","View Available Tests","/test/list",AvailableTests),
    new appRoute(routeNames.TakeTest, "Take","Start a new Test","/test/take",TakeTest),

];
export const features: feature[] =[
    new feature("Create Spelling Test","Create new spelling tests to practice your spelling words","","Create a Test",applicationRoutes.find(x => x.route == routeNames.CreateTests)?.url),
    new feature("Take Spelling Test","Create new spelling tests to practice your spelling words","","Take a Test",applicationRoutes.find(x => x.route == routeNames.ShowAvailableTests)?.url)
];

