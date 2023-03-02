import React, { useState } from "react";
import styled from "styled-components";
import { Section, Button, LoadingIndicator } from "../../components";
import { getTorExitNodes, getMyIp } from "../../api";
import { requestExitTorNodesInterval } from "../../constants";


const SectionStyled = styled(Section)`
background-color: var(--gray800);
color: var(--white);
`;
const Block = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
`
const Result = styled.div`
margin-bottom: 20px;
text-align: center;
animation: var(--showOpacity);
`;
const ErrorsBlock = styled.div``
const Error = styled.div`
margin-top: 20px;
color: var(--red);
animation: var(--showOpacity);
`


export default function HomePage(){
    const [myIp, setMyIp] = useState();
    const [myIpError, setMyIpError] = useState();
    const [lastRequestNodesTime, setLastRequestNodesTime] = useState();
    const [torExitNodes, setTorExitNodes] = useState([]);
    const [torExitNodesError, setTorExitNodesError] = useState();
    const [isTorBrowser, setIsTorBrowser] = useState();
    const [result, setResult] = useState(false);
    const [isLoading, setIsLoading] = useState();

    function isHaveActualNodes(){
        if(torExitNodes.length){
            if((Date.now() - lastRequestNodesTime) < requestExitTorNodesInterval) return true;
        }

        return false;
    }

    async function getFullTorExitNodes(){
        if(isHaveActualNodes()) return torExitNodes;

        let totalNodesAmount = 0;
        let offset = 0;
        const batchSize = 1000;
        let nodes = [];

        async function getPartTorExitNodes(){
            const [error, res] = await getTorExitNodes({
                batchSize,
                offset,
            });

            if(error){
                setTorExitNodesError(`tor nodes load error: ${error.message}`)
                throw new Error(error)
            } else {
                setTorExitNodesError(null)

                nodes = nodes.concat(res.nodes);
                totalNodesAmount = res.total;
                offset += batchSize;
        
                if(nodes.length < totalNodesAmount){
                    return await getPartTorExitNodes();
                } else {
                    setTorExitNodes(nodes);
                    setLastRequestNodesTime(Date.now());
                    return nodes;
                }
            }
        }

        return await getPartTorExitNodes();
    }

    async function getMyIpWrapper(){
        const [error, myIp] = await getMyIp();
        if(error){
            setMyIpError(`my ip info load error: ${error.message}`)
            throw new Error(error)
        } else {
            setMyIpError(null);

            setMyIp(myIp);
        }
    }

    function isMyIpInNodeList(nodes){
        return !!nodes.find(({ip} = {}) => ip === myIp);
    }

    async function handleButtonClick(){
        setIsLoading(true);
        setResult(false);

        Promise.allSettled([
            getFullTorExitNodes(),
            getMyIpWrapper()
        ]).then((res) => {
            setIsTorBrowser(isMyIpInNodeList(res[0].value));
            setResult(true);
        }).catch(error => {
            console.log('error',error)
            setResult(false);
        }).finally(() => {
            setIsLoading(false);    
        })
    };

    return (
        <SectionStyled>
            <Block>
                <Result>{result && (`Вы зашли на страницу ${isTorBrowser ? '' : 'НЕ'} через Tor browser`)}</Result>
                <Button onClick={handleButtonClick}>Нажми меня</Button>
                <ErrorsBlock>
                    {myIpError && <Error>{myIpError}</Error>}
                    {torExitNodesError && <Error>{torExitNodesError}</Error>}
                </ErrorsBlock>
            </Block>

            {isLoading && <LoadingIndicator />}
        </SectionStyled>
    )
}