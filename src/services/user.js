import request from '@/utils/request';
import baseUrl from '../models/login';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
  // return await fetch(baseUrl+'/')
}

export async function queryNotices() {
  return request('/api/notices');
}
