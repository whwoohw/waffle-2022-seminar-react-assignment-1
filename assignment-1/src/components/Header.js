import wafflelogo from '../img/wafflelogo.PNG';
import "./Header.css"

const Header = () => {
    return (
        <header className='header'> {/*header로 전체 감싸기*/}
            <a href='https://wafflestudio.com' className='waffle-link'> {/*a링크 걸기*/}
                <img src={wafflelogo} alt="waffle-logo" className='waffle-logo'/> {/*img 폴더에서 img 가져와서 src에 넣기*/}
                <h3>와플스튜디오 메뉴관리</h3>
            </a>
        </header>
    )
}

export default Header;