import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick, style,size }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize={size?size:"15px"} />
          ) : (
            <AiOutlineStar fontSize={size?size:"15px"} />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
