export class Vehicle {
    id!: string;
    type!: string;
    imageUrl!: string;
    isAvailable!: boolean;
    description!: string;

    constructor(id: string, type: string, imageUrl: string, isAvailable: boolean, description: string) {
        this.id = id;
        this.type = type;
        this.imageUrl = imageUrl;
        this.isAvailable = isAvailable;
        this.description = description;
    }
}