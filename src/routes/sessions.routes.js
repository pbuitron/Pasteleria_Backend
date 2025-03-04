import { Router } from 'express';
import passport from '../config/passport.js';
import { login, register} from '../controllers/auth.controller.js';

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.post('/register', register);
sessionRouter.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default sessionRouter;