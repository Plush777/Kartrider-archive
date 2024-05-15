import styled from 'styled-components';

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 65px;
    padding: 0 16px;
    border-bottom: 1px solid var(--stroke1);
    background-color: var(--background1);
    transition: background .3s ease-in-out;

    @media (max-width: 1200px){
        padding: 0 30px;
    }

    ${({ theme }) => theme.laptop`
        padding: 0 16px;
    `};

    ${({ theme }) => theme.tablet`
        height: 55px;
        top: -65px;
        transition: .25s top ease-in-out;
        padding: 0 10px;

        &.true{
            top: 0;
        }
    `};
`

export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    max-width: 1300px;
    margin: 0 auto;
    height: 100%;

    ${({ theme }) => theme.tablet`
        position: relative;
        justify-content: center;
        column-gap: 10px;
    `};
`

export const Logo = styled.h1`
    margin-right: auto;

    img{
        ${({ theme }) => theme.laptop`
            width: 100px;
        `};

        ${({ theme }) => theme.tablet`
            width: 100%;
            margin: 0 auto;
        `};
    }

    @media (max-width: 768px){
        margin-right: 0;
        
        &.mr{
            margin: 0 auto;
        }
    }
`

export const mobileHeaderMenuWrap = styled.nav`
    position: absolute;
    left: -10px;
    top: 54px;
    width: 100vw;
    background-color: var(--background1);
    transition: max-height .5s ease-in-out;
    max-height: 0;
    overflow: hidden;

    &.active{
        max-height: 193px;
    }
`

export const mobileHeaderMenuList = styled.ul`
    padding: 14px 20px;
    display: flex;
    flex-direction: column;
`

export const mobileHeaderMenuItem = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    height: 55px;
`

export const mobileHeaderMenuLink = styled.a`
    display: flex;
    align-items: center;
    column-gap: 7.5px;
    width: 100%;
    height: 100%;
    color: var(--text1);
    font-size: 1rem;

    svg{margin-top: -2.5px;
        path{
            fill: var(--background3);
        }
    }
`

export const BtnHambuger = styled.button.attrs({ type: 'button' })`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    width: 24px;
    height: 24px;

    svg{
        path{
            stroke: var(--background3);
        }
    }
`

export const DimmedWrap = styled.div`
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 280px;

    &.mobile{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100vw;
        height: 100vh;
        z-index: 10010;
    }
`