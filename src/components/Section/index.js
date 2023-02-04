import React from "react";
import styled from "styled-components";

const Block = styled.section``
const CenterBlock = styled.div`
max-width: 1232px;
padding: 0 16px;
margin: 0 auto;
`

export default function Section(props){
    return (
        <Block {...props}>
            <CenterBlock>
                {props.children}
            </CenterBlock>
        </Block>
    )
}