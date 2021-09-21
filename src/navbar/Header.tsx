import { Alignment, Navbar, NavbarHeading } from "@blueprintjs/core"

export const Header = () => {
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <NavbarHeading>Constellation</NavbarHeading>
            </Navbar.Group>
        </Navbar>
    )
}