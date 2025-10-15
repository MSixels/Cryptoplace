import React, { useContext, useState, useEffect } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value);
    if(e.target.value === "") {
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }


  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>A Maior<br /> Corretora de Criptomoedas</h1>
        <p>
          Boas-vindas à maior corretora de criptomoedas do mundo. Cadastre-se para explorar o universo cripto.
        </p>
          <form onSubmit={searchHandler}>
            <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Pesquisar cripto...' required/>
            <datalist id='coinlist'>
              {allCoin.map((item, index) => (
                <option key={index} value={item.name}/>
              ))
              }
            </datalist>


            <button type='submit'>Pesquisar</button>
          </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Moedas</p>
          <p>Preço</p>
          <p style={{textAlign:"center"}}>Variação (24h)</p>
          <p className='market-cap'>Valor de mercado</p>
        </div>
        {
        displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_percentage_24h*100)/100}
            </p>
            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </Link>
        ))
        }
      </div>
    </div>
  )
}

export default Home
