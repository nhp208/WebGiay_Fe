import React from 'react';
import { Button } from 'antd';

const SelectedVariationsList = ({ selectedVariations, newSelect, onRemoveVariation }) => {
    console.log('selectedVariations', selectedVariations)
    if (!selectedVariations || selectedVariations.length === 0) {
        return <div>Không có biến thể nào được chọn.</div>;
    }
    return (
        <div>
            {newSelect ? <h3>Biến thể mới </h3> : <h3>Biến thể Đã Chọn:</h3>}
            <ul>
                {selectedVariations?.map((variation, index) => (
                    <li key={index}>
                        {variation.Type} - {variation?.options?.map(opt => opt.value).join(', ')}
                        {onRemoveVariation && (
                            <Button 
                                type="text" 
                                danger 
                                onClick={() => onRemoveVariation(index)}
                                style={{ marginLeft: '10px' }}
                            >
                                Xóa
                            </Button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedVariationsList;
