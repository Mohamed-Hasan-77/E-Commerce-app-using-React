import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'





export const cartContext = createContext(null);

export default function CartContextProvider({children}) {

    const [userCartItems, setCartItems] =  useState(0);
    const [userCartPrice, setUserCartPrice] =  useState(0);
    const [userCartProducts, setCartProducts] =  useState([]);
    const [cartId, setCartId] =  useState(0);



// ---------------------------------------------------------------------Get User Cart Items 
async function getUserCart() {

    try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
        'token': localStorage.getItem('tkn'),
        },
    })

        if(data.status === 'success') {

            setCartProducts(data.data.products);
            setCartItems(data.numOfCartItems);
            setUserCartPrice(data.data.totalCartPrice);
            setCartId(data.data._id);

        }

    } catch(err) {
        // console.log(err);
            
    }

    }

// --------------------------------------------------------------------add Product To Cart   
async function addProductToCart(proId, idx) {
            
    try {
        const {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart', {
            "productId": proId,
        }, {
            headers: {'token' : localStorage.getItem('tkn')}
        });

        if(data.status == "success") {
            setCartProducts(data.data.products);
            setCartItems(data.numOfCartItems);
            setUserCartPrice(data.data.totalCartPrice);
            return true
            
        } else {
        return false
        }
    } catch(err) {
        // console.log(err);
    }
}

// --------------------------------------------------------------------Remove Item From Cart 
    async function removeCartItem(id, idx) {
        try {
            const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {
                headers: {'token' : localStorage.getItem('tkn')}
            });

            // ----------------------------------------------------  Loading Animation
            if(data.status == "success") {

                // document.querySelector('.remove'+id).innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

                    setCartProducts(data.data.products);
                    setCartItems(data.numOfCartItems);
                    setUserCartPrice(data.data.totalCartPrice);
                    return true 

            } else {
                return false
            }
            // -----------------------------------------------------------------------

        } catch(err) {
            // console.log(err);
        }
        }

// --------------------------------------------------------------------increase Cart Item Count
    async function updateProductCount(proId, idx, proCount) {
    
        try {
            const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${proId}`, {'count' : proCount + 1}, {
                headers: {'token' : localStorage.getItem('tkn')}
            });
            if(data.status == "success") {
                setCartProducts(data.data.products);
                setUserCartPrice(data.data.totalCartPrice);
                return true 
            } else {
                return false
            }
            
        } catch(err) {
            // console.log(err);
        }
        } 

// --------------------------------------------------------------------decrease Cart Item Count
    async function minusProductCount(proId, idx, proCount) {
    
            try {
                const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${proId}`, {'count' : proCount - 1}, {
                    headers: {'token' : localStorage.getItem('tkn')}
                });
                
                if(data.status == "success") {
                    if(proCount > 1 ) {
                        setCartProducts(data.data.products);
                        setUserCartPrice(data.data.totalCartPrice);
                    } else {
                        removeCartItem(proId, idx);
                    }
                    return true 
                } else {
                    return false
                }
                

            } catch(err) {
                // console.log(err);
            }
        } 







    useEffect(function() {
    // if (localStorage.getItem("tkn") === null) window.location="/login" ;
    getUserCart();

}, [])




    return  <cartContext.Provider value={{addProductToCart, userCartItems, userCartPrice, userCartProducts, removeCartItem, updateProductCount, minusProductCount, getUserCart, cartId}} >

        <div style={{'display':'none'}} className="loadingScreen text-light fs-3 justify-content-center align-items-center "> No Cart Items  Redirecting To Home  <i class="fa-solid fa-spinner fa-spin"></i> </div>

        {children};



    </cartContext.Provider>
}
