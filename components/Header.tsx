const Header = () => {

    return <>
        <nav>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a className={'selected'} href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <style jsx>
            {`
              nav {
                display: flex;
                position: sticky;
                background-color: #333;
                top: 0;
                width: 100%;
                box-shadow: 0px 5px 20px -10px rgba(51, 51, 51, 1);
              }

              ul {
                display: flex;
                list-style-type: none;
                margin-left: auto;
                margin-right: 50px;
              }

              li {
                margin-left: 15px;
                margin-right: 15px;
              }

              a {
                color: #fafafa;
                display: block;
                position: relative;
                transition: 1s all;
                font-weight: bold;
              }

              .selected::after,
              a:hover::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                background-color: #38c188;
                height: 2px;
                animation: hoverAnimation .35s ease forwards;
              }

              .selected {
                color: #38c188;
                background-color: transparent;
              }

              @keyframes hoverAnimation {
                from {
                  width: 0;
                }

                to {
                  width: 100%;
                }
              }

            `}
        </style>
    </>
}

export default Header
