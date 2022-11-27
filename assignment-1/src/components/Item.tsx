import "./Item.css";

const Item = ({ menu }: any) => {
  let rating;
  if (menu.rating) {
    rating = menu.rating;
  } else {
    rating = 0;
  }

  const ratingToPercent = rating * 10;

  return (
    <div className="item-container">
      <div className="item id">{menu.id}</div>
      <div className="item name">{menu.name}</div>
      <div className="item price">{menu.price.toLocaleString()}</div>
      <div className="item rating">
        <div className="star-ratings">
          <div
            className="star-ratings-fill space-x-2 text-lg"
            style={{ width: ratingToPercent + "%" }}
          >
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <div className="star-ratings-base space-x-2 text-lg">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
        <div>{Math.round(rating) / 2}</div>
      </div>
    </div>
  );
};

export default Item;
