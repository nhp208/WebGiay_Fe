import styled from "styled-components";
import { SampleNextArrow, SamplePrevArrow } from "./MultipleItemsComponent";
import "../../index.css"
export const NextArrow=styled(SampleNextArrow)`
    &:before {
    color: var(--primary-color);
   }
`
export const PrevArrow=styled(SamplePrevArrow)`
    &::before {
    color: var(--primary-color);
   }
`
export const WrapperItem=styled.div`
    
`