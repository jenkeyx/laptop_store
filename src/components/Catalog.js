import * as React from "react";
import {Card, CardActionArea, CardContent, Grid, Typography} from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import {HOST} from "./constant";

const StyledGrid = styled(Grid)`
  width: 100vw;
  flex-grow: 1;
  padding: 64px;
`
const ImageWrap = styled.div`
  position: relative;

  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scale(0.70);
    height: 400px;
  }

  width: 100%;
  height: 300px;
`
export default function (props) {
    const [result, setResult] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${HOST}/catalog/bases/`).then(
            response => {
                console.log(response);
                setResult(response.data.content)
            }
        )
    }, [])
    return (
        <>
            <StyledGrid container spacing={3} direction="row">
                {result.map(item =>(
                    <Grid item xs={12} sm={6} key={item.id}>
                        <Card onClick={()=>{window.location.href = '/catalog/bases/'+ item.id}}>
                            <CardActionArea>
                                <ImageWrap>
                                    <img src={item.imgUrl}/>
                                </ImageWrap>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        From {item.minPrice}₽
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </StyledGrid>
        </>
    )
}