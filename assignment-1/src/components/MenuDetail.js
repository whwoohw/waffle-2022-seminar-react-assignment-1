import "./MenuDetail.css"

const MenuDetail = ({detailState, setDetailState, selectedMenu, setSelectedMenu, setModalState}) => {
    const closedetail = () => {
        setDetailState(false);
        setSelectedMenu("");
    }

    const editModal = () => {
        setModalState(2);
    }

    const deleteModal = () => {
        setModalState(3);
    }

    return(
        <>
            {detailState === false ? null : (
            <div className="menu-detail-container">
                <div className="detail-close-button">
                    <span className="material-symbols-outlined" onClick={closedetail}>
                        close
                    </span>
                </div>
                <div className="detail-contents">
                    <img src={selectedMenu.image} alt="Url을 불러올 수 없습니다." className="detail-url"/>
                    <h3>{selectedMenu.name}</h3>
                    <p>{selectedMenu.price.toLocaleString()} 원</p>
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