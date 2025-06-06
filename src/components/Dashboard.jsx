import React, { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthCOntext"
import { useNavigate } from "react-router-dom"
import Test from "./Test"
import { supabase } from "../supabaseClient"


const Dashboard = () => {
    const {session, signOut} = UserAuth()
    const navigate = useNavigate()
    const [addStock, setAddStock] = useState('')
    const [stockList, setStockList] = useState([])
    const [countStock, setCountStock] = useState(0)
    const [displayError, setDisplayError] = useState(null)

    console.log(session)
    console.log(session.user.email)


    // fetch stock to display
    const fetchUserStock = async () => {
        const {data, error} = await supabase
                .from('user_stock')
                //.select('email', 'stock_quote')
                .select()
                .eq('email', session.user.email)
        console.log("data: ", data)
        setStockList(data)
        setCountStock(data.length)
        console.log("stock count: " + countStock)
        console.log(stockList)
        }

    const handleSubmit2 = async (e) => {
        e.preventDefault()
        const {error} = await supabase
            .from('user_stock')
            .insert({email: session.user.email,
                stock_quote: addStock
            })

        if (error) {
            setFetchError('Could not add stock data')
            console.log(error)}
        
        const {data, error2} = await supabase.from('user_stock').select('*').eq('email', session.user.email).eq('stock_quote', addStock)
        console.log(data)
        const newStockItem = data[0]

        setStockList(stockList => {
            const updatedList = stockList ? [...stockList, newStockItem] :
            console.log("XXXXXXXXXXXXxx")
            console.log("updated list: ", updatedList)
            setCountStock(updatedList.length)
            return updatedList
        })

        console.log("stock count: ", countStock)
        console.log("lsit of stocks: ", stockList)
        
    }

    // delete stock
    const handleRemove = async (stock_quote) => {
        const response = await supabase
            .from('user_stock')
            .delete()
            .eq('stock_quote', stock_quote)
        return
    }

    // add new stock
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        if (countStock > 5) {
            setDisplayError("You have reach the limit of 5 stocks, please remove one existing in your portfolio")
            return
        } 

        const {error} = await supabase
            .from('user_stock')
            .insert({email: session.user.email,
                stock_quote: addStock
            })

        if (error) {
            setFetchError('Could not add stock data')
            console.log(error) 
        } else {
            await fetchUserStock()
        }

        }


    // display existing stock
    useEffect(() => {
        fetchUserStock()
    }, [])


    // Sign Out
    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut()
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    return(
    <div>
        <h1>Dashboard</h1>
        <h2>Welcome, {session?.user?.email}</h2>
        <div>
            <p onClick={handleSignOut} className="hover:cursor-pointer yellow-button border inline-block px-4 py-3 mt-4">Sign Out</p>
            <form onSubmit={handleSubmit}>
                <label>Add Stock Quotes:</label>
                <input className="search-bar-container search-input" type="text" value={addStock} onChange={(e) => setAddStock(e.target.value)} />
                <button className=".green-button" type="submit" />
            </form>
        </div>

        <div className="stock-list-container">
            <h2>My Watchlist</h2>
            {stockList.length === 0 ? (<p>No stocks in your watchlist. Add some!</p>) : (
                <ul className="stock-list">
                    {stockList.map(stock => (
                        <li key={stock.id} className="stock-item">
                            <span className="stock-name">{stock.stock_quote}</span>
                            <button className="red-button" type="button" onClick={() => handleRemove(stock.stock_quote)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )
            
            }
        </div>

        <div>{displayError && <p>{displayError}</p>}</div>
    </div>
    )
}  

export default Dashboard
                            