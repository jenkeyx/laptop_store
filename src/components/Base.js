import axios from "axios";
import {HOST} from "./constant";
import * as React from "react";
import {useParams} from "react-router";
import styled from "styled-components";
import {Button, Typography} from "@material-ui/core";
import ToggleComponent from "./ToggleComponent";

const BaseWrap = styled.div`
  width: 100vw;
  height: 10000vh;
  display: flex;
  flex-wrap: wrap;
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

  & > * {
    padding: 10%;
  }
`
const BackButton = styled(Button)`
  position: fixed;
!important;
  top: 0;
  left: 0;
  right: 0;
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
                    <BackButton variant={"outlined"}>BACK TO CATALOG</BackButton>
                    <Preview>
                        <img src={result.base.imgUrl}/>
                    </Preview>
                </PreviewWrap>
                <ContentWrap>
                    <Content>
                        <Typography variant="h1" component="h2" gutterBottom>
                            {result.base.name}
                        </Typography>
                        <Typography variant="h6">
                            <ol>
                                <li>
                                    {result.cpus[cpu].coreNumber}-core {result.cpus[cpu].name} CPU.
                                </li>
                                <li>
                                    {result.gpus.length > 0 ? result.gpus[gpu].name : ""}
                                </li>
                                <li>
                                    {result.ram[ram].sizeGB} GB of RAM
                                </li>
                                <li>
                                    {result.drives[drives].size} GB Storage
                                </li>

                            </ol>
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