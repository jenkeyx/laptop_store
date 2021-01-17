import axios from "axios";
import {HOST} from "./constant";
import * as React from "react";
import {useParams} from "react-router";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import ToggleComponent from "./ToggleComponent";

const BaseWrap = styled.div`
  width: 100vw;
  height: 10000vh;
  display: flex;
  flex-wrap: wrap;
  //padding: 10%;
  justify-content: space-evenly;
`
const PreviewWrap = styled.div`
  height: 100vh;
  flex: 1 1 40%;
`
const Preview = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  max-width: 40%;

  img {
    width: 100%;
    height: 100%;
  }
`
const Content = styled.div`

`
const ContentWrap = styled.div`
  width: 50%;
  //background-color: cadetblue;

  & > * {
    padding: 10%;
  }
`

export default function () {
    const [result, setResult] = React.useState(null);
    const [view, setView] = React.useState(null);
    let {id} = useParams();
    React.useEffect(() => {
        axios.get(`${HOST}/catalog/bases/` + id).then(
            response => {
                console.log(response)
                setResult(response.data)
            })
    }, [])
    return (
        <BaseWrap>
            {result && <>
                <PreviewWrap>
                    <Preview><img src={result.imgUrl}/></Preview>
                </PreviewWrap>
                <ContentWrap>
                    <Content>
                        {/*<h1>{result.name}</h1>*/}
                        <Typography variant="h1" component="h2" gutterBottom>
                            {result.name}
                        </Typography>
                        <Typography variant="h6">
                            {`Apple M1 chip with 8‑core CPU, 7‑core GPU, and 16‑core Neural Engine
                                8GB unified memory
                                256GB SSD storage
                                Retina display with True Tone
                                Backlit Magic Keyboard - US English
                                Touch ID
                                Force Touch trackpad
                                Two Thunderbolt / USB 4 ports`}
                        </Typography>
                        <hr/>
                        <Typography variant="h4" gutterBottom>
                            CPU:
                        </Typography>
                        <div className={"buttonsContainer"}>
                            <ToggleComponent value={"0"}
                                             selected={view}
                                             onChange={(newValue) => {
                                                 setView(newValue)
                                             }}>
                                CPU1CPU1CPU1CPU1
                            </ToggleComponent>
                            <ToggleComponent value={"1"}
                                             selected={view}
                                             onChange={(newValue) => {
                                                 setView(newValue)
                                             }}>
                                CPU2CPU2CPU2CPU2CPU2CPU2
                            </ToggleComponent>
                            <ToggleComponent value={"2"}
                                             selected={view}
                                             onChange={(newValue) => {
                                                 setView(newValue)
                                             }}>
                                CPU3CPU3CPU3CPU3CPU3CPU3
                            </ToggleComponent>
                        </div>
                        {/*<ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={(event, newValue) => {setView(newValue)}}>*/}
                        {/*    {result.cpu.map(cpuButton => (*/}
                        {/*        <ToggleButton value="list" aria-label="list">*/}
                        {/*            test1*/}
                        {/*        </ToggleButton>*/}
                        {/*    ))}*/}
                        {/*</ToggleButtonGroup>*/}
                    </Content>
                </ContentWrap>

            </>}
        </BaseWrap>

    )
}