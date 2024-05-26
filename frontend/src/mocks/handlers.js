import { http, HttpResponse } from 'msw'
import cardData from './api/board-card.json'
import calendarData from './api/calendar.json'
import error from './api/error.json'
import tire from './api/tire.json'
import wheel from './api/wheel.json'
import wheelFilter from './api/wheel-filter.json'
import tireFilter from './api/tire-filter.json'
import list from './api/board-list.json' 
import PTCD from './api/ptcd.json'
import PCCD from './api/pccd.json'

import tireDetail from './api/tire-detail.json'
import wheelDetail from './api/wheel-detail.json'

import reseveData from './api/admin-reservation.json'
import adminTire from './api/tire-admin.json'
import adminWheel from './api/admin-wheel.json'

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

  http.get(import.meta.env.VITE_APP_API_URL+'/product', ({request}) => {
    const url = new URL(request.url)

    const PTCD = url.searchParams.get('ptcd')
    const PCCD = url.searchParams.get('pccd')

    if(PTCD === 'P0301' && PCCD === 'F0901'){
      return HttpResponse.json(tireFilter)
    }else if(PTCD === 'P0301' && PCCD === 'P0601'){
      return HttpResponse.json(tire)
    }else if(PTCD === 'P0301' && PCCD === 'F0902'){
      return HttpResponse.json(wheelFilter)
    }else if(PTCD === 'P0301' && PCCD === 'P0602'){
      return HttpResponse.json(wheel)
    }

    return HttpResponse.json(error)
    // ...and respond to them using this JSON response.
    
  }),

  http.get(import.meta.env.VITE_APP_API_URL+'/product/:id', ({request}) => {
    const url = new URL(request.url)

    const PCCD = url.searchParams.get('pccd')
    const id = request.id

    console.log(id)
    if(PCCD === 'P0601'){
      return HttpResponse.json(tireDetail)
    }else if(PCCD === 'P0602'){
      return HttpResponse.json(wheelDetail)
    }


    
    return HttpResponse.json(error)
    // ...and respond to them using this JSON response.
    
  }),




  http.get(import.meta.env.VITE_APP_API_URL+'/card', ({request}) => {
    const url = new URL(request.url)

    const PTCD = url.searchParams.get('ptcd')
    const PCCD = url.searchParams.get('pccd')

    if(PTCD === 'P0203' && PCCD === 'N0402'){
      return HttpResponse.json(cardData)
    }
    if(PTCD === 'P0203' && PCCD === 'N0401'){
      return HttpResponse.json(cardData)
    }
    return HttpResponse.json(error)

    // ...and respond to them using this JSON response.
  }),


  http.get(import.meta.env.VITE_APP_API_URL+'/list', ({request}) => {
    const url = new URL(request.url)

    const PTCD = url.searchParams.get('ptcd')
    const PCCD = url.searchParams.get('pccd')

    if(PTCD === 'P0202' && PCCD === 'C0501'){
      return HttpResponse.json(list)
    }
    return HttpResponse.json(error)

    // ...and respond to them using this JSON response.
  }),

  http.get(import.meta.env.VITE_APP_API_URL+'/reservation/calendar', ({request}) => {
    const url = new URL(request.url)

    const PTCD = url.searchParams.get('ptcd')
    const PCCD = url.searchParams.get('pccd')

    if(PTCD === 'R0401' && PCCD === 'R0801'){
      return HttpResponse.json(calendarData)
    }
    return HttpResponse.json(error)
    // ...and respond to them using this JSON response.
    
  }),

  http.get(import.meta.env.VITE_APP_API_URL+'/common/ptcd', ({request}) => {
    return HttpResponse.json(PTCD)
    
  }),
  http.get(import.meta.env.VITE_APP_API_URL+'/common/pccd', ({request}) => {
    return HttpResponse.json(PCCD)
    
  }),
  http.get(import.meta.env.VITE_APP_API_URL+'/admin/reservation/reservedata', ({request}) => {
    return HttpResponse.json(reseveData)
  }),


  http.get(import.meta.env.VITE_APP_API_URL+'/admin/product/tire', ({request}) => {
    return HttpResponse.json(adminTire)
  }),

  http.get(import.meta.env.VITE_APP_API_URL+'/admin/product/wheel', ({request}) => {
    return HttpResponse.json(adminWheel)
  }),

]