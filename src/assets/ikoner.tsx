import React, { ReactElement } from 'react'

import checkbox from './check-box.png'

export const SlettIkon = () : ReactElement => (
    <svg version="1.1" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
            <g transform="translate(-912 -2163)" fill="#fff">
                <g transform="translate(912 2163)">
                    <path d="m15.667 2h-2-2.3333v-1.6667c0-0.184-0.14933-0.33333-0.33333-0.33333h-5.3333c-0.184 0-0.33333 0.14933-0.33333 0.33333v1.6667h-2.3333-2c-0.184 0-0.33333 0.14933-0.33333 0.33333s0.14933 0.33333 0.33333 0.33333h1.6667v13c0 0.184 0.14933 0.33333 0.33333 0.33333h10.667c0.184 0 0.33333-0.14933 0.33333-0.33333v-13h1.6667c0.184 0 0.33333-0.14933 0.33333-0.33333s-0.14933-0.33333-0.33333-0.33333zm-9.6667 10.333c0 0.184-0.14933 0.33333-0.33333 0.33333s-0.33333-0.14933-0.33333-0.33333v-7.3333c0-0.184 0.14933-0.33333 0.33333-0.33333s0.33333 0.14933 0.33333 0.33333v7.3333zm0-11.667h4.6667v1.3333h-4.6667v-1.3333zm2.6667 11.667c0 0.184-0.14933 0.33333-0.33333 0.33333-0.184 0-0.33333-0.14933-0.33333-0.33333v-7.3333c0-0.184 0.14933-0.33333 0.33333-0.33333 0.184 0 0.33333 0.14933 0.33333 0.33333v7.3333zm2.6667 0c0 0.184-0.14933 0.33333-0.33333 0.33333s-0.33333-0.14933-0.33333-0.33333v-7.3333c0-0.184 0.14933-0.33333 0.33333-0.33333s0.33333 0.14933 0.33333 0.33333v7.3333z" />
                </g>
            </g>
        </g>
    </svg>
)

export const PlussIkon = () : ReactElement => (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.48 13.88V8.03H0.0200001V6.17H5.48V0.319998H7.43V6.17H12.89V8.03H7.43V13.88H5.48Z" fill="#0C5EA8" />
    </svg>
)

export const CheckedIkon = () : ReactElement => (
    <img
        width="16px"
        height="16px"
        className="checked-ikon"
        src={checkbox}
        alt="Avhuket ikon"
    />
)

export const SøknadsIkon = () : ReactElement => (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#3E3832" fill="none" fillRule="evenodd">
            <path d="M12.667 28.667h-12v-28h14.666L22 7.333v10" />
            <path d="M15.333.667v6.666H22M21.333 30.003l-4.666 1.333L18 26.669l10.001-10.002L31.335 20zM25.335 19.333l3.333 3.334M18 26.67l3.333 3.333" />
        </g>
    </svg>
)
