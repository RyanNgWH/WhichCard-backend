/**
 * Helper functions for tests
 *
 * @format
 */

import { agent } from 'supertest';
import app from '../index';

const req = agent(app());

export default req;
