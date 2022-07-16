import { AdbSharp } from '@mui/icons-material'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = 
|{ message: string }
| IProduct[]
| IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch(req.method) {
        case 'GET':
            return getProducts(req, res);
        
        case 'POST':
            return createProduct(req, res);

        case 'PUT':
            return updateProduct(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })
    
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    await db.connect
    const products = await Product.find()
        .sort({ title: 'asc'})
        .lean();

    await db.disconnect();

    const updatedProducts = products.map(product => {
        product.imagen = product.imagen.includes('http') 
         ? product.imagen 
        : `${process.env.HOST_NAME}products/${product.imagen}`;

        return product;
    });

    res.status(200).json(updatedProducts);

}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {_id = '', imagen = ''} = req.body as IProduct;

    if (!isValidObjectId(_id)){
        return res.status(400).json({ message: 'Id no válido' });
    }

    if(imagen.length < 0){
        return res.status(400).json({ message: 'Debe incluir al menos 1 imagen' });
    } //TODO: Ver qué hacer con esto

    try {
        await db.connect();
        const product = await Product.findById(_id);
        if(!product){
            await db.disconnect();
            return res.status(400).json({ message: 'Producto no encontrado' });
        }

        //product.imagenes.forEach( async(image) => {
            if(!imagen){
                const [fileId, extension] = imagen.substring(imagen.lastIndexOf('/' + 1)).split('.');
                await cloudinary.uploader.destroy(fileId);
       //     }
        }; //TODO Revisar esto
            

        await product.update( req.body );

        await db.disconnect();

        res.status(200).json( product );

    } catch (error) {

        console.log(error);
        await db.disconnect();
        res.status(400).json({ message: 'Error al actualizar producto' });

    }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { imagen = '' } = req.body as IProduct;

    if(imagen.length < 0){
        return res.status(400).json({ message: 'Debe incluir al menos 1 imagen' });
    } //TODO: Ver qué hacer con esto

    try {
        await db.connect();

        const productInDb = await Product.findOne({ slug: req.body.slug });

        if(productInDb){
            await db.disconnect();
            return res.status(400).json({ message: 'Producto ya existe' });
        }

        const product = new Product(req.body);

        await product.save();

        await db.disconnect();

        res.status(201).json( product );

    } catch (error) {

        console.log(error);
        await db.disconnect();
        res.status(400).json({ message: 'Error al actualizar producto' });

    }

}

