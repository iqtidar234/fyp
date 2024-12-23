import React from 'react';

const ErrorText = ({ children }: { children?: string }) => {
  return (
    <div>
      {children && (
        <p style={{ color: 'red', padding: '10px', fontSize: '12px' }}>
          {children}
        </p>
      )}
    </div>
  );
};

export default ErrorText;
