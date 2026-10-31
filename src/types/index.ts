export type NavLink = {
    label: string;
    href: string;
    active?: boolean;
};

export type DestinationType = {
    _id: string;
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    rating?: string | number;
};

export type BookingType = {
    _id: string;
    username: string;
    email: string;
    destinationId: string;
    destinationName: string;
    country?: string;
    category?: string;
    price: string | number;
    imageUrl?: string;
    departureDate: string;
    bookingDate?: string | Date;
    status?: "Confirmed" | "Pending" | "Cancelled" | string;
};
