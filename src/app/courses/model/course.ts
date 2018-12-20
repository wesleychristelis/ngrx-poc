
// To store a collection of data in the store we need the NgRx Entity Lib
export interface Course {
    id:number;
    description:string;
    iconUrl: string;
    courseListIcon: string;
    longDescription: string;
    category:string;
    lessonsCount:number;
    promo:boolean;
}
