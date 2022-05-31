import { StyledHeader, StyledParagraph, StyledTitle } from './Header.styled';

interface Props {
  title: string;
  paragraph: string;
}

const Header = ({ title, paragraph }: Props) => {
  return (
    <StyledHeader>
      <StyledTitle>{title}</StyledTitle>
      <StyledParagraph>{paragraph}</StyledParagraph>
    </StyledHeader>
  );
};

export default Header;
