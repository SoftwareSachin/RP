import express from 'express';
import { getProperties, createProperty } from '../controllers/propertyController';

const router = express.Router();

router.route('/').get(getProperties).post(createProperty);

export default router;