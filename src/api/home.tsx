import {request} from "../lib/request"

export async function home() {
  return await request.get('/ping')
}
