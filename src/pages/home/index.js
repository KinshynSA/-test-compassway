import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Section, Button } from "../../components";
import { getTorExitNodeList, getVisitopIp } from "../../api";


const SectionStyled = styled(Section)`
background-color: var(--gray800);
color: var(--white);
`;
const Block = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
min-height: 100vh;
`
const Result = styled.div`
margin-bottom: 20px;
text-align: center;
animation: var(--showOpacity);
`;


export default function Test(){
    const [ip, setIp] = useState();
    const [lastRequestNodesTime, setLastRequestNodesTime] = useState();
    const [torExitNodeList, setTorExitNodeList] = useState([]);
    const [isTorBroswer, setIsTorBrowser] = useState();
    const [result, setResult] = useState(false);

    function checkNodes(){
        if(torExitNodeList.length){
            if((Date.now() - lastRequestNodesTime) < (1000 * 60 * 60 + 1)) return true;
        }

        return false;
    }

    async function getFullTorExitNodeList(){
        if(checkNodes()) return;

        let totalNodesAmount = 0;
        let offset = 0;
        const batchSize = 1000;
        let nodes = [];

        async function getPartTorExitNodeList(){
            const res = await getTorExitNodeList({
                batchSize,
                offset,
            })
    
            nodes = nodes.concat(res.nodes);
            totalNodesAmount = res.total;
            offset += batchSize;
    
            if(nodes.length < totalNodesAmount){
                getPartTorExitNodeList();
            } else {
                setTorExitNodeList(nodes);
                setLastRequestNodesTime(Date.now());
            }
        }

        return await getPartTorExitNodeList();
    }

    function isIpInNodeList(){
        let result = false;
        for(let node of torExitNodeList){
            if(node.ip === ip){
                result = true;
                break;
            } 
        }
        return result;
    }

    async function handleButtonClick(){
        getFullTorExitNodeList();
        setIp(await getVisitopIp());
    }

    useEffect(() => {
        if(torExitNodeList.length && ip){
            setIsTorBrowser(isIpInNodeList());
        }
    }, [torExitNodeList,ip])

    useEffect(() => {
        if(isTorBroswer !== undefined) setResult(true);
    }, [isTorBroswer]);

    return (
        <SectionStyled>
            <Block>
                <Result>{result && (`Вы зашли на страницу ${isTorBroswer ? '' : 'НЕ'} через Tor browser`)}</Result>
                <Button onClick={handleButtonClick}>Нажми меня</Button>
            </Block>
        </SectionStyled>
    )
}