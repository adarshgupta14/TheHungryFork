import styled from "styled-components"
import { BASE_URL, Button } from "../App"

const MainBody = ({data}) => {
  return (
    <FoodCardsContainer>
        <FoodCards>
        {data?.map(({name, image, text, price}) => (
            <FoodCard key={name}>
                <div className="food_img">
                    <img src={BASE_URL + image}/>
                </div>
                <div className="food_info">
                    <div className="info">
                        <h3>{name}</h3>
                        <p>{text}</p>
                    </div>
                    <Button>${price.toFixed(2)}</Button>
                </div>
            </FoodCard>
            ))}
      </FoodCards>
      <div className="madeby">--Made by <a href="https://www.linkedin.com/in/adarshgupta04">@adarshgupta</a></div>
    </FoodCardsContainer>
  )
}

export default MainBody

const FoodCardsContainer = styled.section`
  min-height: calc(100vh - 136px);

  .madeby{
    position: fixed;
    left: 10px;
    bottom: 20px;
    font-size: 14px;
    a{
        text-decoration: none;
        font-size: 15px;
        font-weight: 700;
        color: #e003e0;
    }
  }
`
const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  row-gap: 32px;
  column-gap: 20px;
`
const FoodCard = styled.div`
    border: 1px solid rgba(135, 38, 183, 0);
    background: url(.png), 
    radial-gradient(90.16% 143.01% at 15.32% 21.04%, 
        rgba(165, 239, 255, 0.2) 0%, 
        rgba(110,  191, 244, 0.0447917) 77.08%, 
        rgba(70, 144, 213, 0) 100%);
    background-blend-mode: overlay, normal;
    backdrop-filter: blur(13.1842px);
    width: 340px;
    height: 167px;
    border-radius: 20px;
    display: flex;
    padding: 8px;

    .food_img img{
        width: 153px;
    }

    .food_info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
        h3{
            margin-top: 8px;
            font-size: 16px;
            font-weight: 500;
        }
        p{
            margin-top: 4px;
            font-size: 12px;
        }
        button{
            font-size: 12px;
        }
    }
`