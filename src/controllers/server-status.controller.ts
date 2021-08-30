import { Router } from 'express';
import { SERVER_STATUS_ENDPOINT } from '../const/endpoint';
import { getRoutes } from '../services/server.status.service';

export const router: Router = Router();

// getStatus
router.get(SERVER_STATUS_ENDPOINT + "/", (req, res) => {
  res.status(200).send({
    "status": "¡Servidor en Ejecucion!"
  });
});

// getRoutes
router.get(SERVER_STATUS_ENDPOINT + "/routes", (req, res) => {
  const routes = getRoutes();
  res.status(200).send({
    numberOfRoutes: routes.length,
    routes: routes
  });
});


