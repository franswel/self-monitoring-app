import { Router } from "../deps.js";
import { frontPage, morningView, eveningView, reportView, addMorningData, addEveningData } from "./controllers/viewController.js";
import { weeklySummary, monthlySummary, showSummarySelection } from "./controllers/summaryController.js";
import { showRegistrationForm, postRegistrationForm, showLoginForm, postLoginForm, postLogout } from "./controllers/userController.js";
import * as summaryApi from "./apis/summaryApi.js";

const router = new Router();

router.get('/', frontPage);
router.get('/behaviour/summary', showSummarySelection);
router.post('/behaviour/summary/week', weeklySummary);
router.post('/behaviour/summary/month', monthlySummary);

router.get('/behaviour/reporting', reportView);
router.get('/behaviour/reporting/morning', morningView);
router.get('/behaviour/reporting/evening', eveningView);

router.post('/behaviour/reporting/morning', addMorningData);
router.post('/behaviour/reporting/evening', addEveningData);

router.get('/auth/register', showRegistrationForm);
router.post('/auth/register', postRegistrationForm);
router.get('/auth/login', showLoginForm);
router.post('/auth/login', postLoginForm);
router.get('/auth/logout', postLogout);

router.get('/api/summary', summaryApi.getSummary);
router.get('/api/summary/:year/:month/:day', summaryApi.getDaysSummary);

export { router };