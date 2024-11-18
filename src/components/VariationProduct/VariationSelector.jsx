import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd';
import { WrapperSelect } from './style';

const VariationSelector = ({ variations, onAddVariation, setVariations }) => {
    const [newVariation, setNewVariation] = useState({ Type: '', options: [{ value: '' }] });

    const handleAddOption = () => {
        setNewVariation({ ...newVariation, options: [...newVariation.options, { value: '' }] });
    };

    const handleSaveNewVariation = async () => {
        try {
            const response = await axios.post('/api/variations/create', newVariation);
            onAddVariation(response.data);
            setVariations([...variations, response.data]);
            setNewVariation({ Type: '', options: [{ value: '' }] });
        } catch (error) {
            console.error('Lỗi khi tạo variation:', error);
        }
    };

    return (
        <div>
            <WrapperSelect
                onChange={(e) => {
                    const selectedVariation = variations.find(v => v._id === e.target.value);
                    if (selectedVariation) onAddVariation(selectedVariation);
                }}
            >
                <option value="">Chọn Biến thể</option>
                {variations.map(variation => (
                    <option key={variation._id} value={variation._id}>
                        {variation.Type} - {variation.options.map(opt => opt.value).join(', ')}
                    </option>
                ))}
            </WrapperSelect>
                <br/>
            <span>Hoặc Thêm Variation Mới:</span>
            <Input
                type="text"
                placeholder="Loại Variation (ví dụ: color)"
                value={newVariation.Type}
                onChange={(e) => setNewVariation({ ...newVariation, Type: e.target.value })}
            />
            {newVariation.options.map((option, index) => (
                <Input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option.value}
                    onChange={(e) => {
                        const options = [...newVariation.options];
                        options[index].value = e.target.value;
                        setNewVariation({ ...newVariation, options });
                    }}
                />
            ))}
            <div style={{marginTop:'8px'}}>
                <Button style={{marginRight:'4px'}} onClick={handleAddOption}>Thêm Option</Button >
                <Button type='primary' style={{marginLeft:'12px'}}onClick={handleSaveNewVariation}>Lưu Variation Mới</Button >
            </div>
        </div>
    );
};

export default VariationSelector;
