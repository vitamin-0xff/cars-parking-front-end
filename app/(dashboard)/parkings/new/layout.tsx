'use client'
import { APIProvider } from "@vis.gl/react-google-maps"

export default ({
    children,
}: {
    children: React.ReactNode
}) => {
    /* Scope the api key where we need it */
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            {children}
        </APIProvider>
    )
}