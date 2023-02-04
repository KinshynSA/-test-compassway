import React, { useEffect } from "react";
import styled from "styled-components";


const Block = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 10000;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
min-height: 100vh;
padding: 20px;
background-color: var(--gray800);
animation: var(--showFromLeftFast);
`
const Content = styled.div`
position: absolute;
top: 50vh;
width: 100%;
max-width: 400px;
transform: translateY(-50%);
`
const LineWrapper = styled.div`
position: relative;
width: 100%;
height: 4px;
background: linear-gradient(90deg, var(--red) 0%, var(--green) 100%);
overflow: hidden;
`
const LineInner = styled.div`
position: absolute;
top: 0;
left: -20%;
width: 20%;
height: 100%;
background-color: var(--gray800);
animation: lineInner 1s infinite;

@keyframes lineInner{
    0%{left: -20%;}
    100%{left: 100%;}
}
`


export default function Preloader(props){
    return (
        <Block>
            <Content>
                <LineWrapper>
                    <LineInner />
                </LineWrapper>
            </Content>
        </Block>
    )
}