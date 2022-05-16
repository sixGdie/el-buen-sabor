import { FC } from "react";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import styles from "./ProductSlideshow.module.css";

interface Props {
    imagenes: string[];
}

export const ProductSlideshow: FC<Props> = ({ imagenes }) => {
  return (
    <Slide
        easing="ease"
        duration={7000}
        indicators
    >
        {
            imagenes.map(imagen => {
                const imagenUrl = `/products/${imagen}`;
                return (
                    <div className={ styles['each-slide'] } key={ imagen }>
                        <div style={{
                            backgroundImage: `url(${ imagenUrl })`,
                            backgroundSize: 'cover'
                        }}>
                            
                        </div>
                    </div>
                )
            })
        }
    </Slide>
  )
}
