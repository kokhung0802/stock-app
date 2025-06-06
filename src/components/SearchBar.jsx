import { supabase } from "../supabaseClient";
import { useState } from "react";


const SearchBar = () => {
    const [stock, setStock] = useState('')
    const [stockQuote, setStockQuote] = useState('')
    const [fetchError, setFetchError] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()
        const {data, error} = await supabase
            .from('stock')
            .select('stock')
            .eq('stock', stock)

            if (error) {
                setFetchError('Could not fetch stock data')
                console.log(error) 
            }

            if (data) {
                setStockQuote(data)
            }
        }

        console.log(stockQuote)

        

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Find Stock Quotes:
                    <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
                </label>
                <button className="green-button" type="submit" />
            </form>
            <button className="green-button">Test</button>
        </div>
    )

}

export default SearchBar