import React from 'react'
import { ListChild, WrapperFooter } from './style'
import { Col, Divider, Row } from 'antd'
import Logo_img from '../../assets/images/logo.jpg'
import { Logo } from '../Header/style'
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const style = {
    // background: '#0092ff',
    color:'#fff',
    padding: '8px 0',
    display: 'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
};
function FooterComponent() {
  return (
    <WrapperFooter>
        <Divider orientation="left"></Divider>
        <Row style={{margin:'0 120px'}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
                <div style={style}>
                    <Logo style={{background:'#fff',width:'240px',height:'240px'}} src={Logo_img}/>
                    <h3 style={{margin:'8px 0'}}>HẺM SNEAKER - TỰ TIN TỪNG BƯỚC, PHONG CÁCH TỪNG GIÂY!</h3>
                    <span style={{margin:'8px 0'}}>Hẻm Sneaker là thương hiệu giày sneaker chuyên cung cấp các sản phẩm giày chất lượng, đa dạng mẫu mã và kiểu dáng thời trang phù hợp với sinh viên, giá cả ưu đãi.</span>
                    <ButtonComponent textButton={'XEM THÊM'}  />
                </div>.
            </Col>
            <Col className="gutter-row" span={6} style={{padding:'0'}}>
                <div style={style}>
                    <ul>
                        <h3>CHÍNH SÁCH KHÁCH HÀNG</h3>
                        <ListChild>Chính sách bảo hành</ListChild>
                        <ListChild>Hướng dẫn mua hàng</ListChild>
                        <ListChild>Quy định đổi trả</ListChild>
                        <ListChild>Vận chuyển</ListChild>
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