import { useSelector } from 'react-redux';
import styled from 'styled-components';
import img from '../images/ONLY..svg';

export { Home };

function Home() {
    const { user: authUser } = useSelector(x => x.auth);

    return (
        <>
            <StyledImg className='logo' src={img}/>
            <StyledText>Здравствуйте, <b>{authUser?.login}</b></StyledText>
        </>
    );
}

const StyledText = styled.h1`
    font-family: 'Helvetica Neue';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 48px;
`

const StyledImg = styled.img`
    top: 0;
    margin-top: 40px;
    position: fixed;
`

