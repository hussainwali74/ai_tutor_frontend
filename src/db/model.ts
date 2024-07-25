
export interface User{
    id?:number
    clerk_id?:string
    name:string
    email:string
    contact?:string,
    address?:string,
    imageSrc?:string,
    // createdAt?: typeof PgTimestamp
    // updatedAt?: typeof timestamp
    // deletedAt?: typeof timestamp
}

export interface Student{
    id?:number
    user_id?:number,
    subject_id?:number,
    // createdAt?: typeof PgTimestamp
    // updatedAt?: typeof timestamp
    // deletedAt?: typeof timestamp
}