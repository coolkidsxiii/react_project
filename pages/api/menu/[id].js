// pages/api/menu/[id].js
import { createSingleItemHandler } from '../../../lib/api-route-factory';

export default createSingleItemHandler('menu');