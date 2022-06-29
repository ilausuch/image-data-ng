import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

const MainLayout = () => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Image Data NG</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="trending-up" text="Sizes" />
      </NavbarGroup>
    </Navbar>
  )
};

export default MainLayout;