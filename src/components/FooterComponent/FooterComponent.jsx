import React from 'react'
import { ListChild, WrapperFooter } from './style'
import { Col, Divider, Row } from 'antd'
import Logo_img from '../../assets/images/logo.jpg'
import { Logo } from '../Header/style'
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const style = {
    color: '#e0e0e0',
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
};
function FooterComponent() {
  return (
    <WrapperFooter>
        <Divider style={{ margin: '40px 0' }} />
        <Row style={{
            margin: '0 auto',
            maxWidth: '1200px',
            padding: '0 20px',
            paddingBottom: '40px'
        }} gutter={[48, 24]}>
            <Col className="gutter-row" span={6}>
                <div style={style}>
                    <Logo style={{
                        background: '#fff',
                        width: '200px',
                        height: '200px',
                        borderRadius: '10px',
                        marginBottom: '16px'
                    }} src={Logo_img}/>
                    <h3 style={{
                        margin: '12px 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>HẺM SNEAKER - TỰ TIN TỪNG BƯỚC, PHONG CÁCH TỪNG GIÂY!</h3>
                    <span style={{
                        margin: '12px 0',
                        lineHeight: '1.6',
                        opacity: '0.9'
                    }}>Hẻm Sneaker là thương hiệu giày sneaker chuyên cung cấp các sản phẩm giày chất lượng, đa dạng mẫu mã và kiểu dáng thời trang phù hợp với sinh viên, giá cả ưu đãi.</span>
                    <ButtonComponent 
                        textButton={'XEM THÊM'}
                        styleButton={{
                            marginTop: '16px',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            </Col>
            <Col className="gutter-row" span={6} style={{padding:'0'}}>
                <div style={style}>
                    <ul style={{ width: '100%' }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            marginBottom: '20px'
                        }}>CHÍNH SÁCH KHÁCH HÀNG</h3>
                        <ListChild style={{
                            padding: '8px 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#1890ff'
                            }
                        }}>Chính sách bảo hành</ListChild>
                        <ListChild style={{
                            padding: '8px 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#1890ff'
                            }
                        }}>Hướng dẫn mua hàng</ListChild>
                        <ListChild style={{
                            padding: '8px 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#1890ff'
                            }
                        }}>Quy định đổi trả</ListChild>
                        <ListChild style={{
                            padding: '8px 0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#1890ff'
                            }
                        }}>Vận chuyển</ListChild>
                    </ul>
                </div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>
                    <h3>Địa chỉ cửa hàng</h3>
                    <div id="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.84151844204!2d105.76804037461572!3d10.029933690076973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1727095548266!5m2!1svi!2s" width="300" height="300" style={{border:'0'}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                </div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>
                    <ul>
                        <h3>Kết nối với chúng tôi</h3>
                        <ListChild><FacebookOutlined />Facebook</ListChild>
                        <ListChild><InstagramOutlined />Instagram</ListChild>
                        <ListChild><MailOutlined /> Mail</ListChild>
                        <ListChild><PhoneOutlined />Hotline: 09711xxxx</ListChild>
                    </ul>
                </div>
            </Col>
        </Row>
    </WrapperFooter>
  )
}

export default FooterComponent