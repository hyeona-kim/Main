import { useScrollDirection } from "framer-motion";
import styled from "styled-components";

const HeaderDown = styled.div`
    top:-3rem;
`;

const NavBar = () => {
    const scrollDirection = useScrollDirection();

    return (
        <>
            {scrollDirection === "down" && (
                <HeaderDown>

                </HeaderDown>
            )}
            {scrollDirection !== "down" && (
                <Header>

                </Header>
            )}
        </>
    );
};
export default NavBar;