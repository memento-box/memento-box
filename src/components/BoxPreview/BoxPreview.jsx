import React from 'react';

const BoxPreview = ({ box }) => {
  const renderContent = () => {
    switch(box) {
      case 'box1':
        return <div>Content for Black Angled Box</div>;
      case 'box2':
        return <div>Content for White Ribbon Box</div>;
      default:
        return null;
    }
  };

  return (
    <div className="box-preview">
      {renderContent()}
    </div>
  );
};

export default BoxPreview;
