import { useEffect, useState } from "react"

export default useScrollDirection(){
    const [scrollDirection, setScrollDirection] = useState("");
    
    useEffect(()=>{
        let lastScrollY = window.pageYOffset;

        // const updateScrollDirection = () => {
        //     const scrollY = window.pageYOffset;
        //     const direction = scrollY > 10 lastScrollY ? "down" : "up";
        // }
    })
}