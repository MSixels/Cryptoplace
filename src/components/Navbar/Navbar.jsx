import React, { useContext } from 'react'
import './Navbar.css'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({
          name: "usd",
          symbol: "$",
        })
        break;
      }
      case "eur": {
        setCurrency({
          name: "eur",
          symbol: "€",
        })
        break;
      }
      case "brl": {
        setCurrency({
          name: "brl",
          symbol: "R$",
        })
        break;
        }
      default: {
        setCurrency({
          name: "usd",
          symbol: "$",
        })
        break;
      }
    }
  }

  return (
    <div className='navbar'>
      <Link to={'/'}>
        <p className='title'>Cryptoplace</p>
      </Link>
        <ul>
          <Link to={'/'}>
            <li>Página inicial</li>
          </Link>
          <li>Sobre</li>
          <li>Recursos</li>
          <li>Preços</li>
          <li>Blog</li>
        </ul>
        <div className="nav-right">
          <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="brl">BRL</option>
          </select>
          <button>Entre <img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar
