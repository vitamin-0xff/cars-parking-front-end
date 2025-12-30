"use client"
import { useRouter } from "next/navigation"

export default () => {
    const navigator = useRouter();
    return (
        <div>
            <div className="p-4">Parkings Page</div>
            <button className="btn btn-primary m-4" onClick={() => navigator.back()}>Go to Home</button>
        </div>
    )
}