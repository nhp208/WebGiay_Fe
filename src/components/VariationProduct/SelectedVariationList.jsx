import React from 'react';

const SelectedVariationsList = ({ selectedVariations,newSelect }) => {
    console.log('selectedVariations',selectedVariations)
    if (!selectedVariations || selectedVariations.length === 0) {
        return <div>Không có biến thể nào được chọn.</div>;
    }
    return (
        <div>
            {newSelect?<h3>Biến thể mới </h3>:<h3>Biến thể Đã Chọn:</h3>}
            <ul>
                {selectedVariations?.map((variation, index) => (
                    <li key={index}>
                        {variation.Type} - {variation?.options?.map(opt => opt.value).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedVariationsList;
