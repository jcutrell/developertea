import styled from 'styled-components';
const PageContainer = styled.section`
  padding: 2rem 10%;
`

export default function Page ({ children, ...rest}) {
  return <PageContainer {...rest}>{children}</PageContainer>
}
