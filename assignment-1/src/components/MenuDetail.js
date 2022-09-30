import "./MenuDetail.css"

const MenuDetail = ({detailstate, setDetailstate, selectedmenu, setSelectedmenu, setModalstate}) => {
    const closedetail = () => {
        setDetailstate(false);
        setSelectedmenu("");
    }

    const editModal = () => {
        setModalstate(2);
    }

    const deleteModal = () => {
        setModalstate(3);
    }

    return(
        <>
            {detailstate === false ? null : (
            <div className="menu-detail-container">
                <div className="detail-close-button">
                    <span className="material-symbols-outlined" onClick={closedetail}>
                        close
                    </span>
                </div>
                <div className="detail-contents">
                    <img src={selectedmenu.image} alt="Url을 불러올 수 없습니다." className="detail-url"/>
                    <h3>{selectedmenu.name}</h3>
                    <p>{selectedmenu.price.toLocaleString()} 원</p>
                    <div className="detail-icons">
                        <span className="material-symbols-outlined" onClick={editModal}>edit</span>
                        <span className="material-symbols-outlined" onClick={deleteModal}>delete</span>
                    </div> 
                </div>
            </div>
            )}
        </>
        
    )

};

export default MenuDetail;