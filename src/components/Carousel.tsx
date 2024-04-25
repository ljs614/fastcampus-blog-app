import { useState } from "react";

const IMAGE_1_URL =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const IMAGE_2_URL =
  "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const IMAGE_3_URL =
  "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";


const imageList = [
  {
    id: 1,
    img: IMAGE_1_URL,
  },
  {
    id: 2,
    img: IMAGE_2_URL,
  },
  {
    id: 3,
    img: IMAGE_3_URL,
  },
];

interface GetImageProps {
  currId: number;
  list: Array<Object>;
  direction: string;
}

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);

  const getImageIndex = ({currId, list, direction}: GetImageProps): number  => {
    let nextIndex: number = currId;
    const listLen = list.length;
    if(direction === "prev") {
      nextIndex = currId - 1;
      if(nextIndex < 1) {
        nextIndex = listLen;
      }
    }
    if(direction === "next") {
      nextIndex = currId + 1;
      if(nextIndex > listLen) {
        nextIndex = 1;
      }
    }
    return nextIndex;
  } 

  return (
    <div>
      <div className="carousel">
        <ul className="carousel__slides">
          {imageList.map(({ id, img })=>(
            <div key={`img-${id}`}>
              <input
                type="radio"
                name="radio-buttons"
                id={`img-${id}`}
                checked={activeImage === id}
                readOnly
              />
              <li className="carousel__slide-container">
                <div className="carousel__slide-img">
                  <img alt={`scenery ${id}`} src={img} />
                </div>
                <div className="carousel__controls">
                  <label
                    onClick={() => setActiveImage(getImageIndex({currId: id, list: imageList, direction: "prev"}))}
                    className="carousel__slide-prev"
                  >
                    <span>&lsaquo;</span>
                  </label>
                  <label
                    onClick={() => setActiveImage(getImageIndex({currId: id, list: imageList, direction: "next"}))}
                    className="carousel__slide-next"
                  >
                    <span>&rsaquo;</span>
                  </label>
                </div>
              </li>
            </div>
          ))}
          <div className="carousel__dots">
            {imageList.map(({id})=>(
              <label
                key={`dot-${id}`}
                onClick={() => setActiveImage(id)}
                className={`carousel__dot ${activeImage === id ? "carousel__dot--active" : ""}`}
                id={`img-dot-${id}`}
              ></label>  
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}