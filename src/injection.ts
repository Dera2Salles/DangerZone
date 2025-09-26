import axios from 'axios';
import { DangerServiceImpl } from './danger/danger.service';
import { DangerRepositoryImpl } from './danger/danger.repositoryImpl';

const api = axios.create({
  timeout: 5000,
  withCredentials: true,
});

const dangerService = new DangerServiceImpl(api);

export const dangerRepository = new DangerRepositoryImpl(dangerService);
