import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Check } from 'lucide-react'
import { DestinationType } from '@/types'

const BookingCard = ({destination}:{destination: DestinationType}) => {
  return (
    <div>
                <aside className="h-fit rounded-md border border-neutral-200 bg-white p-5">
          <p className="text-xs text-neutral-500">Starting from</p>
          <p className="mt-1 text-2xl font-semibold text-cyan-600">
            ${destination.price}
          </p>
          <p className="text-xs text-neutral-500">per person</p>

          <div className="mt-5 rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-700">
            {new Date(destination.departureDate).toLocaleDateString("en-US")}
          </div>

          <Button className="mt-4 h-10 w-full rounded-sm bg-cyan-600 text-white hover:bg-cyan-700">
            Book Now
            <ArrowRight className="size-4" />
          </Button>

          <ul className="mt-5 space-y-2.5">
            <li className="flex items-center gap-2 text-xs text-neutral-600">
              <Check className="size-3.5 shrink-0 text-emerald-600" />
              Free cancellation up to 7 days
            </li>
            <li className="flex items-center gap-2 text-xs text-neutral-600">
              <Check className="size-3.5 shrink-0 text-emerald-600" />
              Travel Insurance included
            </li>
            <li className="flex items-center gap-2 text-xs text-neutral-600">
              <Check className="size-3.5 shrink-0 text-emerald-600" />
              24/7 customer support
            </li>
          </ul>
        </aside>
    </div>
  )
}

export default BookingCard