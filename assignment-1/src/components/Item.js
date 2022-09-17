import "./Item.css";

const Item = ({menu}) => {
    return (
        <div className="item-container">
            <div className="item id">
                {menu.id}
            </div>
            <div className="item name">
                {menu.name}
            </div>
            <div className="item price">
                {menu.price.toLocaleString()}
            </div>
        </div>
    )
};

export default Item;