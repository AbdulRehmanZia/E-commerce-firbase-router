import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;
const ProductCard = ({ items }) => {
  const { category, description, title, price, thumbnail, id } = items;
  return (
    <>
    <Link to={`/products/${id}`}>
      <Card className=" bg-gray-300"
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt={title} src={thumbnail} />}
        extra={
          <div className="flex flex-col items-center space-y-1 mb-2 w-full ">
            <p className="text-gray-800 font-bold text-center">{category}</p>
            <p className="text-gray-600 font-semibold ">${price}</p>
          </div>
        }
        
      >
        <Meta title={title} description={description} />
      </Card>
      </Link>
    </>
  );
};
export default ProductCard;
