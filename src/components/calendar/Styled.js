import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    border: 1px solid
    margin: 5px;
`;

export const CalendarHead = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 24px;
    background: #D0AEF2;
`;

export const SevenColGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 30px;
`;

export const HeadDays = styled.span`
    text-align: center;
    background: #BA9CD9;
    font-size: 1.2rem;
`;

export const CalendarBody = styled.div`
    height: calc(100% - 30px - 40px);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    // grid-template-rows: repeat(${({ fourCol }) => (fourCol ? 4 : 5)}, 1fr);
`;

export const StyledDay = styled.span`
    border: 1px solid;
    text-align: right:
    padding: 50px;
    ${({active}) => active && `background: #91D8EB` }
`;

export const StyledAppointment = styled.span`
    display: grid;
    text-align: left;
    background: darkblue;
    color: white;
    padding: 2px 5px;
    margin: 5px;
    border-radius: 8px;
`;