import React from 'react';
import { Button, Result } from 'antd';

function Placeholder({ onCreate }) {
  const StartButton = () => {
    return (
      <Button onClick={onCreate} type="primary">
        Create Job
      </Button>
    );
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Result
        style={{ padding: 30 }}
        status="500"
        title="Nothing to see."
        subTitle="Pick job or create a new one from the left."
        extra={StartButton}
      />
    </div>
  );
}

export default Placeholder;
