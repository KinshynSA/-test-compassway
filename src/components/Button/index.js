import React from "react";
import styled from "styled-components";

const Block = styled.button`
position: relative;
padding: 12px 20px;
background-color: transparent;
color: ${props => props.disabled ? 'var(--gray500)' : 'var(--green)'};
font-size: var(--fs2);
font-weight: 600;
line-height: var(--lh2);
border: 3px solid;
letter-spacing: 1px;
overflow: hidden;
cursor: ${props => props.disabled ? '' : 'pointer'};
transition: var(--trans);

&:hover{
    color: ${props => props.disabled ? 'var(--gray500)' : 'var(--gray800)'}; 
    border-color: ${props => props.disabled ? 'var(--gray500)' : 'var(--green)'}; 
}

&:before{
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--green);
    transition: var(--trans);
}

&:hover:before{
    left: ${props => props.disabled ? '-100%' : '0'}
}
`
const Content = styled.div`
position: relative;
z-index: 2;
`

export default function Button(props){
    return (
        <Block {...props}>
            <Content>{props.children}</Content>
        </Block>
    )
}