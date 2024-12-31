import React from 'react';
import { Typography, Row, Col, Card, Space } from 'antd';
import { ShopOutlined, SafetyCertificateOutlined, CustomerServiceOutlined, RocketOutlined } from '@ant-design/icons';
import { AboutContainer, BannerSection, ContentSection, ImageWrapper, ValueCard, ContactSection } from './style';
import Logo from '../../assets/images/logo.jpg';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <AboutContainer>
      {/* Phần Banner */}
      <BannerSection>
        <Title level={1}>Về Hẻm Sneaker</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          Nơi mang đến cho bạn những đôi giày chất lượng và phong cách độc đáo
        </Paragraph>
      </BannerSection>

      {/* Phần Giới thiệu */}
      <ContentSection>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={2}>Câu Chuyện Của Chúng Tôi</Title>
            <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Hẻm Sneaker được thành lập vào năm 2020, xuất phát từ niềm đam mê với giày sneaker và mong muốn 
              mang đến cho khách hàng những sản phẩm chất lượng với giá cả hợp lý. Chúng tôi không chỉ đơn thuần 
              là một cửa hàng giày, mà còn là nơi kết nối những người yêu sneaker, tạo nên một cộng đồng 
              đam mê phong cách và thời trang.
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <ImageWrapper>
              <img src={Logo} alt="Hẻm Sneaker Store" />
            </ImageWrapper>
          </Col>
        </Row>
      </ContentSection>

      {/* Phần Giá trị cốt lõi */}
      <ContentSection>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Giá Trị Cốt Lõi
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <ValueCard>
              <Space direction="vertical" size="middle">
                <ShopOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                <Title level={4}>Sản Phẩm Chính Hãng</Title>
                <Paragraph>
                  Cam kết 100% sản phẩm chính hãng, có nguồn gốc xuất xứ rõ ràng
                </Paragraph>
              </Space>
            </ValueCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ValueCard>
              <Space direction="vertical" size="middle">
                <SafetyCertificateOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
                <Title level={4}>Bảo Hành Tận Tâm</Title>
                <Paragraph>
                  Chế độ bảo hành rõ ràng và chính sách đổi trả linh hoạt
                </Paragraph>
              </Space>
            </ValueCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ValueCard>
              <Space direction="vertical" size="middle">
                <CustomerServiceOutlined style={{ fontSize: '36px', color: '#faad14' }} />
                <Title level={4}>Tư Vấn Chuyên Nghiệp</Title>
                <Paragraph>
                  Đội ngũ tư vấn nhiệt tình, am hiểu sâu về sản phẩm
                </Paragraph>
              </Space>
            </ValueCard>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <ValueCard>
              <Space direction="vertical" size="middle">
                <RocketOutlined style={{ fontSize: '36px', color: '#eb2f96' }} />
                <Title level={4}>Giao Hàng Nhanh Chóng</Title>
                <Paragraph>
                  Giao hàng toàn quốc, đóng gói cẩn thận, bảo vệ sản phẩm
                </Paragraph>
              </Space>
            </ValueCard>
          </Col>
        </Row>
      </ContentSection>

      {/* Phần Cam kết */}
      <ContentSection>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Cam Kết Của Chúng Tôi
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card title="Chất Lượng" style={{ height: '100%' }}>
              <Paragraph>
                Mọi sản phẩm tại Hẻm Sneaker đều được kiểm tra kỹ lưỡng về chất lượng 
                trước khi đến tay khách hàng.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Giá Cả" style={{ height: '100%' }}>
              <Paragraph>
                Cam kết giá cả cạnh tranh nhất thị trường với chất lượng tương đương.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Dịch Vụ" style={{ height: '100%' }}>
              <Paragraph>
                Đặt sự hài lòng của khách hàng lên hàng đầu với dịch vụ chăm sóc 
                khách hàng 24/7.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </ContentSection>

      {/* Phần Liên hệ */}
      <ContactSection>
        <Title level={2}>Liên Hệ Với Chúng Tôi</Title>
        <Paragraph style={{ fontSize: '16px' }}>
          Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
          <br />
          Hotline: 1900 xxxx
          <br />
          Email: contact@hemsneaker.com
          <br />
          Giờ làm việc: 8:00 - 22:00 (Thứ 2 - Chủ nhật)
        </Paragraph>
      </ContactSection>
    </AboutContainer>
  );
};

export default AboutPage;