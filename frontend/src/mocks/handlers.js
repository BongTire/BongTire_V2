import { http, HttpResponse } from 'msw'
import cardData from './api/board-card.json'
import calendarData from './api/calendar.json'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(import.meta.env.VITE_APP_API_URL+'/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),


  http.get(import.meta.env.VITE_APP_API_URL+'/card?ptcd=P0203&pccd=N0402', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(cardData)
  }),

  http.get(import.meta.env.VITE_APP_API_URL+'/reservation/calendar?ptcd=R0401&pccd=R0801', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(calendarData)
  }),


]