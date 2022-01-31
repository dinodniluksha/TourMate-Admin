export class Vehicle {
    id!: string;
    type!: string;
    imageUrl!: string;
    isAvailable!: boolean;
    charge!: string;
    description!: string;
    isVisible!: boolean;

    constructor(
        id: string,
        type: string,
        imageUrl: string,
        isAvailable: boolean,
        charge: string,
        description: string,
        isVisible: boolean,
    ) {
        this.id = id;
        this.type = type;
        this.imageUrl = imageUrl;
        this.isAvailable = isAvailable;
        this.charge = charge
        this.description = description;
        this.isVisible = isVisible;
    }
}