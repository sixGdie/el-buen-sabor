import mongoose, { Schema, model, Model} from "mongoose";
import { IProduct } from "../interfaces";

const productSchema: Schema = new Schema({
    nombre: { type: String, required: true, default: '' },
    rubro: [{
            type: String,
            enum: ['bebidas', 'comidas', 'promos'],  
            message: 'El rubro debe ser uno de los siguientes: bebidas, comidas, promos',
            default: 'comidas'  
    }],
    categoria: [{
        type: String,
        enum: ['bebida', 'hamburguesa', 'pizza', 'pancho', 'guarnicion', 'lomo', 'otro'],
        message: 'La categoria debe ser una de las siguientes: bebida, hamburguesa, pizza, pancho, guarnicion, lomo, otro',    
        default: 'pizza'
    }],
    imagenes: [{ type: String, default: '' }],
    precio: { type: Number, required: true, default: 0 },
    costoEnvio: { type: Number, required: true, default: 0 },
    descripcion: { type: String, required: true, default: '' },
    inStock: { type: Number, required: true, default: 0 },
    slug: { type: String, required: true, unique: true },
    tags: { type: String, required: true, default: '' },
}, { 
    timestamps: true 
});

productSchema.index({ nombre: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;