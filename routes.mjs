import db from './models/index.mjs';

// import your controllers here
import initBugsController from './controllers/bugs.mjs';
import initFeaturesController from './controllers/features.mjs';
import initUsersController from './controllers/logins.mjs';

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const BugsController = initBugsController(db);
  const FeaturesController = initFeaturesController(db);
  const UsersController = initUsersController(db);

  // define your route matchers here using app
  app.get('/', (request, response) => {
    response.render('form');
  });
  app.post('/create', BugsController.create);
  app.get('/features/index', FeaturesController.index);
  app.get('/bugs/index', BugsController.index);
  app.post('/features/create', FeaturesController.create);
  app.get('/users/loginCheck', UsersController.check);
  app.post('/users/login', UsersController.login);
}
