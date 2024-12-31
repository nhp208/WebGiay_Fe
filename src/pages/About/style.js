import styled from 'styled-components';

export const AboutContainer = styled.div`
  padding: 0 clamp(16px, 5vw, 120px);
  max-width: 1440px;
  margin: 0 auto;
`;

export const BannerSection = styled.div`
  text-align: center;
  margin: 40px 0;
  background-color: #f5f5f5;
  padding: 60px 20px;
  border-radius: 8px;
`;

export const ContentSection = styled.div`
  margin: 60px 0;
`;

export const ImageWrapper = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ValueCard = styled.div`
  text-align: center;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const ContactSection = styled.div`
  text-align: center;
  margin: 60px 0;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
`;