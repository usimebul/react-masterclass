import styled from "styled-components";
import { IUSD } from "../interface";

const Dashboard = styled.div`
  display: grid;  
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(180px, auto);
`

const DashboardItem = styled.div`
  background-color: ${(props) => props.theme.OverviewBgColor};
  border-radius: 15px;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;  
`

const DashboardItemTitlte = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex: 1;
  font-size: 14px;
  font-weight: 800;
  padding: 10px 0;
`

const DashboardItemValue = styled.div`
  display: flex;
  flex: 5;  
  justify-content: center;
  align-content: center;
  

  span {
    align-self: center;
    font-size: 2em;
    font-weight: bolder;
    overflow: hidden;
    margin: 0 20px;
    color: ${props => props.theme.accentColor};
    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;
  }
`

interface PriceProps {
  USD: IUSD | undefined
}

function Price({ USD }: PriceProps) {
  return <Dashboard>
    {Object.entries(USD || {}).map(([key, value], i) => <DashboardItem key={i}>
      <DashboardItemTitlte>{key.toUpperCase()}</DashboardItemTitlte>
      <DashboardItemValue><span>{typeof value === "number" ? value.toFixed(2) : new Date(value).toDateString()}</span></DashboardItemValue>
    </DashboardItem>)}
  </Dashboard>
}

export default Price;
