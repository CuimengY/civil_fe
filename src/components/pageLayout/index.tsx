import React from 'react'
import './index.css'

export default function PageLayout({children}: { children: any }) {
    return (
        <div className="content">
            {children}
        </div>
    )
}