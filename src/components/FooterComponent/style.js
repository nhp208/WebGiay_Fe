import styled from "styled-components";
export const WrapperFooter = styled.div`
    background-color: #333333;
    padding: 20px 0;
    width: 100%;
    
    @media (max-width: 768px) {
        padding: 20px 16px;
    }
`
export const ListChild=styled.li`
    list-style: none;
    padding: 8px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e0e0e0;
    
    &:hover {
        color: #40a9ff;
        transform: translateX(5px);
    }

    .anticon {
        font-size: 18px;
    }
`