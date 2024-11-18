import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';

function SizeComponent() {
        const [inputValue, setInputValue] = useState(1);
        const onChange = (newValue) => {
          setInputValue(newValue);
        }

  return (
    <Row>
        <Col span={20}>
        <Slider
            style={{
                width: '100%',
            }}
            min={36}
            max={42}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
        />
        </Col>
        <Col span={4}>
        <InputNumber
            min={36}
            max={42}
            style={{
            margin: '0 16px',
            }}
            value={inputValue}
            onChange={onChange}
        />
        </Col>
    </Row>
    );
}

export default SizeComponent