import React from 'react'
import loadingCss from './loading.module.css'

export default function LoadingScreen() {
    return <>
        <div  className=" d-flex text-light justify-content-center  align-items-center vh-100  "> 
        {/* <i class="fa-solid fa-spinner fa-spin fa-3x"></i> */}


        {/* <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
            </div> */}


            {/* <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Loading...
            </button> */}

{/* 
            <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div> */}
            <div className={`${loadingCss.Lcontainer}`}>
            <div className={`${loadingCss.Lrow}`}>
                {/* <div className={`${loadingCss.Lcircle} ${loadingCss.Lloading_animation}`}  ></div> */}
                <div className={`${loadingCss.Lcolumn} ${loadingCss.Mines1}`} >
                    <div className={`${loadingCss.Lline} ${loadingCss.Lline1} ${loadingCss.Lloading_animation}`} ></div>
                    <div className={`${loadingCss.Lline} ${loadingCss.Lline2} ${loadingCss.Lloading_animation}`} ></div>
                </div>
            </div>
            <div className={`${loadingCss.Lcolumn}`} >
                <div className={`${loadingCss.Lline} ${loadingCss.Lline3} ${loadingCss.Lloading_animation}`} ></div>
                <div className={`${loadingCss.Lline} ${loadingCss.Lline4} ${loadingCss.Lloading_animation}`} ></div>
                <div className={`${loadingCss.Lline} ${loadingCss.Lline5} ${loadingCss.Lloading_animation}`} ></div>
            </div>
            <div className={`${loadingCss.Lrow}`} >
                <div className={`${loadingCss.Lbox} ${loadingCss.Lloading_animation}`} ></div>
                <div className={`${loadingCss.Lbox} ${loadingCss.Lloading_animation}`} ></div>
                <div className={`${loadingCss.Lbox} ${loadingCss.Lloading_animation}`} ></div>
            </div>
            </div>
        </div>
</>
}
