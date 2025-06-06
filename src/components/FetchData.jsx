import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";


const FetchData = () => {
    const [fetchError, setFetchError] = useState(null)
    const [stock, setStock] = useState(null)

    useEffect(() => {
        const fetchStock = async () => {
            const {data, error} = await supabase
            .from('stock')
            .select()

            if (error) {
                setFetchError('Could not fetch stock data')
                setStock(null)
                console.log(error) 
            }

            if (data) {
                console.log(data)
                setStock(data)
                setFetchError(null)
            }
        }

        fetchStock()
    }, [])

    return (
        <div>
            {fetchError && (<p>{fetchError}</p>)}
            {stock && (
                <div>{stock.map(s => <li key={s.id}>{s.stock}</li>)}</div>
            )}
        </div>
    )

}

export default FetchData