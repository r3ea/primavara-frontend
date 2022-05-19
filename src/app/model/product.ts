export class Product {
    id!: number;
    name!: string;
    price!: number;
    description?: string;
    categorieAsociata?: any;
    priceRange?: string;
  
    isDeleting: boolean = false;
  }